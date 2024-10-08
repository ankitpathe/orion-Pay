/* bootstrap form validation */
(function () {
  'use strict';
  window.addEventListener('load', function () {
    /* Fetch all the forms we want to apply custom Bootstrap validation styles to */
    var forms = document.getElementsByClassName('needs-validation');
    /* Loop over them and prevent submission */
    var validation = Array.prototype.filter.call(forms, function (form) {
      form.addEventListener('submit', function (event) {
        if (form.checkValidity() === false) {
          event.preventDefault();
          event.stopPropagation();
        }
        form.classList.add('was-validated');
      }, false);
    });
  }, false);
})();

var SIGNUP_PHONE = "";
var SIGNUP_EMAIL = "";
var OTP_START_TIME = 60;
var OTP_TIMER = OTP_START_TIME; /* time in seconds */
var LAST_TIME = OTP_TIMER;
var OTP_COUNTER_INTERVAL = "";
var OTP_COUNTER_PARENT_ID = "";
$(document).ready(function () {

  window.setTimeout(function () {
    if ($('#signup_add_phone_modal').is(':visible')) {
      google.accounts.id.cancel()
    }
  }, 2000);

  // show login modal on load
  if (SHOW_LOGIN_MODAL_ON_LOAD != undefined && SHOW_LOGIN_MODAL_ON_LOAD != null && SHOW_LOGIN_MODAL_ON_LOAD != "" && SHOW_LOGIN_MODAL_ON_LOAD != false) {
    $("#signin").modal('show');
  }

  /* BEGIN:: MANAGE COOKIE HANDLER */
  var checkUserCookie = getCookie('USER_DETAILS_COOKIE');
  if (checkUserCookie != undefined && checkUserCookie != null && checkUserCookie != "") {
    checkUserCookie = decodeURIComponent(checkUserCookie);
    try {
      var res = JSON.parse(checkUserCookie);
      if (res.event_key == 'SIGNUP_ADD_PHONE') {
        $('form#signup_add_phone_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));
        $('#signup_add_phone_modal').modal('show');

        //set back btn
        $('#signup_add_phone_modal .back-btn-handler').data('modal-hide', "#signup_add_phone_modal");
        $('#signup_add_phone_modal .back-btn-handler').data('modal-show', "#signup");

      } else if (res.event_key == 'LOGIN_ADD_PHONE') {
        $('form#login_add_phone_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

        //set back btn
        $('#login_add_phone_modal .back-btn-handler').data('modal-hide', "#login_add_phone_modal");
        $('#login_add_phone_modal .back-btn-handler').data('modal-show', "#signin");

        $('#login_add_phone_modal').modal('show');
      } else if (res.event_key == 'LOGIN_PHONE_OTP') {
        // show phone otp box
        $('#login_phone_otp_modal .phone_otp_line_text').html('An OTP has been shared to your Mobile no: ' + res.data.phone);
        $('form#login_phone_otp_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

        // begin:: set resend otp event
        var resendOTPE = $('#login_phone_otp_modal').find('.phoneResendOTP');
        resendOTPE.data("sessionid", res.data.session_id);
        resendOTPE.data("parentid", "#login_phone_otp_modal");

        if (res.data.phone_otp_log_file != undefined && res.data.phone_otp_log_file != null) {
          resendOTPE.data("otplogfile", res.data.phone_otp_log_file);
        } else {
          resendOTPE.data("otplogfile", "");
        }
        resendOTPE.fadeOut(0);
        LAST_TIME = OTP_TIMER = OTP_START_TIME;
        clearInterval(OTP_COUNTER_INTERVAL);
        OTP_COUNTER_INTERVAL = setInterval(phone_otp_counter, 1000);
        OTP_COUNTER_PARENT_ID = "#login_phone_otp_modal";
        // end:: set resend otp event

        //set back btn
        $('#login_phone_otp_modal .back-btn-handler').data('modal-hide', "#login_phone_otp_modal");
        $('#login_phone_otp_modal .back-btn-handler').data('modal-show', "#signin");

        $('.otp-set .otp-1').val('');
        $('.otp-set .otp-2').val('');
        $('.otp-set .otp-3').val('');
        $('.otp-set .otp-4').val('');
        $('.otp-set .otp-5').val('');
        $('.otp-set .otp-6').val('');
        $('#login_phone_otp_modal').modal('show');
      } else if (res.event_key == 'ALERT') {
        alert("Some Technical Error!!");
        console.log(res.data);
      }
      delete_cookie('USER_DETAILS_COOKIE');
    } catch (e) {
      console.log("Invalid User Details Cookie")
      delete_cookie('USER_DETAILS_COOKIE');
    }
  }
  /* END:: MANAGE COOKIE HANDLER */

  /* BEGIN:: MODAL TOGGLE */
  $(document).on('click', '#loginBtn', function () {
    $('#signin_modal').modal('hide');
    $('#mail_modal').modal('show');
  });

  $(document).on('click', 'button#openLoginModalBtn', function (e) {
    $('#signup').modal('hide');
    $('#signin').modal('show');
  });

  $(document).on('click', 'button#openSignupModalBtn', function (e) {
    $('#signin').modal('hide');
    $('#signup').modal('show');
  });


  $(document).on('click', '#Sign_Up', function () {
    $('#signup').modal('hide');
    $('#Create_account').modal('show');
  });

  $(document).on('keyup', '.otp_enter_box', function (e) {
    var ele = $(this);
    var count = $(this).data('count');

    var p = ele.parent('.otp-set');
    var finalOTP = p.find('.otp-1').val() + "" + p.find('.otp-2').val() + "" + p.find('.otp-3').val() + "" + p.find('.otp-4').val() + "" + p.find('.otp-5').val() + "" + p.find('.otp-6').val();
    if ((e.keyCode >= 48 && e.keyCode <= 57) || (e.keyCode >= 96 && e.keyCode <= 105)) {
      if (ele.val().length == 1) {
        if (count < 6) {
          count++;
          $('.otp_enter_box.otp-' + count).focus();
        }
      }
    }

    if (ele.val().length == 0) {
      if (count > 1) {
        count--;
        $('.otp_enter_box.otp-' + count).focus();
      }
    }

    if (finalOTP.length == 6) {
      p.find('.form-otp-input').val(finalOTP);
    } else {
      p.find('.form-otp-input').val('');
    }
  });


  $(document).on('change', '.login_type_toggler', function () {
    var tVal = $(this).val();
    if (tVal == 'phone') {
      $("#loginToggleInputBox").html('<div class="option-section" id="loginPhoneNumberBox"><div class="input-group"><button class="dropdown-toggle" id="code" aria-label="Text input" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal">+91</button><input type="text" name="phone" placeholder="Mobile Number" onkeypress="return onlyNumberKey(event)" required pattern="^[1-9]{1}[0-9]{9}" minlength="10" maxlength="10" inputmode="numeric"></div></div>');
    } else if (tVal == 'email') {
      $("#loginToggleInputBox").html('<div class="email-input-box"><input type="email" name="email" placeholder="Enter Email" class="form-control" required></div>');
    }
  });

  /* BEGIN:: back button handler */
  $(document).on('click', '#signup_add_email_modal_back_btn', function () {
    goto_signup_modal();
  });
  $(document).on('click', 'button.back-btn-handler', function () {
    var thisE = $(this);
    clearInterval(OTP_COUNTER_INTERVAL);
    if (thisE.data('modal-hide') != undefined && thisE.data('modal-hide') != null && thisE.data('modal-hide') != "") {
      $(thisE.data('modal-hide')).modal('hide');
    }
    if (thisE.data('modal-show') != undefined && thisE.data('modal-show') != null && thisE.data('modal-show') != "") {
      $(thisE.data('modal-show')).modal('show');
    }
  });

  function goto_login_modal() {
    $('#login_phone_otp_modal').modal('hide');
    $('#login_email_otp_modal').modal('hide');
    $('#signin').modal('show');
  }

  function goto_signup_modal() {
    $('#signup_add_email_modal').modal('hide');
    $('#mainsignup_phone_otp_form').fadeOut(0);
    $('.otp_enter_box').val('');
    $('.form-otp-input').val('');
    $('#mainSignGenerateOtpBtn').fadeIn(0);
    $('.other_login_options').fadeIn(0);
    $('#signup').modal('show');
  }
  /* END:: back button handler */

  /* BEGIN:: LOGIN PROCESS */
  $(document).on('submit', "form#MainLoginForm", function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 655) {
            // show phone otp box
            $('#login_phone_otp_modal .phone_otp_line_text').html('An OTP has been shared to your Mobile no: ' + res.data.phone);
            $('form#login_phone_otp_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            // begin:: set resend otp event
            var resendOTPE = $('#login_phone_otp_modal').find('.phoneResendOTP');
            resendOTPE.data("sessionid", res.data.session_id);
            resendOTPE.data("parentid", "#login_phone_otp_modal");

            if (res.data.phone_otp_log_file != undefined && res.data.phone_otp_log_file != null) {
              resendOTPE.data("otplogfile", res.data.phone_otp_log_file);
            } else {
              resendOTPE.data("otplogfile", "");
            }
            resendOTPE.fadeOut(0);
            LAST_TIME = OTP_TIMER = OTP_START_TIME;
            clearInterval(OTP_COUNTER_INTERVAL);
            OTP_COUNTER_INTERVAL = setInterval(phone_otp_counter, 1000);
            OTP_COUNTER_PARENT_ID = "#login_phone_otp_modal";
            // end:: set resend otp event

            //set back btn
            $('#login_phone_otp_modal .back-btn-handler').data('modal-hide', "#login_phone_otp_modal");
            $('#login_phone_otp_modal .back-btn-handler').data('modal-show', "#signin");

            $('#signin').modal('toggle');
            $('#signin').modal('hide');
            $('.otp-set .otp-1').val('');
            $('.otp-set .otp-2').val('');
            $('.otp-set .otp-3').val('');
            $('.otp-set .otp-4').val('');
            $('.otp-set .otp-5').val('');
            $('.otp-set .otp-6').val('');
            $('#login_phone_otp_modal').modal('show');
          } else if (res.status_code == 654) {
            // show email otp box
            $('#login_email_otp_modal .email_otp_line_text').html('An OTP has been shared to your Email Id: ' + res.data.email + '. Check your spam also.');
            $('form#login_email_otp_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            // begin:: set resend otp event
            var resendOTPE = $('#login_email_otp_modal').find('.emailResendOTP');
            resendOTPE.data("sessionid", res.data.session_id);
            resendOTPE.data("parentid", "#login_email_otp_modal");

            if (res.data.email_otp_log_file != undefined && res.data.email_otp_log_file != null) {
              resendOTPE.data("otplogfile", res.data.email_otp_log_file);
            } else {
              resendOTPE.data("otplogfile", "");
            }
            resendOTPE.fadeOut(0);
            LAST_TIME = OTP_TIMER = OTP_START_TIME;
            clearInterval(OTP_COUNTER_INTERVAL);
            OTP_COUNTER_INTERVAL = setInterval(email_otp_counter, 1000);
            OTP_COUNTER_PARENT_ID = "#login_email_otp_modal";
            // end:: set resend otp event

            //set back btn
            $('#login_email_otp_modal .back-btn-handler').data('modal-hide', "#login_email_otp_modal");
            $('#login_email_otp_modal .back-btn-handler').data('modal-show', "#signin");

            $('#signin').modal('hide');
            
            $('.otp-set .otp-1').val('');
            $('.otp-set .otp-2').val('');
            $('.otp-set .otp-3').val('');
            $('.otp-set .otp-4').val('');
            $('.otp-set .otp-5').val('');
            $('.otp-set .otp-6').val('');
            $('#login_email_otp_modal').modal('show');

          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#login_add_phone_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 655) {
            // show phone otp box
            $('#login_phone_otp_modal .phone_otp_line_text').html('An OTP has been shared to your Mobile no: ' + res.data.phone);
            $('form#login_phone_otp_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            // begin:: set resend otp event
            var resendOTPE = $('#login_phone_otp_modal').find('.phoneResendOTP');
            resendOTPE.data("sessionid", res.data.session_id);
            resendOTPE.data("parentid", "#login_phone_otp_modal");

            if (res.data.phone_otp_log_file != undefined && res.data.phone_otp_log_file != null) {
              resendOTPE.data("otplogfile", res.data.phone_otp_log_file);
            } else {
              resendOTPE.data("otplogfile", "");
            }
            resendOTPE.fadeOut(0);
            LAST_TIME = OTP_TIMER = OTP_START_TIME;
            clearInterval(OTP_COUNTER_INTERVAL);
            OTP_COUNTER_INTERVAL = setInterval(phone_otp_counter, 1000);
            OTP_COUNTER_PARENT_ID = "#login_phone_otp_modal";
            // end:: set resend otp event

            //set back btn
            $('#login_phone_otp_modal .back-btn-handler').data('modal-hide', "#login_phone_otp_modal");
            $('#login_phone_otp_modal .back-btn-handler').data('modal-show', "#login_add_phone_modal");

            $('#login_add_phone_modal').modal('hide');
            
            $('.otp-set .otp-1').val('');
            $('.otp-set .otp-2').val('');
            $('.otp-set .otp-3').val('');
            $('.otp-set .otp-4').val('');
            $('.otp-set .otp-5').val('');
            $('.otp-set .otp-6').val('');
            $('#login_phone_otp_modal').modal('show');
          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#login_phone_otp_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 903) {
            setErrorText(error_box, 200, res.message);
            $('#login_phone_otp_modal').modal('hide');
            $('#verified_modal .text-line').html('You have successfully Login');
            $('#verified_modal').modal('show');
            setTimeout(function () {
              location.reload();
            }, 100);
          } else if (res.status_code == 453) {
            var emailsInput = "";
            var checkedStatus = "checked";
            $.each(res.data.emails, function (k1, v1) {
              emailsInput += '<input type="radio" name="email" value="' + v1 + '" id="emailInput' + k1 + '" ' + checkedStatus + '><label for="emailInput' + k1 + '">' + v1 + '</label><br>';
              checkedStatus = "";
            });
            $('form#login_update_email_form').find('.emails-container').html(emailsInput);

            //set back btn
            $('#login_update_email_modal .back-btn-handler').data('modal-hide', "#login_update_email_modal");
            $('#login_update_email_modal .back-btn-handler').data('modal-show', "#signin");

            $('form#login_update_email_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));
            $('#login_phone_otp_modal').modal('hide');
            $('#login_update_email_modal').modal('show');
          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#login_update_email_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 654) {
            // show email otp box
            $('#login_email_otp_modal .email_otp_line_text').html('An OTP has been shared to your Email Id: ' + res.data.email + '. Check your spam also.');
            $('form#login_email_otp_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            // begin:: set resend otp event
            var resendOTPE = $('#login_email_otp_modal').find('.emailResendOTP');
            resendOTPE.data("sessionid", res.data.session_id);
            resendOTPE.data("parentid", "#login_email_otp_modal");

            if (res.data.email_otp_log_file != undefined && res.data.email_otp_log_file != null) {
              resendOTPE.data("otplogfile", res.data.email_otp_log_file);
            } else {
              resendOTPE.data("otplogfile", "");
            }
            resendOTPE.fadeOut(0);
            LAST_TIME = OTP_TIMER = OTP_START_TIME;
            clearInterval(OTP_COUNTER_INTERVAL);
            OTP_COUNTER_INTERVAL = setInterval(email_otp_counter, 1000);
            OTP_COUNTER_PARENT_ID = "#login_email_otp_modal";
            // end:: set resend otp event

            //set back btn
            $('#login_email_otp_modal .back-btn-handler').data('modal-hide', "#login_email_otp_modal");
            $('#login_email_otp_modal .back-btn-handler').data('modal-show', "#login_update_email_modal");

            $('#login_update_email_modal').modal('hide');
            $('.otp-set .otp-1').val('');
            $('.otp-set .otp-2').val('');
            $('.otp-set .otp-3').val('');
            $('.otp-set .otp-4').val('');
            $('.otp-set .otp-5').val('');
            $('.otp-set .otp-6').val('');
            $('#login_email_otp_modal').modal('show');

          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#login_email_otp_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 903) {
            setErrorText(error_box, 200, res.message);
            $('#login_email_otp_modal').modal('hide');
            $('#verified_modal .text-line').html('You have successfully Login');
            $('#verified_modal').modal('show');
            setTimeout(function () {
              location.reload();
            }, 100);
          } else if (res.status_code == 701) {
            $('form#login_add_phone_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            //set back btn
            $('#login_add_phone_modal .back-btn-handler').data('modal-hide', "#login_add_phone_modal");
            $('#login_add_phone_modal .back-btn-handler').data('modal-show', "#signin");

            $('#login_email_otp_modal').modal('hide');
            $('#login_add_phone_modal').modal('show');
          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });
  /* END:: LOGIN PROCESS */

  /* BEGIN:: SIGNUP PROCESS */
  $(document).on('keyup', 'input#signUpPhoneNumberInput', function () {
    if (SIGNUP_PHONE != $(this).val()) {
      clearInterval(OTP_COUNTER_INTERVAL);
      $('#mainsignup_phone_otp_form').fadeOut(0);
      $('#mainSignGenerateOtpBtn').fadeIn(0);
    }
  });
  $(document).on('keyup', 'input#signUpEmailInput', function () {
    if (SIGNUP_EMAIL != $(this).val()) {
      clearInterval(OTP_COUNTER_INTERVAL);
      $('#mainsignup_email_otp_form').fadeOut(0);
      $('#mainSignUpSendEmailOtpBtn').fadeIn(0);
    }
  });

  $(document).on('submit', 'form#sign_up_user_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 655) {
            // show phone otp box
            $('#signup_phone_otp_modal .phone_otp_line_text').html('An OTP has been shared to your Mobile no: ' + res.data.phone);
            $('form#mainsignup_phone_otp_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            // begin:: set resend otp event
            var resendOTPE = $('#mainsignup_phone_otp_form').find('.phoneResendOTP');
            resendOTPE.data("sessionid", res.data.session_id);
            resendOTPE.data("parentid", "#mainsignup_phone_otp_form");

            if (res.data.phone_otp_log_file != undefined && res.data.phone_otp_log_file != null) {
              resendOTPE.data("otplogfile", res.data.phone_otp_log_file);
            } else {
              resendOTPE.data("otplogfile", "");
            }
            resendOTPE.fadeOut(0);
            LAST_TIME = OTP_TIMER = OTP_START_TIME;
            clearInterval(OTP_COUNTER_INTERVAL);
            OTP_COUNTER_INTERVAL = setInterval(phone_otp_counter, 1000);
            OTP_COUNTER_PARENT_ID = "#mainsignup_phone_otp_form";
            // end:: set resend otp event

            SIGNUP_PHONE = res.data.phone;

            $('#mainSignGenerateOtpBtn').fadeOut(0);
            $('#mainsignup_phone_otp_form').fadeIn(0);
          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#signup_add_phone_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 655) {
            // show phone otp box
            $('#signup_phone_otp_modal .phone_otp_line_text').html('An OTP has been shared to your Mobile no: ' + res.data.phone);
            $('form#signup_phone_otp_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            // begin:: set resend otp event
            var resendOTPE = $('#signup_phone_otp_modal').find('.phoneResendOTP');
            resendOTPE.data("sessionid", res.data.session_id);
            resendOTPE.data("parentid", "#signup_phone_otp_modal");

            if (res.data.phone_otp_log_file != undefined && res.data.phone_otp_log_file != null) {
              resendOTPE.data("otplogfile", res.data.phone_otp_log_file);
            } else {
              resendOTPE.data("otplogfile", "");
            }
            resendOTPE.fadeOut(0);
            LAST_TIME = OTP_TIMER = OTP_START_TIME;
            clearInterval(OTP_COUNTER_INTERVAL);
            OTP_COUNTER_INTERVAL = setInterval(phone_otp_counter, 1000);
            OTP_COUNTER_PARENT_ID = "#signup_phone_otp_modal";
            // end:: set resend otp event

            //set back btn
            $('#signup_phone_otp_modal .back-btn-handler').data('modal-hide', "#signup_phone_otp_modal");
            $('#signup_phone_otp_modal .back-btn-handler').data('modal-show', "#signup_add_phone_modal");

            $('#signup_add_phone_modal').modal('hide');
            $('#signup_phone_otp_modal').modal('show');
          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#signup_phone_otp_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);
    if (getParameterByName('id') != "") {
      formData.append("agent_referral_id", getParameterByName('key'));
    }

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 903) {
            setErrorText(error_box, 200, res.message);
            $('#signup_phone_otp_modal').modal('hide');
            $('#verified_modal .text-line').html('You have successfully created your account');
            $('#verified_modal').modal('show');
            setTimeout(function () {
              location.reload();
            }, 100);
          } else if (res.status_code == 451) {
            //show add email box
            $('form#signup_add_email_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            $('#signup_phone_otp_modal').modal('hide');
            $('#signup_add_email_modal').modal('show');
          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#mainsignup_phone_otp_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);
    if (getParameterByName('id') != "") {
      formData.append("agent_referral_id", getParameterByName('key'));
    }

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 903) {
            setErrorText(error_box, 200, res.message);
            $('#signup').modal('hide');
            $('#verified_modal .text-line').html('You have successfully created your account');
            $('#verified_modal').modal('show');
            setTimeout(function () {
              location.reload();
            }, 100);
          } else if (res.status_code == 451) {
            //show add email box
            $('form#signup_add_email_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            $('#signup_add_email_modal .prefilled-name-tag').html(res.data.name);
            $('#signup_add_email_modal .prefilled-phone-tag').html("+91 " + res.data.phone);

            $('#signup').modal('hide');
            $('#signup_add_email_modal').modal('show');
          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#signup_add_email_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 654) {
            // show email otp box
            $('#signup_email_otp_modal .email_otp_line_text').html('An OTP has been shared to your Email Id: ' + res.data.email + '. Check your spam also.');
            $('form#mainsignup_email_otp_form').find('.hidden-inputs').html(generateHiddenInputs(res.data));

            // begin:: set resend otp event
            var resendOTPE = $('#mainsignup_email_otp_form').find('.emailResendOTP');
            resendOTPE.data("sessionid", res.data.session_id);
            resendOTPE.data("parentid", "#mainsignup_email_otp_form");

            if (res.data.email_otp_log_file != undefined && res.data.email_otp_log_file != null) {
              resendOTPE.data("otplogfile", res.data.email_otp_log_file);
            } else {
              resendOTPE.data("otplogfile", "");
            }
            resendOTPE.fadeOut(0);
            LAST_TIME = OTP_TIMER = OTP_START_TIME;
            clearInterval(OTP_COUNTER_INTERVAL);
            OTP_COUNTER_INTERVAL = setInterval(email_otp_counter, 1000);
            OTP_COUNTER_PARENT_ID = "#signup_add_email_modal";
            // end:: set resend otp event

            $('#mainSignUpSendEmailOtpBtn').fadeOut(0);
            $('#mainsignup_email_otp_form').fadeIn(0);

          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#signup_email_otp_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);
    if (getParameterByName('id') != "") {
      formData.append("agent_referral_id", getParameterByName('key'));
    }
    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 903) {
            setErrorText(error_box, 200, res.message);
            $('#signup_email_otp_modal').modal('hide');
            $('#verified_modal .text-line').html('You have successfully created your account');
            $('#verified_modal').modal('show');
            setTimeout(function () {
              location.reload();
            }, 100);
          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  $(document).on('submit', 'form#mainsignup_email_otp_form', function (e) {
    e.preventDefault();
    var cForm = $(this);
    var url = cForm.attr('action');
    var error_box = cForm.find('.error-box');
    error_box.html('');
    var formData = new FormData(cForm[0]);

    if (getParameterByName('id') != "") {
      formData.append("agent_referral_id", getParameterByName('key'));
    }

    submit_form_data_ajax(url, formData, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          if (res.status_code == 903) {
            setErrorText(error_box, 200, res.message);
            $('#signup_add_email_modal').modal('hide');
            $('#verified_modal .text-line').html('You have successfully created your account');
            $('#verified_modal').modal('show');
            setTimeout(function () {
              location.reload();
            }, 100);
          } else {
            setErrorText(error_box, 200, res.message);
          }
        } else {
          setErrorText(error_box, 400, res.message);
        }
      } catch (e) {
        setErrorText(error_box, 400, 'Some Error #' + e);
      }
    });
  });

  /* END:: SIGNUP PROCESS */

  /* BEGIN:: OTP RESEND */
  $(document).on('click', '.phoneResendOTP', function () {
    var thisE = $(this);
    if (thisE.data('sessionid') != undefined && thisE.data('sessionid') != null && thisE.data('sessionid') != "") {
      var parent_selector = thisE.data('parentid');
      var url = Base_URL + "authentication/resend_phone_otp";
      var formData = new FormData();
      formData.append('session_id', thisE.data('sessionid'));
      formData.append('phone_otp_log_file', thisE.data('otplogfile'));
      var error_box = $(parent_selector).find('.error-box');
      error_box.html('');
      submit_form_data_ajax(url, formData, function (output) {
        try {
          var res = JSON.parse(output);
          if (res.status) {
            if (res.status_code == 655) {
              $(parent_selector).find('input[name=session_id]').val(res.data.session_id);
              thisE.data("sessionid", res.data.session_id);
              setErrorText(error_box, 200, res.message);
              $(OTP_COUNTER_PARENT_ID).find('.phoneResendOTP').fadeOut(0);
              OTP_TIMER = LAST_TIME += (OTP_START_TIME / 2);
              clearInterval(OTP_COUNTER_INTERVAL);
              OTP_COUNTER_INTERVAL = setInterval(phone_otp_counter, 1000);
            } else {
              setErrorText(error_box, 200, res.message);
            }
          } else {
            setErrorText(error_box, 400, res.message);
          }
        } catch (e) {
          setErrorText(error_box, 400, 'Some Error #' + e);
        }
      });
    }
  });

  $(document).on('click', '.emailResendOTP', function () {
    var thisE = $(this);
    if (thisE.data('sessionid') != undefined && thisE.data('sessionid') != null && thisE.data('sessionid') != "") {
      var parent_selector = thisE.data('parentid');
      var url = Base_URL + "authentication/resend_email_otp";
      var formData = new FormData();
      formData.append('session_id', thisE.data('sessionid'));
      formData.append('email_otp_log_file', thisE.data('otplogfile'));
      var error_box = $(parent_selector).find('.error-box');
      error_box.html('');
      submit_form_data_ajax(url, formData, function (output) {
        try {
          var res = JSON.parse(output);
          if (res.status) {
            if (res.status_code == 654) {
              $(parent_selector).find('input[name=session_id]').val(res.data.session_id);
              thisE.data("sessionid", res.data.session_id);
              setErrorText(error_box, 200, res.message);
              $(OTP_COUNTER_PARENT_ID).find('.emailResendOTP').fadeOut(0);
              OTP_TIMER = LAST_TIME += (OTP_START_TIME / 2);
              clearInterval(OTP_COUNTER_INTERVAL);
              OTP_COUNTER_INTERVAL = setInterval(email_otp_counter, 1000);
            } else {
              setErrorText(error_box, 200, res.message);
            }
          } else {
            setErrorText(error_box, 400, res.message);
          }
        } catch (e) {
          setErrorText(error_box, 400, 'Some Error #' + e);
        }
      });
    }
  });
  /* END:: OTP RESEND */

  function generateHiddenInputs(data) {
    var hiddenInputs = "";
    $.each(data, function (k1, v1) {
      if (typeof (v1) != 'object') {
        hiddenInputs += '<input type="hidden" name="' + k1 + '" value="' + v1 + '">';
      }
    });
    return hiddenInputs;
  }

});

function phone_otp_counter() {
  var resendOTPCon = $(OTP_COUNTER_PARENT_ID).find('.phoneResendOTPCounter');
  var resendOTPEle = $(OTP_COUNTER_PARENT_ID).find('.phoneResendOTP');
  if (OTP_TIMER > 0) {
    resendOTPCon.html('Resend OTP in ' + fmtMSS(OTP_TIMER));
    OTP_TIMER--;
    resendOTPCon.fadeIn(0);
    resendOTPEle.fadeOut(0);
  } else {
    resendOTPCon.fadeOut(0);
    resendOTPEle.fadeIn(0);
    clearInterval(OTP_COUNTER_INTERVAL);
  }
}

function email_otp_counter() {
  var resendOTPCon = $(OTP_COUNTER_PARENT_ID).find('.emailResendOTPCounter');
  var resendOTPEle = $(OTP_COUNTER_PARENT_ID).find('.emailResendOTP');
  if (OTP_TIMER > 0) {
    resendOTPCon.html('Resend OTP in ' + fmtMSS(OTP_TIMER));
    OTP_TIMER--;
    resendOTPCon.fadeIn(0);
    resendOTPEle.fadeOut(0);
  } else {
    resendOTPCon.fadeOut(0);
    resendOTPEle.fadeIn(0);
    clearInterval(OTP_COUNTER_INTERVAL);
  }
}

function fmtMSS(s) {
  return (s - (s %= 60)) / 60 + (9 < s ? ':' : ':0') + s
}


function onlyNumberKey(evt) {

  // Only ASCII character in that range allowed
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57))
    return false;
  return true;
}

var pageLoader = '<div id="uniquePageLoader" style="position: fixed;z-index: 99999999;width: 100%;height: 100%;background-color: rgb(0 0 0 / 80%);top: 0;left: 0;display: flex;align-items: center;justify-content: center"><style>body{overflow: hidden;}</style><div class="ctbx"><div class="imglbx" style="max-width: 150px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" ><circle cx="50" cy="50" r="0" fill="none" stroke="#e90c59" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate></circle><circle cx="50" cy="50" r="0" fill="none" stroke="#46dff0" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate></circle></svg></div></div></div>';

/* BEGIN:: AJAX FUNCTION */
function submit_form_data_ajax(url, data, onComplete = function (output) {
  console.log(output);
}, onError = function (err) {
  console.log(err);
}) {
  /* ajax function */
  $.ajax({
    type: "POST",
    enctype: 'multipart/form-data',
    url: url,
    data: data,
    processData: false,
    contentType: false,
    cache: false,
    beforeSend: function () {
      // $('.loader_fetch_bill_text').html('Please wait...');
      // $('.loader_fetch_bill_main').show();
      $("body").prepend(pageLoader);
    },
    success: function (data) {
      onComplete(data);
    },
    error: function (err) {
      onError(err)
    },
    complete: function () {
      // $('.loader_fetch_bill_main').hide();
      $("#uniquePageLoader").remove();
    }
  });
}

function setErrorText(element, status, msg) {
  var c = "alert alert-";
  if (status == 200) {
    c += 'success';
  } else if (status == 400) {
    c += 'danger';
  }
  element.html('<div class="' + c + ' p-3"  role="alert">' + msg + '</div>');
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function delete_cookie(name) {
  document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

$(document).on('click', '#verified', function () {
  $('#signup').modal('hide');
  $('#verified2').modal('show');
});

function getParameterByName(name, url) {
  if (!url) url = window.location.href;
  name = name.replace(/[\[\]]/g, "\\$&");
  var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
    results = regex.exec(url);
  if (!results) return null;
  if (!results[2]) return '';
  return decodeURIComponent(results[2].replace(/\+/g, ' '));
}