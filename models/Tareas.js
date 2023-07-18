import mongoose from "mongoose";

const tareasSchema = mongoose.Schema({

    nombre : {
        type: String,
        trim: true,
        required: true
    },    
    descripcion : {
        type: String,
        trim: true,
        required: true
    },
    estado : {
        type : Boolean,
        default: false
    },
    fechaEntrega : {
        type : Date,
        required: true,
        default: Date.now()
    }, 
    prioridad : {
        type: String,
        enum : ['Baja', 'Media', 'Alta'],
        required: true
    }, 
    proyecto : {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Proyectos'
    }
},
{
    timestamps : true
}
)

const Tareas = mongoose.model("Tareas", tareasSchema)

export default Tareas