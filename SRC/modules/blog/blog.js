import { Router } from "express";
import auth from '../../../SRC/middleware/auth-token.js';
import {getblog,createblog} from '../blog/controller.js'
import {asyncHandler} from '../../../SRC/utils/catcherror.js';
const router = Router();

router.get('/', asyncHandler(getblog));

router.post('/', auth(),asyncHandler(createblog)); 
 export default router;