import { Router } from "express";
import { check } from "express-validator";
import { googleSignIn, login } from "../controllers/auth.js";
import { validarCampos } from "../middlewares/validar-campos.js";

const routerAuth = Router();

routerAuth.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'La contraseña es obligatoria').notEmpty(),
    validarCampos
], login);

routerAuth.post('/google',[
    check('id_token', 'ID token necesario').notEmpty(),
    validarCampos
], googleSignIn);


export default routerAuth;