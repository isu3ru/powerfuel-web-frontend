const axios = require('axios');

const baseUrl = 'http://powerfuel.janaksystem.com/api';

function sendRequest(url, requestType, data, onSuccess, onError) {
    axios({
        method: requestType, url: baseUrl + url, data: data, headers: {
            'Access-Control-Allow-Origin': '*', 'Content-type': "application/json", "Accept": "application/json"
        }
    }).then(response => onSuccess(response.data))
        .catch(error => onError(error));
}

// export sendRequest and test from this file
module.exports = {sendRequest};
