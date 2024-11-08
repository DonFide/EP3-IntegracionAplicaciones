const User = require('../models/User')
const config = require('../config/global')

exports.crearUsuario = async  (req, res) => {
    try{

        const { name,lastName, email, password } = req.body 
        if(!name|| !lastName || !email || !password){
            return  res.status(400).send('Faltan datos')
        }
        const user=new User({
            name,
            lastName,
            email,
            password
        })
        user.password=await user.encryptPassword(user.password) 
        await user.save()
        
        return res.status(200).json({
            status:"exito",
            mensaje:"Usuario creado con exito",
            user
        })
    
    }catch(error){
        return res.status(400).json({
            status:"error",
            mensaje:"No se ha podido crear al usuario" 
        })
    }

}