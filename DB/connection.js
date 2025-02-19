import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('freedb_node10', 'freedb_abeer@2001', 'C%u?BQnwbfZ8Hs?', {
  host: 'sql.freedb.tech',
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