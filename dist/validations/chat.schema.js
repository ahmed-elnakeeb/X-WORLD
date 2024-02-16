"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createChatMessageSchema = exports.updateChatRequestSchema = exports.createChatRequestSchema = void 0;
const Joi = require("joi");
const general_validation_1 = require("./general.validation");
const enum_1 = require("../types/enum");
exports.createChatRequestSchema = Joi.object({ tweet_uuid: general_validation_1.uuidSchema });
exports.updateChatRequestSchema = Joi.object({
    chat_request_id: general_validation_1.uuidSchema,
    status: Joi.string().valid(...Object.values(enum_1.Chat_requests_status)).required()
        .messages({
        "string.pattern.base": "invalidGender",
        "any.required": "GenderRequried",
        "any.only": "invalidGender",
    }),
});
exports.createChatMessageSchema = Joi.object({
    chat_uuid: general_validation_1.uuidSchema,
    message: Joi.string().allow('').min(1).max(255).optional().messages({
        "string.base": "invalidMessageText",
        "string.pattern.base": "invalidMessageText",
        "string.empty": "invalidMessageText",
        "string.min": "invalidMessageText",
        "string.max": "invalidMessageText"
    }),
    file_uuid: Joi.string().uuid().allow('').optional().messages({
        "string.base": "invalidFileId",
        "string.empty": "invalidFileId",
        "string.any": "invalidFileId",
        "string.guid": "invalidFileId",
        "any.required": "invalidFileId"
    })
}).xor('message', 'file_uuid').messages({
    "object.xor": "textOrFileRequried",
    "object.missing": "textOrFileRequried",
});
//# sourceMappingURL=chat.schema.js.map