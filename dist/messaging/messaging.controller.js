"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessagingController = void 0;
const common_1 = require("@nestjs/common");
const messaging_service_1 = require("./messaging.service");
const create_messaging_dto_1 = require("./dto/create-messaging.dto");
const chats_validation_pipe_1 = require("../pipes/chats.validation.pipe");
let MessagingController = class MessagingController {
    constructor(messagingService) {
        this.messagingService = messagingService;
    }
    create(createMessagingDto) {
        return this.messagingService.create(createMessagingDto);
    }
    getChatMessages(id) {
        return this.messagingService.getChatMessages(id);
    }
};
exports.MessagingController = MessagingController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(chats_validation_pipe_1.createChatMessageValidatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_messaging_dto_1.CreateMessagingDto]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id/messages'),
    __param(0, (0, common_1.Param)('id', chats_validation_pipe_1.getChatMessagesValidatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], MessagingController.prototype, "getChatMessages", null);
exports.MessagingController = MessagingController = __decorate([
    (0, common_1.Controller)('messaging'),
    __metadata("design:paramtypes", [messaging_service_1.MessagingService])
], MessagingController);
//# sourceMappingURL=messaging.controller.js.map