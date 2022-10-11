import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";

const esRoleValido = async(rol = '') => {
        
    const existeRol = await Rol.findOne({ rol });
   
    if (!existeRol ){
        throw new Error(`El rol ${rol} no está registrado en la BD`);
    }
};

const validarMail = async(correo) => {

const existeEmail = await Usuario.findOne({ correo });
    if(existeEmail){
        throw new Error(`Este correo ya está registrado en la base de datos`);
    }
};

export {
    esRoleValido,
    validarMail
}