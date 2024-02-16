"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.pageSizeSchema = exports.pageNoSchema = exports.deviceIdSchema = exports.uuidSchema = exports.idSchema = void 0;
const Joi = require("joi");
exports.idSchema = Joi.number().min(1).max(10000000).required().messages({
    "number.base": "invalidId",
    "number.min": "invalidId",
    "number.max": "invalidId",
    "any.required": "invalidId"
});
exports.uuidSchema = Joi.string().uuid().required().messages({
    "string.base": "invalidId",
    "string.empty": "invalidId",
    "string.pattern": "invalidId",
    "string.any": "invalidId",
    "string.guid": "invalidId",
    "any.required": "invalidId"
});
exports.deviceIdSchema = Joi.string().min(5).max(50).required()
    .messages({
    "string.pattern.base": "invalidDeviceId",
    "any.required": "deviceIdRequried",
    "any.empty": "deviceIdRequried",
    "string.min": "invalidDeviceId",
    "string.max": "invalidDeviceId",
});
exports.pageNoSchema = Joi.number().min(0).optional().default(0);
exports.pageSizeSchema = Joi.number().min(0).optional().default(10);
//# sourceMappingURL=general.validation.js.map