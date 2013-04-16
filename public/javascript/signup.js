var Signup = {

// ## Attempt to sign up
  create_user : function() {
    var fullname = $('#name').val();
    var email = $('#email').val();
    var username = $('#username').val();
    var pwd = $('#password').val();
    var data = {name: fullname, email: email, username: username, password: pwd};
    event.preventDefault();

    $.post("/signup/addUser", data)
    .done(function(result) {
      if (result == 'success')
      {
        window.location = "/";
      }
      $('#signup_error').html(result);
    });
  }
};
