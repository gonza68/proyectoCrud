const fs = require('fs')
const path = require('path')

const fileDB = path.join(__dirname , '../data/productsDB.json')
const products = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))

let productController ={
    productList: function(req,res){
        res.render('products', {products: products})
    }
}

module.exports = productController
console.log(products)