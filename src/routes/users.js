const path = require('path')
const express = require('express')
const app = express()
const multer = require('multer')
const router = express.Router()
const { body } = require('express-validator')

const storage = multer.diskStorage({                                            /* MIDDLEWARE PARA LA CONFIGURACION DE MULTES */
    destination: function(req,file,cb){
        cb(null, path.resolve(__dirname, "../../public/images/users"))          /* ESTO SELECCIONA LA CARPETA DONDE SE GUARDAN LAS IMAGENES */
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname))                  /*  ESTO LE PONE UN NOMBRE A LAS IMAGENES */
    }
})
const upload = multer({storage: storage})                                       /* CREA LA VARIBALE upload */

/* Middlewares */
const validations = require('../middlewares/validations')
const guestMiddleware = require('../middlewares/guestMiddleware')
const authMiddleware = require('../middlewares/authMiddleware')

const userController = require('../controllers/userController')



router.get('/register',guestMiddleware, userController.register)

router.post('/register', upload.single("image"),validations ,userController.processRegister)

router.get('/', userController.list)

router.post('/delete/:id', userController.delete)

router.get('/login',guestMiddleware, userController.login)

router.post('/login', userController.loginProcess)

router.get('/profile',authMiddleware, userController.userProfile)

router.get('/logout', userController.logout)

module.exports = router