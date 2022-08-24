const fs = require('fs')
const path = require('path')
const { validationResult } = require('express-validator')
const bcryptjs = require('bcryptjs')
const fileDB = path.join(__dirname, '../data/userDB.json')
const users = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))

const User = require('../data/User')


let userController = {
    list: function (req, res) {
        res.render('userList', { users: users })
    },
    register: function (req, res) {

        res.render('register')
    },
    processRegister: (req, res) => {
        const resultValidation = validationResult(req) /* ESTA VARIABLE TRAE LAS VALIDACIONES */
        if (resultValidation.errors.length > 0) {      /* SE CONSULTA SI LOS  ERRORES DE LAS VALIDACIONES SON MAYORES A 0 */
            return res.render('register', {            /* EN EL CASO QUE HAYA ERRORES SE MANDA LA VISTA PERO CON LOS ERRORES  */
                errors: resultValidation.mapped(),     /* METODO MAPPED PARA TRANSFORMAR EN ARRAY */
                oldData: req.body
            })
        }

        let userInDB = User.findByField("email", req.body.email)             /* SI NO HAY ERRORES SE BUSCA SI EL USUARIO CON EL MAIL YA ESTA REGISTRADO */

        if (userInDB) {                                                      /* SI ESTA REGISTRADO SE MANDA LA VISTA Y SE SIMULA EL FORMATO DE ERRORS PARA MANDAR UN MSG AL ERROR DEL MAIL DICIENDO QUE ESE MAIL YA ESTA REGISTRADO */
            return res.render('register', {
                errors: {
                    email: {
                        msg: "Este email ya esta registrado"
                    }
                },
                oldData: req.body
            })
        }

        let userToCreate = {                                                  /* EN EL CASO DE QUE EL MAIL ESTE DISPONIBLE SE CREA EL USUARIO ENCRIPTANDOLE LA CONTRASEÑA Y PONIENDO SOLO EL FILENAME A LA IMAGEN */
            ...req.body,
            password: bcryptjs.hashSync(req.body.password, 10),
            image: req.file.filename
        }

        let userCreated = User.create(userToCreate);                          /* SE CREA EL USUARIO EN LA BASE DE DATOS Y TE MANDA A LA VISTA DE LOGIN */
        return res.redirect('/users/login') 
    },

    delete: function (req, res) {
        let users = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))

        let usuariosFinales = users.filter(user => user.id != req.params.id);
        fs.writeFileSync(fileDB, JSON.stringify(usuariosFinales, null, " "))

        res.redirect('/users')
    },
    login: function (req, res) {
        res.render('login')
    },
    loginProcess: (req, res) => {
        let userToLogin = User.findByField('email', req.body.email)                                     /* Para el proceso de login primero hay que traer al usuario que se intenta logear trayendolo por el email */
        
        if (userToLogin) {                                                                               /* si existe este usuario */
            let okPassword = bcryptjs.compareSync(req.body.password, userToLogin.password);              /* Preguntar si la contraseña es valida */
            if (okPassword) {                                                                            /* Si es valida */
                delete userToLogin.password                                                               /* Borramos la contraseña para que no se guarde en session */
                req.session.userLogged = userToLogin                                                      /* Guardamos al usuario en session */
                if(req.body.remember){                                                                    /* Si se eligio la opcion de recordar usuario se guarda el email del mismo en cookie */
                    res.cookie('userEmail', req.body.email, {maxAge: (1000 * 60)*1})    
                }
                return res.redirect('/users/profile') /* Y redirijimos al perfil */
            }
            return res.render('login', {    
                errors: {
                    email: {
                        msg: "Las credenciales son invalidas"  /* En caso que la contraseña sea false devolver el error */
                    }
                }
            })
        }

            return res.render('login', {                                          /*  En en el caso que no se encuentre el usuario devolver el error */
                errors: {
                    email: {
                        msg: "No se encuentra este Email en nuestro servidor"
                    }
                }
            })
    },
    userProfile: (req,res)=>{    /* Mandamos la vista con el usuario logeado */
        res.render('userProfile',{
            user: req.session.userLogged
        })
            
    },
    logout: (req,res)=>{    /* Cerramos sesion borrando la session y la cookie y redirigimor al inicio */
        res.clearCookie('userEmail')
        req.session.destroy()
        return res.redirect('/')
    }
}

module.exports = userController