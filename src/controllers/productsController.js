const fs = require('fs')
const path = require('path')

const fileDB = path.join(__dirname , '../data/productsDB.json')
const products = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))

let productController ={
    productList: function(req,res){
        res.render('products', {products: products})
    },
    productsDetail: function(req,res){
        let productoAMostrar = products.filter(function(product){
            return product.id = req.body.id
        })
        res.render('productDetail', {product: productoAMostrar})
    }
}

module.exports = productController
