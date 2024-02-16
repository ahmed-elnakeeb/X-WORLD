"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getChatMessagesValidatorPipe = exports.createChatMessageValidatorPipe = exports.updateChatReqValidatorPipe = exports.creatChatReqValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
const chat_schema_1 = require("../validations/chat.schema");
const utils_1 = require("../utils/utils");
const enum_1 = require("../types/enum");
const config_service_1 = require("../config/config.service");
const client_1 = require("@prisma/client");
let creatChatReqValidatorPipe = class creatChatReqValidatorPipe {
    transform(value, metadata) {
        const messages = config_service_1.ConfigService.get('responses');
        const { error, value: validatedValue } = chat_schema_1.createChatRequestSchema.validate(value, { abortEarly: true });
        if (error) {
            const errorMsg = messages.general[error.message] || error.message;
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(400, [], errorMsg), common_1.HttpStatus.OK);
        }
        return validatedValue;
    }
};
exports.creatChatReqValidatorPipe = creatChatReqValidatorPipe;
exports.creatChatReqValidatorPipe = creatChatReqValidatorPipe = __decorate([
    (0, common_1.Injectable)()
], creatChatReqValidatorPipe);
class updateChatReqValidatorPipe {
    transform(value, metadata) {
        const messages = config_service_1.ConfigService.get('responses');
        const { error, value: validatedValue } = chat_schema_1.createChatRequestSchema.validate(value, { abortEarly: true });
        if (error) {
            const errorMsg = messages.general[error.message] || error.message;
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(400, [], errorMsg), common_1.HttpStatus.OK);
        }
        return validatedValue;
    }
}
exports.updateChatReqValidatorPipe = updateChatReqValidatorPipe;
class createChatMessageValidatorPipe {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async transform(value, metadata) {
        const messages = config_service_1.ConfigService.get('responses');
        const currentUser = config_service_1.ConfigService.get('currentUser');
        const { error, value: validatedValue } = chat_schema_1.createChatMessageSchema.validate(value, { abortEarly: true });
        if (error) {
            const errorMsg = messages.chats[error.message] || error.message;
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(400, [], errorMsg), common_1.HttpStatus.OK);
        }
        await vaslidateChatAccess(value.chat_uuid);
        return validatedValue;
    }
}
exports.createChatMessageValidatorPipe = createChatMessageValidatorPipe;
class getChatMessagesValidatorPipe {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    async transform(value, metadata) {
        await vaslidateChatAccess(value);
        return value;
    }
}
exports.getChatMessagesValidatorPipe = getChatMessagesValidatorPipe;
async function vaslidateChatAccess(chat_uuid) {
    const prisma = new client_1.PrismaClient();
    const messages = config_service_1.ConfigService.get('responses');
    const currentUser = config_service_1.ConfigService.get('currentUser');
    const chatThred = await prisma.chat_requests.findUnique({ where: { uuid: chat_uuid } });
    if (!chatThred)
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], messages.chats.invalidId), common_1.HttpStatus.OK);
    if (!(chatThred.status === enum_1.Chat_requests_status.ACCEPTED))
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.FORBIDDEN, [], messages.chats.chatNotAccepted.replace('{{status}}', messages.chats.status[chatThred.status])), common_1.HttpStatus.OK);
    if ((currentUser.id !== chatThred.from_user && currentUser.id !== chatThred.to_user))
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.FORBIDDEN, [], messages.chats.cantAccessThisChat), common_1.HttpStatus.OK);
}
//# sourceMappingURL=chats.validation.pipe.js.map