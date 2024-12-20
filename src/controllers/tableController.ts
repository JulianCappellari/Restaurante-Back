import { Request, Response } from 'express';
import { createTable, deleteTable, getAllTables, getTableById, updateTable } from '../services/tableService';
import { UpdateTableDTO } from '../dto/table.dto';

export const getAllTablesController = async (req: Request, res: Response) => {
  try {
    const tables = await getAllTables();
    res.status(200).json(tables);
  } catch (error) {
    res.status(500).json({ error: `Error al obtener las mesas: ${error instanceof Error ? error.message : 'Error inesperado'}` });
  }
};

export const createTableController = async (req: Request, res: Response) => {
  try {
    const newTable = await createTable(req.body);
    res.status(201).json(newTable);
  } catch (error) {
    res.status(500).json({ error: `Error al crear la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}` });
  }
};

export const getTableByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const table = await getTableById(Number(id));
    res.status(200).json(table);
  } catch (error) {
    res.status(404).json({ error: `Mesa con ID ${id} no encontrada: ${error instanceof Error ? error.message : 'Error inesperado'}` });
  }
};

export const updateTableController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateTableDTO = req.body;
  try {
    const updatedTable = await updateTable(Number(id), data);
    res.status(200).json(updatedTable);
  } catch (error) {
    res.status(500).json({ error: `Error al actualizar la mesa con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
  }
};

export const deleteTableController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedTable = await deleteTable(Number(id));
    res.status(200).json(deletedTable);
  } catch (error) {
    res.status(500).json({ error: `Error al eliminar la mesa con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
  }
};
