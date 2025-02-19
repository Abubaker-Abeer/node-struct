import { Router } from "express";
import auth from '../../../SRC/middleware/auth-token.js';
import {getblog,createblog,getdetails} from '../blog/controller.js'
import {asyncHandler} from '../../../SRC/utils/catcherror.js';
import  { createblogschema,getdetailsschema } from './validation.js';
import validation from'../../middleware/validation.js'

const router = Router();

router.get('/', asyncHandler(getblog));
router.get('/:id',validation(getdetailsschema),asyncHandler(getdetails));
router.post('/',validation(createblogschema),asyncHandler(createblog)); 
 export default router;