import { Router } from "express";
import bcrypt  from 'bcryptjs';

import user from '../../../DB/model/user.js';
import { where } from "sequelize";
const router = Router();
router.get('/',async (req, res) => {
    const users = await user.findAll();
    return res.status(200).json({message:"success",users})
   });
   router.post('/',async (req, res) => {
    const{UserName,Email,Passwords} =req.body;
    var salt = bcrypt.genSaltSync(8);
const hash = bcrypt.hashSync(Passwords, salt);
await user.create({ UserName, Email, Passwords: hash });
return res.status(201).json({message:"success"})

   });

  /* router.post('/login',async (req, res) => {
    const{Email,Passwords} =req.body;
   const users= await user.findOne({
    where:{Email:Email},
})
if (!user) {
    return res.status(404).json({ message: "invalid email" });
  }

  const isPasswordValid = await bcrypt.compare(Passwords, user.Passwords);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "invalid password" });
    } 

return res.status(201).json(users)

   });*/

   router.post("/login", async (req, res) => {
    try {
      const { Email, Passwords } = req.body;
  
     
      const foundUser = await user.findOne({ where: { Email } });
  
      
      if (!foundUser) {
        return res.status(404).json({ message: "Invalid email" });
      }
  
                                                                     if (!foundUser.Passwords) {
        return res.status(500).json({ message: "Password field is missing in database" });
      }
  
      const isPasswordValid = await bcrypt.compare(Passwords, foundUser.Passwords);
      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }
  
   
      return res.status(200).json({ message: "Login successful", user: foundUser });
  
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
});

   export default router;