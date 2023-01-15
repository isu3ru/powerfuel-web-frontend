const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('POST /User/login', () => {
    let mock;
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });
    afterEach(() => {
        mock.reset();
    });

    it('should return token on successful login', async () => {
        const payload = {
            userName: 'test@email.com',
            password: 'password123'
        };
        mock.onPost('/User/login', payload).reply(200, {
            token: 'abcdefghijklmnopqrstuvwxyz'
        });

        const response = await axios.post('/User/login', payload);

        expect(response.status).toEqual(200);
        expect(response.data.token).toBeDefined();
    });

    it('should return error if login fails', async () => {
        const payload = {
            userName: 'test@email.com',
            password: 'wrongpassword'
        };
        mock.onPost('/User/login', payload).reply(400, {
            error: 'Invalid user name or password'
        });

        try {
            const response = await axios.post('/User/login', payload);
        } catch (error) {
            expect(error.response.status).toEqual(400);
            expect(error.response.data.error).toEqual('Invalid user name or password');
        }
    });
});
