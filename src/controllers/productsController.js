const fs = require('fs')
const path = require('path')

const fileDB = path.join(__dirname , '../data/productsDB.json')
const products = JSON.parse(fs.readFileSync(fileDB, 'utf-8'))

let productController ={
    productList: function(req,res){
        res.render('products', {products: products})
    },
    productsDetail: function(req,res){
        let productoAMostrar = products.filter((product)=>{
            return product.id == req.params.id
        })
        res.render('productDetail', {product: productoAMostrar})
    }
}

module.exports = productController
