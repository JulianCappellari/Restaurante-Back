"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddressController = exports.updateAddressController = exports.getAddressesByIdController = exports.getAddressesByUserIdController = exports.createAddressController = void 0;
const addressService_1 = require("../services/addressService");
const createAddressController = async (req, res) => {
    try {
        const data = req.body;
        const newAddress = await (0, addressService_1.createAddress)(data);
        res.status(201).json(newAddress);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al crear dirección' });
    }
};
exports.createAddressController = createAddressController;
const getAddressesByUserIdController = async (req, res) => {
    const { userId } = req.params;
    try {
        const addresses = await (0, addressService_1.getAddressesByUserId)(Number(userId));
        res.status(200).json(addresses);
    }
    catch (error) {
        res.status(404).json({ error: error instanceof Error ? error.message : 'No se encontraron direcciones' });
    }
};
exports.getAddressesByUserIdController = getAddressesByUserIdController;
const getAddressesByIdController = async (req, res) => {
    const { id } = req.params;
    try {
        const addresses = await (0, addressService_1.getAddressesById)(Number(id));
        res.status(200).json(addresses);
    }
    catch (error) {
        res.status(404).json({ error: error instanceof Error ? error.message : 'No se encontraron direcciones' });
    }
};
exports.getAddressesByIdController = getAddressesByIdController;
const updateAddressController = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updated = await (0, addressService_1.updateAddress)(Number(id), data);
        res.status(200).json(updated);
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al actualizar dirección' });
    }
};
exports.updateAddressController = updateAddressController;
const deleteAddressController = async (req, res) => {
    const { id } = req.params;
    try {
        await (0, addressService_1.deleteAddress)(Number(id));
        res.status(200).json({ message: 'Dirección eliminada' });
    }
    catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : 'Error al eliminar dirección' });
    }
};
exports.deleteAddressController = deleteAddressController;
