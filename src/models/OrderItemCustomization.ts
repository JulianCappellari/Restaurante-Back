import { Model, DataTypes } from 'sequelize';
import sequelize from '../config/dbConfig';

class OrderItemCustomization extends Model {
  public id!: number;
  public orderItemId!: number;
  public customizationId!: number;
  public isIncluded!: boolean;
  public notes!: string | null;
  
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;

  // Associations will be set up in the models/index.ts file
  public static associate(models: any) {
    OrderItemCustomization.belongsTo(models.OrderItem, {
      foreignKey: 'orderItemId',
      as: 'orderItem'
    });
    
    OrderItemCustomization.belongsTo(models.DishCustomization, {
      foreignKey: 'customizationId',
      as: 'customization'
    });
  }
}

OrderItemCustomization.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  orderItemId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'order_items',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  customizationId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'dish_customizations',
      key: 'id',
    },
    onDelete: 'CASCADE',
  },
  isIncluded: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  notes: {
    type: DataTypes.STRING(255),
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'OrderItemCustomization',
  tableName: 'order_item_customizations',
  timestamps: true,
  underscored: true,
});

export default OrderItemCustomization;
