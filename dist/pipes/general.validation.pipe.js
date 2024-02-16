"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PageSizeValidationPipe = exports.PageNoValidationPipe = void 0;
const common_1 = require("@nestjs/common");
const general_validation_1 = require("../validations/general.validation");
const utils_1 = require("../utils/utils");
let PageNoValidationPipe = class PageNoValidationPipe {
    transform(value, metadata) {
        const { error, value: validatedValue } = general_validation_1.pageNoSchema.validate(value, { abortEarly: true });
        if (error) {
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(400, [], error.message), common_1.HttpStatus.OK);
        }
        return validatedValue;
    }
};
exports.PageNoValidationPipe = PageNoValidationPipe;
exports.PageNoValidationPipe = PageNoValidationPipe = __decorate([
    (0, common_1.Injectable)()
], PageNoValidationPipe);
class PageSizeValidationPipe {
    transform(value, metadata) {
        const { error, value: validatedValue } = general_validation_1.pageSizeSchema.validate(value, { abortEarly: true });
        if (error) {
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(400, [], error.message), common_1.HttpStatus.OK);
        }
        return validatedValue;
    }
}
exports.PageSizeValidationPipe = PageSizeValidationPipe;
//# sourceMappingURL=general.validation.pipe.js.map