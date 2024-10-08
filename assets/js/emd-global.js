/* Start:: Lazy Load Script */
function lazyLoad() {
  var lazy = document.getElementsByClassName('lazy');
  for (var i = 0; i < lazy.length; i++) {
    var s = lazy[i].getAttribute('data-src');
    if (s != "" && s != null) {
      lazy[i].src = s;
    }
    /*  lazy[i].removeAttribute('data-src'); */
    lazy[i].classList.remove("lazy_blur");
  }
}

function replaceBrokenImages(customImagePath) {
  const images = document.querySelectorAll('img');

  images.forEach(function(img) {
      img.onerror = function() {
          this.onerror = null;
          const altText = this.getAttribute('alt');

          if (altText) {
              const div = document.createElement('div');
              div.textContent = altText;
              div.className = 'image-alt-text';

              this.parentNode.replaceChild(div, this);
          } else {
              this.src = customImagePath;
              this.removeAttribute('data-src');
          }
      };
  });
}

$(document).ready(function(){ 
  setTimeout(function() {
    replaceBrokenImages('assets/image/recharge/lazy_image_s.jpg');
  }, 1000);
});

function registerListener(event, func) {
  if (window.addEventListener) {
    window.addEventListener(event, func)
  } else {
    window.attachEvent('on' + event, func)
  }
}
registerListener('load', lazyLoad);
registerListener('scroll', lazyLoad);
/* $(document).ready(function(){
  lazyLoad();
}); */
/* End:: Lazy Load Script */

var BASE_URL = document.getElementById("hiddenBaseUrlInput").value;

function dateFormatter(strDate = "", format = "YYYY-mm-dd") {

  var parts = strDate.split("-"); // Split the input date into an array
  if (parts.length != 3) {
    var cDate = new Date();
  } else {
    // Create a new Date object using the parts
    var cDate = new Date(parts[0], parts[1] - 1, parts[2]);
  }

  var YYYY = cDate.getFullYear();
  var mm = String(cDate.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  var dd = String(cDate.getDate()).padStart(2, '0');

  var replaceArray = {
    "YYYY": YYYY,
    "mm": mm,
    "dd": dd
  };

  var formattedDate = strtr(format, replaceArray);

  return formattedDate;
}

function strtr(inputString, replaceArray) {
  for (var key in replaceArray) {
    if (replaceArray.hasOwnProperty(key)) {
      var pattern = new RegExp(key.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'), 'g');
      inputString = inputString.replace(pattern, replaceArray[key]);
    }
  }
  return inputString;
}

/* ONLY NUMBER KEY INPUT */
function onlyNumberKey(evt) {
  var ASCIICode = (evt.which) ? evt.which : evt.keyCode;
  if (ASCIICode > 31 && (ASCIICode < 48 || ASCIICode > 57)) {
    return false;
  }
  return true;
}
/* END ONLY NUMBER KEY INPUT */

/* BEGIN:: GET RECENT ORDER HISTORY */
function get_user_recent_order_history(service_name, device_type) {
  if ($("#userLoginRequired").val() == undefined) {

    $("#recentOrderHistory").html('<style>.history-container{background-color:#fff;border-radius:15px;padding:10px;margin-bottom:10px;min-width:280px;box-shadow:0 2px 6px #d3d0d0;height:100%}.history-heading{font-size:14px;padding:0;font-weight:800;margin-top:30px}.history-box{padding:3px;overflow-x:auto;display:flex;gap:10px;height:160px;}.history-box-btn{text-align:center;margin-top:5px;filter: blur(5px);}.his-next-btn{text-decoration:none;text-align:center;font-size:14px;background:none;padding:10px;border-radius:10px;border:none;color:#37df1d;cursor:pointer}.his-next-btn>.fa-repeat{display:block}.his-tag{margin:0;font-weight:800;line-height:inherit;}.his-date{font-size:12px;color:#8f8f8f;font-weight:300;filter: blur(5px);}.his-opr{font-size:15px}.his-flex-box{display:flex;justify-content:space-between;align-items:center;line-height:initial;}.oprator-img{border-right:1px solid #8f8f8f}.his-num{color:#8f8f8f;font-size:11px}.his-amount{font-size:16px}.history-flex-box{display:grid;grid-template-columns:12% 86%;margin-top:10px;gap:5px;filter: blur(5px);}</style><div class=""><h4 class="history-heading">Recent Order History</h4><div class="history-box"><div class="history-container"><p class="his-tag his-date">01 Jan, 2024 12:00 AM </p><div class="history-flex-box"><img src="http://127.0.0.1/repo/easemydeal/assets/image/recharge/oprater/svg-operator/airtel.svg" alt="" width="35" height="auto" class="oprator-img"><div class=""><div class="his-flex-box"><div><p class="his-tag his-opr">XXXXXXXXXX</p><p class="his-tag his-num">XXXXXXXXXXXX</p></div><div><p class="his-tag his-amount">₹XXXXXX</p></div></div></div></div><div class="history-box-btn"><button class="his-next-btn"><i class="fa-solid fa-repeat"></i>Repeat</button></div></div></div></div>');
    var form_data = new FormData();
    form_data.append("service_type", service_name);
    form_data.append("device_type", device_type);
    global_submit_form_data_ajax_without_page_loader(BASE_URL + "recharge/service/get_user_recent_order_history", form_data, function (output) {
      try {
        var res = JSON.parse(output);
        if (res.status) {
          $("#recentOrderHistory").html(res.data.html);
        } else {
          $("#recentOrderHistory").html('');
          console.log(res.message);
        }
      } catch (e) {
        $("#recentOrderHistory").html('');
        console.log(e);
      }
    });
  }
}


function recentHistoryProcess(data) {
  var thisE = $(data);
  var formData = new FormData();
  var bill_fetch = thisE.attr("data-bill_fetch");
  var service_type = thisE.attr("data-service_type");
  var paymentAmountExactness = thisE.attr("data-paymentAmountExactness");
  var min_limit = thisE.attr("data-min_limit");
  var max_limit = thisE.attr("data-max_limit");
  var svg = thisE.attr("data-svg");
  var operator_name = thisE.attr("data-operator_name");
  var device = thisE.attr("data-device");
  var consumer_title = thisE.attr("data-consumer_title");
  var ssidtag = thisE.attr("data-ssidtag");
  var ssid = thisE.attr("data-ssid");
  var opid = thisE.attr("data-opid");
  var bbps_logo = thisE.attr("data-bbps_logo");
  var error_box = $("#recentOrderHistoryError");
  error_box.fadeOut(0);
  formData.append("service_type", service_type);
  formData.append("ssid", ssid);
  formData.append("opid", opid);
  formData.append("mtnl_bsnl_type", thisE.attr("data-mtnl_bsnl_type"));
  formData.append("cirid", thisE.attr("data-cirid"));
  formData.append("opvalue1", thisE.attr("data-opvalue1"));
  formData.append("opvalue2", thisE.attr("data-opvalue2"));
  formData.append("opvalue3", thisE.attr("data-opvalue3"));
  formData.append("opvalue4", thisE.attr("data-opvalue4"));
  formData.append("ajax", "ajax");
  if (bill_fetch == "yes") {
    if (device == "mobile") {
      global_submit_form_data_ajax(BASE_URL + "recharge/service/check_bill_details", formData, function (output) {
        try {
          var res = JSON.parse(output);
          if (res.error_code == 200) {
            var openModal = false;
            if (paymentAmountExactness === "EXACT") {
              formData.append("amount", res.data.billAmount);
              rechargePaymentProcess(formData);
            } else if (paymentAmountExactness === "EXACT_AND_ABOVE") {
              var openModal = true;
              min_limit = res.data.billAmount;
            } else if (paymentAmountExactness === "EXACT_AND_BELOW") {
              var openModal = true;
              max_limit = res.data.billAmount;
            } else {
              var openModal = true;
            }
            if (openModal == true) {
              var balText = "Bill Amount";
              if (service_type == "fastag") {
                balText = "Available Balance";
              } else if (service_type == "subscription") {
                balText = "Subscription Amount";
              }
              var HTML = '<div class="rechargePssPopUp" id="rechargeProcessPopUp"><style>.rechargeProcessPopuser{font-size:16px;text-align:center;line-height: initial;color: #ccc;margin:0px}.rechargePssPopUp{width:50%;left:30%;top:20%}@media only screen and (max-width:767px){.bdx{margin-top:30px}.topRechargeHeader{display:grid;grid-template-columns:5% 75% 20%;justify-content:space-between;align-items:center}.toprechargeClose{width:20px}.close-btn{cursor:pointer}.toprechargeServiceHeading{font-size:16px;font-weight:700;margin:0}.rechargeServiceHeading{font-size:20px;font-weight:700}.rechargeProcessPopUpImg{margin:0 auto;display:block;background:#fff;box-shadow:0 0 10px #d3d0d0;border-radius:50%;padding:10px}.rechargeProcessPopUpLabel{text-align:center;display:block;font-size:18px;font-weight:700}.rechargeProcessPopUptd{font-size:16px;text-align:center;font-weight:600}.processbtn{border:none;text-align:center;padding:10px;display:block;font-size:16px;color:#fff;background:#f57349;font-weight:600;position:absolute;bottom:10px;left:50%;width:100%;max-width:350px;margin:0 auto;transform:translateX(-50%)}.processInput{display:inline;width:200px!important;background:none!important;font-size:28px}.rechargeProcessPopUpLabel{color:#000}.rechargePssPopUp{position:fixed;z-index:9999;background-color:#FFF;width:100%;left:0;top:0;padding:20px;height:100%}.rechargeServiceName{font-size:16px;text-align:center;color:color: #003397;font-weight:700;margint-top:8px;}.rechargeProcessVehicle{font-size:18px;text-align:center;margin:0;margin-top:20px}.rechargeCurrentBalance{text-align:center;font-size:18px;color:#ccc;text-transform:capitalize}.rechargeBillInput{text-align:center}.rechargeRupeeIcon{font-size:34px;font-weight:800}}</style><div class="topRechargeHeader"><div class="close-btn toprechargeClose" id="closerechargeProcessPopUp">X</div><p class="toprechargeServiceHeading">' + consumer_title + ' </p><img src="' + bbps_logo + '" width="100" height="auto"></div><div class="bdx"><img src="' + svg + '" width="100" height="auto" class="rechargeProcessPopUpImg"><p class="rechargeServiceName">' + operator_name + '</p><p class="rechargeProcessVehicle">' + ssidtag + ' <span class="rechargeProcessID">' + ssid + '</span></p><p class="rechargeProcessPopuser">hey</p></div><form id="rechargeProcessForm">';
              for (var pair of formData.entries()) {
                if (pair[0] != "amount") {
                  HTML += '<input type="hidden" name="' + pair[0] + '" value="' + pair[1] + '">';
                }
              }
              HTML += '<div class="rechargeBillInput"><label for="amount" class="rechargeProcesstext rechargeRupeeIcon">₹</label><input class="processInput" placeholder="Enter Amount" type="number" name="amount" min="' + min_limit + '" max="' + max_limit + '" required=""><label for="balance" class="rechargeCurrentBalance">' + balText + ': ' + res.data.billAmount + '</label></div><div><button type="submit" class="processbtn">Process</button></div></form></div>';
              $("body").prepend(HTML);
            }
          } else {
            error_box.html(res.error_message);
            error_box.fadeIn(0);
          }
        } catch (e) {
          console.log(e);
        }
      });
    } else {
      $(".operator_list_search ul").find('li[data-id="' + opid + '"]').click();
      $('input[name="ssid"]').val(ssid);
      $("#submit_button").click();
    }
  } else {
    formData.append("amount", thisE.attr("data-amount"));
    rechargePaymentProcess(formData);
  }
}

$(document).on("submit", "#rechargeProcessForm", function (e) {
  e.preventDefault();
  var formData = new FormData($(this)[0])
  rechargePaymentProcess(formData);
});
$(document).on("click", "#closerechargeProcessPopUp", function () {
  $("#rechargeProcessPopUp").remove();
});

function rechargePaymentProcess(formData) {
  var error_box = $("#recentOrderHistoryError");
  global_submit_form_data_ajax(BASE_URL + "recharge/payment/process", formData, function (output) {
    try {
      var res = JSON.parse(output);
      if (res.status) {
        $("body").prepend(pageLoader);
        window.location.href = res.data.redirect;
      } else {
        error_box.html(res.message);
        error_box.fadeIn(0);
      }
    } catch (e) {
      console.log(e);
    }
  });
}
/* END:: GET RECENT ORDER HISTORY */

var pageLoader = '<div id="uniquePageLoader" style="position: fixed;z-index: 99999999;width: 100%;height: 100%;background-color: rgb(0 0 0 / 80%);top: 0;left: 0;display: flex;align-items: center;justify-content: center"><style>body{overflow: hidden;}</style><div class="ctbx"><div class="imglbx" style="max-width: 150px;"><svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="margin: auto; background: none; display: block; shape-rendering: auto;" width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" ><circle cx="50" cy="50" r="0" fill="none" stroke="#e90c59" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="0s"></animate><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="0s"></animate></circle><circle cx="50" cy="50" r="0" fill="none" stroke="#46dff0" stroke-width="2"><animate attributeName="r" repeatCount="indefinite" dur="1s" values="0;40" keyTimes="0;1" keySplines="0 0.2 0.8 1" calcMode="spline" begin="-0.5s"></animate><animate attributeName="opacity" repeatCount="indefinite" dur="1s" values="1;0" keyTimes="0;1" keySplines="0.2 0 0.8 1" calcMode="spline" begin="-0.5s"></animate></circle></svg></div></div></div>';

function globalSetErrorText(element, status, msg) {
  var c = "alert alert-";
  if (status == 200) {
    c += 'success';
  } else if (status == 400) {
    c += 'danger';
  }
  element.html('<div class="' + c + ' p-3"  role="alert">' + msg + '</div>');
}

$('a').click(function(){
  var lvRef = this.href;
  var currentURL = window.location.href;
  if(lvRef !== currentURL + '#' && lvRef.indexOf(BASE_URL) !== -1){
    $("body").prepend(pageLoader);
  }
});

function capitalizeFirstLetter(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeEveryWord(str) {
  return str.replace(/\b\w/g, function (char) {
    return char.toUpperCase();
  });
}

/* BEGIN:: AJAX FUNCTION */
function global_submit_form_data_ajax(
  url,
  data,
  onComplete = function (output) {
    console.log(output);
  },
  onError = function (err) {
    console.error(err);
  }
) {
  /* ajax function */
  $.ajax({
    type: "POST",
    enctype: "multipart/form-data",
    url: url,
    data: data,
    processData: false,
    contentType: false,
    cache: false,
    beforeSend: function () {
      $("body").prepend(pageLoader);
    },
    success: function (data) {
      onComplete(data);
    },
    error: function (err) {
      onError(err);
    },
    complete: function () {
      $("#uniquePageLoader").remove();
    },
  });
}

function global_submit_form_data_ajax_without_page_loader(
  url,
  data,
  onComplete = function (output) {
    console.log(output);
  },
  onError = function (err) {
    console.error(err);
  }
) {
  /* ajax function */
  $.ajax({
    type: "POST",
    enctype: "multipart/form-data",
    url: url,
    data: data,
    processData: false,
    contentType: false,
    cache: false,
    beforeSend: function () {},
    success: function (data) {
      onComplete(data);
    },
    error: function (err) {
      onError(err);
    },
    complete: function () {},
  });
}
/* END:: AJAX FUNCTION */