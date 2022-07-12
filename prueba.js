const bcryptjs = require('bcryptjs')

let hash= bcryptjs.hashSync('Hola123', 10)

console.log(bcryptjs.compareSync("Hola123", hash))