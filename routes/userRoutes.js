const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.post('/', userController.crearUsuario) 
router.get('/', userController.loginUser) 

module.exports = router
