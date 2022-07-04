const express = require('express')
const app = express()
const router = express.Router()

const moviesController = require("../controllers/moviesController")

router.get('/', moviesController.list2)
router.get('/top', moviesController.top)
router.post('/search', moviesController.filtrar)
router.get('/generos', moviesController.mostrarGeneros)
router.get('/generos/:id', moviesController.generoDetail2)
router.get('/detail/:id', moviesController.movieDetail)
router.get('/edit/:id', moviesController.edit)
router.put('/edit/:id', moviesController.processEdit)
router.get('/create', moviesController.create)
router.post('/create', moviesController.processCreate)
router.get('/delete/:id', moviesController.delete)
router.delete('/delete/:id', moviesController.destroy)

module.exports = router