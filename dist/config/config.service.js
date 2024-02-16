"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigService = void 0;
const common_1 = require("@nestjs/common");
const multer_1 = require("multer");
const path_1 = require("path");
let PrivateConfigService = class PrivateConfigService {
    constructor() {
        this.globalConfig = {};
        this.multerConfig = {
            dest: '/uploads',
            storage: (0, multer_1.diskStorage)({
                filename: (req, file, callback) => {
                    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
                    const extension = (0, path_1.extname)(file.originalname);
                    callback(null, `${Math.round(Math.random() * 1e9)}-${uniqueSuffix}${extension}`);
                },
            }),
        };
        this.jwtSecret = process.env.JWT_SECRET || '123Pass';
        this.jwtSignOptions = { expiresIn: '1d', algorithm: 'HS256' };
        this.standardVoteDwonsCount = 3;
        this.standardVotesPercentage = 1 / this.standardVoteDwonsCount;
    }
    set(key, value) {
        this.globalConfig[key] = value;
    }
    get(key) {
        return this.globalConfig[key];
    }
};
PrivateConfigService = __decorate([
    (0, common_1.Injectable)()
], PrivateConfigService);
exports.ConfigService = new PrivateConfigService();
//# sourceMappingURL=config.service.js.map