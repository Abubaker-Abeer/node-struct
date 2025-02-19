/*const validation =(schema)=>{
 
    return(req, res, next)=>{
       const methods=['body','params']
       const errors =[];
       methods.forEach(key => {
        if (schema[key] ){
            const result = schema[key].validate(req[key], { abortEarly: false });
            if (result.error) {
                errors.push(result.error);
            }
        }
    })
        if (errors.length > 0){
             return next(new AppError(400, errors));
        }

        next()
        
}

}

export default validation;*/
/*const validation = (schema) => {
    return (req, res, next) => {
        const methods = ['body', 'params'];
        const errors = [];

        methods.forEach((key) => {
            if (schema[key]) {
                const validate = schema[key].validate(req[key], { abortEarly: false });

                if (validate.error) {
                    errors.push(validate.error);
                }
            }
        });

        if (errors.length > 0) {
            return next(new AppError(400, errors)); 
        }

        next();
    };
};

export default validation;
*/
import { AppError } from "../utils/AppError.js";

const validation = (schema) => {
    return (req, res, next) => {
        const inputData = { ...req.body, ...req.params };
        
        const validateResult = schema.validate(inputData, { abortEarly: false });

        if (validateResult?.error) {
            return next(new AppError(400,validateResult.error));
        }
        
        next();
    };
};

export default validation;
