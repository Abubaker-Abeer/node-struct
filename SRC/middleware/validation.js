const validation =(schema)=>{
 
    return(req, res, next)=>{
        try{
            const result = schema.validate(req.body ,{abortEarly: false});

            if (result.error) {
               return res.status(400).json({message:"validation erorr",error:result.error})
            }
            else{
                next();
            }
           }

        catch(error){
            console.error("validation error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }}
}

export default validation;