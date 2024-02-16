"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authentication = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = require("jsonwebtoken");
let Authentication = class Authentication {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    responses() {
        return config_service_1.ConfigService.get('responses');
    }
    async use(req, res, next) {
        const token = req.headers.authorization?.replace('Bearer ', '');
        if (!token)
            return res.status(200).send((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().users.InvalidToken));
        try {
            const decoded = (0, jsonwebtoken_1.verify)(token, config_service_1.ConfigService.jwtSecret);
            if (!decoded)
                return res.status(200).send((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().users.InvalidToken));
            const user_id = decoded.id || null;
            if (user_id == null)
                return res.status(200).send((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().users.InvalidToken));
            const user = await this.prisma.user.findUnique({ where: { uuid: user_id } });
            if (!user)
                return res.status(200).send((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().users.InvalidToken));
            if (user.is_deleted)
                return res.status(200).send((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().users.InvalidToken));
            if (user.is_banned)
                return res.status(200).send((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().users.userBanned.replace('{{end_ban_date}}', user.ban_end_in)));
            config_service_1.ConfigService.set('currentUser', decoded);
            config_service_1.ConfigService.set('currentUserFullData', user);
            next();
        }
        catch (error) {
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, [], this.responses().general.unauthorized), common_1.HttpStatus.OK);
        }
    }
};
exports.Authentication = Authentication;
exports.Authentication = Authentication = __decorate([
    (0, common_1.Injectable)()
], Authentication);
//# sourceMappingURL=authentication.middleware.js.map