/*import { Sequelize } from 'sequelize';
export const sequelize = new Sequelize('freedb_node10', 'freedb_abeer@2001', 'C%u?BQnwbfZ8Hs?', {
  host: 'sql.freedb.tech',
  port: 3306,  // ✅ أضف هذا السطر مرة أخرى
  dialect: 'mysql',
  logging: false, 
});

export const connectdb = () => {
  sequelize.sync()
    .then(() => {
      console.log("Database connection successful");
    })
    .catch((error) => {
      console.error("Unable to connect to database:", error);
    });
};*/
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('freedb_node10', 'freedb_abeer@2001', 'C%u?BQnwbfZ8Hs?', {
  host: 'sql.freedb.tech',
  port: 3306,  // ✅ تأكد من إضافة المنفذ
  dialect: 'mysql',
  logging: false, 
});

// ✅ وظيفة الاتصال مع اختبار `authenticate()`
export const connectdb = async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Database connected successfully.");

    await sequelize.sync();
    console.log("✅ Database synchronized.");
  } catch (error) {
    console.error("❌ Unable to connect to the database:", error);
  }
};
