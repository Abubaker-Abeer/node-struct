import Joi from "joi";

const createblogschema = Joi.object({
    title: Joi.string().min(3).max(10).required(),
    description: Joi.string().min(10).required(),
});
const getdetailsschema = Joi.object({
    id: Joi.number().min(1).required(),
    
});




export {createblogschema,getdetailsschema};