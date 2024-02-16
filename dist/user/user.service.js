"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
let UserService = class UserService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    responses() { return config_service_1.ConfigService.get('responses'); }
    currentUser() { return config_service_1.ConfigService.get('currentUser'); }
    async findAll() {
        const users = await this.prisma.user.findMany();
        if (!users.length)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, users, ''), common_1.HttpStatus.OK);
    }
    async findCurrent() {
        const { id } = this.currentUser();
        const users = await this.prisma.user.findUnique({ where: { uuid: id } });
        if (!users)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, users, ''), common_1.HttpStatus.OK);
    }
    async findOne(uuid) {
        const user = await this.prisma.user.findUnique({ where: { uuid } });
        if (!user)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, user, '');
    }
    async remove(uuid) {
        const user = await this.prisma.user.findUnique({ where: { uuid } });
        if (!user)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        await this.prisma.user.delete({ where: { uuid } });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, user, this.responses().general.deleted);
    }
    async ban(uuid) {
        const user = await this.prisma.user.findUnique({ where: { uuid } });
        if (!user)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        let ban_level = user.ban_level;
        let ban_end_in = new Date();
        switch (ban_level) {
            case BAN_LEVEL.NONE:
                ban_level = BAN_LEVEL.FIRST;
                ban_end_in.setDate(ban_end_in.getDate() + 7);
                break;
            case BAN_LEVEL.FIRST:
                ban_level = BAN_LEVEL.SECOND;
                ban_end_in.setDate(ban_end_in.getDate() + 30);
                break;
            case BAN_LEVEL.SECOND:
                ban_level = BAN_LEVEL.THIRD;
                ban_end_in.setFullYear(3000);
                break;
            default:
                ban_level = BAN_LEVEL.THIRD;
                ban_end_in.setFullYear(3000);
                break;
        }
        const updatedUser = await this.prisma.user.update({ where: { uuid }, data: { is_banned: true, ban_level, ban_end_in, updated_at: new Date() } });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, updatedUser, this.responses().general.deleted);
    }
    async unBan(uuid) {
        const user = await this.prisma.user.findUnique({ where: { uuid } });
        if (!user)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        const updatedUser = await this.prisma.user.update({ where: { uuid }, data: { is_banned: false, ban_level: BAN_LEVEL.NONE, ban_end_in: new Date(), updated_at: new Date() } });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, updatedUser, this.responses().general.deleted);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)()
], UserService);
//# sourceMappingURL=user.service.js.map