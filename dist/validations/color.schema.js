"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colorSchema = void 0;
const Joi = require("joi");
exports.colorSchema = Joi.object({
    name: Joi.string().regex(/^[a-zA-Z _-]{2,50}$/).required().messages({
        "string.base": "invalidName",
        "string.empty": "invalidName",
        "string.pattern.base": "invalidName",
        "any.empty": "invalidName",
        "any.required": "invalidName"
    }),
    hexCode: Joi.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).required().messages({
        "string.base": "invalidHexCode",
        "string.empty": "invalidHexCode",
        "string.pattern.base": "invalidHexCode",
        "any.empty": "invalidHexCode",
        "any.required": "invalidHexCode"
    })
});
//# sourceMappingURL=color.schema.js.map