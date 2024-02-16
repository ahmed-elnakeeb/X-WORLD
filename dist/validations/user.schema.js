"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginSchema = exports.createUserSchema = void 0;
const Joi = require("joi");
const enum_1 = require("../types/enum");
const device_id = Joi.string().min(5).max(50).required()
    .messages({
    "string.pattern.base": "invalidDeviceId",
    "any.required": "deviceIdRequried",
    "string.min": "invalidDeviceId",
    "string.max": "invalidDeviceId",
});
const fcm_id = Joi.string().pattern(/^[\d\w:+=!@-]{70,300}$/i).required()
    .messages({
    "string.pattern.base": "invalidFCMId",
    "string.pattern": "invalidFCMId",
    "any.required": "invalidFCMId",
    "string.min": "invalidFCMId",
    "string.max": "invalidFCMId",
});
exports.createUserSchema = Joi.object({
    device_id,
    fcm_id: Joi.string().min(1).max(100).required(),
    gender: Joi.string().valid(...Object.values(enum_1.Gender)).required()
        .messages({
        "string.pattern.base": "invalidGender",
        "any.required": "GenderRequried",
        "any.only": "invalidGender",
    }),
    category_id: Joi.number().min(1).max(1000000).required()
        .messages({
        "number.base": "invalidCategoryId",
        "any.required": "CategoryIdRequried",
        "number.min": "invalidCategoryId",
        "number.max": "invalidCategoryId",
    }),
    age: Joi.number().min(7).max(100).required()
        .messages({
        "number.base": "invalidAge",
        "any.required": "AgeRequried",
        "number.min": "invalidAge",
        "number.max": "invalidAge",
    })
});
exports.loginSchema = Joi.object({
    device_id,
    fcm_id: Joi.any().required()
});
//# sourceMappingURL=user.schema.js.map