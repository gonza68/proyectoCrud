
const { Sequelize } = require("../database/models/index.js")
let db = require("../database/models/index.js") /* Se declara db con la ruta de models */
const Op = Sequelize.Op /* se declara Op con para usar los operadores de sequelize */

const promiseMovies = db.Pelicula.findAll()
const promiseGeneros = db.Generos.findAll()

/* const promiseGenerosPK = db.Generos.findByPk(req.params.id)
const promiseMoviesPK = db.Pelicula.findAll({
    where: {
        id_genere: req.params.id
    }
}) */

let moviesController = {
    list: function (req, res) {
        db.Pelicula.findAll()
            .then(function (peliculas) {  /* Siempre se le pone un .then por que son promesas, que se cumple solo si termino de ejecutarse la funcion de arriba, en este caso un pedido a base de datos */
                res.render("listadoDePeliculas", { peliculas: peliculas })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    movieDetail: function (req, res) {
        db.Pelicula.findByPk(req.params.id)
            .then(function (pelicula) {
                res.render("peliculasDetail", { pelicula: pelicula })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    top: function (req, res) { /* muestra las peliclas top */
        db.Pelicula.findAll({
            where: { rating: { [Op.gt]: 1.0 } },       /* Where con objeto literal adentro para seleccionar que columna y adentro otro objeto literal con la condicion, si se usan operadores va adentro de un array */
            order: [                              /* Order va dentro de un array que adentro tiene otro array con 2 strings la columna y la condicion*/
                ["rating", "DESC"]
            ],
            limit: 50                             /* Limit simplemente se le pone el numero luego de los dos puntos sin array ni objeto literal */
        })
            .then((resultado) => {
                res.render("peliculasTop", { peliculas: resultado })
            })
            .catch((error) => {
                res.send(error)
            })
    },
    filtrar: function (req, res) { /* Es un buscador de peliculas en la base de datos */
        db.Pelicula.findAll({
            where: {
                title: { [Op.like]: '%' + req.body.busqueda + '%' }  /* En este where filtro las peliculas que contengan el string que vino por el body del buscador */
            }
        })
            .then((resultado) => {
                res.render('peliculasFilter', { peliculas: resultado, filtrado: req.body.busqueda }) /* A la vista se le puede mandar mas de una clave valor en el objeto literal  */
            })
            .catch((error) => {
                res.send(error)
            })
    },
    mostrarGeneros: ((req, res) => {
        db.Generos.findAll()
            .then((resultado) => {
                res.render('listadoDeGeneros', { generos: resultado })
            })
            .catch((error) => {
                res.send(error)
            })
    }),
    generoDetail: ((req, res) => {  /* Actualmente en desuso por que entro en funcionalidad generoDetail2 que agrega funcionalidades */
        db.Generos.findByPk(req.params.id)
            .then((resultado) => {
                res.render('generosDetail', { genero: resultado })
            })
            .catch((error) => {
                res.send(error)
            })
    }),
    generoDetail2: ((req, res) => {
        let promiseGenerosPK = db.Generos.findByPk(req.params.id)
        let promiseMoviesPK = db.Pelicula.findAll({
            where: {
                genre_id: req.params.id
            }
        })
        Promise.all([promiseGenerosPK, promiseMoviesPK])
            .then(function ([resultadoGeneros, resultadoMovies]) {
                res.render('generosDetail', { genero: resultadoGeneros, peliculas: resultadoMovies })
            })
    })
}


module.exports = moviesController

/* db.Pelicula.findAll()
.then(resultado=>{
    console.log(resultado)
}) */