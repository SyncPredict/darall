import { PrismaClient } from '@prisma/client';

export function initCategory(prisma: PrismaClient) {
    async function createCategory(categoryData: {
        name?: string;
        items?: number[]
    }) {
        // Шаг 1: Создание категории без связи с элементами
        const newCategory = await prisma.category.create({
            data: {
                name: categoryData.name,
            },
        });

        // Шаг 2: Добавление элементов, если они есть
        if (categoryData.items && categoryData.items.length > 0) {
            await prisma.category.update({
                where: {id: newCategory.id},
                data: {
                    items: {
                        connect: categoryData.items.map(itemId => ({
                            itemId_categoryId: {
                                itemId: itemId,
                                categoryId: newCategory.id,
                            },
                        })),
                    },
                },
            });
        }

        return newCategory;
    }

    async function getCategoryById(categoryId: number) {
        return prisma.category.findUnique({
            where: {id: categoryId},
            include: {items: {select: {itemId: true}}},
        });
    }

    async function updateCategory(categoryId: number, updateData: {
        name?: string;
        items?: number[]
    }) {
        let itemConnectDisconnect = undefined;
        const currentCategory = await prisma.category.findUnique({
            where: {id: categoryId},
            include: {items: true},
        });

        const currentItems = currentCategory?.items.map(i => i.itemId) || [];

        // Проверяем, определены ли items в updateData
        if (updateData.items) {
            const items = updateData.items ?? []; // Если updateData.items undefined, используем пустой массив

            const itemsToConnect = items.filter(id => !currentItems.includes(id)).map(id => ({
                itemId_categoryId: {
                    itemId: id,
                    categoryId: categoryId
                }
            }));

            const itemsToDisconnect = currentItems.filter(id => !items.includes(id)).map(id => ({
                itemId_categoryId: {
                    itemId: id,
                    categoryId: categoryId
                }
            }));

            itemConnectDisconnect = {
                connect: itemsToConnect,
                disconnect: itemsToDisconnect,
            };
        }

        return prisma.category.update({
            where: {id: categoryId},
            data: {
                ...updateData,
                items: itemConnectDisconnect,
            },
        });
    }

    async function deleteCategory(categoryId: number) {
        return prisma.category.delete({where: {id: categoryId}});
    }

    return {createCategory, getCategoryById, updateCategory, deleteCategory};
}
