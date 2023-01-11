// load vehicle types table

/**
 * Get all districts
 */
function loadVehicleTypesTable() {
    let vehicleTypesTableBody = $('#vehicleTypes tbody');
    vehicleTypesTableBody.html('<tr><td colspan="4">Loading...</td></tr>');

    $.get(apiBaseUrl + "/VehicleTypes/All", function (data) {
        let vehicleTypes = data;

        if (vehicleTypes.length > 0) {
            vehicleTypesTableBody.empty();

            $.each(vehicleTypes, function (index, vehicleType) {
                vehicleTypesTableBody.append(`<tr>
                    <td>${vehicleType.name}</td>
                    <td>${vehicleType.periodAllocatedQTA}</td>
                    <td>${vehicleType.noOfPeriods}</td>
                    <td>
                        <a href="/admin/vehicle-types/edit/${vehicleType.id}" 
                        class="btn btn-sm btn-primary">Edit</a>
                        <form action="/admin/vehicle-types/delete/${vehicleType.id}" method="post" 
                        class="d-inline delete_form">
                            <button type="submit" class="btn btn-danger btn-sm">Delete</button>
                        </form>
                    </td>
                </tr>`);
            });
        } else {
            vehicleTypesTableBody.html('<tr><td colspan="4">No vehicle types added yet.</td></tr>');
        }
    });
}

$(function () {
    loadVehicleTypesTable();
});
