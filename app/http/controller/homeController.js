const menu = require('../../models/menu')
function homeController(){
    return {
        async index(req, res) {
            const idli = await menu.find()
                console.log(idli)
            return res.render('home', { idli: idli })
            //menu.find().then(function(idli) {
            //    console.log(idli)
           // res.render('home',{ idli: idli })
       // })
        }
    }

}

module.exports = homeController