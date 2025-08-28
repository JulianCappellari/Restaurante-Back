"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDishCustomizationController = exports.updateDishCustomizationController = exports.getDishCustomizationByIdController = exports.createDishCustomizationController = exports.getDishCustomizationsByMenuIdController = void 0;
const express_validator_1 = require("express-validator");
const dishCustomizationService_1 = require("../services/dishCustomizationService");
const getDishCustomizationsByMenuIdController = async (req, res) => {
    try {
        const { menuId } = req.params;
        const customizations = await (0, dishCustomizationService_1.getDishCustomizations)(Number(menuId));
        res.status(200).json(customizations);
    }
    catch (error) {
        res.status(500).json({
            error: `Error al obtener las personalizaciones: ${error instanceof Error ? error.message : 'Error inesperado'}`
        });
    }
};
exports.getDishCustomizationsByMenuIdController = getDishCustomizationsByMenuIdController;
const createDishCustomizationController = async (req, res) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const customizationData = req.body;
        const newCustomization = await (0, dishCustomizationService_1.createDishCustomization)(customizationData);
        res.status(201).json(newCustomization);
    }
    catch (error) {
        res.status(500).json({
            error: `Error al crear la personalización: ${error instanceof Error ? error.message : 'Error inesperado'}`
        });
    }
};
exports.createDishCustomizationController = createDishCustomizationController;
const getDishCustomizationByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const customization = await (0, dishCustomizationService_1.getDishCustomizationById)(Number(id));
        res.status(200).json(customization);
    }
    catch (error) {
        res.status(404).json({
            error: `Error al obtener la personalización con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}`
        });
    }
};
exports.getDishCustomizationByIdController = getDishCustomizationByIdController;
const updateDishCustomizationController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedCustomization = await (0, dishCustomizationService_1.updateDishCustomization)(Number(id), data);
        res.status(200).json(updatedCustomization);
    }
    catch (error) {
        res.status(500).json({
            error: `Error al actualizar la personalización con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}`
        });
    }
};
exports.updateDishCustomizationController = updateDishCustomizationController;
const deleteDishCustomizationController = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, dishCustomizationService_1.deleteDishCustomization)(Number(id));
        res.status(200).json({ message: 'Personalización eliminada correctamente' });
    }
    catch (error) {
        res.status(500).json({
            error: `Error al eliminar la personalización con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}`
        });
    }
};
exports.deleteDishCustomizationController = deleteDishCustomizationController;
