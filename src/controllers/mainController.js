let controller ={
    index: function(req,res){
        let imagenes =["gonzi-1.jpg","gonzi-2.jpg","gonzi-3.jpg"]
        res.render('index', {imagenes:imagenes})
    },
}

module.exports = controller