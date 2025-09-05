'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Change the column type to include 'Receptionist' in the ENUM
    await queryInterface.sequelize.query(
      "ALTER TABLE users MODIFY COLUMN role ENUM('Administrator', 'Waiter', 'Customer', 'Receptionist') NOT NULL;"
    );
  },

  down: async (queryInterface, Sequelize) => {
    // Revert back to the original ENUM values
    await queryInterface.sequelize.query(
      "ALTER TABLE users MODIFY COLUMN role ENUM('Administrator', 'Waiter', 'Customer') NOT NULL;"
    );
  }
};
