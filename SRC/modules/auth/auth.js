import { Router } from "express";
import  { registerschema, loginschema } from './auth.validation.js';
import validation from'../../middleware/validation.js'

import {Register,login} from './controller.js';
const router = Router();
router.post('/Register', validation(registerschema),Register);

router.post("/login" ,validation(loginschema),login);

  
   export default router;