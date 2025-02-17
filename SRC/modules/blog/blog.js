import { Router } from "express";
import Blog from '../../../DB/model/blog.js';
import auth from '../../../SRC/middleware/auth-token.js';
import Usern from '../../../DB/model/user.js';

const router = Router();

router.get('/', async (req, res) =>{
      const blogs = await Blog.findAll({
        attributes:['id','title'],
        include:{model:Usern,
        attributes:['UserID','UserName']}
      });
      return res.status(200).json({message:'Success',blogs})    
})

router.post('/', auth(), async (req, res) => {
    try {
      const ID= req.id; // ✅ طباعة بيانات المستخدم للتحقق
        const { title, description } = req.body;

        // التحقق مما إذا كانت البيانات مكتملة
        if (!title || !description) {
            return res.status(400).json({ message: "Title and description are required." });
        }

        // هنا المشكلة: ربما req.user غير معرف
        const blog = await Blog.create({
            title,
            description,
            UserID: ID // 🔴 قد تكون req.id غير صحيحة، استخدم req.user.id بدلاً منها
        });
        console.log('id',ID)

        return res.status(201).json({ message: 'Success', blog });
    } catch (error) {
        console.error("Error creating blog:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

   export default router;