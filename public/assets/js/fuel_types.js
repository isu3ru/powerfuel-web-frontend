/**
 * Add fuel type
 */
function addFuelType() {
    let fuelTypeName = $('#fuel-type-name').val();
  
    var settings = {
      "url": api_base_url + "/FuelType/Save",
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization  ": "<API Key>",
      },
      "data": JSON.stringify({
        "name": fuelTypeName
      }),
    };
  
    $.ajax(settings).done(function (response) {
      console.log(response);
    });
  }