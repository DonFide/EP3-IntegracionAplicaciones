const express = require('express')
const conectarBaseDatos = require('./config/db')
const config = require('./config/global')
const cors = require('cors')

const app = express()

conectarBaseDatos()


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extends:false}))

app.get('/',(req,res)=>{ 
    res.sendFile("./public/login.html",{
        root:__dirname
    })
})
 

app.use(express.static('public'))
app.use('/api', require('./routes/userRoutes'))
app.use('/api', require('./routes/userRoutes'))

app.listen(config.port, () => {
    console.log('El servidor corriendo por el puerto 3030')
})