import { Router } from "express";
import auth from '../../../SRC/middleware/auth-token.js';
import {getblog,createblog} from '../blog/controller.js'
const router = Router();

router.get('/', getblog)

router.post('/', auth(),createblog);

   export default router;