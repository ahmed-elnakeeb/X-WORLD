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
exports.FileUploadService = void 0;
const common_1 = require("@nestjs/common");
const config_service_1 = require("../config/config.service");
const client_1 = require("@prisma/client");
const utils_1 = require("../utils/utils");
const cloudinary_1 = require("cloudinary");
let FileUploadService = class FileUploadService {
    responses() { return config_service_1.ConfigService.get('responses'); }
    constructor() {
        this.prisma = new client_1.PrismaClient();
        cloudinary_1.v2.config({
            cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
            api_key: process.env.CLOUDINARY_API_KEY,
            api_secret: process.env.CLOUDINARY_API_SECRET,
        });
    }
    async uploadFile(file) {
        const isFileValid = this.validateFile(file);
        if (!isFileValid) {
            const { fieldname, encoding, destination, filename, path, ...invalidFile } = file;
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.BAD_REQUEST, invalidFile, this.responses().general.invalidFile), common_1.HttpStatus.OK);
        }
        const result = await this.uploadFileToCloud(file);
        const { id } = config_service_1.ConfigService.get('currentUser');
        const fileData = {
            public_id: result.public_id,
            format: result.format,
            resource_type: result.resource_type,
            url: result.secure_url,
            uploded_by: id
        };
        const createdFile = await this.prisma.file.create({ data: fileData });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, { fileId: createdFile.uuid }, this.responses().general.fileUploaded);
    }
    ;
    async getFile(uuid) {
        const file = await this.prisma.file.findUnique({ where: { uuid } });
        if (!file)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        return { status: 200, data: { uuid, url: file.url }, msg: "" };
    }
    async delete(uuid) {
        const file = await this.prisma.file.findUnique({ where: { uuid } });
        if (!file)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        await this.prisma.file.delete({ where: { uuid } });
        await this.deleteFromCloud(file);
        return { status: 200, data: [], msg: "File deleted successfully" };
    }
    async bulkDeleteFormCloud(publicIds) {
        await cloudinary_1.v2.api.delete_resources(publicIds, { invalidate: true });
    }
    async bulkDeleteFormDB(filesId) {
        await this.prisma.file.deleteMany({
            where: {
                uuid: {
                    in: filesId
                }
            }
        });
    }
    async uploadFileToCloud(file) {
        return await cloudinary_1.v2.uploader.upload(file.path, {
            folder: 'x-world',
            resource_type: 'auto'
        });
    }
    async deleteFromCloud(file) {
        return await cloudinary_1.v2.uploader.destroy(file.public_id, { invalidate: true });
    }
    validateFile(file) {
        let isFileValid = false;
        const allowedMimeTypes = ['image/png', 'image/jpeg', 'video/mp4', 'audio/mpeg', 'audio/ogg', 'audio/mp4', 'audio/x-m4a'];
        isFileValid = allowedMimeTypes.includes(file.mimetype);
        if (!isFileValid)
            return isFileValid;
        const maxSizeInBytes = 5 * 1024 * 1024;
        isFileValid = file.size <= maxSizeInBytes;
        return isFileValid;
    }
};
exports.FileUploadService = FileUploadService;
exports.FileUploadService = FileUploadService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], FileUploadService);
//# sourceMappingURL=file-upload.service.js.map