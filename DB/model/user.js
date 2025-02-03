import { DataTypes} from 'sequelize';
import {sequelize } from '../connection.js';


const Usern = sequelize.define('Usern', 
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
  City: {
    type: DataTypes.STRING,
  },
  Phone: {
    type: DataTypes.STRING,
  },
  NationalID: {
    type: DataTypes.STRING, 
    allowNull: true, 
    unique: true,
  },
  Image: {
    type: DataTypes.TEXT('medium'), 
    allowNull: true, 
  },
  Bio: {
    type: DataTypes.TEXT('medium'), 
    allowNull: true, 
  },
  UserType: {
    type: DataTypes.STRING, 
    allowNull: true, 
  },
  LastSeen: {
    type: DataTypes.DATE, 
    allowNull: true, 
  },
  Verified: {
    type: DataTypes.BOOLEAN, 
    defaultValue: false, 
  },
  Relationship: {
    type: DataTypes.STRING, // Adding the Relationship column
    allowNull: true,
  },
}, {
  timestamps: false, 
});


export default Usern;
