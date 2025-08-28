'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Check if the column already exists to avoid errors
    const [results] = await queryInterface.sequelize.query(
      "SHOW COLUMNS FROM `dish_customizations` LIKE 'isActive'"
    );
    
    if (results.length === 0) {
      await queryInterface.addColumn('dish_customizations', 'isActive', {
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: true
      });
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('dish_customizations', 'isActive');
  }
};
