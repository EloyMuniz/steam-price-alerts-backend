
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

        expect(response.status).toBe(201);  // Espera o status de sucesso
        expect(response.body.message).toBe('O usuário foi cadastrado com sucesso!');  // Espera a resposta certa
    },10000);
});
