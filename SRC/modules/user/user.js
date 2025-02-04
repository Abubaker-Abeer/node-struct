import { Router } from "express";
import bcrypt  from 'bcryptjs';
import jwt from "jsonwebtoken"; 
import user from '../../../DB/model/user.js';
import { where } from "sequelize";
import auth from '../../../SRC/middleware/auth-token.js';

const router = Router();

   router.get('/',auth(),async (req, res) => {
    const users = await user.findAll({
        attributes: ["UserName", "Email"],
      
    });
    return res.status(200).json({message:"success",users})
   });
 

router.delete('/:id',auth(), async (req, res) => {
    try {
        const id = req.params.id;

        const userToDelete = await user.findByPk(id);
        if (!userToDelete) {
            console.error("User not found with ID:", id);
            return res.status(404).json({ message: "User not found" });
        }

    
        await userToDelete.destroy();
        console.log("User deleted successfully:", id);
        return res.status(200).json({ message: "User deleted successfully" });

    } catch (error) {
        console.error("Error in DELETE /:id:", error);
        return res.status(500).json({ message: "Internal server error" });
    }
});

   export default router;