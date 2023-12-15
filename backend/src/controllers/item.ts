import {PrismaClient} from '@prisma/client';

export function initItem(prisma: PrismaClient) {
    async function getFullItemData(itemId: number) {
        const item = await prisma.item.findUnique({
            where: {id: itemId},
            include: {
                categories: {
                    select: {category: {select: {id: true}}}
                }
            }
        })
        return {
            ...item,
            categories: item?.categories.map(link => link.category.id) || []
        }
    }


    async function getItems() {
        const items = await prisma.item.findMany({
            include: {
                categories: {
                    select: {category: {select: {id: true}}}
                }
            }
        });

        return items.map(item => ({
            ...item,
            categories: item.categories.map(link => link.category.id)
        }));
    }

    async function createItem(itemData: {
        name: string;
        description: string;
        price: number;
        image?: string;
        categories?: number[]
    }) {
        const {name, description, price, image, categories} = itemData;

        const item = await prisma.item.create({
            data: {name, description, price, image},
        });

        if (categories && categories.length > 0) {
            await prisma.categoryToItem.createMany({
                data: categories.map(categoryId => ({
                    itemId: item.id,
                    categoryId: categoryId
                })),
                skipDuplicates: true
            });
        }

        return getFullItemData(item.id);
    }

    async function updateItem(itemId: number, updateData: {
        name: string;
        description: string;
        price: number;
        image?: string;
        categories?: number[]
    }) {
        const {name, description, price, image, categories} = updateData;

        // Обновляем основную информацию о товаре
        await prisma.item.update({
            where: {id: itemId},
            data: {name, description, price, image},
        });

        // Получаем текущие категории товара
        const currentCategories = await prisma.categoryToItem.findMany({
            where: {itemId: itemId},
            select: {categoryId: true}
        });
        const currentCategoryIds = currentCategories.map(c => c.categoryId).sort();

        // Сравниваем текущие категории с новыми
        const newCategoryIds = categories ? categories.sort() : [];
        if (!arraysEqual(currentCategoryIds, newCategoryIds)) {
            // Удаляем все существующие связи этого товара с категориями
            await prisma.categoryToItem.deleteMany({
                where: {itemId: itemId}
            });

            // Создаем новые связи с категориями
            if (categories && categories.length > 0) {
                await prisma.categoryToItem.createMany({
                    data: categories.map(categoryId => ({
                        itemId: itemId,
                        categoryId: categoryId
                    })),
                    skipDuplicates: true
                });
            }
        }

        // Возвращаем обновленные данные товара
        return getFullItemData(itemId);
    }

// Функция для сравнения массивов
    function arraysEqual(a: number[], b: number[]) {
        if (a.length !== b.length) return false;
        for (let i = 0; i < a.length; i++) {
            if (a[i] !== b[i]) return false;
        }
        return true;
    }


    async function deleteItem(itemId: number) {
        // Удаляем связи в CategoryToItem
        await prisma.categoryToItem.deleteMany({
            where: {itemId: itemId}
        });

        // Удаляем сам товар
        return prisma.item.delete({
            where: {id: itemId}
        });
    }

    async function getItemById(itemId: number) {
        return getFullItemData(itemId);
    }

    return {getItems, getItemById, createItem, updateItem, deleteItem};
}
