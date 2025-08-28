import DishCustomization from '../models/DishCustomization';
import { CreateDishCustomizationDTO, UpdateDishCustomizationDTO } from '../dto/dishCustomization.dto';

export const getDishCustomizations = async (menuId: number) => {
  return DishCustomization.findAll({
    where: { menuId },
    order: [['id', 'ASC']],
  });
};

export const getDishCustomizationById = async (id: number) => {
  return DishCustomization.findByPk(id);
};

export const createDishCustomization = async (customizationData: CreateDishCustomizationDTO) => {
  return DishCustomization.create({ ...customizationData });
};

export const updateDishCustomization = async (id: number, updateData: UpdateDishCustomizationDTO) => {
  const [updated] = await DishCustomization.update(updateData, { where: { id } });
  return updated ? getDishCustomizationById(id) : null;
};

export const deleteDishCustomization = async (id: number) => {
  const deleted = await DishCustomization.destroy({ where: { id } });
  return deleted > 0;
};

export const getDishCustomizationsForMenu = async (menuId: number) => {
  return DishCustomization.findAll({
    where: { menuId, isDefaultIncluded: true },
    attributes: ['id', 'name', 'additionalPrice'],
    order: [['id', 'ASC']],
  });
};
