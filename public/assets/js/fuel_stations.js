/**
 * Fuel Stations form reset
 */
function resetFuelStationForm() {
    // clear form fields values
    $('#name').val('');
    $('#address').val('');
    $('#district_id').val('');
    $('#contact_person').val('');
    $('#email').val('');
    $('#duration_per_verhicle').val('');
}

/**
 * Save fuel station
 */
function loadDistrictsSelect() {
    // get district select element
    let select = $('#district_id');
    // get the selected data value from the page response
    let selected = select.data('selected');
    // set sekect disabled until the options are populated
    select.prop('disabled', true);
    select.html(`<option>Loading, please wait...</option>`);
    // send ajax request
    $.ajax({
        url: apiBaseUrl + '/District/All', // url
        type: 'GET', // GET method
        success: function (data) {
            // onsucess
            // populate the select with districts
            select.empty();

            // loop through each district entry and add as an option
            $.each(data, function (index, value) {
                select.append(`<option value="${value.id}" ${selected == value.id ? 'selected' : ''}>
                ${value.name}</option>`);
            });
            // re-enable the select element
            select.prop('disabled', false);
        },
        error: function (error) { // if on error
            // empty the select element and re-enable it
            select.empty();
            select.prop('disabled', false);
        }
    });
}

/**
 * Load fuel stations table
 */
function loadFuelStationsTable() {
    // send ajax request
    $.get(apiBaseUrl + '/FuelStation/All', function (data) {
        // on success
        var table = $('#fuel-stations-table tbody'); // get the table body
        // empty the table body
        table.empty();
        // loop through each fuel station entry and add as a row
        $.each(data, function (index, value) {
            table.append(`<tr>
                <td>${value.name == null ? '-' : value.name}</td>
                <td>${value.address == null ? '-' : value.address}</td>
                <td>${value.district.name == null ? '-' : value.district.name}</td>
                <td>${value.contactPerson == null ? '-' : value.contactPerson}<br />${value.email == null ? '-' : value.email}</td>
                <td>
                    <a href="/admin/fuel-stations/edit/${value.id}" 
                    class="btn btn-primary btn-sm">Edit</a>
                    <form action="/admin/fuel-stations/delete/${value.id}" 
                    method="POST" class="d-inline" 
                    onsubmit="return confirm('Are you sure?')">
                        <button class="btn btn-danger btn-sm">Delete
                    </button></form>
                </td>
            </tr>`);
        });
    });
}

$(function () {
    // call functions on page load
    loadDistrictsSelect();
    loadFuelStationsTable();
});
