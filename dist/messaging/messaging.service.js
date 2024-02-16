"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
let MessagingService = class MessagingService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    responses() { return config_service_1.ConfigService.get('responses'); }
    async create(createMessagingDto) {
        await this.prisma.message.create({ data: createMessagingDto });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, createMessagingDto, this.responses().chats.messageSent);
    }
    async getChatMessages(id) {
        const messages = await this.prisma.message.findMany({
            where: { chat_uuid: id },
            select: {
                uuid: true,
                message: true,
                created_at: true,
                file: {
                    select: {
                        url: true,
                    }
                }
            },
            orderBy: { created_at: 'desc' },
        });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, messages);
    }
};
exports.MessagingService = MessagingService;
exports.MessagingService = MessagingService = __decorate([
    (0, common_1.Injectable)()
], MessagingService);
//# sourceMappingURL=messaging.service.js.map