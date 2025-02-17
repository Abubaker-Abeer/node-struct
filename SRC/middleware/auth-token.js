import jwt from "jsonwebtoken"; 

const auth =()=>{
 
    return(req, res, next)=>{
        try{
        const authHeader = req.headers.authorization;
        
                
                if (!authHeader || !authHeader.startsWith("Bearer ")) {
                    console.error("Invalid Authorization Header:", authHeader);
                    return res.status(401).json({ message: "No token provided or invalid format" });
                }
        
               
                let token = authHeader.split(" ")[1];
                token = token.replace(/<|>/g, "").trim(); 
                console.log("Extracted and Cleaned Token:", token);
        
                
                let decoded;
                try {
                    decoded = jwt.verify(token, "your-secret-key");
                    console.log("✅ Decoded Token:", decoded); 
               //     return res.json({ message: decoded});
                    console.log("Decoded Token:", decoded);
                } catch (error) {
                    console.error("JWT Verification Error:", error);
                    if (error.name === "TokenExpiredError") {
                        return res.status(401).json({ message: "Token expired" });
                    }
                    if (error.name === "JsonWebTokenError") {
                        return res.status(401).json({ message: "Invalid token" });
                    }
                    return res.status(500).json({ message: "Internal server error" });
                }
        
                if (decoded.role !== 'admain') {
                    console.error("Unauthorized role:", decoded.role);
                    return res.status(403).json({ message: "Not authorized" });
                }
                req.id=decoded.id;
next();    
}

        catch(error){
            console.error("Authentication error:", error);
            return res.status(500).json({ message: "Internal server error" });
        }}
}

export default auth;