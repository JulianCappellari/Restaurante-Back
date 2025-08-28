"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAddress = exports.updateAddress = exports.getAddressesById = exports.getAddressesByUserId = exports.createAddress = void 0;
const Address_1 = __importDefault(require("../models/Address"));
const createAddress = async (data) => {
    return await Address_1.default.create(data);
};
exports.createAddress = createAddress;
const getAddressesByUserId = async (userId) => {
    return await Address_1.default.findAll({ where: { userId } });
};
exports.getAddressesByUserId = getAddressesByUserId;
const getAddressesById = async (id) => {
    return await Address_1.default.findOne({ where: { id } });
};
exports.getAddressesById = getAddressesById;
const updateAddress = async (id, data) => {
    const address = await Address_1.default.findByPk(id);
    if (!address)
        throw new Error('Dirección no encontrada');
    return await address.update(data);
};
exports.updateAddress = updateAddress;
const deleteAddress = async (id) => {
    const address = await Address_1.default.findByPk(id);
    if (!address)
        throw new Error('Dirección no encontrada');
    return await address.destroy();
};
exports.deleteAddress = deleteAddress;
