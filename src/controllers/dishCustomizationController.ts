import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { 
    getDishCustomizations, 
    createDishCustomization, 
    getDishCustomizationById, 
    updateDishCustomization, 
    deleteDishCustomization 
} from '../services/dishCustomizationService';
import { CreateDishCustomizationDTO, UpdateDishCustomizationDTO } from '../dto/dishCustomization.dto';

export const getDishCustomizationsByMenuIdController = async (req: Request, res: Response) => {
    try {
        const { menuId } = req.params;
        const customizations = await getDishCustomizations(Number(menuId));
        res.status(200).json(customizations);
    } catch (error) {
        res.status(500).json({ 
            error: `Error al obtener las personalizaciones: ${error instanceof Error ? error.message : 'Error inesperado'}` 
        });
    }
};

export const createDishCustomizationController = async (req: Request, res: Response) => {
    try {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const customizationData: CreateDishCustomizationDTO = req.body;
        const newCustomization = await createDishCustomization(customizationData);
        res.status(201).json(newCustomization);
    } catch (error) {
        res.status(500).json({ 
            error: `Error al crear la personalización: ${error instanceof Error ? error.message : 'Error inesperado'}` 
        });
    }
};

export const getDishCustomizationByIdController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const customization = await getDishCustomizationById(Number(id));
        res.status(200).json(customization);
    } catch (error) {
        res.status(404).json({ 
            error: `Error al obtener la personalización con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` 
        });
    }
};

export const updateDishCustomizationController = async (req: Request, res: Response) => {
    const { id } = req.params;
    const data: UpdateDishCustomizationDTO = req.body;
    try {
        const updatedCustomization = await updateDishCustomization(Number(id), data);
        res.status(200).json(updatedCustomization);
    } catch (error) {
        res.status(500).json({ 
            error: `Error al actualizar la personalización con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` 
        });
    }
};

export const deleteDishCustomizationController = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        await deleteDishCustomization(Number(id));
        res.status(200).json({ message: 'Personalización eliminada correctamente' });
    } catch (error) {
        res.status(500).json({ 
            error: `Error al eliminar la personalización con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` 
        });
    }
};
