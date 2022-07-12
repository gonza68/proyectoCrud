const path = require('path')
const express = require('express')
const app = express()
const multer = require('multer')
const router = express.Router()
const { body } = require('express-validator')

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.resolve(__dirname, "../../public/images/users"))
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

const userController = require('../controllers/userController')

const validations = [
    body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('email')
    .notEmpty().withMessage('Tienes que escribir un correo electronico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo electronico valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('country').notEmpty().withMessage('Tienes que elegir un pais'),
    body('image').custom((value, {req})=>{
       let file = req.file
       let accepted = ['.jpg', '.png', '.gif']
       let fileExtension = path.extname(file.originalname)
       if (!file) {
            throw new Error ('Tienes que subir una imagen')
       } else {
        if(!accepted.includes(fileExtension)){
        throw new Error ('Las extensiones de archivo de archivos permitidas son ' + accepted)
       }
       }
       
       return true;
    })
]

router.get('/register', userController.register)
router.post('/register', upload.single("image"),validations ,userController.processRegister)
router.get('/', userController.list)
router.post('/delete/:id', userController.delete)
router.get('/login', userController.login)

module.exports = router