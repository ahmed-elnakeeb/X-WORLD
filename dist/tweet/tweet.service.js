"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
const enum_1 = require("../types/enum");
const notification_service_1 = require("../notification/notification.service");
const file_upload_service_1 = require("../file-upload/file-upload.service");
let TweetService = class TweetService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.notificationService = new notification_service_1.NotificationService();
        this.fileUploadService = new file_upload_service_1.FileUploadService();
    }
    responses() { return config_service_1.ConfigService.get('responses'); }
    currentUser() { return config_service_1.ConfigService.get('currentUser'); }
    currentUserFullData() { return config_service_1.ConfigService.get('currentUserFullData'); }
    async create(createTweetDto) {
        const color = await this.prisma.color.findUnique({ where: { id: createTweetDto.color_id } });
        if (!color)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.BAD_REQUEST, [], this.responses().general.invalidColorId), common_1.HttpStatus.OK);
        if (createTweetDto.file_uuid) {
            const file = await this.prisma.file.findUnique({ where: { uuid: createTweetDto.file_uuid } });
            if (!file)
                throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.BAD_REQUEST, [], this.responses().tweets.invalidFileId), common_1.HttpStatus.OK);
        }
        const currentUser = config_service_1.ConfigService.get('currentUser');
        createTweetDto.user_id = currentUser.id;
        await this.prisma.tweet.create({ data: createTweetDto });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, createTweetDto, this.responses().tweets.tweetCreated);
    }
    async findAll(pageNo = 0, pageSize = 10) {
        pageNo = (pageNo < 1) ? 0 : pageNo - 1;
        pageSize = (pageSize < 1) ? 10 : pageSize;
        const skip = pageNo * pageSize;
        const tweets = await this.prisma.tweet.findMany({
            skip,
            take: pageSize,
            select: {
                id: true,
                tweet_uuid: true,
                user_id: true,
                file_uuid: true,
                text: true,
                country: true,
                latitude: true,
                longitude: true,
                is_boosted: true,
                boosted_till: true,
                created_at: true,
                Tweet_votes: {
                    select: {
                        user_uuid: true,
                        is_voteUp: true
                    },
                },
                Color: {
                    select: {
                        id: true,
                        hexCode: true
                    }
                },
            },
            orderBy: [
                { admin_pin: 'desc' },
                { is_boosted: 'desc' },
                { created_at: 'desc' }
            ]
        });
        if (!tweets.length)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, tweets, ''), common_1.HttpStatus.OK);
    }
    async currentUserTweets(pageNo = 0, pageSize = 10) {
        pageNo = (pageNo < 1) ? 0 : pageNo - 1;
        pageSize = (pageSize < 1) ? 10 : pageSize;
        const skip = pageNo * pageSize;
        const { id } = this.currentUser();
        const tweets = await this.prisma.tweet.findMany({
            skip,
            take: pageSize,
            where: { user_id: id },
            select: {
                id: true,
                tweet_uuid: true,
                user_id: true,
                file_uuid: true,
                text: true,
                country: true,
                latitude: true,
                longitude: true,
                is_boosted: true,
                boosted_till: true,
                created_at: true,
                Tweet_votes: {
                    select: {
                        user_uuid: true,
                        is_voteUp: true
                    },
                },
                Color: {
                    select: {
                        id: true,
                        hexCode: true
                    }
                },
                file: {
                    select: {
                        url: true
                    }
                }
            },
            orderBy: [
                { is_boosted: 'desc' },
                { created_at: 'desc' }
            ]
        });
        if (!tweets.length)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, tweets, ''), common_1.HttpStatus.OK);
    }
    async findOne(tweet_uuid) {
        const tweet = await this.prisma.tweet.findUnique({
            where: { tweet_uuid },
            select: {
                id: true,
                tweet_uuid: true,
                user_id: true,
                file_uuid: true,
                text: true,
                color_id: true,
                country: true,
                latitude: true,
                longitude: true,
                is_boosted: true,
                boosted_till: true,
                created_at: true,
                Tweet_votes: {
                    select: {
                        user_uuid: true,
                        is_voteUp: true
                    },
                },
                file: {
                    select: {
                        url: true
                    }
                },
                Color: {
                    select: {
                        id: true,
                        hexCode: true
                    }
                },
                comments: {
                    select: {
                        comment_uuid: true,
                        user_uuid: true,
                        text: true,
                        file_uuid: true,
                        created_at: true,
                        Comment_votes: {
                            select: {
                                user_uuid: true,
                                is_voteUp: true
                            },
                            orderBy: {
                                created_at: 'desc'
                            }
                        },
                        file: {
                            select: {
                                url: true
                            }
                        },
                    },
                    orderBy: { created_at: 'desc' }
                },
            }
        });
        if (!tweet)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, tweet, '');
    }
    async remove(tweet_uuid) {
        const tweet = await this.prisma.tweet.findUnique({
            where: { tweet_uuid },
            include: {
                file: {
                    select: {
                        uuid: true,
                        public_id: true
                    }
                },
                comments: {
                    include: {
                        file: {
                            select: {
                                uuid: true,
                                public_id: true
                            }
                        }
                    }
                },
            },
        });
        if (!tweet)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        const { id, role } = this.currentUser();
        if (id !== tweet.user_id && role !== enum_1.AccessLevels.ADMIN)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().general.unauthorized), common_1.HttpStatus.OK);
        await this.wipeTweet(tweet);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, [], this.responses().tweets.tweetDeleted);
    }
    async boost(boostTweetDto) {
        const { tweet_uuid, boost_count } = boostTweetDto;
        const tweet = await this.prisma.tweet.findUnique({ where: { tweet_uuid } });
        if (!tweet)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        const { uuid, role, rockets } = this.currentUserFullData();
        if (role !== enum_1.AccessLevels.ADMIN) {
            const boostedTweetsCount = await this.prisma.tweet.count({ where: { is_boosted: true } });
            if (boostedTweetsCount > 2)
                throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.FORBIDDEN, [], this.responses().tweets.alreadyTwoTweetsOnBoostMode), common_1.HttpStatus.OK);
            if (boost_count > rockets)
                throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.FORBIDDEN, [], this.responses().tweets.rocketsIsNotEnough.replace('{{rockets_count}}', rockets)), common_1.HttpStatus.OK);
        }
        const currentDate = new Date();
        const toBeBoostedMints = 10 * boost_count;
        let boosted_till = new Date();
        if (tweet.boosted_till.getTime() <= currentDate.getTime()) {
            boosted_till = new Date(currentDate.getTime() + toBeBoostedMints * 60 * 1000);
        }
        else {
            boosted_till = new Date(tweet.boosted_till.getTime() + toBeBoostedMints * 60 * 1000);
        }
        const updates = {
            is_boosted: true,
            boosted_till,
            updated_at: currentDate
        };
        if (role !== enum_1.AccessLevels.ADMIN)
            await this.prisma.user.update({ where: { uuid }, data: { rockets: (rockets - boost_count), updated_at: currentDate } });
        await this.prisma.tweet.update({ where: { tweet_uuid }, data: updates });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, [], this.responses().tweets.tweetBoosted.replace('{{end_boost_date}}', boosted_till));
    }
    async getTweetComments(tweet_uuid, pageNo = 0, pageSize = 10) {
        pageNo = (pageNo < 1) ? 0 : pageNo - 1;
        pageSize = (pageSize < 1) ? 10 : pageSize;
        const skip = pageNo * pageSize;
        const comments = await this.prisma.comment.findMany({
            skip,
            take: pageSize,
            where: { tweet_uuid },
            include: {
                file: {
                    select: {
                        url: true
                    }
                }
            },
            orderBy: { created_at: 'desc' }
        });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, comments, '');
    }
    async tweetVote(tweet_uuid, is_voteUp) {
        const tweet = await this.prisma.tweet.findUnique({
            where: { tweet_uuid },
            include: {
                Tweet_votes: {
                    where: { is_voteUp: true },
                    select: { user_uuid: true }
                }
            }
        });
        if (!tweet)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        const user_uuid = this.currentUser().id;
        const vote = {
            tweet_uuid,
            user_uuid: this.currentUser().id,
            is_voteUp
        };
        await this.prisma.tweet_votes.upsert({
            where: {
                userId_tweetId_key: {
                    user_uuid,
                    tweet_uuid
                }
            },
            create: vote,
            update: {
                is_voteUp
            }
        });
        if (is_voteUp) {
            const totalVoteUpCount = tweet.Tweet_votes.length + 1;
            if ((0, utils_1.isMultipleOfTen)(totalVoteUpCount))
                await this.sendVoteNotification(tweet, totalVoteUpCount);
        }
        await this.autoDeleteTweet(tweet_uuid);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, [], this.responses().tweets.voted);
    }
    async sendVoteNotification(tweet, totalVoteUpCount) {
        const notification = {
            type: enum_1.Notification_types.VOTE,
            for_user_uuid: tweet.user_id,
            tweet_uuid: tweet.tweet_uuid,
            text: this.responses().notifications.notifications.replace('{{editable}}', totalVoteUpCount),
        };
        await this.notificationService.create(notification);
        return true;
    }
    async wipeTweet(tweet) {
        const toBeDeletedFilesFromCloud = [];
        const toBeDeletedFilesFromDB = [];
        if (tweet.file) {
            toBeDeletedFilesFromCloud.push(tweet.file.public_id);
            toBeDeletedFilesFromDB.push(tweet.file.uuid);
        }
        if (tweet.comments) {
            tweet.comments.forEach((comment) => {
                if (comment.file) {
                    toBeDeletedFilesFromCloud.push(comment.file.public_id);
                    toBeDeletedFilesFromDB.push(comment.file.uuid);
                }
            });
        }
        await this.fileUploadService.bulkDeleteFormCloud(toBeDeletedFilesFromCloud);
        await this.fileUploadService.bulkDeleteFormDB(toBeDeletedFilesFromDB);
        await this.prisma.tweet.delete({ where: { tweet_uuid: tweet.tweet_uuid } });
    }
    async autoDeleteTweet(tweet_uuid) {
        const voteCounts = await this.prisma.tweet_votes.groupBy({
            by: ['tweet_uuid', 'is_voteUp'],
            where: {
                tweet_uuid,
            },
            _count: {
                created_at: true,
            },
        });
        const voteUps = voteCounts.find((voteUp) => voteUp.is_voteUp == true)?._count.created_at ?? 0;
        const voteDowns = voteCounts.find((voteDown) => voteDown.is_voteUp == false)?._count.created_at ?? 0;
        if (voteDowns > 0) {
            const standardVoteDwonsCount = config_service_1.ConfigService.standardVoteDwonsCount;
            const standardVotesPercentage = config_service_1.ConfigService.standardVotesPercentage;
            const voteupsToVotedownsPercentage = voteUps / voteDowns;
            if (voteupsToVotedownsPercentage < standardVotesPercentage && voteupsToVotedownsPercentage != 0 || voteUps == 0 && voteDowns > standardVoteDwonsCount) {
            }
        }
    }
};
exports.TweetService = TweetService;
exports.TweetService = TweetService = __decorate([
    (0, common_1.Injectable)()
], TweetService);
//# sourceMappingURL=tweet.service.js.map