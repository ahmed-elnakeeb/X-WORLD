import { TweetService } from './tweet.service';
import { CreateTweetDto } from './dto/create-tweet.dto';
import { BoostTweetDto } from './dto/boost-tweet.dto';
export declare class TweetController {
    private readonly tweetService;
    constructor(tweetService: TweetService);
    create(createTweetDto: CreateTweetDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    findAll(pageNo: number, pageSize: number): Promise<void>;
    currentUserTweets(pageNo: number, pageSize: number): Promise<void>;
    findOne(uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    remove(uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    boost(boostTweetDto: BoostTweetDto): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    getTweetComments(tweet_uuid: string, pageNo: number, pageSize: number): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    tweetVoteUp(tweet_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
    tweetVoteDown(tweet_uuid: string): Promise<{
        status: number;
        data: object | any[];
        msg: string;
    }>;
}
