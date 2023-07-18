 import nodemailer from 'nodemailer'

 export const emailRegistro = async (datos) => {

     const {email , nombre , token} = datos

    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });
      


      const info = await transport.sendMail({
        from: '"Project MERN" <cuenta@mern.com>',
        to: email,
        subject: "Project MERN - Confirmacion de cuenta",
        text: "Confirma tu cuenta de Project MERN",
        html: `
        <p>Hola ${nombre}, ya solo estas a un solo paso de comprobar tu cuenta</p>
        <p>Solo debes darle click en el siguiente enlance para asi poder disfurtar de todos los beneficios de 
        Project Mern</p>

        <a href="${process.env.FRONTEND_URL}/confirmar/${token}">Comprobar cuenta</a>

        <p>Si tu no creaste una cuenta con nosotros, puedes ignorar el mensaje</p>
        `
      })

}

export const emailRecuperarPassword = async (datos) => {

  const {email , nombre , token} = datos

 const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
     auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
     }
   });


   const info = await transport.sendMail({
     from: '"Project MERN" <cuenta@mern.com>',
     to: email,
     subject: "Project MERN - Restablecer contraseña",
     text: "Restablece tu cuenta de Project MERN",
     html: `
     <p>Hola ${nombre}, nos has enviado que olvidaste tu contraseña</p>
     <p>Solo debes darle click en el siguiente enlance para asi poder cambiar tu contraseña 
     Project Mern</p>

     <a href="${process.env.FRONTEND_URL}/recuperar-contrasena/${token}">Cambiar contraseña</a>

     `
   })

}


