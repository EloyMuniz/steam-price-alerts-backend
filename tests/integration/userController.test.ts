
import request from 'supertest';
import app from '../../src';
describe('Registro de usuário', () => {
    it('Retorna status 201', async () => {
        const response = await request(app)
            .post('/v1/user-register')
            .send({
                use_email: 'test@example.com',
                use_name: 'John Doe',
                use_password: '123456',
                use_confirm_password: '123456',
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('O usuário foi cadastrado com sucesso!');
    }, 10000);
});
describe('Email inválido', () => {

    it('Retorna status 401 ', async () => {

        const response = await request(app)
            .post('/v1/user-register')
            .send({
                use_email: 'testexample.com',
                use_name: 'John Doe',
                use_password: '123456',
                use_confirm_password: '123456',
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Email inválido!');


    })

})

describe('Erro de envio do email', () => {
    it('Retorna status 401', async () => {


        const response = await request(app)
            .post('/v1/user-register')
            .send({
                use_email: 'testexample.com',
                use_name: 'John Doe',
                use_password: '123456',
                use_confirm_password: '123456',
            });

        expect(response.status).toBe(401);
        expect(response.body.message).toBe('Erro ao enviar o email!');


    })


})