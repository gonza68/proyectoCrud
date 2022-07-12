const fs = require('fs')

const User = {
    fileNane: './src/data/userDB.json',

    getData: function(){
        return JSON.parse(fs.readFileSync(this.fileNane, 'utf-8'));
    },

    generateId: function() {
        let allUsers = this.findAll()
        let lastUser = allUsers.pop();
        if(lastUser){
           return lastUser.id + 1; 
        }
        return 1
    },

    findAll: function(){
        return this.getData()
    },

    findByPk: function(id){
        let allUsers = this.findAll()
        let userFound = allUsers.find(user => user.id === id)
        return userFound
    },
    findByField: function(field, text){
        let allUsers = this.findAll()
        let userFound = allUsers.find(user => user[field] === text)
        return userFound
    },
    create: function(userData){
        let allUsers = this.findAll()
        let newUser= {
            id: this.generateId(),
            ...userData
        }
        allUsers.push(newUser);
        fs.writeFileSync(this.fileNane, JSON.stringify(allUsers, null, ' '))
        return newUser
    },
    delete: function(id){
        let allUsers = this.findAll()
        let finalUsers = allUsers.filter(user => user.id !== id)
        fs.writeFileSync(this.fileNane, JSON.stringify(finalUsers, null, ' '))
        return true
    }
}

module.exports = User


/* console.log(User.create({
"name": "gonzalin",
"email": "gonzalotflores02@gmail.com",
"password": "chau1234",
"country": "Argentina",
"image": "gonzi-3.jpg"}))
 */

/* console.log(User.delete(3)) */

