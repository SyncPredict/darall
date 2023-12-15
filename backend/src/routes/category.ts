import { Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { initCategory } from "../controllers/category";

export function categoryRoutes(prisma: PrismaClient) {
    const router = Router();
    const { createCategory, getCategoryById, updateCategory, deleteCategory } = initCategory(prisma);

    // Получение списка категорий
    router.get('/', async (req, res) => {
        const categories = await prisma.category.findMany();
        res.json(categories || []);
    });

    // Добавление новой категории
    router.post('/', async (req, res) => {
        const { name, items } = req.body;
        const category = await createCategory({ name, items });
        res.json(category);
    });

    // Редактирование категории
    // router.put('/category/:id', async (req, res) => {
    //     const { id } = req.params;
    //     const { name, items } = req.body;
    //     const category = await updateCategory(Number(id), { name, items });
    //     res.json(category);
    // });
    //
    // // Получение информации о категории
    // router.get('/category/:id', async (req, res) => {
    //     const { id } = req.params;
    //     const category = await getCategoryById(Number(id));
    //     res.json(category);
    // });
    //
    // // Удаление категории
    // router.delete('/category/:id', async (req, res) => {
    //     const { id } = req.params;
    //     await deleteCategory(Number(id));
    //     res.status(200).send(`Deleted category with id ${id}`);
    // });

    return router;
}
