import express  from "express";
import { 
    registrarUsuario, 
    loguearUsuario, 
    confirmarEmail,
    recuperarPassword,
    comprobarToken,
    nuevoPassword,
    perfil
} 
from "../controllers/usuarioControllers.js";

import checkAuth from "../middleware/checkAuth.js";

const router = express.Router()

//Autenticacion, registro de los usuarios


router.post("/", registrarUsuario) //Registro de usuarios

router.post("/login", loguearUsuario) //Logueo de usuarios

router.get("/confirmar/:token" , confirmarEmail) //Confirmacion de email

router.post("/recuperar-contrasena", recuperarPassword) //Recuperar contraseña

router.get("/recuperar-contrasena/:token", comprobarToken) //Recuperar contraseña con token

router.post("/recuperar-contrasena/:token", nuevoPassword) //Guardar nueva contraseña

router.get("/perfil", checkAuth, perfil)



export default router