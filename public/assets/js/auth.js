// unset loggedInUser from localStorage
// if has the loggedInUser in localStorage, unset it
if (localStorage.getItem('loggedInUser')) {
    localStorage.removeItem('loggedInUser');
}

// when submitting the login form, update form state to indicate that the form is being submitted
$('#login_form').submit(function(e){
    // set the email and password fields readonly
    $('#email').prop('readonly', true);
    $('#password').prop('readonly', true);
    // and disable the submit button with setting a spinner icon and text
    $('#submit_login').prop('disabled', true);
    $('#submit_login').html('<i class="fas fa-spinner fa-spin"></i> Signing you in...');
});
