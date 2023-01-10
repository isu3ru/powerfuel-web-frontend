/**
 * Add fuel type
 */
function addFuelType(callback) {
  let typeName = $('#fuleTypeName').val();
  let reorderLevel = $('#reorderLevel').val();

  $.ajax({
    url: apiBaseUrl + "/FuelTypes/Save",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      name: typeName,
      rolOfStation: reorderLevel,
    }),
    success: function (response) {
      if (typeof callback === "function") {
        callback(response);
      }
    }
  });
}

function getFuelTypes() {
  $.get(apiBaseUrl + '/FuelTypes/All', function (data, status) {
    if (data.length == 0) {
      $('#fuel-type-table tbody').html('<tr><td colspan="4">No fuel types available.</td></tr>');
      return false;
    }

    $('#fuel-type-table tbody').html('');
    $.each(data, function (index, value) {
      $('#fuel-type-table tbody').append(
        `<tr>
          <td>${index + 1}</td>
          <td>${value.name}</td>
          <td>${value.rolOfStation}</td>
          <td>
          <a href="/admin/fuel-types/edit/${value.id}" class="btn btn-primary btn-sm">Edit</a>
          <button class="btn btn-danger btn-sm del_fuel_type" data-id="${value.id}">Delete</button>
          </td>
          </tr>`);
    });
  }, 'json');
}

$('#fuel_types_form').submit(function (e) {
  e.preventDefault();
  console.log('form submitted');
  $('#send_fuel_types').attr('disabled', true);
  addFuelType(function (res) {
    getFuelTypes();
    $('#fuel_types_form')[0].reset();
    $('#send_fuel_types').attr('disabled', false);
  });
});

// reset fields on form reset
$('#fuel_types_form').on('reset', function () {
  $('#send_fuel_types').attr('disabled', false);
});

// delete with confirmation
$(document).on('click', '.del_fuel_type', function(e){
  let id = $(this).data('id');
  let confirm = window.confirm('Are you sure you want to delete this fuel type?');
  if(confirm){
    deleteFuelType(id, function(){
      getFuelTypes();
    });
  }
});

// send delete
function deleteFuelType(id, callback) {
  $.ajax({
    url: apiBaseUrl + "/FuelTypes/Delete?id=" + id,
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: {},
    success: function (response) {
      if (typeof callback === "function") {
        callback(response);
      }
    }
  });
}

function updateFuelType() {
  let id = $('#fuelTypeId').val();
  let typeName = $('#fuleTypeName').val();
  let reorderLevel = $('#reorderLevel').val();

  $.ajax({
    url: apiBaseUrl + "/FuelTypes/Save",
    type: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data: JSON.stringify({
      id: id,
      name: typeName,
      rolOfStation: reorderLevel,
    }),
    success: function (response) {
      if (typeof callback === "function") {
        callback(response);
      }
    }
  });
}

$(function () {
  getFuelTypes();
});