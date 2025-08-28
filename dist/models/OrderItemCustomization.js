"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const dbConfig_1 = __importDefault(require("../config/dbConfig"));
class OrderItemCustomization extends sequelize_1.Model {
    // Associations will be set up in the models/index.ts file
    static associate(models) {
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
        type: sequelize_1.DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    orderItemId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'order_items',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    customizationId: {
        type: sequelize_1.DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'dish_customizations',
            key: 'id',
        },
        onDelete: 'CASCADE',
    },
    isIncluded: {
        type: sequelize_1.DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true,
    },
    notes: {
        type: sequelize_1.DataTypes.STRING(255),
        allowNull: true,
    },
}, {
    sequelize: dbConfig_1.default,
    modelName: 'OrderItemCustomization',
    tableName: 'order_item_customizations',
    timestamps: true,
    underscored: true,
});
exports.default = OrderItemCustomization;
