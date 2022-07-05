module.exports = (sequelize, dataTypes) =>{
    let alias= "Generos"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name:{
            type: dataTypes.STRING
        } ,
        ranking:{
            type: dataTypes.INTEGER
        },
        active:{
            type: dataTypes.INTEGER
        }
    };
    let config ={
        tableName: "genres",
        timestamps: false
    }

    const Generos = sequelize.define(alias,cols, config);

    Generos.associate = function(models){
        Generos.hasMany(models.Pelicula,{
            as: "peliculas",
            foreignKey: "genre_id"
        })
    }

    return Generos;
}