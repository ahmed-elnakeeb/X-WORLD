"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.creatCommentSchema = exports.tweetBoostsSchema = exports.tweetSchema = void 0;
const Joi = require("joi");
const fileIdSchema = Joi.string().uuid().allow('').optional().messages({
    "string.base": "invalidFileId",
    "string.empty": "invalidFileId",
    "string.any": "invalidFileId",
    "string.guid": "invalidFileId",
    "any.required": "invalidFileId"
});
const textSchema = Joi.string().allow('').min(3).max(255).optional().messages({
    "string.base": "invalidTweetText",
    "string.pattern.base": "invalidTweetText",
    "string.empty": "invalidTweetText",
    "string.min": "invalidTweetText",
    "string.max": "invalidTweetText"
});
const countrySchema = Joi.string().min(3).max(70).required().messages({
    "string.base": "invalidCountryName",
    "string.any": "invalidCountryName",
    "string.min": "invalidCountryName",
    "string.max": "invalidCountryName",
    "string.empty": "invalidCountryName",
    "any.required": "countryNameRequried"
});
const longitudeSchema = Joi.number().min(-180).max(180).required().messages({
    "number.base": "invalidLongitude",
    "number.any": "invalidLongitude",
    "number.min": "invalidLongitude",
    "number.max": "invalidLongitude",
    "any.required": "longitudeRequried"
});
const latitudeSchema = Joi.number().min(-90).max(90).required().messages({
    "number.base": "invalidLatitude",
    "number.any": "invalidLatitude",
    "number.min": "invalidLatitude",
    "number.max": "invalidLatitude",
    "any.required": "latitudeRequried"
});
const tweetIdSchema = Joi.string().uuid().required().messages({
    "string.base": "invalidTweetId",
    "string.empty": "invalidTweetId",
    "string.any": "invalidTweetId",
    "string.guid": "invalidTweetId",
    "any.required": "invalidTweetId"
});
exports.tweetSchema = Joi.object({
    text: textSchema,
    file_uuid: fileIdSchema,
    country: countrySchema,
    longitude: longitudeSchema,
    latitude: latitudeSchema,
    color_id: Joi.number().min(1).max(1000).required().messages({
        "number.base": "invalidColorId",
        "number.min": "invalidColorId",
        "number.max": "invalidColorId",
        "any.required": "colorIdRequried"
    }),
}).xor('text', 'file_uuid').messages({
    "object.xor": "textOrFileRequried",
    "object.missing": "textOrFileRequried",
});
exports.tweetBoostsSchema = Joi.object({
    tweet_uuid: tweetIdSchema,
    boost_count: Joi.number().min(1).max(1000).required().messages({
        "number.base": "invalidBoostsCount",
        "number.min": "invalidBoostsCount",
        "number.max": "invalidBoostsCount",
        "any.required": "invalidBoostsCount"
    }),
});
exports.creatCommentSchema = Joi.object({
    tweet_uuid: tweetIdSchema,
    text: textSchema,
    file_uuid: fileIdSchema,
    country: countrySchema,
    longitude: longitudeSchema,
    latitude: latitudeSchema,
}).xor('text', 'file_uuid').messages({
    "object.xor": "textOrFileRequried",
    "object.missing": "textOrFileRequried",
});
//# sourceMappingURL=tweet.schema.js.map