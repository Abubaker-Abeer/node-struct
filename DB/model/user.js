import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';

const Usern = sequelize.define(
  'Usern',
  {
    UserID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    UserName: {
      type: DataTypes.STRING,
    },
    Email: {
      type: DataTypes.STRING,
      unique: true,
    },
    Passwords: {
      type: DataTypes.STRING,
    },
    role:{
      type: DataTypes.ENUM('user','admain'),
      defaultValue:'user',
      allowNull: false,
    },
    img:{
        type: DataTypes.STRING,
        allowNull: true,
       
    }
  },
  {
    timestamps: false, 
  }
);

export default Usern;
