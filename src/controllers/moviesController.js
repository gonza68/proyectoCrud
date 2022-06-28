
const { Sequelize } = require("../database/models/index.js")
let db = require("../database/models/index.js") /* Se declara db con la ruta de models */
const Op = Sequelize.Op /* se declara Op con para usar los operadores de sequelize */

let moviesController = {
    list: function (req, res) {
        db.Pelicula.findAll()
            .then(function (peliculas) {  /* Siempre se le pone un .then por que son promesas, que se cumple solo si termino de ejecutarse la funcion de arriba, en este caso un pedido a base de datos */
                res.render("listadoDePeliculas", { peliculas: peliculas })
            })
    },
    movieDetail: function (req, res) {
        db.Pelicula.findByPk(req.params.id)
            .then(function (pelicula) {
                res.render("peliculasDetail", {pelicula: pelicula})
            })
    },
    top: function(req,res){ /* muestra las peliclas top */
        db.Pelicula.findAll({
            where:{rating :{[Op.gt]: 1.0}},       /* Where con objeto literal adentro para seleccionar que columna y adentro otro objeto literal con la condicion, si se usan operadores va adentro de un array */
            order: [                              /* Order va dentro de un array que adentro tiene otro array con 2 strings la columna y la condicion*/
                ["rating", "DESC"]
            ],
            limit: 50                             /* Limit simplemente se le pone el numero luego de los dos puntos sin array ni objeto literal */
        })
            .then((resultado)=>{
                res.render("peliculasTop", {peliculas: resultado})
            })
    },
    filtrar: function(req,res){
        db.Pelicula.findAll({
            where: {
                title: {[Op.like]: '%' + req.body.busqueda + '%'}
            }
        })
        .then((resultado)=>{
            res.render('peliculasFilter', {peliculas: resultado})
        })
    }
}


module.exports = moviesController