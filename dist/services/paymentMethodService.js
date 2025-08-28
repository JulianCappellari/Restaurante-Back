"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const PaymentMethod_1 = __importDefault(require("../models/PaymentMethod"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const SALT_ROUNDS = 10;
exports.default = {
    async create(data) {
        let cardNumberHash, cvvHash, last4;
        if (data.cardNumber) {
            last4 = data.cardNumber.slice(-4);
            cardNumberHash = await bcrypt_1.default.hash(data.cardNumber, SALT_ROUNDS);
        }
        if (data.cvv) {
            cvvHash = await bcrypt_1.default.hash(data.cvv, SALT_ROUNDS);
        }
        return await PaymentMethod_1.default.create({
            ...data,
            cardNumber: cardNumberHash,
            last4,
            cvv: cvvHash,
        });
    },
    async findAll() {
        return await PaymentMethod_1.default.findAll({ attributes: { exclude: ['cardNumber', 'cvv'] } });
    },
    async findByUser(userId) {
        return await PaymentMethod_1.default.findAll({
            where: { userId },
        });
    },
    async update(id, data) {
        const paymentMethod = await PaymentMethod_1.default.findByPk(id);
        if (!paymentMethod)
            return null;
        let cardNumberHash, cvvHash, last4;
        if (data.cardNumber) {
            last4 = data.cardNumber.slice(-4);
            cardNumberHash = await bcrypt_1.default.hash(data.cardNumber, SALT_ROUNDS);
        }
        if (data.cvv) {
            cvvHash = await bcrypt_1.default.hash(data.cvv, SALT_ROUNDS);
        }
        return await paymentMethod.update({
            ...data,
            cardNumber: cardNumberHash || paymentMethod.cardNumber,
            last4: last4 || paymentMethod.last4,
            cvv: cvvHash || paymentMethod.cvv,
        });
    },
    async delete(id) {
        const paymentMethod = await PaymentMethod_1.default.findByPk(id);
        if (!paymentMethod)
            return null;
        await paymentMethod.destroy();
        return true;
    },
};
