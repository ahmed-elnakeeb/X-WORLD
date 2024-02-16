import { CreateTweetDto } from './dto/create-tweet.dto';
import { BoostTweetDto } from './dto/boost-tweet.dto';
import { Tweet } from '@prisma/client';
export declare class TweetService {
    private readonly prisma;
    private responses;
    private currentUser;
    private currentUserFullData;
    private notificationService;
    private readonly fileUploadService;
    create(createTweetDto: CreateTweetDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    findAll(pageNo?: number, pageSize?: number): Promise<void>;
    currentUserTweets(pageNo?: number, pageSize?: number): Promise<void>;
    findOne(tweet_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    remove(tweet_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    boost(boostTweetDto: BoostTweetDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    getTweetComments(tweet_uuid: string, pageNo?: number, pageSize?: number): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    tweetVote(tweet_uuid: string, is_voteUp: boolean): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    sendVoteNotification(tweet: Tweet, totalVoteUpCount: number): Promise<boolean>;
    private wipeTweet;
    private autoDeleteTweet;
}
