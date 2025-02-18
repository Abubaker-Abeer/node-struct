import Blog from '../../../DB/model/blog.js';
import Usern from '../../../DB/model/user.js';

export const getblog = async (req, res) =>{
    const blogs = await Blog.findAll({
      attributes:['id','title'],
      include:{model:Usern,
      attributes:['UserID','UserName']}
    });
    return res.status(200).json({message:'Success',blogs})    

}
export const createblog =  async (req, res) => {
  
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
    
}