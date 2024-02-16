import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
export declare class Authentication implements NestMiddleware {
    private readonly prisma;
    private responses;
    use(req: Request, res: Response, next: NextFunction): Promise<Response<any, Record<string, any>>>;
}
