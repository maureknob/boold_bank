const connection = require('../database/connection');
const crypto = require('crypto');
module.exports = {

    async index (request, response) {
        const bancos = await connection('banco_sangue').select('*');
    
        return response.json(bancos);
    },

    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;

        const id = crypto.randomBytes(4).toString('HEX');
    
       await connection('banco_sangue').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        })
    
        return response.json({id});
    }
};