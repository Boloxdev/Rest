import { json, response } from "express";
import bcryptjs from "bcryptjs";
import Usuario from "../models/Usuario.js";
import { generarJWT } from "../helpers/generarJWT.js";
import { googleVerify } from "../helpers/google-verify.js";

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

const googleSignIn = async(req,res) => {
    const {id_token} = req.body;

    try {
        const {correo, nombre, img} = await googleVerify(id_token);
        
        let usuario = await Usuario.findOne({ correo });
        
        if( !usuario ){
            const data = {
                nombre,
                correo,
                password: '..',
                img,
                rol: 'USER_ROLE',
                google: true
            };
            usuario = new Usuario(data);

            await usuario.save();
        }

        if(!usuario.estado){
            return res.status(401).json({
                msg: 'Usuario bloqueado, hable con el administrador'
            })
        }

        const token = await generarJWT(usuario.id);

         res.json({
             usuario,
             token
         })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El token no se verifico'
        })
    }

}

export {
    login,
    googleSignIn
}