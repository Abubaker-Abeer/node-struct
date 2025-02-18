import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('node10', 'root', '', {
  host: 'localhost',
  dialect: 'mysql',
});

export const connectdb = () => {
  sequelize.sync()
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((error) => {
      console.error("Unable to connect to database:", error);
    });
};