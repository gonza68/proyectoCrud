const { body } = require('express-validator')

const validations = [                                                           /* MIDDLEWARE DE LAS VALIDACIONES */
    body('name').notEmpty().withMessage('Tienes que escribir un nombre'),
    body('email')
    .notEmpty().withMessage('Tienes que escribir un correo electronico').bail()
    .isEmail().withMessage('Debes escribir un formato de correo electronico valido'),
    body('password').notEmpty().withMessage('Tienes que escribir una contraseña'),
    body('country').notEmpty().withMessage('Tienes que elegir un pais'),
    body('image').custom((value, {req})=>{                                      /* VALIDACION CUSTOM PARA EL CAMPO IMAGE */
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

module.exports = validations