const connection = require('../database/connection');


module.exports = {
    async create(request,response) {
        const {id} = request.body;

        const banco = await connection('banco_sangue')
        .where('id', id)
        .select('name')
        .first();

        if(!banco) {
            return response.status(400).json({error: 'Nenhum banco selecionado com este ID'});
        }

        return response.json(banco);
    }
}