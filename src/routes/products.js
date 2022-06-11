const path = require('path')
const express = require('express')
const app = express()
const multer = require('multer')
const router = express.Router()

const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null, path.resolve(__dirname, "../../public/images/users"))
    },
    filename: function(req,file,cb){
        cb(null, Date.now() + path.extname(file.originalname))
    }
})
const upload = multer({storage: storage})

const productsController = require('../controllers/productsController')

router.get('/', productsController.productList)
router.get('/:id', productsController.productsDetail)


module.exports = router