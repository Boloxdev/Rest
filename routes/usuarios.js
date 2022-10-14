import { Router } from "express";
import { check } from "express-validator";
import { usuariosDelete, usuariosGet, usuariosPost, usuariosPut } from "../controllers/usuarios.js";
import { esRoleValido, validarMail, existeUsuarioPorId } from "../helpers/db-validators.js";
import { validarCampos } from "../middlewares/validar-campos.js";
import { validarJWT } from "../middlewares/validar-jwt.js";
import { esAdminRole, tieneRole } from "../middlewares/validar-roles.js";

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


router.delete('/:id',[
    validarJWT,
    //esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
] ,usuariosDelete);


export default router;