const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');
const router = require('./router');

describe('GET /districts/edit/:id', () => {
    let mock;

    beforeEach(() => {
        mock = new MockAdapter(axios);
    });

    afterEach(() => {
        mock.reset();
    });

    it('should render the edit-district view and pass district data', async () => {
        // set up mock response for /District/ById request
        mock.onGet('/District/ById').reply(200, {
            id: '123',
            name: 'District Name'
        });

        // create a mock req and res object
        const req = {
            params: {
                id: '123'
            }
        };
        const res = {
            render: jest.fn()
        };

        // call the router function
        await router.get('/districts/edit/:id', function (req, res) {
            sendRequest('/District/ById', 'GET', {id:req.params.id}, function (data) {
                res.render('admin/edit-district', {title: 'Edit District', district: data});
            }, function (error) {
                res.redirect('/admin/districts');
            });
        })(req, res);

        // assert that the correct view was rendered with the correct data
        expect(res.render).toHaveBeenCalledWith('admin/edit-district', {
            title: 'Edit District',
            district: {
                id: '123',
                name: 'District Name'
            }
        });
    });

    it('should redirect to /admin/districts on error', async () => {
        // set up mock response for /District/ById request
        mock.onGet('/District/ById').reply(500);

        // create a mock req and res object
        const req = {
            params: {
                id: '123'
            }
        };
        const res = {
            redirect: jest.fn()
        };

        // call the router function
        await router.get('/districts/edit/:id', function (req, res) {
            sendRequest('/District/ById', 'GET', {id:req.params.id}, function (data) {
                res.render('admin/edit-district', {title: 'Edit District', district: data});
            }, function (error) {
                res.redirect('/admin/districts');
            });
        })(req, res);

        // assert that the correct view was rendered with the correct data
        expect(res.redirect).toHaveBeenCalledWith('/admin/districts');
    });
});
