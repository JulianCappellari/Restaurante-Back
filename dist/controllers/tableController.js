"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTableController = exports.updateTableController = exports.getTableByIdController = exports.createTableController = exports.getAllTablesController = void 0;
const tableService_1 = require("../services/tableService");
const getAllTablesController = async (req, res) => {
    try {
        const tables = await (0, tableService_1.getAllTables)();
        res.status(200).json(tables);
    }
    catch (error) {
        res.status(500).json({ error: `Error al obtener las mesas: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getAllTablesController = getAllTablesController;
const createTableController = async (req, res) => {
    try {
        const newTable = await (0, tableService_1.createTable)(req.body);
        res.status(201).json(newTable);
    }
    catch (error) {
        res.status(500).json({ error: `Error al crear la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.createTableController = createTableController;
const getTableByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const table = await (0, tableService_1.getTableById)(Number(id));
        res.status(200).json(table);
    }
    catch (error) {
        res.status(404).json({ error: `Mesa con ID ${id} no encontrada: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.getTableByIdController = getTableByIdController;
const updateTableController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedTable = await (0, tableService_1.updateTable)(Number(id), data);
        res.status(200).json(updatedTable);
    }
    catch (error) {
        res.status(500).json({ error: `Error al actualizar la mesa con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.updateTableController = updateTableController;
const deleteTableController = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedTable = await (0, tableService_1.deleteTable)(Number(id));
        res.status(200).json(deletedTable);
    }
    catch (error) {
        res.status(500).json({ error: `Error al eliminar la mesa con el id ${id}: ${error instanceof Error ? error.message : 'Error inesperado'}` });
    }
};
exports.deleteTableController = deleteTableController;
