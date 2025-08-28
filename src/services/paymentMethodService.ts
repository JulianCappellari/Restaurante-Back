import PaymentMethod from '../models/PaymentMethod';
import { CreatePaymentMethodDto, UpdatePaymentMethodDto } from '../dto/paymentMethod.dto';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export default {
  async create(data: CreatePaymentMethodDto) {
    let cardNumberHash, cvvHash, last4;
    if (data.cardNumber) {
      last4 = data.cardNumber.slice(-4);
      cardNumberHash = await bcrypt.hash(data.cardNumber, SALT_ROUNDS);
    }
    if (data.cvv) {
      cvvHash = await bcrypt.hash(data.cvv, SALT_ROUNDS);
    }
    return await PaymentMethod.create({
      ...data,
      cardNumber: cardNumberHash,
      last4,
      cvv: cvvHash,
    });
  },

  async findAll() {
    return await PaymentMethod.findAll({ attributes: { exclude: ['cardNumber', 'cvv'] } });
  },

  async findByUser(userId: number) {
  return await PaymentMethod.findAll({
    where: { userId },
  });
},

  async update(id: number, data: UpdatePaymentMethodDto) {
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) return null;
    let cardNumberHash, cvvHash, last4;
    if (data.cardNumber) {
      last4 = data.cardNumber.slice(-4);
      cardNumberHash = await bcrypt.hash(data.cardNumber, SALT_ROUNDS);
    }
    if (data.cvv) {
      cvvHash = await bcrypt.hash(data.cvv, SALT_ROUNDS);
    }
    return await paymentMethod.update({
      ...data,
      cardNumber: cardNumberHash || paymentMethod.cardNumber,
      last4: last4 || paymentMethod.last4,
      cvv: cvvHash || paymentMethod.cvv,
    });
  },

  async delete(id: number) {
    const paymentMethod = await PaymentMethod.findByPk(id);
    if (!paymentMethod) return null;
    await paymentMethod.destroy();
    return true;
  },
};