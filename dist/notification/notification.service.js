"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
let NotificationService = class NotificationService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.notificationRepo = this.prisma.notification;
    }
    responses() { return config_service_1.ConfigService.get('responses'); }
    currentUser() { return config_service_1.ConfigService.get('currentUser'); }
    async create(createNotificationDto) {
        await this.prisma.notification.create({ data: createNotificationDto });
        return true;
    }
    async findAll() {
        const { id } = this.currentUser();
        const notifications = await this.prisma.notification.findMany({
            where: { for_user_uuid: id },
            select: {
                uuid: true,
                tweet_uuid: true,
                from_user_uuid: true,
                chat_uuid: true,
                text: true,
                read: true
            }
        });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, notifications, '');
    }
    async markAsRead(uuid) {
        const notification = await this.notificationRepo.findUnique({ where: { uuid } });
        if (!notification)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], ''), common_1.HttpStatus.OK);
        await this.notificationRepo.update({
            where: { uuid },
            data: { read: true, updated_at: new Date() }
        });
        return true;
    }
};
exports.NotificationService = NotificationService;
exports.NotificationService = NotificationService = __decorate([
    (0, common_1.Injectable)()
], NotificationService);
//# sourceMappingURL=notification.service.js.map