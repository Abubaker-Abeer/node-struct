/*import multer from 'multer'
import { nanoid } from 'nanoid'

function fileUpload() {

    const storage = multer.diskStorage({
        destination: (req, res, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            const uniqueSuffix = nanoid() + "_" + Date.now();
            cb(null, uniqueSuffix + "_" + file.originalname);
        }
    });

    const upload = multer({ storage });

    return upload;
}

export default fileUpload;
*/

import multer from 'multer';
import { nanoid } from 'nanoid';

function fileUpload() {

    const storage = multer.diskStorage({});

    function fileFilter(req, file, cb) {
        if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
            cb(null, true);
        } else {
            cb("invalid format", false);
        }
    }

    const upload = multer({ fileFilter, storage });

    return upload;
}

export default fileUpload;
