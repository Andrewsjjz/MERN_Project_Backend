import express from "express";

import { 
    agregarTarea,
    actualizarTarea,
    obtenerTarea,
    eliminarTarea,
    cambiarEstado
}
from '../controllers/tareasControllers.js'

import checkAuth from "../middleware/checkAuth.js";


const router = express.Router()

router.post("/", checkAuth, agregarTarea) //Agregar una nueva tarea
router.put("/:id", checkAuth, actualizarTarea) //Actualizaar una tarea
router.get("/:id", checkAuth, obtenerTarea) //Traer una tarea
router.delete("/:id", checkAuth, eliminarTarea) //Traer una tarea

router.post("/estado/:id", checkAuth, cambiarEstado) //Cambiar estado de la tarea



export default router