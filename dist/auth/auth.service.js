"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
const jsonwebtoken_1 = require("jsonwebtoken");
let AuthService = class AuthService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    responses() {
        return config_service_1.ConfigService.get('responses');
    }
    async register(registerDto) {
        const { device_id, fcm_id } = registerDto;
        const user = await this.prisma.user.findFirst({ where: { OR: [{ device_id }, { fcm_id }] } });
        if (user)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.CONFLICT, user, this.responses().users.alreadyExsist), common_1.HttpStatus.OK);
        const category = await this.prisma.category.findUnique({ where: { id: registerDto.category_id } });
        if (!category)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.BAD_REQUEST, registerDto, this.responses().general.invalidCategoryId), common_1.HttpStatus.OK);
        const newUser = await this.prisma.user.create({ data: registerDto });
        delete newUser.created_at;
        delete newUser.updated_at;
        delete newUser.category_id;
        const customCategory = (0, utils_1.mapCategories)([category]);
        const finalUserData = {
            ...newUser,
            category: customCategory[0]
        };
        const tokenPayload = {
            id: newUser.uuid,
            role: newUser.role
        };
        const token = (0, jsonwebtoken_1.sign)(tokenPayload, config_service_1.ConfigService.jwtSecret, config_service_1.ConfigService.jwtSignOptions);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, { user: finalUserData, token }, this.responses().general.created);
    }
    async login(loginDto) {
        const { device_id, fcm_id } = loginDto;
        const user = await this.prisma.user.findFirst({
            where: { device_id },
            include: {
                category: true
            },
        });
        if (!user)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, loginDto, this.responses().users.userNotFound), common_1.HttpStatus.OK);
        const message = this.responses().users.userBanned;
        if (user.is_banned)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.UNAUTHORIZED, { id: user.uuid, device_id }, message), common_1.HttpStatus.OK);
        if (user.fcm_id !== fcm_id) {
            const updateResult = await this.updateFCMToken(loginDto);
            if (updateResult.status !== common_1.HttpStatus.OK)
                throw new common_1.HttpException(updateResult, common_1.HttpStatus.OK);
        }
        const tokenPayload = {
            id: user.uuid,
            role: user.role
        };
        const userCategory = user.category;
        const customCategory = (0, utils_1.mapCategories)([userCategory]);
        delete user.category_id;
        delete user.created_at;
        delete user.updated_at;
        delete user.category;
        const finalUserData = {
            ...user,
            category: customCategory[0]
        };
        const token = (0, jsonwebtoken_1.sign)(tokenPayload, config_service_1.ConfigService.jwtSecret, config_service_1.ConfigService.jwtSignOptions);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, { user: finalUserData, token }, this.responses().users.logedInSuccessfully);
    }
    async updateFCMToken(loginDto) {
        const { device_id, fcm_id } = loginDto;
        const user = await this.prisma.user.findFirst({
            where: {
                fcm_id: {
                    equals: fcm_id
                },
                device_id: {
                    not: { equals: device_id }
                }
            },
            select: {
                uuid: true,
                device_id: true,
                fcm_id: true
            }
        });
        if (user)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.BAD_REQUEST, loginDto, this.responses().users.dublicatedFCM), common_1.HttpStatus.OK);
        const newUser = await this.prisma.user.update({
            where: { device_id },
            data: {
                fcm_id,
                updated_at: new Date()
            }
        });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, { id: newUser.uuid, fcm_id: newUser.fcm_id }, this.responses().general.updated);
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)()
], AuthService);
//# sourceMappingURL=auth.service.js.map