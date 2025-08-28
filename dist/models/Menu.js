"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
class Menu extends sequelize_1.Model {
    // Model initialization
    static initialize(sequelize) {
        Menu.init({
            id: {
                type: sequelize_1.DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nameDish: {
                type: sequelize_1.DataTypes.STRING(255),
                allowNull: false,
            },
            price: {
                type: sequelize_1.DataTypes.DECIMAL(10, 2),
                allowNull: false,
            },
            available: {
                type: sequelize_1.DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true,
            },
            imageUrl: {
                type: sequelize_1.DataTypes.STRING,
                allowNull: true,
            },
            typeDish: {
                type: sequelize_1.DataTypes.ENUM('Entrada', 'Plato Principal', 'Postre', 'Bebida', 'Ensalada', 'Guarnicion'),
                allowNull: false,
            },
        }, {
            sequelize,
            modelName: 'Menu',
            tableName: 'menus',
            timestamps: true,
            underscored: true,
        });
    }
    // Model associations
    static associate(models) {
        Menu.hasMany(models.DishCustomization, {
            foreignKey: 'menuId',
            as: 'customizations',
            onDelete: 'CASCADE',
        });
    }
}
exports.default = Menu;
