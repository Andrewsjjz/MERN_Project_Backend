import express from "express";

import {
    obtenerProyectos,
    nuevoProyectos,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminaColaborador,
    buscarColaborador,
} 
from '../controllers/proyectoControllers.js'
import checkAuth from "../middleware/checkAuth.js";


const router = express.Router()



router.get("/", checkAuth, obtenerProyectos) //Obtener los proyectos
router.post("/", checkAuth, nuevoProyectos) //Agregar nuevos proyectos

router.get("/:id", checkAuth, obtenerProyecto) //Obtener un proyecto
router.put("/:id", checkAuth, editarProyecto) //Editar un proyecto
router.delete("/:id", checkAuth, eliminarProyecto) //Eliminar un proyecto

router.post("/colaboradores", checkAuth, buscarColaborador) //Buscar un colaborador para proyecto
router.post("/colaboradores/:id", checkAuth, agregarColaborador) //Agregar un colaborador al proyecto
router.delete("/colaboradores/:id", checkAuth, eliminaColaborador) //Eliminar un colaborador al proyecto

export default router