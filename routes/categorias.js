import { Router } from "express";
import { check } from "express-validator";
import { crearCategoria, obtenerCategorias, obtenerCategoria, actualizarCategoria, borrarCategoria } from "../controllers/categorias.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import {existeCategoriaPorId} from "../helpers/db-validators.js";
import { esAdminRole } from "../middlewares/validar-roles.js";

const routerCategories = Router();

routerCategories.get('/', obtenerCategorias);



//validar los IDs
//obtener todas las categorias - publico
routerCategories.get('/:id', [
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom( existeCategoriaPorId ),
    validarCampos
], obtenerCategoria);

//Crear una nueva categoria
routerCategories.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], crearCategoria);

//actualizar cat
routerCategories.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],actualizarCategoria);
//Borrar
routerCategories.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(existeCategoriaPorId),
    validarCampos
],borrarCategoria);






export {
    routerCategories
}