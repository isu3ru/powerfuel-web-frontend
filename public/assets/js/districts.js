
/**
 * Save district
 */
function saveDistrict() {
    let districtName = $('#district-name').val();
    let populationDensity = $('#population-density').val();

    var settings = {
        "url": api_base_url + "/District/Save",
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
        "data": JSON.stringify({
            "name": districtName,
            "populationDensity": populationDensity
        }),
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

// submit #district_form and run saveDistrict
$('#district_form').submit(function (e) {
    e.preventDefault();
    saveDistrict();
});

/**
 * Delete district
 * @param {int} id 
 */
function deleteDistrict(id) {
    if (!confirm("Are you sure you want to delete this district?")) {
        return;
    }

    var settings = {
        "url": api_base_url + "/District/Delete?id=" + id,
        "method": "POST",
        "timeout": 0,
        "headers": {
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin": "*"
        },
    };

    $.ajax(settings).done(function (response) {
        console.log(response);
    });
}

/**
 * Get all districts
 */
function getAllDistricts() {
    
}


$(function () {
    // run getAllDistricts
    getAllDistricts();
});
