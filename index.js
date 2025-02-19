/*import express from 'express';
import initApp from './SRC/index.router.js';
const app=express();
initApp(app,express);


app.listen(3000,()=>{
    console.log(`server is running on port:3000`);
    
});
*/
import express from 'express';
import initApp from './SRC/index.router.js';
import { connectdb } from './DB/connection.js'; // ✅ استيراد دالة الاتصال بقاعدة البيانات

const app = express();

// ✅ الاتصال بقاعدة البيانات قبل بدء تشغيل السيرفر
connectdb();

// ✅ استخدام `process.env.PORT` إذا كان متاحًا، وإلا استخدام `3000`
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`🚀 Server is running on port: ${PORT}`);
});
