const connection = require('../database/connection');

module.exports = {
    async index(request, response) {
        const {page = 1} = request.query;

        const [count] = await connection('incidents').count();

        const incidents = await connection('incidents')
        .join('banco_sangue', 'banco_sangue.id', '=', 'incidents.banco_id')
        .limit(5)
        .offset((page -1) * 5)
        .select(['incidents.*', 'banco_sangue.name','banco_sangue.email','banco_sangue.whatsapp','banco_sangue.city','banco_sangue.uf']);

        response.header('X-Total-Count', count['count(*)']);

        return response.json(incidents);
    },

    async create(request, response) {
        const {title, description, value} = request.body;
        const banco_id = request.headers.authorization;

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            banco_id,
        });

        return response.json({id});
    },

    async delete(request, reponse){
        const {id} = request.params;
        const banco_id = request.headers.authorization;

        const incident = await connection('incidents').where('id', id).select('banco_id').first();

        if (incident.banco_id != banco_id) {
            return response.status(401).json({error: 'operation not permitted.'});
        }

        await connection('incidents').where('id', id).delete();

        return response.status(204).send();

    }
};