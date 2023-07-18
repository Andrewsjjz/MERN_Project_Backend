import Proyectos from "../models/Proyectos.js"
import Usuarios from "../models/Usuarios.js"



const obtenerProyectos = async (req, res) => {

    const proyectos = await Proyectos.find().where("creador").equals(req.usuario)

    res.json(proyectos)

}

const nuevoProyectos = async (req, res) => {

    const proyecto = new Proyectos(req.body)
    proyecto.creador = req.usuario._id

    try {
        const proyectoAlmacenador = await proyecto.save()
        res.json(proyectoAlmacenador)
        
    } catch (error) {
        console.log(error)
    }

}

const obtenerProyecto = async (req, res) => {

    const {id} = req.params

    const proyecto = await Proyectos.findById(id).populate('tareas')

    if(!proyecto){
        const error = new Error('El proyecto no existe')
        return res.status(404).json({msg : error.message})
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes acceso')
        return res.status(401).json({msg: error.message})
    }


    res.json(proyecto, )

}

const editarProyecto = async (req, res) => {

    const {id} = req.params

    const proyecto = await Proyectos.findById(id)

    if(!proyecto){
        const error = new Error('El proyecto no existe')
        return res.status(404).json({msg : error.message})
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes acceso')
        return res.status(401).json({msg: error.message})
    }

    proyecto.nombre = req.body.nombre || proyecto.nombre
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion
    proyecto.cliente = req.body.cliente || proyecto.cliente
    proyecto.fechadeEntrega = req.body.fechadeEntrega || proyecto.fechadeEntrega
    
    try {

        const proyectoModificado = await proyecto.save()
        res.json(proyectoModificado)
        
    } catch (error) {
        console.log(error)
    }
}

const eliminarProyecto = async (req, res) => {

    const {id} = req.params

    const proyecto = await Proyectos.findById(id)

    if(!proyecto){
        const error = new Error('El proyecto no existe')
        return res.status(404).json({msg : error.message})
    }

    if (proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('No tienes acceso')
        return res.status(401).json({msg: error.message})
    }

    try {

        await proyecto.deleteOne()
        res.json({msg: 'Proyecto eliminado'})
        
    } catch (error) {
        console.log(error)
    }

}

const buscarColaborador = async (req, res) => {
    const {email} = req.body
    const usuario = await Usuarios.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')

    if(!usuario){
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msg: error.message})
    }

    res.json(usuario)
}

const agregarColaborador = async (req, res) => {

    console.log(req.params.id)

const proyecto = await Proyectos.findById(req.params.id)

if(!proyecto) {
    const error = new Error ('Proyecto No Encontrado')
        return res.status(404).json({msg : error.message})
 }

if(proyecto.creador.toString() !== req.usuario._id.toString()) {
     const error = new Error ('Accion no valida')
     return res.status(403).json({msg : error.message})
 }

 console.log(req.body)

const {email} = req.body
    const usuario = await Usuarios.findOne({email}).select('-confirmado -createdAt -password -token -updatedAt -__v')

    if(!usuario){
        const error = new Error('Usuario no encontrado')
        return res.status(404).json({msg: error.message})
    }

//     res.json(usuario)

     if (proyecto.creador.toString() === usuario._id.toString()){
         const error = new Error('No te puedes agregar a ti mismo')
         return res.status(404).json({msg: error.message})
     }
}

const eliminaColaborador = async (req, res) => {

}



export {
    obtenerProyectos,
    nuevoProyectos,
    obtenerProyecto,
    editarProyecto,
    eliminarProyecto,
    agregarColaborador,
    eliminaColaborador,
    buscarColaborador
}