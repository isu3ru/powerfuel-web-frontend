/**
 * Create a new district
 * @returns void
 */
function saveDistrict() {
    // get values from the form
    let districtName = $('#district-name').val();
    let populationDensity = $('#population-density').val();

    // if there is no district name
    if (districtName.length == 0) {
        // show error message
        return alert('District is required.');
    }

    // set the settings for hxr
    // data is stringified
    var settings = {
        "url": apiBaseUrl + "/District/Save", "method": "POST", "timeout": 0, "headers": {
            "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
        }, "data": JSON.stringify({
            "name": districtName, "populationDensity": populationDensity
        }),
    };

    // send the request and on success, show a success message
    $.ajax(settings).done(function (response) {
        alert('District saved successfully.');
        getAllDistricts();
    });
}

/**
 * Update a district
 * @returns void
 */
function updateDistrict() {
    // get values from the form
    let districtId = $('#district_id').val();
    let districtName = $('#district-name').val();
    let populationDensity = $('#population-density').val();

    // if there is no district name
    if (districtName.length == 0) {
        // show error message
        return alert('District is required.');
    }

    // set the settings for hxr
    // data is stringified
    var settings = {
        "url": apiBaseUrl + "/District/Save", "method": "POST", "timeout": 0, "headers": {
            "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
        }, "data": JSON.stringify({
            "id": districtId, "name": districtName, "populationDensity": populationDensity
        }),
    };

    // send the request and on success, show a success message
    $.ajax(settings).done(function (response) {
        alert('District saved successfully.');
        getAllDistricts();
    });
}



// submit #district_form and run saveDistrict
$('#district_form').submit(function (e) {
    e.preventDefault();
    // run the saveDistrict function on form submit
    saveDistrict();
});

/**
 * Delete district
 * @param {int} id
 * @returns void
 */
function deleteDistrict(id) {
    if (!confirm("Are you sure you want to delete this district?")) {
        return;
    }

    var settings = {
        "url": apiBaseUrl + "/District/Delete?id=" + id, "method": "POST", "timeout": 0, "headers": {
            "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
        },
    };

    $.ajax(settings).done(function (response) {
        getAllDistricts();
    });
}

/**
 * Get all districts
 */
function getAllDistricts() {
    // get the table body and set the loading message
    let districtsTableBody = $('#districts tbody');
    districtsTableBody.html('<tr><td colspan="3">Loading...</td></tr>');

    // send the district all api
    $.get(apiBaseUrl + "/District/All", function (data) {
        // set the districts variable to the data
        let districts = data;

        // if there are districts
        if (districts.length > 0) {
            // empty the table body
            districtsTableBody.empty();

            // loop through the districts and append them to the table body
            $.each(districts, function (index, district) {
                // append the district to the table body
                districtsTableBody.append(`<tr>
                    <td>${index + 1}</td>
                    <td>${district.name}</td>
                    <td>${district.populationDensity ? district.populationDensity : '-'}</td>
                    <td>
                        <a class="btn btn-primary btn-sm" href="/admin/districts/edit/${district.id}">
                            <span class="fa fa-edit"></span> Edit
                        </a>
                        <button class="btn btn-danger btn-sm" onclick="deleteDistrict(${district.id})">
                            <span class="fa fa-trash-o"></span> Delete
                        </button>
                    </td>
                </tr>`);
            });
        } else {
            // if there are no districts, add no districts row
            districtsTableBody.html('<tr><td colspan="3">No districts available.</td></tr>');
        }
    });
}

$(function () {
    // run getAllDistricts on page load
    getAllDistricts();
});
