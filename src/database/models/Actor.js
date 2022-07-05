module.exports = (sequelize, dataTypes) =>{
    let alias= "Actores"
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        first_name:{
            type: dataTypes.STRING
        } ,
        last_name:{
            type: dataTypes.STRING
        } ,
        rating:{
            type: dataTypes.INTEGER
        }
    };
    let config ={
        tableName: "actors",
        timestamps: false
    }

    const Actores = sequelize.define(alias,cols, config);

Actores.associate= function(models){
    Actores.belongsToMany(models.Pelicula,{
        as: "peliculas",
        through: "actor_movie",
        foreignKey: "actor_id",
        otherKey: "movie_id",
        timestamps: false
    })
}
    return Actores;
}