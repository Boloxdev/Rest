import Categoria from "../models/Categoria.js";
import Rol from "../models/Rol.js";
import Usuario from "../models/Usuario.js";
import Producto from "../models/Producto.js";

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


const existeUsuarioPorId = async(id) => {

    const existeUsuario = await Usuario.findById(id );
        if(!existeUsuario){
            throw new Error(`El id ${id} no existe`);
        }
};

const existeCategoriaPorId = async(id) => {

    const existeCategoria = await Categoria.findById(id );
        if(!existeCategoria){
            throw new Error(`El id ${id} no existe`);
        }
};

const existeProductoPorId = async(id) => {

    const existeProducto = await Producto.findById(id );
        if(!existeProducto){
            throw new Error(`El id ${id} no existe`);
        }
};

export {
    esRoleValido,
    validarMail,
    existeUsuarioPorId,
    existeCategoriaPorId,
    existeProductoPorId
}