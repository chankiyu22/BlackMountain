var Signup = {

// ## Attempt to sign up
  create_user : function() {
    //var fullname = $('#name').val();
    //var email = $('#email').val();
    //var username = $('#username').val();
    //var pwd = $('#password').val();
    //var data = {fullname, email, username, pwd};
    event.preventDefault();
    console.log('aaaaaargh');
    var signup_error='';
    $.post("/signup/addUser")
    .fail(function(result) {
      console.log('aaaaaaargh2');
      console.log(signup_error);
      $('#signup_error').val(signup_error);
    });
  }
};
