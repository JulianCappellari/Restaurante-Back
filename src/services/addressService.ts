import Address from '../models/Address';
import { CreateAddressDTO, UpdateAddressDTO } from '../dto/address.dto';

export const createAddress = async (data: CreateAddressDTO) => {
  return await Address.create(data);
};

export const getAddressesByUserId = async (userId: number) => {
  return await Address.findAll({ where: { userId } });
};
export const getAddressesById = async (id: number) => {
  return await Address.findOne({ where: { id } });
};

export const updateAddress = async (id: number, data: UpdateAddressDTO) => {
  const address = await Address.findByPk(id);
  if (!address) throw new Error('Dirección no encontrada');
  return await address.update(data);
};

export const deleteAddress = async (id: number) => {
  const address = await Address.findByPk(id);
  if (!address) throw new Error('Dirección no encontrada');
  return await address.destroy();
};
