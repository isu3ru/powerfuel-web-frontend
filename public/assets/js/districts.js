/**
 * Save district
 */
function saveDistrict() {
    let districtName = $('#district-name').val();
    let populationDensity = $('#population-density').val();

    if (districtName.length == 0) {
        return alert('District is required.');
    }

    var settings = {
        "url": apiBaseUrl + "/District/Save", "method": "POST", "timeout": 0, "headers": {
            "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
        }, "data": JSON.stringify({
            "name": districtName, "populationDensity": populationDensity
        }),
    };

    $.ajax(settings).done(function (response) {
        alert('District saved successfully.')
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
        "url": apiBaseUrl + "/District/Delete?id=" + id, "method": "POST", "timeout": 0, "headers": {
            "Content-Type": "application/json", "Access-Control-Allow-Origin": "*"
        },
    };

    $.ajax(settings).done(function (response) {
        getAllDistricts();
        console.log(response);
    });
}

/**
 * Get all districts
 */
function getAllDistricts() {
    let districtsTableBody = $('#districts tbody');
    districtsTableBody.html('<tr><td colspan="3">Loading...</td></tr>');

    $.get(apiBaseUrl + "/District/All", function (data) {
        let districts = data;

        if (districts.length > 0) {
            districtsTableBody.empty();

            $.each(districts, function (index, district) {
                districtsTableBody.append(`<tr>
                    <td>${index + 1}</td>
                    <td>${district.name}</td>
                    <td>${district.populationDensity ? district.populationDensity : '-'}</td>
                    <td>
                        <!-- <a class="btn btn-primary btn-sm" href="/admin/districts/edit/${district.id}">
                            <span class="fa fa-edit"></span> Edit
                        </a> -->
                        <button class="btn btn-danger btn-sm" onclick="deleteDistrict(${district.id})">
                            <span class="fa fa-trash-o"></span> Delete
                        </button>
                    </td>
                </tr>`);
            });
        } else {
            districtsTableBody.html('<tr><td colspan="3">No districts available.</td></tr>');
        }
    });
}

$(function () {
    // run getAllDistricts
    getAllDistricts();
});
