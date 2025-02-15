import { Router } from "express";
import bcrypt  from 'bcryptjs';
import jwt from "jsonwebtoken"; 
import user from '../../../DB/model/user.js';
import  { registerschema, loginschema } from './auth.validation.js';
import validation from'../../middleware/validation.js'
import { sendemail } from "../../utils/sendemail.js";
const router = Router();




router.post('/Register', validation(registerschema),async (req, res) => {
  try {
      const { UserName, Email, Passwords } = req.body;
    /*  const result = registerschema.validate({ UserName, Email, Passwords },{abortEarly: false});

      if (result.error) {
          return res.status(400).json({ message: result.error.details[0].message });
      }
*/
      var salt = bcrypt.genSaltSync(8);
      const hash = bcrypt.hashSync(Passwords, salt);

      await user.create({ UserName, Email, Passwords: hash });

      return res.status(201).json({ message: "success" });
  } catch (err) {
      console.log(err);
      return res.status(400).json({ message: err.message });
  }
});

router.post("/login" ,validation(loginschema),async (req, res) => {
    try {
      const { Email, Passwords } = req.body;
  /*    const result = registerschema.validate({ Email, Passwords },{abortEarly: false});

      if (result.error) {
          return res.status(400).json({ message: result.error.details[0].message });
      }
*/
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
  
      const token = jwt.sign(
        { id: foundUser.id, email: foundUser.Email ,UserName:foundUser.UserName ,role:foundUser.role}, 
        "your-secret-key", 
        { expiresIn: "1h" } 
      );
      sendemail(Email)
      return res.status(200).json({ message: "Login successful", token });
  
    } catch (error) {
      console.error("Login error:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  });

  
   export default router;