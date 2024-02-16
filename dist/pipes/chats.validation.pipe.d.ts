import { PipeTransform, ArgumentMetadata } from '@nestjs/common';
export declare class creatChatReqValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
export declare class updateChatReqValidatorPipe implements PipeTransform {
    transform(value: any, metadata: ArgumentMetadata): any;
}
export declare class createChatMessageValidatorPipe implements PipeTransform {
    private readonly prisma;
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
export declare class getChatMessagesValidatorPipe implements PipeTransform {
    private readonly prisma;
    transform(value: any, metadata: ArgumentMetadata): Promise<any>;
}
