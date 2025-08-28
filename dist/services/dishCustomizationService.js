"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDishCustomizationsForMenu = exports.deleteDishCustomization = exports.updateDishCustomization = exports.createDishCustomization = exports.getDishCustomizationById = exports.getDishCustomizations = void 0;
const DishCustomization_1 = __importDefault(require("../models/DishCustomization"));
const getDishCustomizations = async (menuId) => {
    return await DishCustomization_1.default.findAll({
        where: { menuId, isActive: true },
        order: [['id', 'ASC']]
    });
};
exports.getDishCustomizations = getDishCustomizations;
const getDishCustomizationById = async (id) => {
    return await DishCustomization_1.default.findByPk(id);
};
exports.getDishCustomizationById = getDishCustomizationById;
const createDishCustomization = async (customizationData) => {
    return await DishCustomization_1.default.create({
        ...customizationData,
        isActive: true
    });
};
exports.createDishCustomization = createDishCustomization;
const updateDishCustomization = async (id, updateData) => {
    const [updated] = await DishCustomization_1.default.update(updateData, {
        where: { id }
    });
    if (updated) {
        return await (0, exports.getDishCustomizationById)(id);
    }
    return null;
};
exports.updateDishCustomization = updateDishCustomization;
const deleteDishCustomization = async (id) => {
    const deleted = await DishCustomization_1.default.update({ isActive: false }, { where: { id } });
    return deleted[0] > 0;
};
exports.deleteDishCustomization = deleteDishCustomization;
const getDishCustomizationsForMenu = async (menuId) => {
    return await DishCustomization_1.default.findAll({
        where: {
            menuId,
            isActive: true,
            isDefaultIncluded: true
        },
        attributes: ['id', 'name', 'additionalPrice']
    });
};
exports.getDishCustomizationsForMenu = getDishCustomizationsForMenu;
