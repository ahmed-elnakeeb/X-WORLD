import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class Authorization implements NestMiddleware {
    private responses;
    use(req: Request, res: Response, next: NextFunction): void;
}
