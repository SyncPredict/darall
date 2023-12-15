import express from 'express';
import {PrismaClient} from '@prisma/client';
import cors from 'cors';
import bodyParser from 'body-parser';
import multer from 'multer';
import path from 'path';
import passport from 'passport';
import errorHandler from './middleware/errorHandler';
import {itemRoutes} from './routes/item';
import {categoryRoutes} from './routes/category';
import {authenticator, authRoutes} from './routes/auth';

const app = express();
const prisma = new PrismaClient();

// Настройка multer для загрузки изображений
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) =>
        cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`)
});
const upload = multer({storage});

app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use('/uploads', express.static('uploads'));

const authenticate = authenticator(prisma);

app.use('/api/login', authRoutes(prisma));
app.use('/api/items', authenticate, itemRoutes(prisma, upload));
app.use('/api/categories', authenticate, categoryRoutes(prisma));

app.use(errorHandler); // Централизованная обработка ошибок

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
