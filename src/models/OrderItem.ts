import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../config/dbConfig';

interface IOrderItemAttributes {
  id: number;
  order_id: number | null;
  menu_id: number | null;
  quantity: number;
  price: number;
  notes: string | null;
  // Removed timestamps from the interface as they're handled by Sequelize
  customizations?: any[];
}

type IOrderItemCreationAttributes = Optional<IOrderItemAttributes, 'id'>;

class OrderItem extends Model<IOrderItemAttributes, IOrderItemCreationAttributes> implements IOrderItemAttributes {
  public id!: number;
  public order_id!: number | null;
  public menu_id!: number | null;
  public quantity!: number;
  public price!: number;
  public notes!: string | null;
  // Timestamps are handled by Sequelize options below
  public customizations?: any[];

  public static associate(models: any) {
    OrderItem.hasMany(models.OrderItemCustomization, {
      foreignKey: 'order_item_id',
      as: 'customizations'
    });
  }
}

OrderItem.init({
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  order_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'order_id',
    references: {
      model: 'orders',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  menu_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
    field: 'menu_id',
    references: {
      model: 'menus',
      key: 'id',
    },
    onDelete: 'SET NULL',
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  notes: {
    type: DataTypes.STRING(255),
    allowNull: true,
  }
}, {
  sequelize,
  modelName: 'OrderItem',
  tableName: 'order_items',
  timestamps: false,
  underscored: true,
  
});

export default OrderItem;
