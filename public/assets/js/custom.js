// API url
var apiBaseUrl = "http://powerfuel.janaksystem.com/api";

/**
 * Sends a GET request to the route with the data and headers
 * @param {*} route 
 * @param {*} data 
 * @param {*} headers 
 * @param {*} onSuccess 
 * @param {*} onError 
 * @returns jqXHR
 */
function sendGetRequest(route, data, headers, onSuccess, onError) {
    // send jquery ajax request
    return $.ajax({
        url: apiBaseUrl + route, // complete the url
        method: 'GET', //  set method as GET
        data: data, // set the data
        headers: headers, // set headers
        success: function (data) {
            // if onSuccess is a function, execute it
            if(typeof onSuccess === 'function') {
                // data is passed as a parameter
                onSuccess(data);
            }
        },
        error: function (error) {
            // if onError is a function, execute it
            if(typeof onError === 'function') {
                // data is passed as a parameter
                onError(error);
            }
        }
    });
}

/**
 * Sends a POST request to the route with the data and headers
 * @param {*} route 
 * @param {*} data 
 * @param {*} headers 
 * @param {*} onSuccess 
 * @param {*} onError 
 * @returns jqXHR
 */
function sendPostRequest(route, data, headers, onSuccess, onError) {
    return $.ajax({
        url: apiBaseUrl + route,
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

