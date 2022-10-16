import fs from 'fs';
import { subirArchivo } from "../helpers/subir-archivo.js";
import Producto from "../models/Producto.js";
import Usuario from "../models/Usuario.js";
import path from 'path';
import { fileURLToPath } from 'url';
import { v4 as uuidv4} from 'uuid';
const __dirname = path.dirname(fileURLToPath(import.meta.url));




const cargarArchivo = async(req, res) => {
   

    try {
        // Crear carpeta en la subidaconst nombre = await subirArchivo(req.files, ['txt', 'md'], 'textos');
        const nombre = await subirArchivo(req.files, undefined, 'imgs');
        res.json({
            nombre
        })    
    } catch (error) {
        res.status(400).json({ msg: error});
    }
    
}

const actualizarImagen = async(req, res) => {
 

    const {id, coleccion} = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                res.status(400).json({
                    msg: 'No existe el usuario'
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                res.status(400).json({
                    msg: 'No existe el producto'
                })
            }
        break;
    
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});
    }

    //limpiar imagenes previas
    if(modelo.img){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            fs.unlinkSync(pathImagen);
        }
    }

    const nombre = await subirArchivo(req.files, undefined, coleccion);
    modelo.img = nombre; 

    await modelo.save();
    res.json(modelo);

}

const mostrarImagen = async(req, res) => {
    const {id, coleccion} = req.params;
    let modelo;

    switch (coleccion) {
        case 'usuarios':
            modelo = await Usuario.findById(id);
            if(!modelo){
                res.status(400).json({
                    msg: 'No existe el usuario'
                })
            }
        break;
        case 'productos':
            modelo = await Producto.findById(id);
            if(!modelo){
                res.status(400).json({
                    msg: 'No existe el producto'
                })
            }
        break;
    
        default:
            return res.status(500).json({msg: 'Se me olvidó validar esto'});
    }

    //limpiar imagenes previas
    if(modelo.img){
        //Hay que borrar la imagen del servidor
        const pathImagen = path.join(__dirname, '../uploads', coleccion, modelo.img);
        if(fs.existsSync(pathImagen)){
            return res.sendFile(pathImagen);
        } 
    }
    const pathNoImage = path.join(__dirname,'../assets','no-image.jpg');
    return  res.sendFile(pathNoImage);
    
}

export{
    cargarArchivo,
    actualizarImagen,
    mostrarImagen
}