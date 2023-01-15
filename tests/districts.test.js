const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('GET /District/ById', () => {
  let mock;

  beforeEach(() => {
    mock = new MockAdapter(axios);
  });

  afterEach(() => {
    mock.reset();
  });

  it('should return district data', async () => {
    // set up mock response for GET request to /District/ById?id=1
    mock.onGet('/District/ById?id=1').reply(200, {
      id: '1',
      name: 'District Name'
    });

    // make a GET request to /District/ById?id=1
    const response = await axios.get('/District/ById?id=1');

    // assert that the response is as expected
    expect(response.status).toEqual(200);
    expect(response.data).toEqual({ id: '1', name: 'District Name' });
  });

  it('should return error when id is not provided', async () => {
    // set up mock response for GET request to /District/ById
    mock.onGet('/District/ById').reply(400, {
      error: 'id is required'
    });

    try {
      // make a GET request to /District/ById
      await axios.get('/District/ById');
    } catch (error) {
      // assert that the error is as expected
      expect(error.response.status).toEqual(400);
      expect(error.response.data.error).toEqual('id is required');
    }
  });
});

// create district test
describe('POST /District/Save', () => {
    let mock;
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });
    afterEach(() => {
        mock.reset();
    });
  
    it('should create a new district entry', async () => {
        const districtData = { id: '1', name: 'District Name', populationDensity: '1000' }
        mock.onPost('/District/Save', districtData).reply(201, {
            message: 'District entry created successfully'
        });
        const response = await axios.post('/District/Save', districtData);
        expect(response.status).toEqual(201);
        expect(response.data).toEqual({ message: 'District entry created successfully' });
    });

    it('should return error if required fields are missing', async () => {
        const districtData = { name: 'District Name', populationDensity: '1000' }
        mock.onPost('/District/Save', districtData).reply(400, {
            error: 'id is required'
        });
        try {
            const response = await axios.post('/District/Save', districtData);
        } catch (error) {
            expect(error.response.status).toEqual(400);
            expect(error.response.data.error).toEqual('id is required');
        }
    });
});
