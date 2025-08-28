import { Request, Response } from "express";
import paymentMethodService from "../services/paymentMethodService";

export const createPaymentMethod = async (req: Request, res: Response) => {
  try {
    const paymentMethod = await paymentMethodService.create(req.body);
    res.status(201).json(paymentMethod);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al crear el método de pago", error });
  }
};

export const getPaymentMethods = async (_req: Request, res: Response) => {
  try {
    const paymentMethods = await paymentMethodService.findAll();
    res.json(paymentMethods);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los métodos de pago", error });
  }
};

export const getPaymentMethodsByUser = async (req: Request, res: Response) => {
  try {
    const userId = Number(req.params.userId);
    if (isNaN(userId))
      return res.status(400).json({ message: "ID de usuario inválido" });

    const paymentMethods = await paymentMethodService.findByUser(userId);
    res.json(paymentMethods);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al obtener los métodos de pago", error });
  }
};

export const updatePaymentMethod = async (req: Request, res: Response) => {
  try {
    const paymentMethod = await paymentMethodService.update(
      Number(req.params.id),
      req.body
    );
    if (!paymentMethod)
      return res.status(404).json({ message: "Método de pago no encontrado" });
    res.json(paymentMethod);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al actualizar el método de pago", error });
  }
};

export const deletePaymentMethod = async (req: Request, res: Response) => {
  try {
    const deleted = await paymentMethodService.delete(Number(req.params.id));
    if (!deleted)
      return res.status(404).json({ message: "Método de pago no encontrado" });
    res.json({ message: "Método de pago eliminado" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error al eliminar el método de pago", error });
  }
};
