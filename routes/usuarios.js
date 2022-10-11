import { Router } from "express";
import { check } from "express-validator";
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/usuarios.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { esRoleValido, validarMail, existeUsuarioPorId } from "../helpers/db-validators.js";

const router = Router();

router.get('/', usuariosGet );
router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRoleValido),
    validarCampos

] ,usuariosPut);

router.post('/',[
    check('correo', 'El correo no es válido').isEmail(),
    check('correo').custom(validarMail),
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe ser con más de 6 caracteres').isLength({ min: 6 }),
    check('rol').custom(esRoleValido), 
    validarCampos
], usuariosPost);
router.delete('/', usuariosDelete);


export default router;