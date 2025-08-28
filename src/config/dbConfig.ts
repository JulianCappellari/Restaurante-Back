import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
  process.env.DB_NAME as string,
  process.env.DB_USER as string,
  process.env.DB_PASSWORD as string,
  {
    host: process.env.DB_HOST,
    dialect: 'mysql',
  }
);
// Temporarily disable automatic sync during migration
// sequelize.sync({ force: false, alter: false })
//   .then(() => {
//     console.log('Base de datos sincronizada correctamente');
//   })
//   .catch((error) => {
//     console.error('Error al sincronizar la base de datos:', error);
//   });


export default sequelize;
