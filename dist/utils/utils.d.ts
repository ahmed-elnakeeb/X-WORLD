import { Category } from "@prisma/client";
export declare function generateResponseBody(status?: number, data?: any[] | object, msg?: string): {
    status: number;
    data: object | any[];
    msg: string;
};
export declare function joiErrorsIntoArray(error: string): string;
export declare function isMultipleOfTen(number: number): boolean;
export declare function mapCategories(categories: Category[]): {
    id: number;
    title: string;
}[];
