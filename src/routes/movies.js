const express = require('express')
const app = express()
const router = express.Router()

const moviesController = require("../controllers/moviesController")

router.get('/', moviesController.list)
router.get('/top', moviesController.top)
router.post('/search', moviesController.filtrar)
router.get('/:id', moviesController.movieDetail)


module.exports = router