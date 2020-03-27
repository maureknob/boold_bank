const express = require('express');
const {celebrate, Segments, Joi} = require('celebrate');

const bancoController = require('./controllers/bancoController');
const incidentController = require('./controllers/incidentController');
const profileController = require('./controllers/profileController');
const sessionController = require('./controllers/sessionController');
const routes = express.Router();

routes.post('/sessions', sessionController.create);

routes.get('/banco', bancoController.index);

routes.post('/banco', celebrate({
    [Segments.BODY]: Joi.object().keys({
        name: Joi.string().required(),
        email: Joi.string().required().email(),
        whatsapp: Joi.string().required().min(10).max(11),
        city: Joi.string().required(),
        uf: Joi.string().required().length(2),
    })
}), bancoController.create);

routes.get('/profile', celebrate({
    [Segments.HEADERS]: Joi.object({
        authorization : Joi.string().required(),
    }).unknown(),
}) , profileController.index);

routes.get('/incidents', celebrate({
    [Segments.QUERY]: Joi.object().keys({
        page: Joi.number(),
    })
}), incidentController.index);

routes.post('/incidents', incidentController.create);

routes.delete('/incidents/:id', celebrate({
    [Segments.PARAMS]: Joi.object().keys({
        id: Joi.number().required(),
    })
}), incidentController.delete);


module.exports = routes;
