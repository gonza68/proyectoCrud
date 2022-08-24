const bcryptjs = require('bcryptjs')

let hash= bcryptjs.hashSync('Hola123', 10)

console.log(bcryptjs.compareSync("Hola123", hash))

let contraseña = "contraseña"

let contraseña2 = bcryptjs.hashSync(contraseña, 10)

console.log(bcryptjs.compareSync(contraseña, contraseña2))

bcryptjs.compareSync("adfasdasf", contraseña2)
