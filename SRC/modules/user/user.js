import { Router } from "express";
import user from '../../../DB/model/user.js';
const router = Router();
router.get('/',async (req, res) => {
    const users = await user.findAll();
    return res.status(200).json({message:"success",users})
   } )

   export default router;