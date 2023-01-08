$('#login_form').submit(function(e){
    $('#email').prop('readonly', true);
    $('#password').prop('readonly', true);
    $('#submit_login').prop('disabled', true);
    $('#submit_login').html('<i class="fas fa-spinner fa-spin"></i> Signing you in...');
});
