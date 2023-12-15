import { Request } from 'express';
import { File } from 'types/multer';

declare module 'express-serve-static-core' {
  interface Request {
    file?: File;
    files?: File[];
  }
}
