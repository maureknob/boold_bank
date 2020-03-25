const express = require('express');

const bancoController = require('./controllers/bancoController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/banco', bancoController.index);
routes.post('/banco', bancoController.create);

routes.get('/profile', profileController.index);

routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);


module.exports = routes;
