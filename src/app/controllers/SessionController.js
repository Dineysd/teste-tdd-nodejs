class SessionController {
    async store(rea, res){
        return res.status(200).send();
    }
}

module.exports = new SessionController();