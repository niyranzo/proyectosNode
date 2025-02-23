import User from "../models/User.js";

const addUser = async (req, res) => {
    try {
        const {username, password} = req.body;
        const user = new User({username, password});
        await user.save();
        res.status(201).json({messaje:"Usuario añadido"});
    } catch (error) {
        res.status(400).json({messaje:"Error al añadir usuario"});
    }
}

const getUserProfile = async (req,res) => {
    try {
        const user = await User.findById(req.userId).select("-password"); //para q no devuelva la contraseña 
        if(!user){
            return res.status(404).json({messaje: "El usuario no existe"}); 
        }
        res.json({id:user._id, username:user.username});
    } catch (error) {
        res.status(400).json({messaje:"Error al obtener el perfil del usuario"});   
    }
}

export {addUser, getUserProfile};