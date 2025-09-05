
import {Model, DataTypes, Optional} from 'sequelize'
import sequelize from '../config/dbConfig' 
import Order from './Order';
import PaymentMethod from './PaymentMethod';

// Definir los atributos del modelo User
interface UserAttributes {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    password: string;
    role: 'Administrator' | 'Waiter' | 'Customer' | 'Receptionist' | 'Chef';
    // Asociaciones
    orders?: Order[];
    paymentMethods?: PaymentMethod[];
  }
  
// Definir los atributos que se pueden crear (sin el 'id')
interface UserCreationAttributes extends Optional<UserAttributes, 'id'> {}
  
// La clase User extiende de Model y usa los tipos definidos
class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
    public id!: number;
    public firstName!: string;
    public lastName!: string;
    public email!: string;
    public phone!: string;
    public password!: string;
    public role!: 'Administrator' | 'Waiter' | 'Customer' | 'Receptionist'| 'Chef';
    
    // Timestamps
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
    
    // Asociaciones
    public readonly orders?: Order[];
    public readonly paymentMethods?: PaymentMethod[];
    
    // Métodos de instancia pueden ir aquí
    public getFullName(): string {
        return `${this.firstName} ${this.lastName}`;
    }
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
    role:{
        type: DataTypes.ENUM('Administrator', 'Waiter', 'Customer', 'Receptionist', 'Chef'),
        allowNull: false
    },
    
},{
    sequelize,
    modelName: 'User',
    tableName: 'users',
})

export default User