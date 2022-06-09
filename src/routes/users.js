const express = require('express')
const app = express()
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/register', userController.register)
router.post('/register', userController.processRegister)
router.get('/', userController.list)
router.post('/delete/:id', userController.delete)

module.exports = router