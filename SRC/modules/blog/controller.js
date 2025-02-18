import Blog from '../../../DB/model/blog.js';
import Usern from '../../../DB/model/user.js';
import {AppError} from '../../../SRC/utils/AppError.js';

export const getblog = async (req, res) =>{
    const blogs = await Blog.findAll({
      attributes:['id','title'],
      include:{model:Usern,
      attributes:['UserID','UserName']}
    });
    return res.status(200).json({message:'Success',blogs})    

}
export const createblog =  async (req, res,next) => {
  
      const ID= req.id; 
        const { title, description } = req.body;

      
        if (!title || !description) {
      //      return res.status(400).json({ message: "Title and description are required." });
      return next(new AppError(400, "Title and description are required."));
        }

      
        const blog = await Blog.create({
            title,
            description,
            UserID: ID 
        });
        console.log('id',ID)

        return res.status(201).json({ message: 'Success', blog });
    
}
export const getdetails = async(req, res, next) => {
  const {id} = req.params;
  const blogs= await Blog.findByPk(id)
  if(blogs==null){
    return next(new AppError(404, "Blog not found."));
  }
  return res.status(200).json({message: 'Success',blog: blogs})
}