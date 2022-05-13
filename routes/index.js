const express= require("express");
const routes = express.Router();
const userData = require('../data/users.js');
const middleware = require('../middleware');

routes.use(middleware.error, middleware.alone);

routes.get('/sales', function (req, res) {
    res.status(200).json(userData)
});

routes.post('/sales', function (req, res) {
    const { productName, infos, infos:{ saleDate, warrantyPeriod}} = req.body;
    if ( !productName ) {
        // return res.status(400).json({message: 'O campo productName é obrigatório'});
        throw { status: 400, message: 'O campo productName é obrigatório'};
    }
    if ( productName.length < 4 ) {
        // return res.status(400).json({message: 'O campo productName deve ter pelo menos 4 caracteres'});
        throw { status: 400, message: 'O campo productName deve ter pelo menos 4 caracteres'};
    }
    if ( !infos ) {
        // return res.status(400).json({message: 'O campo infos é obrigatório'});
        throw { status: 400, message: 'O campo infos é obrigatório'};
    }
    if (!saleDate.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        // return res.status(400).json({message: 'O campo saleDate não é uma data válida'});
        throw { status: 400, message: 'O campo saleDate não é uma data válida'};
    }
    if ( !warrantyPeriod ) {
        // return res.status(400).json({message: 'O campo warrantyPeriod é obrigatório'});
        throw { status: 400, message: 'O campo warrantyPeriod é obrigatório'};
    }
    if (warrantyPeriod < 1 || warrantyPeriod > 3) {
        // return res.status(400).json({message: 'O campo warrantyPeriod precisa estar entre 1 e 3'});
        throw { status: 400, message: 'O campo warrantyPeriod precisa estar entre 1 e 3'};
    }
    userData.push({productName, infos:{ saleDate, warrantyPeriod}});
    res.status(201).json({messege: 'Venda cadastrada com sucesso'});
});


module.exports = routes;