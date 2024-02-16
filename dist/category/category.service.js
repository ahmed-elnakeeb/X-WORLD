"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
const config_service_1 = require("../config/config.service");
const utils_1 = require("../utils/utils");
let CategoryService = class CategoryService {
    constructor() {
        this.prisma = new client_1.PrismaClient();
    }
    responses() {
        return config_service_1.ConfigService.get('responses');
    }
    async create(createCategoryDto) {
        const { title_ar, title_en } = createCategoryDto;
        const category = await this.prisma.category.findFirst({ where: { OR: [{ title_ar }, { title_en }] } });
        if (category)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.CONFLICT, category, this.responses().categories.alreadyExsist), common_1.HttpStatus.OK);
        await this.prisma.category.create({ data: createCategoryDto });
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, createCategoryDto, this.responses().general.created), common_1.HttpStatus.OK);
    }
    async findAll() {
        const categories = await this.prisma.category.findMany();
        if (!categories.length)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, categories, ''), common_1.HttpStatus.OK);
    }
    async findOne(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, category, '');
    }
    async update(id, updateCategoryDto) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        const { title_ar, title_en } = updateCategoryDto;
        const checkConflicts = await this.prisma.category.findFirst({ where: { OR: [{ title_ar }, { title_en }], NOT: [{ id }] } });
        if (checkConflicts)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        updateCategoryDto.updated_at = new Date();
        const updatedCategory = await this.prisma.category.update({ where: { id }, data: updateCategoryDto });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, updatedCategory, this.responses().general.updated);
    }
    async remove(id) {
        const category = await this.prisma.category.findUnique({ where: { id } });
        if (!category)
            throw new common_1.HttpException((0, utils_1.generateResponseBody)(common_1.HttpStatus.NOT_FOUND, [], this.responses().general.noDataFound), common_1.HttpStatus.OK);
        await this.prisma.category.delete({ where: { id } });
        return (0, utils_1.generateResponseBody)(common_1.HttpStatus.OK, category, this.responses().general.deleted);
    }
};
exports.CategoryService = CategoryService;
exports.CategoryService = CategoryService = __decorate([
    (0, common_1.Injectable)()
], CategoryService);
//# sourceMappingURL=category.service.js.map