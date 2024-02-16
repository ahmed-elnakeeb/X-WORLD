"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.categorySchema = void 0;
const Joi = require("joi");
exports.categorySchema = Joi.object({
    title_ar: Joi.string().regex(/^[ء-ي ]{5,255}$/).required()
        .messages({
        "string.pattern.base": "invalidArTitle",
        "string.empty": "invalidArTitle",
        "any.required": "fieldArRequried",
    }),
    title_en: Joi.string().regex(/^[a-zA-Z ]{5,255}$/).required().messages({
        "string.pattern.base": "invalidEnTitle",
        "string.empty": "invalidEnTitle",
        "any.required": "fieldErRequried",
    }),
});
//# sourceMappingURL=category.schema.js.map