import { Router } from "express";
import bcrypt  from 'bcryptjs';
import jwt from "jsonwebtoken"; 
import user from '../../../DB/model/user.js';
import { where } from "sequelize";

const router = Router();

   router.get('/',async (req, res) => {
    const users = await user.findAll({
        attributes: ["UserName", "Email"],
      
    });
    return res.status(200).json({message:"success",users})
   });
  /*
    router.delete('/:id', async (req, res) => {
        try {
            const id = req.params.id;
    
            // استخراج التوكن من الهيدر
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({ message: "No token provided or invalid format" });
            }
    
            const token = authHeader.split(" ")[1];
            const decoded = jwt.verify(token, "your-secret-key");
    
            // تحقق من صلاحية المستخدم
            if (decoded.role !== 'admain') {
                return res.status(403).json({ message: 'Not authorized' });
            }
    
            // جلب المستخدم من قاعدة البيانات
            const userToDelete = await user.findByPk(id);
            if (!userToDelete) {
                return res.status(404).json({ message: 'User not found' });
            }
    
            await userToDelete.destroy();
            return res.status(200).json({ message: 'User deleted successfully' });
    
        } catch (error) {
            console.error(error);
            return res.status(500).json({ message: "Internal server error" });
        }
    });
    
*/

router.delete('/:id', async (req, res) => {
    try {
        const id = req.params.id;

        
        const authHeader = req.headers.authorization;

        
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            console.error("Invalid Authorization Header:", authHeader);
            return res.status(401).json({ message: "No token provided or invalid format" });
        }

       
        let token = authHeader.split(" ")[1];
        token = token.replace(/<|>/g, "").trim(); 
        console.log("Extracted and Cleaned Token:", token);

        
        let decoded;
        try {
            decoded = jwt.verify(token, "your-secret-key");
            console.log("Decoded Token:", decoded);
        } catch (error) {
            console.error("JWT Verification Error:", error);
            if (error.name === "TokenExpiredError") {
                return res.status(401).json({ message: "Token expired" });
            }
            if (error.name === "JsonWebTokenError") {
                return res.status(401).json({ message: "Invalid token" });
            }
            return res.status(500).json({ message: "Internal server error" });
        }

        if (decoded.role !== 'admain') {
            console.error("Unauthorized role:", decoded.role);
            return res.status(403).json({ message: "Not authorized" });
        }

        
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