"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
let ColorService = class ColorService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    responses() {
        return config_service_1.ConfigService.get('responses');
    }
    async create(createColorDto) {
        const { name, hexCode } = createColorDto;
        const color = await this.prisma.color.findFirst({ where: { OR: [{ name }, { hexCode }] } });
        if (color)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.CONFLICT, color, this.responses().colors.alreadyExsist), common_1.HttpStatus.OK);
        await this.prisma.color.create({ data: createColorDto });
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, createColorDto, this.responses().general.created), common_1.HttpStatus.OK);
    }
    async findAll() {
        const colors = await this.prisma.color.findMany();
        if (!colors.length)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, colors, ''), common_1.HttpStatus.OK);
    }
    async findOne(id) {
        const color = await this.prisma.color.findUnique({ where: { id } });
        if (!color)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, color, '');
    }
    async update(id, updateColorDto) {
        const color = await this.prisma.color.findUnique({ where: { id } });
        if (!color)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        const { name, hexCode } = updateColorDto;
        const checkConflicts = await this.prisma.color.findFirst({ where: { OR: [{ name }, { hexCode }], NOT: [{ id }] } });
        if (checkConflicts)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        updateColorDto.updated_at = new Date();
        const updatedColor = await this.prisma.color.update({ where: { id }, data: updateColorDto });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, updatedColor, this.responses().general.updated);
    }
    async remove(id) {
        const color = await this.prisma.color.findUnique({ where: { id } });
        if (!color)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        await this.prisma.color.delete({ where: { id } });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, color, this.responses().general.deleted);
    }
};
exports.ColorService = ColorService;
exports.ColorService = ColorService = __decorate([
    (0, common_1.Injectable)()
], ColorService);
//# sourceMappingURL=color.service.js.map