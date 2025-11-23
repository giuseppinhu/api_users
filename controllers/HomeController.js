class HomeController{

    async index(req, res){
        res.send("APP Express");
    }

}

module.exports = new HomeController();
