import Menu from '../models/Menu';
import { CreateMenuDTO, UpdateMenuDTO } from '../dto/menu.dto';

// Crear un plato en el menú
export const createMenu = async (data: CreateMenuDTO) => {
    try {
        const newMenu = await Menu.create({
            nameDish: data.nameDish,
            price: data.price,
            available: data.available,
            imageUrl: data.imageUrl || null
        });
        return newMenu;
    } catch (error) {
        throw new Error(`Error al crear el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Obtener todos los platos del menú
export const getAllMenuItems = async () => {
    try {
        const menuItems = await Menu.findAll();
        return menuItems;
    } catch (error) {
        throw new Error(`Error al listar los platos del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Obtener un plato específico por ID
export const getMenuById = async (id: number) => {
    try {
        const menuItem = await Menu.findByPk(id);
        if (!menuItem) {
            throw new Error(`Plato del menú con ID ${id} no encontrado`);
        }
        return menuItem;
    } catch (error) {
        throw new Error(`Error al obtener el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Actualizar un plato del menú
export const updateMenu = async (id: number, data: UpdateMenuDTO) => {
    try {
        const menuItem = await Menu.findByPk(id);
        if (!menuItem) {
            throw new Error(`Plato del menú con ID ${id} no encontrado`);
        }
        const updatedMenuItem = await menuItem.update(data);  // Actualización parcial
        return updatedMenuItem;
    } catch (error) {
        throw new Error(`Error al actualizar el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};

// Eliminar un plato del menú
export const deleteMenuItem = async (id: number) => {
    try {
        const menuItem = await Menu.findByPk(id);
        if (!menuItem) {
            throw new Error(`Plato del menú con ID ${id} no encontrado`);
        }
        const deletedMenuItem = await menuItem.destroy();
        return deletedMenuItem;
    } catch (error) {
        throw new Error(`Error al eliminar el plato del menú: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
