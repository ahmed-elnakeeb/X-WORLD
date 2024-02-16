"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const client_1 = require("@prisma/client");
const file_upload_service_1 = require("../file-upload/file-upload.service");
let CronService = class CronService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
        this.fileUploadService = new file_upload_service_1.FileUploadService();
    }
    async setBoostToFalseCron() {
        const currentDate = new Date();
        await this.prisma.tweet.updateMany({
            where: {
                boosted_till: {
                    lte: currentDate
                }
            },
            data: {
                is_boosted: false,
                updated_at: currentDate
            }
        });
        console.log('setBoostToFalseCron excuted');
    }
    async autoDeleteTweetsAfterWeek() {
        const oneWeekAgo = new Date();
        oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
        await this.prisma.tweet.deleteMany({
            where: { created_at: { gte: oneWeekAgo } }
        });
        const toBeDeletedFiles = await this.prisma.file.findMany({
            where: { created_at: { gte: oneWeekAgo } },
            select: {
                uuid: true,
                public_id: true
            }
        });
        let toBeDeletedFilesFromCloud = [];
        toBeDeletedFiles.forEach((file) => {
            toBeDeletedFilesFromCloud.push(file.public_id);
        });
        await this.fileUploadService.bulkDeleteFormCloud(toBeDeletedFilesFromCloud);
        await this.prisma.file.deleteMany({ where: { created_at: { gte: oneWeekAgo } } });
        console.log('autoDeleteTweetsAfterWeek excuted');
    }
};
exports.CronService = CronService;
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_MINUTE),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "setBoostToFalseCron", null);
__decorate([
    (0, schedule_1.Cron)(schedule_1.CronExpression.EVERY_DAY_AT_MIDNIGHT),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CronService.prototype, "autoDeleteTweetsAfterWeek", null);
exports.CronService = CronService = __decorate([
    (0, common_1.Injectable)()
], CronService);
//# sourceMappingURL=cron.service.js.map