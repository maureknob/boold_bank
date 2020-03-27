const connection = require('../database/connection');
const generateUniqueId = require("../utils/generateUniqueId");
module.exports = {

    async index (request, response) {
        const bancos = await connection('banco_sangue').select('*');
    
        return response.json(bancos);
    },

    async create(request, response) {
        const {name, email, whatsapp, city, uf} = request.body;

        const id = generateUniqueId();
    
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