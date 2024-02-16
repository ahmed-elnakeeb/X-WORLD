"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
const enum_1 = require("../types/enum");
const notification_service_1 = require("../notification/notification.service");
let CommentService = class CommentService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.notificationService = new notification_service_1.NotificationService();
    }
    responses() { return config_service_1.ConfigService.get('responses'); }
    currentUser() { return config_service_1.ConfigService.get('currentUser'); }
    async create(createCommentDto) {
        const tweet = await this.prisma.tweet.findUnique({
            where: { tweet_uuid: createCommentDto.tweet_uuid },
            include: {
                comments: {
                    select: { user_uuid: true }
                }
            }
        });
        if (!tweet)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        if (createCommentDto.file_uuid) {
            const file = await this.prisma.file.findUnique({ where: { uuid: createCommentDto.file_uuid } });
            if (!file)
                throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.BAD_REQUEST, [], this.responses().comments.invalidFileId), common_1.HttpStatus.OK);
        }
        const commentData = { ...createCommentDto, user_uuid: this.currentUser().id };
        await this.prisma.comment.create({ data: commentData });
        const totalCommentCount = tweet.comments.length + 1;
        if ((0, utils_1.isMultipleOfTen)(totalCommentCount))
            await this.sendCommetsNotification(tweet, totalCommentCount);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, createCommentDto, this.responses().tweets.commentCreated);
    }
    async vote(comment_uuid, is_voteUp) {
        const comment = await this.prisma.comment.findUnique({ where: { comment_uuid } });
        if (!comment)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        const user_uuid = this.currentUser().id;
        const vote = {
            comment_uuid,
            user_uuid: this.currentUser().id,
            is_voteUp: is_voteUp
        };
        await this.prisma.comment_votes.upsert({
            where: {
                userId_commentId_key: {
                    user_uuid,
                    comment_uuid
                }
            },
            create: vote,
            update: {
                is_voteUp
            }
        });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, [], this.responses().tweets.voted);
    }
    async remove(comment_uuid) {
        const comment = await this.prisma.comment.findUnique({ where: { comment_uuid } });
        if (!comment)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        const { id, role } = this.currentUser();
        if (id !== comment.user_uuid && role !== enum_1.AccessLevels.ADMIN)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().general.unauthorized), common_1.HttpStatus.OK);
        await this.prisma.comment.delete({ where: { comment_uuid } });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, comment, this.responses().tweets.commentDeleted);
    }
    async sendCommetsNotification(tweet, totalCommentsCount) {
        const notification = {
            type: enum_1.Notification_types.COMMENT,
            for_user_uuid: tweet.user_id,
            tweet_uuid: tweet.tweet_uuid,
            text: this.responses().notifications.commentText.replace('{{editable}}', totalCommentsCount),
        };
        await this.notificationService.create(notification);
        return true;
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)()
], CommentService);
//# sourceMappingURL=comment.service.js.map