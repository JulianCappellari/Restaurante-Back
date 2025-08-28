"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class DishCustomization extends sequelize_1.Model {
    static initialize(sequelize) {
        DishCustomization.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            menuId: {
                type: sequelize_1.DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'menus',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            name: {
                type: sequelize_1.DataTypes.STRING(100),
                allowNull: false,
            },
            description: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: true,
            },
            isRemovable: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            additionalPrice: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
                defaultValue: 0,
            },
            isDefaultIncluded: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isRequired: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            isActive: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
        }, {
            sequelize,
            modelName: 'DishCustomization',
            tableName: 'dish_customizations',
            timestamps: true,
            underscored: true,
        });
        return DishCustomization;
    }
    static associate(models) {
        DishCustomization.belongsTo(models.Menu, {
            foreignKey: 'menuId',
            as: 'menu',
        });
    }
}
exports.default = DishCustomization;
