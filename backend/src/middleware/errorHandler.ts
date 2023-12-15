import { Request, Response, NextFunction } from 'express';

// Создание пользовательского типа для ошибок
interface ErrorWithStatus extends Error {
    status?: number;
}

// Функция обработчика ошибок
export default function errorHandler(err: ErrorWithStatus, req: Request, res: Response, next: NextFunction) {
    const status = err.status || 500;
    const message = err.message || 'Что-то пошло не так.';

    console.error(err); // Логирование для отладки

    res.status(status).json({
        error: {
            message: message,
            status: status
        }
    });
}
