require('dotenv').config({path:__dirname+'/../.env'})

const jwtConfig ={
    secret: process.env.SECRET,
    signOptions: { expiresIn: "1d" }
}

export default jwtConfig