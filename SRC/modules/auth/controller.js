import bcrypt  from 'bcryptjs';
import jwt from "jsonwebtoken"; 
import user from '../../../DB/model/user.js';
import { sendemail } from "../../utils/sendemail.js";
export const Register = async (req, res) => {
  
        const { UserName, Email, Passwords } = req.body;
        var salt = bcrypt.genSaltSync(8);
        const hash = bcrypt.hashSync(Passwords, salt);
  
        await user.create({ UserName, Email, Passwords: hash });
  
        return res.status(201).json({ message: "success" });
    
  }
/*export const login =  async (req, res,next) => {
    
        const { Email, Passwords } = req.body;
        const foundUser = await user.findOne({ where: { Email } });
        console.log("UserID:", foundUser.UserID);
    
        if (!foundUser) {
        //  return res.status(404).json({ message: "Invalid email" });
          return next(new Error(`Invalid email`))
        }
    
        if (!foundUser.Passwords) {
          return res.status(500).json({ message: "Password field is missing in database" });
        }
    
        const isPasswordValid = await bcrypt.compare(Passwords, foundUser.Passwords);
        if (!isPasswordValid) {
          return res.status(401).json({ message: "Invalid password" });
        }
    
        const token = jwt.sign(
          { id: foundUser.UserID, email: foundUser.Email ,UserName:foundUser.UserName ,role:foundUser.role}, 
          "your-secret-key", 
          { expiresIn: "1h" } 
        );
        sendemail(Email)
        return res.status(200).json({ message: "Login successful", token });
    
      
    
}
*/
export const login = async (req, res, next) => {
  try {
      const { Email, Passwords } = req.body;
      
      const foundUser = await user.findOne({ where: { Email } });
      if (!foundUser) {
          return next(new Error("Invalid email"));
      }

      if (!foundUser.Passwords) {
          return next(new Error("Password field is missing in database"));
      }

      const isPasswordValid = await bcrypt.compare(Passwords, foundUser.Passwords);
      if (!isPasswordValid) {
          return next(new Error("Invalid password"));
      }

      const token = jwt.sign(
          { id: foundUser.UserID, email: foundUser.Email, UserName: foundUser.UserName, role: foundUser.role }, 
          "your-secret-key", 
          { expiresIn: "1h" }
      );

      sendemail(Email);
      return res.status(200).json({ message: "Login successful", token });

  } catch (error) {
      next(error); 
  }
};
