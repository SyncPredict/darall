"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const client_1 = require("@prisma/client");
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const path_1 = __importDefault(require("path"));
const app = (0, express_1.default)();
const prisma = new client_1.PrismaClient();
// Настройка загрузки изображений
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path_1.default.extname(file.originalname));
    }
});
const upload = (0, multer_1.default)({ storage: storage });
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/uploads', express_1.default.static('uploads'));
// Получение списка пунктов меню
app.get('/menu', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const items = yield prisma.Item.findMany();
    res.json(items);
}));
// Добавление нового пункта меню
app.post('/menu', upload.single('image'), (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, description, price, category } = req.body;
    const image = req.file ? req.file.path : null;
    const item = yield prisma.item.create({
        data: { name, description, price, category, image },
    });
    res.json(item);
}));
// Редактирование пункта меню
app.put('/menu/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { name, description, price, category } = req.body;
    const item = yield prisma.item.update({
        where: { id: Number(id) },
        data: { name, description, price, category },
    });
    res.json(item);
}));
// Удаление пункта меню
app.delete('/menu/:id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    yield prisma.item.delete({
        where: { id: Number(id) },
    });
    res.status(200).send(`Deleted menu item with id ${id}`);
}));
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
