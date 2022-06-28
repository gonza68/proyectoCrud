
module.exports = (sequelize, dataTypes) =>{
    let alias= "Pelicula"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title:{
            type: dataTypes.STRING
        } ,
        length:{
            type: dataTypes.INTEGER
        } ,
        rating:{
            type: dataTypes.INTEGER
        }
    };
    let config ={
        tableName: "movies",
        timestamps: false
    }

    const Pelicula = sequelize.define(alias,cols, config);

    return Pelicula;
}