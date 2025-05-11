const express = require('express')
const router = express.Router()
const userController = require('../../controllers/userController')
const {validatorRegister} = require('../../middlewares/validatorRegister')

router 
        .post('/register', validatorRegister,userController.register)
        .get('/list', userController.userList)
        .post('/login', userController.login)

module.exports = router