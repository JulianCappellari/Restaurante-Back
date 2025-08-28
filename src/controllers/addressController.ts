import { Request, Response } from 'express';
import { createAddress, deleteAddress, getAddressesByUserId, updateAddress, getAddressesById } from '../services/addressService';
import { CreateAddressDTO, UpdateAddressDTO } from '../dto/address.dto';

export const createAddressController = async (req: Request, res: Response) => {
  try {
    const data: CreateAddressDTO = req.body;
    const newAddress = await createAddress(data);
    res.status(201).json(newAddress);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error al crear dirección' });
  }
};

export const getAddressesByUserIdController = async (req: Request, res: Response) => {
  const { userId } = req.params;
  try {
    const addresses = await getAddressesByUserId(Number(userId));
    res.status(200).json(addresses);
  } catch (error) {
    res.status(404).json({ error: error instanceof Error ? error.message : 'No se encontraron direcciones' });
  }
};
export const getAddressesByIdController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const addresses = await getAddressesById(Number(id));
    res.status(200).json(addresses);
  } catch (error) {
    res.status(404).json({ error: error instanceof Error ? error.message : 'No se encontraron direcciones' });
  }
};

export const updateAddressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  const data: UpdateAddressDTO = req.body;
  try {
    const updated = await updateAddress(Number(id), data);
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error al actualizar dirección' });
  }
};

export const deleteAddressController = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await deleteAddress(Number(id));
    res.status(200).json({ message: 'Dirección eliminada' });
  } catch (error) {
    res.status(500).json({ error: error instanceof Error ? error.message : 'Error al eliminar dirección' });
  }
};
