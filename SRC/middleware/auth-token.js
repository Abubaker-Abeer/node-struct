import jwt from "jsonwebtoken"; 

const auth =()=>{
 
    return(req, res, next)=>{
      
        const authHeader = req.headers.authorization;
        
                
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    console.error("Invalid Authorization Header:", authHeader);
                    return res.status(401).json({ message: "No token provided or invalid format" });
                }
        
               
                let token = authHeader.split(" ")[1];
                token = token.replace(/<|>/g, "").trim(); 
                console.log("Extracted and Cleaned Token:", token);
        
                
                let decoded;
            
                    decoded = jwt.verify(token, "your-secret-key");
                    console.log("✅ Decoded Token:", decoded); 
               //     return res.json({ message: decoded});
                    console.log("Decoded Token:", decoded);
                
        
                if (decoded.role !== 'admain') {
                    console.error("Unauthorized role:", decoded.role);
                    return res.status(403).json({ message: "Not authorized" });
                }
                req.id=decoded.id;
next();    
}

        
}

export default auth;