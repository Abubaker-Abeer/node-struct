import { DataTypes } from 'sequelize';
import { sequelize } from '../connection.js';
import Usern from './user.js';
const blog = sequelize.define(
    'Blog',
    {
     title:{
        type: DataTypes.STRING(50),
        allowNull: false,
        unique: true,
     },

     description: {
        type: DataTypes.TEXT,
        allowNull: false,
     }
    },
    {
      timestamps: false, 
    }
  );
  Usern.hasMany(blog, { foreignKey: 'UserID' });
  blog.belongsTo(Usern, { foreignKey: 'UserID' });
  export default blog;
  