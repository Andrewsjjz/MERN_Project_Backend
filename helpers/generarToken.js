import jwt from 'jsonwebtoken'


const generarToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn : '60d'
    })
}

export default generarToken
