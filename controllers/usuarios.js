import { response } from "express";

const usuariosGet = (req, res = response) => {
    const params = req.query;
    res.json({
        msg: "get API - desde controlador"
    });
}

const usuariosPut = (req, res = response) => {
    const id = req.params.id;

    res.json({
        msg: "put API - desde controlador",
        id
    });
}

const usuariosPost = (req, res = response) => {
    
    const {nombre, edad} = req.body;
    
    res.json({
        msg: "post API - desde controlador",
        nombre,
        edad
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