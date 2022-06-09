const express = require('express')
const app = express()
const router = express.Router()

const userController = require('../controllers/userController')

router.get('/login', userController.login)
router.post('/login', userController.processLogin)
router.get('/', userController.list)
router.post('/delete/:id', userController.delete)

module.exports = router