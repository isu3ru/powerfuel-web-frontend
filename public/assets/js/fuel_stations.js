function resetFuelStationForm() {
    // reset form fields
    $('#name').val('');
    $('#address').val('');
    $('#district_id').val('');
    $('#contact_person').val('');
    $('#email').val('');
    $('#duration_per_verhicle').val('');
}

function loadDistrictsSelect() {
    let select = $('#district_id');
    let selected = select.data('selected');
    select.prop('disabled', true);
    select.html(`<option>Loading, please wait...</option>`);
    $.ajax({
        url: apiBaseUrl + '/District/All',
        type: 'GET',
        success: function (data) {
            console.log(data);
            // populate the select with districts
            select.empty();
            $.each(data, function (index, value) {
                select.append(`<option value="${value.id}" ${selected == value.id ? 'selected' : ''}>
                ${value.name}</option>`);
            });
            select.prop('disabled', false);
        },
        error: function (error) {
            console.log(error);
            select.empty();
            select.prop('disabled', false);
        }
    });
}

function loadFuelStationsTable() {
    $.get(apiBaseUrl + '/FuelStation/All', function (data) {
        console.log(data);
        var table = $('#fuel-stations-table tbody');
        table.empty();
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
    loadDistrictsSelect();
    loadFuelStationsTable();
});
