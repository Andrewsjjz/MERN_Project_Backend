import Usuarios from '../models/Usuarios.js' //Se debe importar el models en donde se guardaran los datos
import generarToken from '../helpers/generarToken.js'
import { emailRegistro, emailRecuperarPassword } from '../helpers/emails.js'


const registrarUsuario = async (req, res) => {

//Evitar duplicado de usuarios ya registraos

const {email} = req.body
const usuarioExistente = await Usuarios.findOne({email})

if (usuarioExistente) {

    const error = new Error('Correo eletronico ya esta registrado')
    return res.status(400).json({ msg: error.message})
}


//Creacion de usuario
try {
    const crearUsuario = new Usuarios(req.body) //Llamar al models
    crearUsuario.token = generarID()
    await crearUsuario.save()

    //Enviar email de confirmacion

    emailRegistro({
         nombre : crearUsuario.nombre,
         email : crearUsuario.email,
         token : crearUsuario.token
     })

    res.json({
        msg: "Usuario creado exitosamente. Verifica tu correo para activar la cuenta"
    })
} catch (error) {
    console.log(error)
}

}

const loguearUsuario = async (req, res) => {

    const {email, password} = req.body
    
    //Comprobar si el usuario existe
    const usuario = await Usuarios.findOne({email})
    if(!usuario) {
        const error = new Error('El usuario no esta registrado')
        return res.status(404).json({msg : error.message})
    }

    //Comprobar si el email esta confirmado
    if(!usuario.confirmado) {
        const error = new Error('El usuario no esta confirmado')
        return res.status(403).json({msg : error.message})
    }

    //Comprobar si la contraseña es correcta
    if(await usuario.comprobarPassword(password)) {
        res.json ({
            _id : usuario._id,
            nombre : usuario.nombre,
            email : usuario.email,
            token : generarToken(usuario._id)
        })
    } else {
        const error = new Error('Contraseña incorrecta')
        return res.status(403).json({msg : error.message})
    }


}

const confirmarEmail = async (req, res) => {
   const {token} = req.params

   const confirmarUsuario = await Usuarios.findOne({token})
   if(!confirmarUsuario) {
    const error = new Error('Usuario no valido')
    return res.status(403).json({msg : error.message})
   }

   try {
    confirmarUsuario.confirmado = true
    confirmarUsuario.token = ""

    await confirmarUsuario.save()
    res.json({msg : 'Usuario confirmado'})
   } catch (error) {
    console.log(error)
   }

}

const recuperarPassword = async (req, res) => {
    
    const {email} = req.body

    const usuario = await Usuarios.findOne({email})
    if(!usuario) {
        const error = new Error('El usuario no esta registrado')
        return res.status(404).json({msg : error.message})
    }



    try {
        usuario.token = generarID()
        await usuario.save()

            //Enviar email para recuperar contraseña
    emailRecuperarPassword({
        nombre : usuario.nombre,
        email : usuario.email,
        token : usuario.token
    })
        res.json({msg: "Le hemos enviado un correo electronico con las instrucciones"})
    } catch (error) {
        console.log(error)
    }

}

const comprobarToken = async (req, res) => {

    const {token} =req.params

    const validarToken = await Usuarios.findOne({token})
    if (validarToken) {

        res.json({msg: "Correo Electronico valido"})

    } else{
        const error = new Error('Correo Electronico no valido')
    return res.status(404).json({msg : error.message})
    }

}

const nuevoPassword = async (req, res) => {

    const {token} = req.params
    const {password} = req.body

    const validarEmail = await Usuarios.findOne({token})

    if (validarEmail) {

        validarEmail.password = password
        validarEmail.token = ""

        try {
            await validarEmail.save()
            res.json({msg : "Contraseña modificada correctamente"})
        } catch (error) {
            console.log(error)
        }
        

    } else{
        const error = new Error('Correo Electronico no valido')
        return res.status(404).json({msg : error.message})

    }


}

const perfil = (req, res) => {
    const { usuario } = req

    res.json(usuario)
}



export {
    registrarUsuario,
    loguearUsuario,
    confirmarEmail,
    recuperarPassword,
    comprobarToken,
    nuevoPassword,
    perfil
}