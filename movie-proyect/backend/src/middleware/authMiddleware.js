import jwt from "jsonwebtoken";
// middleware para verificar el token 

const authMiddleware = async (req, res, next) => {
    try {
        // extraemos el token
        const token = req.cookie.token;
        if(!token){
            return res.status(402).json({messaje:"Acceso Denegado"});
        }
        // verificar el token
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.userId = verified.userId;
        next();
    } catch (error) {
        res.status(400).json({messaje:"Token no valido o expirado"})
    }
}

export default authMiddleware;
