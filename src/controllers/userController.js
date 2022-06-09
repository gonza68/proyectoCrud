const fs = require('fs')
const path = require('path')

const fileDB = path.join(__dirname , '../data/userDB.json')
const users = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))


let userController ={
    list: function(req,res){
        res.render('userList', {users: users})
    },
    login: function(req,res){
        res.render('login')
    },
    processLogin: function(req,res){
        let users = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))
        let usuarioNuevo = {
            id: users[users.length - 1].id + 1,
            name: req.body.name,
            email: req.body.email,
            password:  req.body.password,
        }

        users.push(usuarioNuevo)
        fs.writeFileSync(fileDB, JSON.stringify(users, null, " "))

        res.redirect('/users')
    },
    delete: function(req,res){
        let users = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))

        let usuariosFinales = users.filter(user => user.id != req.params.id);
        fs.writeFileSync(fileDB, JSON.stringify(usuariosFinales, null, " "))

        res.redirect('/users')
    }
}

module.exports = userController