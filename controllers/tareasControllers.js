import Proyectos from "../models/Proyectos.js"
import Tareas from "../models/Tareas.js"

const agregarTarea = async (req, res) => {


    const {proyecto} = req.body

    const existeProyecto = await Proyectos.findById(proyecto)

    if(!existeProyecto) {
        const error = new Error('El proyecto no existe')
        return res.status(404).json({msg : error.message})
    }

    if (existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes acceso')
        return res.status(401).json({msg: error.message})
    }

    try {
        
        const tareaAlmacenada = await Tareas.create(req.body)
        //Almacenar ID de la tarea en el proyecto
        existeProyecto.tareas.push(tareaAlmacenada._id)
        await existeProyecto.save()
        res.json(tareaAlmacenada)

    } catch (error) {
        console.log(error)
    }

}

const actualizarTarea = async (req, res) => {

    const {id} = req.params

    const tarea = await Tareas.findById(id).populate("proyecto")


    if(!tarea){
        const error = new Error('La tarea no existe')
        return res.status(404).json({msg : error.message})
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes acceso')
        return res.status(401).json({msg: error.message})
    }

    tarea.nombre = req.body.nombre ||  tarea.nombre
    tarea.descripcion = req.body.descripcion || tarea.descripcion
    tarea.prioridad = req.body.prioridad || tarea.prioridad
    tarea.fechadeEntrega = req.body.fechadeEntrega || tarea.fechadeEntrega


    try {

        const tareaActualizada = await tarea.save()
        res.json(tareaActualizada)
        
    } catch (error) {
        console.log(error)
    }
    

}

const obtenerTarea = async (req, res) => {

    const {id} = req.params 

    const tareas = await Tareas.findById(id).populate("proyecto")

    if(!tareas){
        const error = new Error('La tarea no existe')
        return res.status(404).json({msg : error.message})
    }

    if (tareas.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes acceso')
        return res.status(401).json({msg: error.message})
    }

    res.json(tareas)

}

const eliminarTarea = async (req, res) => {

    const {id} = req.params

    const tarea = await Tareas.findById(id).populate("proyecto")


    if(!tarea){
        const error = new Error('La tarea no existe')
        return res.status(404).json({msg : error.message})
    }

    if (tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes acceso')
        return res.status(401).json({msg: error.message})
    }

    try {

        await tarea.deleteOne()
        res.json({msg: 'Tarea eliminada'})
        
    } catch (error) {
        console.log(error)
    }
}

const cambiarEstado = async (req, res) => {

}

export {
    agregarTarea,
    actualizarTarea,
    obtenerTarea,
    eliminarTarea,
    cambiarEstado
}