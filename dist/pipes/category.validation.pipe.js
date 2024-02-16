"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CtegoriesValidatorPipe = void 0;
const common_1 = require("@nestjs/common");
const category_schema_1 = require("../validations/category.schema");
const utils_1 = require("../utils/utils");
const config_service_1 = require("../config/config.service");
let CtegoriesValidatorPipe = class CtegoriesValidatorPipe {
    transform(value, metadata) {
        const messages = config_service_1.ConfigService.get('responses');
        const { error, value: validatedValue } = category_schema_1.categorySchema.validate(value, { abortEarly: true });
        if (error) {
            const errorMsg = messages.categories[error.message] || error.message;
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(400, [], errorMsg), common_1.HttpStatus.OK);
        }
        return validatedValue;
    }
};
exports.CtegoriesValidatorPipe = CtegoriesValidatorPipe;
exports.CtegoriesValidatorPipe = CtegoriesValidatorPipe = __decorate([
    (0, common_1.Injectable)()
], CtegoriesValidatorPipe);
//# sourceMappingURL=category.validation.pipe.js.map