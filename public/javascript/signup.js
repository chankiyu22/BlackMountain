var Signup = {

  passvalid : false,

  uservalid : false,

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
      else
      {
        $('#signup_error').html(result);
      }
    });
  },

  // validate password on text input
  check_password : function() {
    var pass = $("#password").val();
    if (pass.length == 0) {
      $("#passcheck").html('');
      this.passvalid = false;
    }
    else if (pass.length < 6) {
      $("#passcheck").html('Minimum 6 characters');
      $('#passcheck').removeClass('result_success').addClass('result_fail');
      this.passvalid = false;
    }
    else
    {
      $("#passcheck").html('Valid');
      $('#passcheck').removeClass('result_fail').addClass('result_success');
      this.passvalid = true;
    }
    if (this.passvalid && this.useralid) {
      $("#create_btn").removeAttr("disabled");
    } else {
      $("#create_btn").attr("disabled", "disabled");
    }
  },

  // validate username on text input
  check_username : function() {
    var username = $("#username").val();
    if (username.length == 0) {
      $("#usercheck").html('');
      this.useralid = false;
      $("#create_btn").attr("disabled", "disabled");
    } else {
      var that = this;
      $.post("/signup/checkUsername", {username: username})
      .done(function(result) {
        if (result == 'Available') {
          $("#usercheck").html(result);
          $('#usercheck').removeClass('result_fail').addClass('result_success');
          that.useralid = true;
        } else {
          $("#usercheck").html(result);
          $('#usercheck').removeClass('result_success').addClass('result_fail');
          that.useralid = false;
        }

        if (that.passvalid && that.useralid) {
          $("#create_btn").removeAttr("disabled");
        } else {
          $("#create_btn").attr("disabled", "disabled");
        }
      });
    }
  },
};
