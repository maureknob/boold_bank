const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const banco_id = request.headers.authorization;

        const incidents = await connection('incidents')
        .where('banco_id', banco_id)
        .select('*');

        return response.json(incidents);
    }
}