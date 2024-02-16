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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ColorController = void 0;
const common_1 = require("@nestjs/common");
const color_service_1 = require("./color.service");
const create_color_dto_1 = require("./dto/create-color.dto");
const update_color_dto_1 = require("./dto/update-color.dto");
const Id_validation_pipe_1 = require("../pipes/Id.validation.pipe");
const color_validation_pipe_1 = require("../pipes/color.validation.pipe");
let ColorController = class ColorController {
    constructor(colorService) {
        this.colorService = colorService;
    }
    create(createColorDto) {
        return this.colorService.create(createColorDto);
    }
    findAll() {
        return this.colorService.findAll();
    }
    findOne(id) {
        return this.colorService.findOne(+id);
    }
    update(id, updateColorDto) {
        return this.colorService.update(+id, updateColorDto);
    }
    remove(id) {
        return this.colorService.remove(+id);
    }
};
exports.ColorController = ColorController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)(color_validation_pipe_1.ColorValidatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_color_dto_1.CreateColorDto]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id', Id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id', Id_validation_pipe_1.IdValidationPipe)),
    __param(1, (0, common_1.Body)(color_validation_pipe_1.ColorValidatorPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_color_dto_1.UpdateColorDto]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id', Id_validation_pipe_1.IdValidationPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], ColorController.prototype, "remove", null);
exports.ColorController = ColorController = __decorate([
    (0, common_1.Controller)('color'),
    __metadata("design:paramtypes", [color_service_1.ColorService])
], ColorController);
//# sourceMappingURL=color.controller.js.map