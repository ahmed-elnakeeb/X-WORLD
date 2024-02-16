"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatRequestsService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
const enum_1 = require("../types/enum");
let ChatRequestsService = class ChatRequestsService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    responses() { return config_service_1.ConfigService.get('responses'); }
    currentUser() { return config_service_1.ConfigService.get('currentUser'); }
    async create(createChatRequestDto) {
        const { id } = this.currentUser();
        const tweet = await this.prisma.tweet.findUnique({
            where: { tweet_uuid: createChatRequestDto.tweet_uuid },
            include: {
                Chat_requests: {
                    where: { from_user: id },
                    select: { uuid: true, status: true }
                }
            }
        });
        if (!tweet)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        if (tweet.user_id === id)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.BAD_REQUEST, [], this.responses().chats.canNotChatYourSelf), common_1.HttpStatus.OK);
        if (tweet.Chat_requests.length) {
            const requestStatus = this.responses().chats.status[tweet.Chat_requests[0].status];
            const message = this.responses().chats.alreadySent.replace('{{status}}', requestStatus);
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.BAD_REQUEST, tweet.Chat_requests[0], message), common_1.HttpStatus.OK);
        }
        const request = {
            tweet_uuid: createChatRequestDto.tweet_uuid,
            from_user: id,
            to_user: tweet.user_id
        };
        await this.prisma.chat_requests.create({ data: request });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, [], this.responses().chats.requestSent);
    }
    async getAllrequestsToCurrentUser() {
        const { id } = this.currentUser();
        const requests = await this.prisma.chat_requests.findMany({
            where: { to_user: id },
            select: {
                uuid: true,
                tweet_uuid: true,
                status: true
            }
        });
        if (!requests)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, requests, '');
    }
    async getAllrequestsFromCurrentUser() {
        const { id } = this.currentUser();
        const requests = await this.prisma.chat_requests.findMany({
            where: { from_user: id },
            select: {
                uuid: true,
                tweet_uuid: true,
                status: true
            }
        });
        if (!requests)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, requests, '');
    }
    async getCurrentUserInbox() {
        const { id } = this.currentUser();
        const requests = await this.prisma.chat_requests.findMany({
            where: { OR: [{ to_user: id }, { from_user: id }], AND: { status: enum_1.Chat_requests_status.ACCEPTED } },
            select: {
                uuid: true,
                tweet_uuid: true,
                status: true
            }
        });
        if (!requests)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, requests, '');
    }
    async responed(request_uuid, isAccepted) {
        const { id } = this.currentUser();
        const request = await this.prisma.chat_requests.findUnique({
            where: { uuid: request_uuid },
        });
        if (!request)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        if (request.to_user !== id)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.unauthorized), common_1.HttpStatus.OK);
        if (request.status !== enum_1.Chat_requests_status.PENDING)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().chats.youAlreadyRespondedToThisRequest), common_1.HttpStatus.OK);
        await this.prisma.chat_requests.update({
            where: { uuid: request_uuid },
            data: {
                status: (isAccepted) ? enum_1.Chat_requests_status.ACCEPTED : enum_1.Chat_requests_status.REJECTED,
                updated_at: new Date()
            }
        });
        const message = (isAccepted) ? this.responses().chats.requestAccepted : this.responses().chats.requestRejected;
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, [], message);
    }
};
exports.ChatRequestsService = ChatRequestsService;
exports.ChatRequestsService = ChatRequestsService = __decorate([
    (0, common_1.Injectable)()
], ChatRequestsService);
//# sourceMappingURL=chat-requests.service.js.map