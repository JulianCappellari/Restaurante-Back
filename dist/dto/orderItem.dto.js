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
exports.OrderItemCustomizationResponseDTO = exports.OrderItemResponseDTO = exports.UpdateOrderItemDTO = exports.CreateOrderItemDTO = exports.OrderItemCustomizationDTO = void 0;
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class OrderItemCustomizationDTO {
}
exports.OrderItemCustomizationDTO = OrderItemCustomizationDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'El ID de personalización debe ser mayor a 0' }),
    __metadata("design:type", Number)
], OrderItemCustomizationDTO.prototype, "customizationId", void 0);
__decorate([
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], OrderItemCustomizationDTO.prototype, "isIncluded", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OrderItemCustomizationDTO.prototype, "notes", void 0);
class CreateOrderItemDTO {
}
exports.CreateOrderItemDTO = CreateOrderItemDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'El ID del pedido debe ser mayor a 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateOrderItemDTO.prototype, "orderId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'El ID del menú debe ser mayor a 0' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateOrderItemDTO.prototype, "menuId", void 0);
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'La cantidad debe ser al menos 1' }),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], CreateOrderItemDTO.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateOrderItemDTO.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemCustomizationDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], CreateOrderItemDTO.prototype, "customizations", void 0);
class UpdateOrderItemDTO {
}
exports.UpdateOrderItemDTO = UpdateOrderItemDTO;
__decorate([
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(1, { message: 'La cantidad debe ser al menos 1' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], UpdateOrderItemDTO.prototype, "quantity", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Object)
], UpdateOrderItemDTO.prototype, "notes", void 0);
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => OrderItemCustomizationDTO),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Array)
], UpdateOrderItemDTO.prototype, "customizations", void 0);
class OrderItemResponseDTO {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.OrderItemResponseDTO = OrderItemResponseDTO;
class OrderItemCustomizationResponseDTO {
    constructor(partial) {
        Object.assign(this, partial);
    }
}
exports.OrderItemCustomizationResponseDTO = OrderItemCustomizationResponseDTO;
