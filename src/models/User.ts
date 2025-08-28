
import {Model, DataTypes, Optional} from 'sequelize'
import sequelize from '../config/dbConfig' 


// Definir los atributos del modelo User
interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    rol: 'Administrator' | 'Waiter' | 'Customer';
  }
  
  // Definir los atributos que se pueden crear (sin el 'id')
  interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
  
  // La clase User extiende de Model y usa los tipos definidos
  class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;  // Definir explícitamente la propiedad 'id' como no opcional
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
    public rol!: 'Administrator' | 'Waiter' | 'Customer';
  }

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    firstName:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    lastName:{
        type: DataTypes.STRING(255),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    phone: {
        type: DataTypes.STRING(20),
        allowNull: false
    },
    password: {
        type: DataTypes.STRING(255),
        allowNull: false
    },
    rol:{
        type: DataTypes.ENUM('Administrator', 'Waiter', 'Customer'),
        allowNull: false
    },
    
},{
    sequelize,
    modelName: 'User',
    tableName: 'Users',
})

export default User