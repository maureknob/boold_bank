const request = require('supertest');
const app = require('../../src/app');
const connection = require('../../src/database/connection');

describe('ONG', () => {
    beforeEach( async () => {
        await connection.migrate.rollback();
       await connection.migrate.latest();
    });

    afterAll(() => {
        connection.destroy();
    });

    it('should be able to create a new bank', async ()=> {
        const response = await request(app).post('/banco').send(
            {
                name: "Banco de sangue Bentoooooo",
                email: "bancodesangue@gmail.com",
                whatsapp : "9999999999",
                city: "Caxias do Sul",
                uf: "RS"
            });
    expect(response.body).toHaveProperty('id');
    expect(response.body.id).toHaveLength(8);
    });
});