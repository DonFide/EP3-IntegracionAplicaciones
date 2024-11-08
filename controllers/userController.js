const User = require('../models/User') 

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
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en crear usuario" 
        })
    }

}

exports.loginUser=async(req,res)=>{

    try{
        const {email, password } = req.body 
        const user=await User.findOne({email:email})
        if(!user)    {
            return res.status(404).json({
                status:"error",
                mensaje:"El usuario no existe" 
            })
        }
       
        const validPassword=await user.validatePassword(password)
        if(!validPassword) {
            return res.status(404).json({
                status:"error",
                mensaje:"No se encuentra al usuario" 
            })
        }
         
        return res.status(404).json({
            status:"exito",
            mensaje:"Usuario encontrado",
            user 
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            status:"error",
            mensaje:"Ha ocurrido un problema en el login" 
        })
    }
}