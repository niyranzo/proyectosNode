// controladores de autenticacion
// libreria para generar y verificar jwt 
import jwt from "jsonwebtoken";
import User from "../models/User.js";
// controlador para iniciar sesion
const login = async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).json({ messaje: "Credenciales incorrectas" });
        }
        // generamos un token jwt que incluya mi id y el tiempo de expiración
        const token = jwt.sign({userId:user._id}, process.env.JWT_SECRET, {expiresIn:"1h"});
    
        // creamos la cookie
        res.cookie("token",token, {
            httpOnly:true, 
            secure:process.env.NODE_ENV === "production", //solo en produccion
            maxAge: 3600000, //1 hora
            sameSite:"strict" //previniendo ataques CSRF
        });
        res.json({ success:true, user, token });
    } catch (error) {
        res.status(400).json({ success:false, messaje:"Error en el inicio de sesion"});
    }
}

const register = async (req, res) => {
    try{
        // extraemos el username y password
        const { username, password } = req.body;
        // buscamos el usuario en la base de datos
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(400).json({ message: "El usuario ya existe "});
        }
        // creamos el usuario
        const user = new User({ username, password }); //revisar
    
        await user.save();
        res.status(201).json({ success:true, user });
    }catch (error){
        res.status(400).json({ success:false, messaje:"Error en el registro"});
    }
}

const logout = (req, res) => {
    res.cookie("token", "", {
        httpOnly:true, 
        secure:process.env.NODE_ENV === "production", //solo en produccion
        maxAge:0,
    });
    res.json({ success:true, messaje: "Cierre de sesion exitoso" }); //para q el front compruebe con data.sucess que se cerro sesion
}

export { login, register, logout };