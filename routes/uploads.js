import { Router } from "express";
import { check } from "express-validator";
import { actualizarImagen, cargarArchivo, mostrarImagen } from "../controllers/uploads.js";
import { coleccionesPermitidas } from "../helpers/db-validators.js";
import { validarArchivoSubir } from "../middlewares/validar-archivo.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const routerUploads = Router();

routerUploads.post('/', validarArchivoSubir ,cargarArchivo);

routerUploads.put('/:coleccion/:id',[
    validarArchivoSubir,
    check('id', 'El ID no es mongo valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, ['usuarios', 'productos'])),
    validarCampos
], actualizarImagen);

routerUploads.get('/:coleccion/:id', [
    check('id', 'El ID no es mongo valido').isMongoId(),
    check('coleccion').custom( c => coleccionesPermitidas (c, ['usuarios', 'productos'])),
    validarCampos
], mostrarImagen);

export default routerUploads;