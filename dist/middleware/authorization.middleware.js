"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authorization = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
const enum_1 = require("../types/enum");
let Authorization = class Authorization {
    responses() {
        return config_service_1.ConfigService.get('responses');
    }
    use(req, res, next) {
        const user = config_service_1.ConfigService.get('currentUser');
        if (!user)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().users.InvalidToken), common_1.HttpStatus.OK);
        if (user.role !== enum_1.AccessLevels.ADMIN) {
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().general.unauthorized), common_1.HttpStatus.OK);
        }
        next();
    }
};
exports.Authorization = Authorization;
exports.Authorization = Authorization = __decorate([
    (0, common_1.Injectable)()
], Authorization);
//# sourceMappingURL=authorization.middleware.js.map