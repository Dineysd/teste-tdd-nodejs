const routes = require('express').Router()
const SessionController = require('./app/controllers/SessionController')
const middleAuth = require('./app/middleware/auth')

routes.post('/sessions', SessionController.store);
routes.use(middleAuth);

routes.get('/dashboard', (req, res) =>{ 
    return res.status(200).send();
});

module.exports = routes;