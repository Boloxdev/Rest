import { Router } from "express";
import { check } from "express-validator";
import { crearProducto, obtenerProductoPorId, obtenerProductos, actualizarProducto, borrarProducto } from "../controllers/productos.js";
import { existeProductoPorId, existeCategoriaPorId } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole } from "../middlewares/validar-roles.js";


const routerProductos = Router();

/*Crear Nuevos productos*/
routerProductos.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').notEmpty(),
    check('categoria', 'La categoria no es valida').isMongoId(),
    check('categoria').custom(existeCategoriaPorId),
    validarCampos
],crearProducto);

/* Obtener categorias */
routerProductos.get('/', obtenerProductos);
routerProductos.get('/:id', [
    check('id', 'No es un ID de Mongo').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], obtenerProductoPorId);

/* Actualizar Productos */
routerProductos.put('/:id', [
    validarJWT,
    check('id').custom(existeProductoPorId),
    check('id', 'No es un id valido').isMongoId(),
    validarCampos
], actualizarProducto)

/*Borrar productos*/
routerProductos.delete('/:id', [
    validarJWT,
    esAdminRole,
    check('id', 'El ID no es valido').isMongoId(),
    check('id').custom(existeProductoPorId),
    validarCampos
], borrarProducto)

export {
    routerProductos
}