const express = require('express')
const app = express()
const router = express.Router()

const mainController = require('../controllers/mainController')

router.get('/', mainController.index)


module.exports = router