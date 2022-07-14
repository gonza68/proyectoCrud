/* Requires */
const express = require('express')
const path = require('path')
const methodOverride = require('method-override')
const session = require('express-session')


const app = express()

/* Se define la carpeta de donde se tomaran los archivos */
app.use(express.static(path.join('public')))
/* Para poder recuperar la informacion que llega en el body de los formularios */
app.use(express.urlencoded({extended: false}))


/* Se usa a nivel de aplicacion session */
app.use(session({
    secret: 'Esto es un secreto',
    resave: false,
    saveUninitialized: false,
}))

app.use(methodOverride('_method'))
app.use(express.json())


/* Se define el motor de vista en este caso es ejs y se declara que los archivos de views los va a buscar a la carpeta views */
app.set('view engine', 'ejs')
app.set ('views', path.join(__dirname, '/views'));



const mainRouter = require('./routes/main')
const usersRouter = require('./routes/users')
const productsRouter = require('./routes/products')
const moviesRouter = require('./routes/movies')

app.use("/", mainRouter)
app.use('/users', usersRouter)
app.use('/products', productsRouter)
app.use('/movies', moviesRouter)


app.listen(3000,() =>{
    console.log('servidor corriendo en http://localhost:3000')
})
