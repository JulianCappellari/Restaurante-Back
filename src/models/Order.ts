import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbConfig';
import type User from './User';
import type Address from './Address';
import PaymentMethod from './PaymentMethod';
import type OrderItem from './OrderItem';

export interface OrderAttributes {
  id: number;
  customerId: number;
  date: Date;
  state: 'received' | 'preparing' | 'ready' | 'on_the_way' | 'delivered';
  total_amount: number;
  deliveryType: 'in_place' | 'delivery';
  addressId: number | null;
  paymentType: 'cash' | 'card' | 'mp';
  paymentMethodId: number | null;

  // Asociaciones (solo tipado)
  customer?: User;
  deliveryAddress?: Address;
  paymentMethod?: PaymentMethod;
  items?: OrderItem[];
}

type OrderCreationAttributes = Optional<OrderAttributes, 'id' | 'addressId' | 'paymentMethodId'>;

class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public customerId!: number;
  public date!: Date;
  public state!: 'received' | 'preparing' | 'ready' | 'on_the_way' | 'delivered';
  public total_amount!: number;
  public deliveryType!: 'in_place' | 'delivery';
  public addressId!: number | null;
  public paymentType!: 'cash' | 'card' | 'mp';
  public paymentMethodId!: number | null;

  // Asociaciones (solo tipado)
  public readonly customer?: User;
  public readonly deliveryAddress?: Address;
  public readonly paymentMethod?: PaymentMethod;
  public readonly items?: OrderItem[];
}

Order.init(
  {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    customerId: { type: DataTypes.INTEGER, allowNull: false },
    date: { type: DataTypes.DATE, allowNull: false },
    state: {
      type: DataTypes.ENUM('received', 'preparing', 'ready', 'on_the_way', 'delivered'),
      allowNull: false,
    },
    total_amount: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
    deliveryType: {
      type: DataTypes.ENUM('in_place', 'delivery'),
      allowNull: false,
    },
    addressId: { type: DataTypes.INTEGER, allowNull: true },
    paymentType: {
      type: DataTypes.ENUM('cash', 'card', 'mp'),
      allowNull: false,
    },
    paymentMethodId: { type: DataTypes.INTEGER.UNSIGNED, allowNull: true }, // FK → payment_methods.id (UNSIGNED)
  },
  {
    sequelize,
    modelName: 'Order',
    tableName: 'orders',
    timestamps: false,
  }
);

// Regla: efectivo ⇒ sin paymentMethodId. Tarjeta/MP ⇒ método válido del mismo usuario y tipo coincidente.
Order.addHook('beforeValidate', async (order: Order) => {
  if (order.paymentType === 'cash') {
    order.paymentMethodId = null;
    return;
  }

  if (!order.paymentMethodId) {
    throw new Error('paymentMethodId es requerido para paymentType distinto de cash');
  }

  const pm = await PaymentMethod.findByPk(order.paymentMethodId);
  if (!pm) throw new Error('paymentMethodId no existe');
  if (pm.userId !== order.customerId) {
    throw new Error('paymentMethodId no pertenece al usuario');
  }

  // pm.type: 'card' | 'mp'  debe coincidir con paymentType
  if (pm.type !== order.paymentType) {
    throw new Error('paymentType no coincide con el tipo del método de pago');
  }
});

export default Order;
