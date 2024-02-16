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
exports.TweetController = void 0;
const common_1 = require("@nestjs/common");
const tweet_service_1 = require("./tweet.service");
const create_tweet_dto_1 = require("./dto/create-tweet.dto");
const boost_tweet_dto_1 = require("./dto/boost-tweet.dto");
const tweet_validation_pipe_1 = require("../pipes/tweet.validation.pipe");
const Id_validation_pipe_1 = require("../pipes/Id.validation.pipe");
const general_validation_pipe_1 = require("../pipes/general.validation.pipe");
let TweetController = class TweetController {
    constructor(tweetService) {
        this.tweetService = tweetService;
    }
    create(createTweetDto) {
        return this.tweetService.create(createTweetDto);
    }
    findAll(pageNo, pageSize) {
        pageNo = (pageNo > 0) ? pageNo : 1;
        pageSize = (pageSize > 0) ? pageSize : 10;
        return this.tweetService.findAll(pageNo, pageSize);
    }
    currentUserTweets(pageNo, pageSize) {
        pageNo = (pageNo > 0) ? pageNo : 0;
        pageSize = (pageSize > 0) ? pageSize : 10;
        return this.tweetService.currentUserTweets(pageNo, pageSize);
    }
    findOne(uuid) {
        return this.tweetService.findOne(uuid);
    }
    remove(uuid) {
        return this.tweetService.remove(uuid);
    }
    boost(boostTweetDto) {
        return this.tweetService.boost(boostTweetDto);
    }
    getTweetComments(tweet_uuid, pageNo, pageSize) {
        pageNo = (pageNo > 0) ? pageNo : 0;
        pageSize = (pageSize > 0) ? pageSize : 10;
        return this.tweetService.getTweetComments(tweet_uuid, pageNo, pageSize);
    }
    tweetVoteUp(tweet_uuid) {
        return this.tweetService.tweetVote(tweet_uuid, true);
    }
    tweetVoteDown(tweet_uuid) {
        return this.tweetService.tweetVote(tweet_uuid, false);
    }
};
exports.TweetController = TweetController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(tweet_validation_pipe_1.TweetValidatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_tweet_dto_1.CreateTweetDto]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('pageNo', general_validation_pipe_1.PageNoValidationPipe)),
    __param(1, (0, common_1.Query)('pageSize', general_validation_pipe_1.PageSizeValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('current/user'),
    __param(0, (0, common_1.Query)('pageNo', general_validation_pipe_1.PageNoValidationPipe)),
    __param(1, (0, common_1.Query)('pageSize', general_validation_pipe_1.PageSizeValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "currentUserTweets", null);
__decorate([
    (0, common_1.Get)(':uuid'),
    __param(0, (0, common_1.Param)('uuid', Id_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "findOne", null);
__decorate([
    (0, common_1.Delete)(':uuid'),
    __param(0, (0, common_1.Param)('uuid', Id_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "remove", null);
__decorate([
    (0, common_1.Put)('boost'),
    __param(0, (0, common_1.Body)(tweet_validation_pipe_1.TweetBoostsValidatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [boost_tweet_dto_1.BoostTweetDto]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "boost", null);
__decorate([
    (0, common_1.Get)(':tweet_uuid/comments'),
    __param(0, (0, common_1.Param)('tweet_uuid', Id_validation_pipe_1.UUIDValidationPipe)),
    __param(1, (0, common_1.Query)('pageNo', general_validation_pipe_1.PageNoValidationPipe)),
    __param(2, (0, common_1.Query)('pageSize', general_validation_pipe_1.PageSizeValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Number]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "getTweetComments", null);
__decorate([
    (0, common_1.Put)(':tweet_uuid/vote/up'),
    __param(0, (0, common_1.Param)('tweet_uuid', Id_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "tweetVoteUp", null);
__decorate([
    (0, common_1.Put)(':tweet_uuid/vote/down'),
    __param(0, (0, common_1.Param)('tweet_uuid', Id_validation_pipe_1.UUIDValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TweetController.prototype, "tweetVoteDown", null);
exports.TweetController = TweetController = __decorate([
    (0, common_1.Controller)('tweet'),
    __metadata("design:paramtypes", [tweet_service_1.TweetService])
], TweetController);
//# sourceMappingURL=tweet.controller.js.map