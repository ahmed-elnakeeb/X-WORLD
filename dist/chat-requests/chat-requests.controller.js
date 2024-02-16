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
exports.ChatRequestsController = void 0;
const common_1 = require("@nestjs/common");
const chat_requests_service_1 = require("./chat-requests.service");
const create_chat_request_dto_1 = require("./dto/create-chat-request.dto");
const Id_validation_pipe_1 = require("../pipes/Id.validation.pipe");
const chats_validation_pipe_1 = require("../pipes/chats.validation.pipe");
let ChatRequestsController = class ChatRequestsController {
    constructor(chatRequestsService) {
        this.chatRequestsService = chatRequestsService;
    }
    create(createChatRequestDto) {
        return this.chatRequestsService.create(createChatRequestDto);
    }
    getAllrequestsToCurrentUser() {
        return this.chatRequestsService.getAllrequestsToCurrentUser();
    }
    getAllrequestsFromCurrentUser() {
        return this.chatRequestsService.getAllrequestsFromCurrentUser();
    }
    getCurrentUserInbox() {
        return this.chatRequestsService.getCurrentUserInbox();
    }
    acceptReqiest(request_uuid) {
        return this.chatRequestsService.responed(request_uuid, true);
    }
    rejectReqiest(request_uuid) {
        return this.chatRequestsService.responed(request_uuid, false);
    }
};
exports.ChatRequestsController = ChatRequestsController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(chats_validation_pipe_1.creatChatReqValidatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_chat_request_dto_1.CreateChatRequestDto]),
    __metadata("design:returntype", void 0)
], ChatRequestsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('to-me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatRequestsController.prototype, "getAllrequestsToCurrentUser", null);
__decorate([
    (0, common_1.Get)('from-me'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatRequestsController.prototype, "getAllrequestsFromCurrentUser", null);
__decorate([
    (0, common_1.Get)('inbox'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ChatRequestsController.prototype, "getCurrentUserInbox", null);
__decorate([
    (0, common_1.Patch)(':request_uuid/accept'),
    __param(0, (0, common_1.Param)('request_uuid', Id_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatRequestsController.prototype, "acceptReqiest", null);
__decorate([
    (0, common_1.Patch)(':request_uuid/reject'),
    __param(0, (0, common_1.Param)('request_uuid', Id_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ChatRequestsController.prototype, "rejectReqiest", null);
exports.ChatRequestsController = ChatRequestsController = __decorate([
    (0, common_1.Controller)('chat/request'),
    __metadata("design:paramtypes", [chat_requests_service_1.ChatRequestsService])
], ChatRequestsController);
//# sourceMappingURL=chat-requests.controller.js.map