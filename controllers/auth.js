import { response } from "express";
import bcryptjs from "bcryptjs";
import Usuario from "../models/Usuario.js";
import { generarJWT } from "../helpers/generarJWT.js";

const login = async(req, res = response) => {

    const { correo, password } = req.body;

    try {
        //verificar si el mail existe
        const usuario = await Usuario.findOne({correo});
        if(!usuario){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Correo'
            });
        }
        //verificar si el user está activo
        if(!usuario.estado){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Estado'
            });
        }
        //Verificar la pass
        const validPassword = bcryptjs.compareSync(password, usuario.password);
        if(!validPassword){
            return res.status(400).json({
                msg: 'Usuario / Password no son correctos - Password'
            });
        }
        //Generar el JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        })

    } catch (error) {
        console.log(error);

        return res.status(500).json ({
            msg: "Algo salio mal"
        })    
    }

    
}

export {
    login
}