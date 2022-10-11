import { response } from "express";
import Usuario from "../models/Usuario.js";
import bcryptjs from "bcryptjs";
import { validationResult } from "express-validator";
//import { validationResult } from "express-validator";


const usuariosGet = async(req, res = response) => {
   
    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };
   

    const [total, usuarios]= await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
            .skip(Number(desde))
            .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosPut = async(req, res = response) => {
    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra bbdd
    if(password){
        //encriptar la pass
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);
    
    res.json(usuario);
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

const usuariosDelete = async(req, res = response) => {
    const {id}  = req.params;
    //const usuario = await Usuario.bindByIdAndDelete(id) -> borrado físico

    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});
    res.json(usuario);
}

export {
    usuariosGet,
    usuariosPut,
    usuariosPost,
    usuariosDelete
}