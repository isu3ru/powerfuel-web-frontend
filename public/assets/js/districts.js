
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
            "Authorization": "<API Key>"
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
            "Authorization": "<API Key>"
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
    $.get(api_base_url + "/District/All", function (data, status) {
        if (status === 'success') {
            let html = "";

            let num = 1;
            for (const key in data) {
                if (Object.hasOwnProperty.call(data, key)) {
                    const element = data[key];
                    html += `<tr>
              <td>${num++}</td>
              <td>${element.name}</td>
              <td>${element.populationDensity}</td>
              <td> <button class="btn btn-danger" onclick="deleteDistrict(${element.id})">Delete</button> </td>
              </tr>`;
                }
            }

            $('#districtsTableBody').html(html);
        } else {
            alert("Error getting districts");
        }
    }, 'json');
}


$(function () {
    // run getAllDistricts
    getAllDistricts();
});
