const express = require('express')
const app = express()
const router = express.Router()

const moviesController = require("../controllers/moviesController")

router.get('/', moviesController.list)
router.get('/top', moviesController.top)
router.post('/search', moviesController.filtrar)
router.get('/generos', moviesController.mostrarGeneros)
router.get('/generos/:id', moviesController.generoDetail2)
router.get('/:id', moviesController.movieDetail)

module.exports = router