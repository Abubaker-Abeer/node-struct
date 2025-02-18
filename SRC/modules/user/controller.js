
import user from '../../../DB/model/user.js';
import cloudinary from '../../utils/cloudinary.js'; 
export const getusers = async (req, res) => {
    const users = await user.findAll({
        attributes: ["UserName", "Email"],
      
    });
    return res.status(200).json({message:"success",users})
   }
export const createblog =  async (req, res) => {

}
export const deleteuser=async (req, res) => {
   
        const id = req.params.id;

        const userToDelete = await user.findByPk(id);
        if (!userToDelete) {
            console.error("User not found with ID:", id);
            return res.status(404).json({ message: "User not found" });
        }

    
        await userToDelete.destroy();
        console.log("User deleted successfully:", id);
        return res.status(200).json({ message: "User deleted successfully" });

   
}
export const updateuserimg=async (req, res) => {
    const id = req.params.id;
    const users= await user.findByPk(id);
    if (users==null) {
      
        return res.status(404).json({ message: "User not found" });
    }

   const{url}= await cloudinary.uploader.upload(req.file.path);
    users.img=url;
    await users.save();
    res.status(200).json({message:"success"});
}