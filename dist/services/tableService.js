"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTable = exports.updateTable = exports.getTableById = exports.getAllTables = exports.createTable = void 0;
const Table_1 = __importDefault(require("../models/Table"));
// Crear una nueva mesa
const createTable = async (data) => {
    try {
        const newTable = await Table_1.default.create({
            tableNum: data.tableNum,
            ability: data.ability,
            state: data.state,
        });
        return newTable;
    }
    catch (error) {
        throw new Error(`Error al crear la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.createTable = createTable;
// Obtener todas las mesas
const getAllTables = async () => {
    try {
        const tables = await Table_1.default.findAll();
        return tables;
    }
    catch (error) {
        throw new Error(`Error al listar las mesas: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getAllTables = getAllTables;
// Obtener una mesa por ID
const getTableById = async (id) => {
    try {
        const table = await Table_1.default.findByPk(id);
        if (!table) {
            throw new Error(`Mesa con ID ${id} no encontrada`);
        }
        return table;
    }
    catch (error) {
        throw new Error(`Error al obtener la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.getTableById = getTableById;
// Actualizar una mesa
const updateTable = async (id, data) => {
    try {
        const table = await Table_1.default.findByPk(id);
        if (!table) {
            throw new Error(`Mesa con ID ${id} no encontrada`);
        }
        const updatedTable = await table.update(data); // Actualización parcial
        return updatedTable;
    }
    catch (error) {
        throw new Error(`Error al actualizar la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.updateTable = updateTable;
// Eliminar una mesa
const deleteTable = async (id) => {
    try {
        const table = await Table_1.default.findByPk(id);
        if (!table) {
            throw new Error(`Mesa con ID ${id} no encontrada`);
        }
        const deletedTable = await table.destroy();
        return deletedTable;
    }
    catch (error) {
        throw new Error(`Error al eliminar la mesa: ${error instanceof Error ? error.message : 'Error inesperado'}`);
    }
};
exports.deleteTable = deleteTable;
