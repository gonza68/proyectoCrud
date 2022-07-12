const fs = require('fs')
const path = require('path')
const {validationResult} = require('express-validator')
const bcryptjs = require('bcryptjs')
const fileDB = path.join(__dirname , '../data/userDB.json')
const users = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))

const User =  require('../data/User')


let userController ={
    list: function(req,res){
        res.render('userList', {users: users})
    },
    register: function(req,res){
        res.render('register')
    },
    processRegister: (req, res)=>{
       const resultValidation = validationResult(req)
       if(resultValidation.errors.length > 0){
         return res.render('register',{
            errors:resultValidation.mapped(),
            oldData: req.body
        })
       }
       
       let userInDB = User.findByField("email", req.body.email)

       if (userInDB){
        return res.render('register',{
            errors: {
                email:{
                    msg: "Este email ya esta registrado"
                }
            },
            oldData: req.body
        })
       }

       let userToCreate= {
        ...req.body,
        password: bcryptjs.hashSync(req.body.password, 10),
        image: req.file.filename
       }

       let userCreated = User.create(userToCreate);
       return res.redirect('/users/login')
    },

    delete: function(req,res){
        let users = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))

        let usuariosFinales = users.filter(user => user.id != req.params.id);
        fs.writeFileSync(fileDB, JSON.stringify(usuariosFinales, null, " "))

        res.redirect('/users')
    },
    login: function(req,res){
        res.render('login')
    }
}

module.exports = userController