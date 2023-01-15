const axios = require('axios');
const MockAdapter = require('axios-mock-adapter');

describe('PUT /api/VehicleRequest/CompleteRequest', () => {
    let mock;
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });
    afterEach(() => {
        mock.reset();
    });

    it('should complete the vehicle oil quota request', async () => {
        const requestData = {
            "id": 0,
            "state": 0,
            "created": "2023-01-15T07:21:04.164Z",
            "lastUpdated": "2023-01-15T07:21:04.164Z",
            "fuelStationId": 0,
            "fuelStation": {
                "id": 0,
                "state": 0,
                "created": "2023-01-15T07:21:04.164Z",
                "lastUpdated": "2023-01-15T07:21:04.164Z",
                "name": "string",
                "address": "string",
                "districtId": 0,
                "contactPerson": "string",
                "email": "string",
                "durationPerVerhicle": 0,
                "couldNotDistribute": true,
                "district": {
                    "id": 0,
                    "name": "string",
                    "populationDensity": 0
                },
                "users": [
                    {
                        "id": 0,
                        "state": 0,
                        "created": "2023-01-15T07:21:04.164Z",
                        "lastUpdated": "2023-01-15T07:21:04.164Z",
                        "firstName": "string",
                        "lastName": "string",
                        "email": "string",
                        "contactNo": "string",
                        "password": "string",
                        "userTypeId": 0,
                        "userType": {
                            "id": 0,
                            "name": "string"
                        },
                        "fuelStationId": 0,
                        "fuelStation": "string",
                        "salt": "string",
                        "token": "string"
                    }
                ]
            },
            "vehicleId": 0,
            "vehicle": {
                "id": 0,
                "state": 0,
                "created": "2023-01-15T07:21:04.164Z",
                "lastUpdated": "2023-01-15T07:21:04.164Z",
                "plateNo": "string",
                "chassyNo": "string",
                "fuelTypeId": 0,
                "fuelType": {
                    "id": 0,
                    "name": "string",
                    "rolOfStation": 0
                },
                "vehicleTypeId": 0,
                "vehicleType": {
                    "id": 0,
                    "name": "string",
                    "periodAllocatedQTA": 0,
                    "period": 1,
                    "noOfPeriods": 0
                },
                "customerId": 0,
                "customer": {
                    "id": 0,
                    "state": 0,
                    "created": "2023-01-15T07:21:04.164Z",
                    "lastUpdated": "2023-01-15T07:21:04.164Z",
                    "firstName": "string",
                    "lastName": "string",
                    "email": "string",
                    "contactNo": "string",
                    "password": "string",
                    "otp": "string",
                    "salt": "string",
                    "otpExpireDate": "2023-01-15T07:21:04.164Z",
                    "cleanPassword": "string",
                    "token": "string"
                },
                "usedQTA": 0,
                "periodQTA": 0,
                "currentPeriodStartTime": "2023-01-15T07:21:04.164Z",
                "quataRequests": [
                    "string"
                ],
                "vehicleStatus": 1
            },
            "fuelTypeId": 0,
            "fuelType": {
                "id": 0,
                "name": "string",
                "rolOfStation": 0
            },
            "qty": 0,
            "requestedDateTime": "2023-01-15T07:21:04.164Z",
            "requestedDateTimeStr": "string",
            "pumpedUserId": 0,
            "pumpedUser": {
                "id": 0,
                "state": 0,
                "created": "2023-01-15T07:21:04.164Z",
                "lastUpdated": "2023-01-15T07:21:04.164Z",
                "firstName": "string",
                "lastName": "string",
                "email": "string",
                "contactNo": "string",
                "password": "string",
                "userTypeId": 0,
                "userType": {
                    "id": 0,
                    "name": "string"
                },
                "fuelStationId": 0,
                "fuelStation": "string",
                "salt": "string",
                "token": "string"
            },
            "requestStatus": 1,
            "fuelStationName": "string"
        };

        mock.onPut('/api/VehicleRequest/CompleteRequest', requestData).reply(200, {
            message: 'Vehicle oil quota request completed successfully'
        });
        const response = await axios.put('/api/VehicleRequest/CompleteRequest', requestData);
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ message: 'Vehicle oil quota request completed successfully' });
    });
});

describe('POST /api/Vehicle/ChangeStatusOfAVehicles', () => {
    let mock;
    beforeEach(() => {
        mock = new MockAdapter(axios);
    });
    afterEach(() => {
        mock.reset();
    });

    it('should change status of vehicles', async () => {
        const payload = {
            vehicleIds: ['1', '2', '3'],
            vehicleStatus: 1
        }
        mock.onPost('/api/Vehicle/ChangeStatusOfAVehicles', payload).reply(200, {
            message: 'Vehicle status changed successfully'
        });
        const response = await axios.post('/api/Vehicle/ChangeStatusOfAVehicles', payload);
        expect(response.status).toEqual(200);
        expect(response.data).toEqual({ message: 'Vehicle status changed successfully' });
    });

    it('should return error if vehicleIds is missing', async () => {
        const payload = {
            vehicleStatus: 1
        }
        mock.onPost('/api/Vehicle/ChangeStatusOfAVehicles', payload).reply(400, {
            error: 'vehicleIds is required'
        });
        try {
            const response = await axios.post('/api/Vehicle/ChangeStatusOfAVehicles', payload);
        } catch (error) {
            expect(error.response.status).toEqual(400);
            expect(error.response.data.error).toEqual('vehicleIds is required');
        }
    });

    it('should return error if vehicleIds is missing', async () => {
        const payload = { 
            vehicleStatus: 1
        }

        expect(payload.vehicleStatus).toEqual(1);
        expect(payload.vehicleId).toEqual(undefined);
        try {
            await axios.post('/api/Vehicle/ChangeStatusOfAVehicles', payload);
        } catch (error) {
            expect(error.response.status).toEqual(404);
         }
    });

it('should return not found error if vehicleStatus is not 1', async () => {
        const payload = { 
            vehicleIds: ['1', '2', '3'],
            vehicleStatus: 2
        }
        try {
            await axios.post('/api/Vehicle/ChangeStatusOfAVehicles', payload);
        } catch (error) {
            expect(error.response.status).toEqual(404);
        }
    });
});