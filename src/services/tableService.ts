import Table from '../models/Table';
import { CreateTableDTO, UpdateTableDTO } from '../dto/table.dto';

// Crear una nueva mesa
export const createTable = async (data: CreateTableDTO) => {
  try {
    const newTable = await Table.create({
      tableNum: data.tableNum,
      ability: data.ability,
      state: data.state,
    });
    return newTable;
  } catch (error) {
    throw new Error(`Error al crear la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}`);
  }
};

// Obtener todas las mesas
export const getAllTables = async () => {
  try {
    const tables = await Table.findAll();
    return tables;
  } catch (error) {
    throw new Error(`Error al listar las mesas: ${error instanceof Error ? error.message : 'Error inesperado'}`);
  }
};

// Obtener una mesa por ID
export const getTableById = async (id: number) => {
  try {
    const table = await Table.findByPk(id);
    if (!table) {
      throw new Error(`Mesa con ID ${id} no encontrada`);
    }
    return table;
  } catch (error) {
    throw new Error(`Error al obtener la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}`);
  }
};

// Actualizar una mesa
export const updateTable = async (id: number, data: UpdateTableDTO) => {
  try {
    const table = await Table.findByPk(id);
    if (!table) {
      throw new Error(`Mesa con ID ${id} no encontrada`);
    }
    const updatedTable = await table.update(data);  // Actualización parcial
    return updatedTable;
  } catch (error) {
    throw new Error(`Error al actualizar la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}`);
  }
};

// Eliminar una mesa
export const deleteTable = async (id: number) => {
  try {
    const table = await Table.findByPk(id);
    if (!table) {
      throw new Error(`Mesa con ID ${id} no encontrada`);
    }
    const deletedTable = await table.destroy();
    return deletedTable;
  } catch (error) {
    throw new Error(`Error al eliminar la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}`);
  }
};
