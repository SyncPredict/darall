import {Router} from 'express';
import {PrismaClient} from '@prisma/client';
import {Multer} from "multer";
import {initItem} from "../controllers/item";
import {promisify} from "util";
import fs from 'fs';

const unlinkAsync = promisify(fs.unlink);

export function itemRoutes(prisma: PrismaClient, upload: Multer) {
    const router = Router();
    const {getItems, getItemById, createItem, updateItem, deleteItem} = initItem(prisma);

    // Получение списка пунктов меню
    router.get('/', async (req, res) => {
        const items = await getItems()
        res.json(items);
    });

    // Добавление нового пункта меню
    router.post('/', upload.single('image'), async (req, res) => {
        const {name, description, price, categories} = req.body;
        const image = req.file ? req.file.path : null;

        // Преобразование price в float и categories в массив чисел
        const parsedPrice = parseFloat(price);
        const numericCategories = categories ? categories.split(',').map(Number) : [];


        const item = await createItem({
            name,
            description,
            price: parsedPrice,
            categories: numericCategories,
            image
        });

        res.json(item);
    });


    // Редактирование пункта меню
    router.put('/:id', upload.single('image'), async (req, res) => {
        const {id} = req.params;
        const {name, description, price, categories} = req.body;
        const existingItem = await getItemById(Number(id));

        if (existingItem && existingItem.image && req.file) {
            // Проверяем существование файла перед удалением
            if (fs.existsSync(existingItem.image)) {
                await unlinkAsync(existingItem.image);
            }
        }

        const image = req.file ? req.file.path : existingItem.image;
        const parsedPrice = parseFloat(price);
        const numericCategories = categories ? categories.split(',').map(Number) : [];


        const updatedItem = await updateItem(Number(id), {
            name,
            description,
            price: parsedPrice,
            categories: numericCategories,
            image
        });

        res.json(updatedItem);
    });

    // Удаление пункта меню
    router.delete('/:id', async (req, res) => {
        const {id} = req.params;
        const item = await getItemById(Number(id));

        if (item && item.image) {
            // Удаляем изображение
            await unlinkAsync(item.image);
        }

        await deleteItem(Number(id));
        res.status(200).send(`Deleted menu item with id ${id}`);
    });

    return router;
}
