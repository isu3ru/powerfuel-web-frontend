// API url
var api_base_url = "http://powerfuel.janaksystem.com/api";
var api_key = '';

function sendGetRequest(route, data, headers, onSuccess, onError) {
    return $.ajax({
        url: api_base_url + route,
        method: 'GET',
        data: data,
        headers: headers,
        success: function (data) {
            if(typeof onSuccess === 'function') {
                onSuccess(data);
            }
        },
        error: function (data) {
            if(typeof onError === 'function') {
                onError(data);
            }
        }
    });
}

function sendPostRequest(route, data, headers, onSuccess, onError) {
    return $.ajax({
        url: api_base_url + route,
        method: 'POST',
        data: data,
        headers: headers,
        success: function (data) {
            if(typeof onSuccess === 'function') {
                onSuccess(data);
            }
        },
        error: function (data) {
            if(typeof onError === 'function') {
                onError(data);
            }
        }
    });
}
