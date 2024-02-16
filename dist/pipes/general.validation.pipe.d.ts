import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class PageNoValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
export declare class PageSizeValidationPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
