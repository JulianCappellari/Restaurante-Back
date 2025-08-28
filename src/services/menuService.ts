import { Menu, DishCustomization } from '../models/Associations';
import { CreateMenuDTO, UpdateMenuDTO } from '../dto/menu.dto';

export const createMenu = async (data: CreateMenuDTO) => {
  const { customizations, ...menuData } = data;
  const newMenu = await Menu.create({ ...menuData, imageUrl: menuData.imageUrl || null });

  if (customizations?.length) {
    const rows = customizations.map(c => ({ ...c, menuId: newMenu.id }));
    await DishCustomization.bulkCreate(rows);
  }

  return Menu.findByPk(newMenu.id, {
    attributes: ['id','nameDish','price','available','imageUrl','typeDish','createdAt','updatedAt'],
    include: [{
      model: DishCustomization,
      as: 'dishCustomizations',
      required: false,
      attributes: [
        'id','menuId','name','description','isRemovable','additionalPrice',
        'isDefaultIncluded','isRequired','createdAt','updatedAt'
      ],
    }],
    order: [['id','ASC'], [{ model: DishCustomization, as: 'dishCustomizations' }, 'id', 'ASC']],
  });
};

export const getAllMenuItems = async () => {
  return Menu.findAll({
    attributes: ['id','nameDish','price','available','imageUrl','typeDish','createdAt','updatedAt'],
    include: [{
      model: DishCustomization,
      as: 'dishCustomizations',
      required: false,
      attributes: [
        'id','menuId','name','description','isRemovable','additionalPrice',
        'isDefaultIncluded','isRequired','createdAt','updatedAt'
      ],
    }],
    order: [['id','ASC'], [{ model: DishCustomization, as: 'dishCustomizations' }, 'id', 'ASC']],
  });
};

export const getMenuById = async (id: number) => {
  const menuItem = await Menu.findByPk(id, {
    attributes: ['id','nameDish','price','available','imageUrl','typeDish','createdAt','updatedAt'],
    include: [{
      model: DishCustomization,
      as: 'dishCustomizations',
      required: false,
      attributes: [
        'id','menuId','name','description','isRemovable','additionalPrice',
        'isDefaultIncluded','isRequired','createdAt','updatedAt'
      ],
    }],
    order: [['id','ASC'], [{ model: DishCustomization, as: 'dishCustomizations' }, 'id', 'ASC']],
  });
  if (!menuItem) throw new Error(`Plato del menú con ID ${id} no encontrado`);
  return menuItem;
};

export const updateMenu = async (id: number, data: UpdateMenuDTO) => {
  const menuItem = await Menu.findByPk(id);
  if (!menuItem) throw new Error(`Plato del menú con ID ${id} no encontrado`);
  return menuItem.update(data);
};

export const deleteMenuItem = async (id: number) => {
  const menuItem = await Menu.findByPk(id);
  if (!menuItem) throw new Error(`Plato del menú con ID ${id} no encontrado`);
  return menuItem.destroy();
};
