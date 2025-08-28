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
exports.DishCustomizationResponseDTO = exports.MenuResponseDTO = exports.UpdateMenuDTO = exports.CreateMenuDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const dishCustomization_dto_1 = require("./dishCustomization.dto");
const DISH_TYPES = ['Entrada', 'Plato Principal', 'Postre', 'Bebida', 'Ensalada', 'Guarnicion'];
// DTO para la creación de un plato del menú
class CreateMenuDTO {
}
exports.CreateMenuDTO = CreateMenuDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateMenuDTO.prototype, "nameDish", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateMenuDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], CreateMenuDTO.prototype, "available", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateMenuDTO.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(DISH_TYPES, { message: 'Tipo de plato no válido' }),
    __metadata("design:type", String)
], CreateMenuDTO.prototype, "typeDish", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dishCustomization_dto_1.CreateDishCustomizationDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateMenuDTO.prototype, "customizations", void 0);
// DTO para la actualización de un plato del menú
class UpdateMenuDTO {
}
exports.UpdateMenuDTO = UpdateMenuDTO;
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMenuDTO.prototype, "nameDish", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateMenuDTO.prototype, "price", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], UpdateMenuDTO.prototype, "available", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateMenuDTO.prototype, "imageUrl", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsIn)(DISH_TYPES, { message: 'Tipo de plato no válido' }),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], UpdateMenuDTO.prototype, "typeDish", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => dishCustomization_dto_1.UpdateDishCustomizationDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateMenuDTO.prototype, "customizations", void 0);
class MenuResponseDTO {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.MenuResponseDTO = MenuResponseDTO;
class DishCustomizationResponseDTO {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.DishCustomizationResponseDTO = DishCustomizationResponseDTO;
