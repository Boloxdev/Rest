import { response } from "express";
import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
//import { validationResult } from "express-validator";


const usuariosGet = (req, res = response) => {
    const params = req.query;
    res.json({
        msg: "get API - desde controlador"
    });
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const { password, google, correo, ...resto } = req.body;

    //TODO validar contra bbdd
    if(password){
        //encriptar la pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    res.json({
        msg: "put API - desde controlador",
        id
    });
}

const usuariosPost = async(req, res = response) => {
    
    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});
    //verificar errores
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors);
    }

    //verificar si el pass existe
    //el codigo iba aqui
    //encriptar la pass
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);
    //guardar en BBDD
    await usuario.save();
    
    res.json({
        msg: "post API - desde controlador",
        usuario
    });
}

const usuariosDelete = (req, res = response) => {
    res.json({
        msg: "delete API - desde controlador"
    });
}

export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}