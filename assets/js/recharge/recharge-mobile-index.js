/* Start:: Operator Search Input */
function filterFunction() {
	var service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
	if (service_type == 'mobile_postpaid' && service_type != undefined) {
		$('.prepaid_option').hide();
		$('.postpaid_option').show();
	} else {
		$('.postpaid_option').hide();
		$('.prepaid_option').show();
		service_type = 'mobile_prepaid';
	}
	var input, filter, ul, li, a, i;
	input = document.getElementById("opid");
	filter = input.value.toUpperCase();
	div = document.getElementById("operator_list_search");
	a = div.getElementsByTagName("li");
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			if (a[i].getAttribute('data-type') == service_type) {
				a[i].style.display = "";
			} else {
				a[i].style.display = "none";
			}
		} else {
			a[i].style.display = "none";
		}
	}
}

function filterData(circle = "") {
	var opid = $("form#RechargeForm [name=opid]").val();
	var div = $('#circle_list_search ul');
	var li = "";
	if (opid == 1138 || opid == 1139) {
		$('.mtnl_bsnl_type').show();
	} else {
		$('.mtnl_bsnl_type').hide();
	}
	$.each(circles_list, function (k, v) {
		if (opid == 8 || opid == 9) {
			if (v.code == 1) {
				li += '<li class="" data-id="' + v.code + '" data-name="' + v.state + '">' + v.state + '</li>';
			}
		} else if (opid == 10 || opid == 11 || opid == 360) {
			if (v.code == 2) {
				li += '<li class="" data-id="' + v.code + '" data-name="' + v.state + '">' + v.state + '</li>';
			}
		} else if (opid == 1139) {
			if (v.code == 1 || v.code == 2) {
				li += '<li class="" data-id="' + v.code + '" data-name="' + v.state + '">' + v.state + '</li>';
			}
		} else if (opid == 3 || opid == 4 || opid == 1138) {
			if (v.code != 1 && v.code != 2) {
				li += '<li class="" data-id="' + v.code + '" data-name="' + v.state + '">' + v.state + '</li>';
			}
		} else {
			li += '<li class="" data-id="' + v.code + '" data-name="' + v.state + '">' + v.state + '</li>';
		}
	});
	div.html(li);

	$(".circle_list_search ul li").click(function () {
		if (!$(this).hasClass('active')) {
			$(".circle_list_search ul li.active").removeClass("active");
			$(this).addClass("active");
			$('.valuable_input_circle input').val(($(this).attr("data-name")));
			$('.searcHinpt_circle input').val(($(this).attr("data-name")));
			var cirId = $(this).attr("data-id");
			$('form#RechargeForm select[name="cirid"]').val(cirId).trigger('change');
			$(".circle_list_search").hide();
		}
	});
	if (opid == 8 || opid == 9) {
		$('.circle_list_search ul li[data-id="1"]').click();
	} else if (opid == 10 || opid == 11 || opid == 360) {
		$('.circle_list_search ul li[data-id="2"]').click();
	} else if (opid == 1139) {
		if (circle != "") {
			$('.circle_list_search ul li[data-id="' + circle + '"]').click();
		} else {
			$(".circle_list_search ul li.active").removeClass("active");
			$('.valuable_input_circle input').val("");
			$('.searcHinpt_circle input').val("");
			$('form#RechargeForm select[name="cirid"]').val("");
		}
	} else if (opid == 3 || opid == 4 || opid == 1138) {
		if (circle != "") {
			$('.circle_list_search ul li[data-id="' + circle + '"]').click();
		} else {
			$(".circle_list_search ul li.active").removeClass("active");
			$('.valuable_input_circle input').val("");
			$('.searcHinpt_circle input').val("");
		}
	} else {
		if (circle != "") {
			$('.circle_list_search ul li[data-id="' + circle + '"]').click();
		}
	}
}
$(document).ready(function () {
	var topId = $('form#RechargeForm select[name="opid"]').val();
	$('.valuable_input input').val($(".operator_list_search ul").find("li[data-id='" + topId + "']").attr('data-name'));
	$(".operator_list_search ul li").click(function () {
		if (!$(this).hasClass('active')) {
			$(".operator_list_search ul li.active").removeClass("active");
			$(this).addClass("active");
			$('.valuable_input input').val(($(this).attr("data-name")));
			$('.searcHinpt input').val(($(this).attr("data-name")));
			$('form#RechargeForm select[name="opid"]').val($(this).attr("data-id"));
			var opId = $(this).attr("data-id");
			$(".operator_list_search").hide();
			filterData();
			browse_plan();
		}
	});
	$(".valuable_input input,.valuable_input span img").on('click', function () {
		$('.valuable_input input').val('');
		$('.searcHinpt input').val('');
		$(".operator_list_search").toggle();
		var service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
		if (service_type == 'mobile_postpaid' && service_type != undefined) {
			$('.prepaid_option').hide();
			$('.postpaid_option').show();
			$('.mtnl_bsnl_type').hide();
		} else {
			$('.postpaid_option').hide();
			$('.prepaid_option').show();
			$('.mtnl_bsnl_type').hide();
		}
		if ($(".operator_list_search").is(":visible")) {} else {
			var opId = $('form#RechargeForm select[name="opid"]').val();
			$('.valuable_input input').val($(".operator_list_search ul").find("li[data-id='" + opId + "']").attr('data-name'));
		}
		$('.searcHinpt input').focus();
	});
	$("body").click(function () {
		$(".operator_list_search").hide();
		var opId = $('form#RechargeForm select[name="opid"]').val();
		$('.valuable_input input').val($(".operator_list_search ul").find("li[data-id='" + opId + "']").attr('data-name'));
		$('.searcHinpt input').val($(".operator_list_search ul").find("li[data-id='" + opId + "']").attr('data-name'));
	});
	$(".valuable_input, .operator_list_search ul, .searcHinpt").click(function (event) {
		event.stopPropagation();
	});
});
/* End:: Operator Search Input */

/* Start:: Circle Search Input */
function filterCircleFunction() {
	var input, filter, ul, li, a, i;
	input = document.getElementById("cirid");
	filter = input.value.toUpperCase();
	div = document.getElementById("circle_list_search");
	a = div.getElementsByTagName("li");
	for (i = 0; i < a.length; i++) {
		txtValue = a[i].textContent || a[i].innerText;
		if (txtValue.toUpperCase().indexOf(filter) > -1) {
			a[i].style.display = "";
		} else {
			a[i].style.display = "none";
		}
	}
}
$(document).ready(function () {
	var topId = $('form#RechargeForm select[name="cirid"]').val();
	$('.valuable_input_circle input').val($(".circle_list_search ul").find("li[data-id='" + topId + "']").attr('data-name'));
	$(".circle_list_search ul li").click(function () {
		if (!$(this).hasClass('active')) {
			$(".circle_list_search ul li.active").removeClass("active");
			$(this).addClass("active");
			$('.valuable_input_circle input').val(($(this).attr("data-name")));
			$('.searcHinpt_circle input').val(($(this).attr("data-name")));
			var cirId = $(this).attr("data-id");
			$('form#RechargeForm select[name="cirid"]').val(cirId).trigger('change');
			$(".circle_list_search").hide();
		}
	});
	$(".valuable_input_circle input,.valuable_input_circle span img").on('click', function () {
		$('.valuable_input_circle input').val('');
		$('.searcHinpt_circle input').val('');
		$(".circle_list_search ul li").show();
		$(".circle_list_search").toggle();
		if ($(".circle_list_search").is(":visible")) {} else {
			var cirId = $('form#RechargeForm select[name="cirid"]').val();
			$('.valuable_input_circle input').val($(".circle_list_search ul").find("li[data-id='" + cirId + "']").attr('data-name'));
		}
		$('.searcHinpt_circle input').focus();
	});
	$("body").click(function () {
		$(".circle_list_search").hide();
		var cirId = $('form#RechargeForm select[name="cirid"]').val();
		$('.valuable_input_circle input').val($(".circle_list_search ul").find("li[data-id='" + cirId + "']").attr('data-name'));
		$('.searcHinpt_circle input').val($(".circle_list_search ul").find("li[data-id='" + cirId + "']").attr('data-name'));
	});
	$(".valuable_input_circle, .circle_list_search ul, .searcHinpt_circle").click(function (event) {
		event.stopPropagation();
	});
});
/* End:: Circle Search Input */

$('input[name="amount"]').on('keypress change paste', function (e) {
	var theEvent = e || window.event;
	if (theEvent.type === 'paste') {
		key = event.clipboardData.getData('text/plain');
	} else {
		var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode(key);
	}
	var regex = /^[0-9\b\.]+$/;
	if (!regex.test(key)) {
		theEvent.preventDefault();
		return false;
	}
});

$('input[name="ssid"]').on('keypress change paste', function (e) {
	var theEvent = e || window.event;
	if (theEvent.type === 'paste') {
		key = event.clipboardData.getData('text/plain');
	} else {
		var key = theEvent.keyCode || theEvent.which;
		key = String.fromCharCode(key);
	}
	var regex = /^[0-9\b]+$/;
	if (!regex.test(key)) {
		theEvent.preventDefault();
		return false;
	}
});

function getCityList(opid) {
	if (opid == 8 || opid == 9 || opid == 25 || opid == 44 || opid == 48) {
		$('form#RechargeForm select[name="cirid"] option').hide();
		$('form#RechargeForm select[name="cirid"] option[value=' + 1 + ']').show();
		$('form#RechargeForm select[name="cirid"]').val(1).trigger('change');
		$("form#RechargeForm select[name=cirid]").selectpicker('refresh');
	} else if (opid == 10 || opid == 11 || opid == 26) {
		$('form#RechargeForm select[name="cirid"] option').hide();
		$('form#RechargeForm select[name="cirid"] option[value=' + 2 + ']').show();
		$('form#RechargeForm select[name="cirid"]').val(2).trigger('change');
		$("form#RechargeForm select[name=cirid]").selectpicker('refresh');
	} else if (opid == 3 || opid == 4 || opid == 15 || opid == 24 || opid == 30 || opid == 42 || opid == 47) {
		$('form#RechargeForm select[name="cirid"] option').show();
		$('form#RechargeForm select[name="cirid"] option[value=' + 1 + ']').hide();
		$('form#RechargeForm select[name="cirid"] option[value=' + 2 + ']').hide();
		$('form#RechargeForm select[name="cirid"]').val('').trigger('change');
		$("form#RechargeForm select[name=cirid]").selectpicker('refresh');
		$("form#RechargeForm .cirid_error ").html('');
		$("form#RechargeForm select[name=cirid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	} else {
		$('form#RechargeForm select[name="cirid"] option').show();
	}
}

if (typeof recharge_opid === 'undefined') {} else {
	getCityList(recharge_opid);
}

function submitMobRechFormFun(er) {
	if (er == 'yes') {
		var _PreRechFlag = 1;
		var _service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
		var _ssid = $("form#RechargeForm input[name=ssid]").val();
		var _opid = $("form#RechargeForm select[name=opid]").val();
		var _cirid = $("form#RechargeForm select[name=cirid]").val();
		var _amount = $("form#RechargeForm input[name=amount]").val();
		var _amount_pre = _amount;
		_amount = parseFloat(_amount);
		var _post_obj_min_amt = JSON.parse(POSTPAID_MIN_AMT_JSON);
		var _post_minimum_amount = _post_obj_min_amt[_opid];
		_post_minimum_amount = parseFloat(_post_minimum_amount);
		var ssid_first = _ssid.substring(0, 1);
		if (_service_type == "" || _service_type == undefined) {
			_PreRechFlag = 2;
		} else {
			$("#RechargeForm").attr("action", Base_URL + "recharge/payment/process/" + _service_type);
		}
		if (_ssid == "" || _ssid == undefined) {
			_PreRechFlag = 2;
		} else if (!(_ssid.match(/^[0-9]+$/))) {
			_PreRechFlag = 2;
		} else if (ssid_first == 0 || ssid_first == 1 || ssid_first == 2 || ssid_first == 3 || ssid_first == 4 || ssid_first == 5) {
			_PreRechFlag = 2;
		} else if (_ssid.length < 10 || _ssid.length > 10) {
			_PreRechFlag = 2;
		} else {}
		if (_opid == "" || _opid == undefined) {
			_PreRechFlag = 2;
		}
		if (_cirid == "" || _cirid == undefined) {
			_PreRechFlag = 2;
		}
		if (_amount_pre == "" || _amount_pre == undefined) {
			_PreRechFlag = 2;
		} else if (isNaN(_amount)) {
			_PreRechFlag = 2;
		} else if (_amount < 1) {
			_PreRechFlag = 2;
		} else if (_amount % 1 != 0) {
			_PreRechFlag = 2;
		} else {
			if (_service_type == 'mobile_postpaid') {
				if (_amount < _post_minimum_amount || _amount == 0) {
					_PreRechFlag = 2;
				}
			}
		}
		if (_PreRechFlag == 1) {
			$('.loader_fetch_bill_text').html("Please wait.");
			$('.loader_fetch_bill_main').show();
			document.getElementById("RechargeForm").submit();
		}
	}
}

function ResetRechargeForm() {
	$("form#RechargeForm input[name=ssid]").val('');
	$('form#RechargeForm select[name="opid"]').val('').trigger('change');
	$('form#RechargeForm select[name="cirid"]').val('').trigger('change');
	$("form#RechargeForm input[name=amount]").val('');

	$("form#RechargeForm .ssid_error").html('');
	$("form#RechargeForm .opid_error").html('');
	$("form#RechargeForm .cirid_error ").html('');
	$("form#RechargeForm .amount_error").html('');
	$("form#RechargeForm input[name=ssid]").removeClass("inpt_border_error");
	$("form#RechargeForm select[name=opid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	$("form#RechargeForm select[name=cirid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	$("form#RechargeForm input[name=amount]").removeClass("inpt_border_error");

	$(".operator_list_search ul li.active").removeClass("active");
	$('.valuable_input input').val('');
	$(".circle_list_search ul li.active").removeClass("active");
	$('.valuable_input_circle input').val('');
}
$(document).ready(function () {
	$("#close_plans").on('click', function () {
		$(".all_plans").css('display', 'none');
	});
});
$('input[name="service_type"]').on('change', function (e) {
	var service_type = $(this).val();
	ResetRechargeForm();
	$('.mtnl_bsnl_type').hide();
	$('.amount_description').html('');
	$("form#RechargeForm input[name=amount]").show();
	var is_operator_page = false;
	if (typeof page_name !== 'undefined') {
		if (page_name == "mobile_operator_index") {
			is_operator_page = true;
		}
	}
	if (service_type == 'mobile_postpaid' && service_type != undefined) {
		$('.bharatBill').show();
		$(".all_plans").css('display', 'none');
		$('.prepaid_option').hide();
		$('.postpaid_option').show();
		$("form#RechargeForm button[name=submit_button]").html("Proceed to Pay Bill");
		if (is_operator_page == true) {

		} else {
			$(".right_app_heading h1").html("Postpaid Mobile Bill Payment");
			$(".filling_area .top_heads h1").html("Postpaid Mobile Bill Payment");
			$("title").html("Postpaid Mobile Bill Payment");
		}
		$(".select_operator.prepaid").hide();
		$(".select_operator.postpaid").show();
		$("#mobile_plans").hide();
		$("form#RechargeForm select[name=opid]").selectpicker('refresh');
		$("form#RechargeForm input[name=amount]").next('.input-heading').hide();
		$("form#RechargeForm input[name=amount]").hide();
	} else {
		$('.bharatBill').hide();
		$("#mobopen_plan").show();
		$('.postpaid_option').hide();
		$('.prepaid_option').show();
		$("form#RechargeForm button[name=submit_button]").html("Proceed to Recharge");
		if (is_operator_page == true) {

		} else {
			$(".right_app_heading h1").html("Prepaid Mobile Recharge");
			$(".filling_area .top_heads h1").html("Prepaid Mobile Recharge");
			$("title").html("Prepaid Mobile Recharge");
		}
		$(".select_operator.postpaid").hide();
		$(".select_operator.prepaid").show();
		$("#mobile_plans").show();
		$("form#RechargeForm select[name=opid]").selectpicker('refresh');
	}
});

$('form#RechargeForm select[name=opid]').on('change', function () {
	var thisE = $("#RechargeForm");
	var error_box = thisE.find('.error-box');
	error_box.html('');
	var bill_details_box = thisE.find('.bill-details-box');
	bill_details_box.html('');
	
	$('.amount_container').attr('data-fetch', '0');
	$('.amount_description').html('');
	$("form#RechargeForm select[name=opid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	var opid = document.getElementsByName("opid")[0].value;
	var cirid = document.getElementsByName("cirid")[0].value;
	var mobile_service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
	if (mobile_service_type == "mobile_postpaid") {
		return false;
	}
	getCityList(opid);
	$("form#RechargeForm .amount_error").html('');
	if (opid == "" || opid == undefined) {
		$("form#RechargeForm input[name=amount]").show();
		$("form#RechargeForm input[name=amount]").next('.input-heading').show();
		$('form#RechargeForm .opid_error').html("Please select ");
		$("form#RechargeForm select[name=opid]").siblings('div:eq(0)').children('button:eq(0)').addClass("inpt_border_error");
	} else {
		if (opid == "364" || opid == "363" || opid == "362" || opid == "361" || opid == "360" || opid == "359") {
			$("form#RechargeForm input[name=amount]").next('.input-heading').hide();
			$("form#RechargeForm input[name=amount]").hide();
		} else {
			$("form#RechargeForm input[name=amount]").next('.input-heading').show();
			$("form#RechargeForm input[name=amount]").show();
		}
		$('form#RechargeForm .opid_error').html('');
		$("form#RechargeForm select[name=opid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	}
});

$('form#RechargeForm select[name=cirid]').on('change', function () {
	$("form#RechargeForm select[name=cirid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	var opid = document.getElementsByName("opid")[0].value;
	var cirid = document.getElementsByName("cirid")[0].value;
	if (cirid == "" || cirid == undefined) {
		$('form#RechargeForm .cirid_error').html("Please select ");
		$("form#RechargeForm select[name=cirid]").siblings('div:eq(0)').children('button:eq(0)').addClass("inpt_border_error");
	} else {
		$('form#RechargeForm .cirid_error').html('');
		$("form#RechargeForm select[name=cirid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
		browse_plan();
	}
});
/* $('form#RechargeForm input[name=amount]').on('change', function () {
	recharge_plan_details();
}); */
$('form#RechargeForm input[name=amount]').bind('keyup', function () {
	$("form#RechargeForm input[name=amount]").removeClass("inpt_border_error");
	var amount = $("form#RechargeForm input[name=amount]").val();
	if (amount == "" || amount == undefined) {
		$('form#RechargeForm .amount_error').html("");
		$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
	} else if (amount < 1) {
		$('form#RechargeForm .amount_error').html("Invalid amount ");
		$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
	} else {
		recharge_plan_details();
		$('form#RechargeForm .amount_error').html('');
		$("form#RechargeForm input[name=amount]").removeClass("inpt_border_error");
	}
});
$('form#RechargeForm input[name=amount]').on('focus', function () {
	$('form#RechargeForm .amount_error').html("");
});
$('#opid').click(function () {
	$(".circle_list_search").hide();
});
$("form#RechargeForm").submit(function (e) {
	e.preventDefault();
	var PreRechFlag = 1;
	var service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
	var ssid = $("form#RechargeForm input[name=ssid]").val();
	var opid = $("form#RechargeForm select[name=opid]").val();
	var mtnl_bsnl_type = $("form#RechargeForm input:radio[name=mtnl_bsnl_type]:checked").val();
	var cirid = $("form#RechargeForm select[name=cirid]").val();
	var amount = $("form#RechargeForm input[name=amount]").val();
	var amount_pre = amount;
	amount = parseFloat(amount);
	var post_obj_min_amt = JSON.parse(POSTPAID_MIN_AMT_JSON);
	var post_minimum_amount = post_obj_min_amt[opid];
	post_minimum_amount = parseFloat(post_minimum_amount);
	var ssid_first = ssid.substring(0, 1);
	var focus_flag = false;
	var focus_selector = '';
	$('form#RechargeForm .amount_error').html("");
	$("form#RechargeForm input").removeClass("inpt_border_error");
	$("form#RechargeForm select[name=opid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	$("form#RechargeForm select[name=cirid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	if (service_type == 'mobile_postpaid') {
		var bbps_biller_arr = [];
		if (bbps_biller_array != '' || bbps_biller_array != undefined) {
			bbps_biller_arr = bbps_biller_array;
		}
	}
	if (service_type == "" || service_type == undefined) {
		PreRechFlag = 2;
		if (focus_flag == false) {
			focus_flag = true;
			focus_selector = "form#RechargeForm input:radio[name=service_type]";
		}
		$("form#RechargeForm input:radio[name=service_type]").addClass("inpt_border_error");
		$('form#RechargeForm .service_type_error').html("Choose prepaid/postpaid");
	} else {
		$("form#RechargeForm input:radio[name=service_type]").removeClass("inpt_border_error");
		$('form#RechargeForm .service_type_error').html('');
	}
	if (ssid == "" || ssid == undefined) {
		if (focus_flag == false) {
			focus_flag = true;
			focus_selector = "form#RechargeForm input[name=ssid]";
		}
		$("form#RechargeForm input[name=ssid]").addClass("inpt_border_error");
		$('form#RechargeForm .ssid_error').html("Please enter ");
		PreRechFlag = 2;
	} else if (!(ssid.match(/^[0-9]+$/))) {
		if (focus_flag == false) {
			focus_flag = true;
			focus_selector = "form#RechargeForm input[name=ssid]";
		}
		$("form#RechargeForm input[name=ssid]").addClass("inpt_border_error");
		$('form#RechargeForm .ssid_error').html("Invalid mobile no ");
		PreRechFlag = 2;
	} else if (ssid_first == 0 || ssid_first == 1 || ssid_first == 2 || ssid_first == 3 || ssid_first == 4 || ssid_first == 5) {
		if (focus_flag == false) {
			focus_flag = true;
			focus_selector = "form#RechargeForm input[name=ssid]";
		}
		$("form#RechargeForm input[name=ssid]").addClass("inpt_border_error");
		$('form#RechargeForm .ssid_error').html("Invalid mobile no ");
		PreRechFlag = 2;
	} else if (ssid.length < 10 || ssid.length > 10) {
		if (focus_flag == false) {
			focus_flag = true;
			focus_selector = "form#RechargeForm input[name=ssid]";
		}
		$("form#RechargeForm input[name=ssid]").addClass("inpt_border_error");
		$('form#RechargeForm .ssid_error').html("Invalid mobile no ");
		PreRechFlag = 2;
	} else {
		$("form#RechargeForm input[name=ssid]").removeClass("inpt_border_error");
		$('form#RechargeForm .ssid_error').html('');
	}

	if (opid == "" || opid == undefined) {
		if (focus_flag == false) {
			focus_flag = true;
			focus_selector = "form#RechargeForm select[name=opid]";
		}
		$("form#RechargeForm select[name=opid]").siblings('div:eq(0)').children('button:eq(0)').addClass("inpt_border_error");
		$('form#RechargeForm .opid_error').html("Please select ");
		PreRechFlag = 2;
	} else {
		$("form#RechargeForm select[name=opid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
		$('form#RechargeForm .opid_error').html('');
	}

	if (opid == 1138 || opid == 1139) {
		if (mtnl_bsnl_type == "" || mtnl_bsnl_type == undefined) {
			PreRechFlag = 2;
			if (focus_flag == false) {
				focus_flag = true;
				focus_selector = "form#RechargeForm input:radio[name=mtnl_bsnl_type]";
			}
			$("form#RechargeForm input:radio[name=mtnl_bsnl_type]").addClass("inpt_border_error");
			$('form#RechargeForm .mtnl_bsnl_type_error').html("Choose Recharge Type");
		} else {
			$("form#RechargeForm input:radio[name=mtnl_bsnl_type]").removeClass("inpt_border_error");
			$('form#RechargeForm .mtnl_bsnl_type_error').html('');
		}
	} else {
		$("form#RechargeForm input:radio[name=mtnl_bsnl_type]").removeClass("inpt_border_error");
		$('form#RechargeForm .mtnl_bsnl_type_error').html('');
	}

	if (cirid == "" || cirid == undefined) {
		if (focus_flag == false) {
			focus_flag = true;
			focus_selector = "form#RechargeForm select[name=cirid]";
		}
		$("form#RechargeForm select[name=cirid]").siblings('div:eq(0)').children('button:eq(0)').addClass("inpt_border_error");
		$('form#RechargeForm .cirid_error').html("Please select ");
		PreRechFlag = 2;
	} else {
		$("form#RechargeForm select[name=cirid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
		$('form#RechargeForm .cirid_error').html('');
	}

	/* if(opid=="364" || opid=="363" || opid=="362" || opid=="361" || opid=="360" || opid=="359") { } */
	var is_show_amount_container = true;
	if (opid == "359" || opid == "361" || opid == "363") {
		is_show_amount_container = false;
	}
	if (service_type == 'mobile_postpaid') {
		/* Commom Function Used */
	} else if (service_type == 'mobile_prepaid') {
		if (!(amount > 0)) {
			$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
			$('form#RechargeForm .amount_error').html("Please enter ");
			PreRechFlag = 2;
		}
	}

	if (focus_flag == true) {
		$(focus_selector).focus();
	}
	var PreRechAmtFlag = 2;
	if (service_type == 'mobile_prepaid' && RECH_MOB_PRE_VALIDATE_AMOUNT == "yes") {
		PreRechAmtFlag = 1;
	}
	if (PreRechFlag == 1) {
		var submit_rech_form = false;
		if (PreRechAmtFlag == 1) {
			/* $('.loader_fetch_bill_text').html("Please wait.");		
			$('.loader_fetch_bill_main').show();
			document.getElementById("RechargeForm").submit(); */
			$('.loader_fetch_bill_text').html("Please wait. Validating Recharge Amount");
			$('.loader_fetch_bill_main').show();
			document.getElementById("submit_button").disabled = true;
			$.ajax({
				type: 'POST',
				url: Base_URL + "recharge/service/valid_recharge_amount",
				data: {
					'opid': opid,
					'cirid': cirid,
					'amount': amount
				},
				success: function (data) {
					var obj_rech_amt = JSON.parse(data);
					if (obj_rech_amt.status == 200) {
						$('form#RechargeForm .amount_error').html("");
						$('.loader_fetch_bill_text').html("Please wait.");
						if (service_type == 'mobile_postpaid') {
							submit_recharge_form(service_type, opid, ssid, cirid, fetchOption, fetch_indicator, isAdhoc, paymentAmountExactness);
						} else {
							submit_recharge_form(service_type, opid, ssid, cirid, '', '', '', '');
						}
					} else {
						$('.loader_fetch_bill_main').hide();
						$('.loader_fetch_bill_text').html("");
						document.getElementById("submit_button").disabled = false;
						$("#RechargeValidConfirmBox").modal('show');
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {
					$('.loader_fetch_bill_main').hide();
					$('.loader_fetch_bill_text').html("");
					$('form#RechargeForm .amount_error').html("Error! Recharge amount not validated");
					document.getElementById("submit_button").disabled = false;
				}
			});

		} else {
			if (service_type == 'mobile_postpaid') {
				/* Common Function Used */
			} else {
				$('.loader_fetch_bill_text').html("Please wait.");
				submit_recharge_form(service_type, opid, ssid, cirid, '', '', '', '');
			}
		}
	}
});

function submit_recharge_form(service_type, opid, ssid, cirid, fetchOption, fetch_indicator, isAdhoc, paymentAmountExactness) {
	if (service_type == '' || service_type == undefined) {
		$("#RechargeForm").attr("action", Base_URL + "recharge/payment/process/mobile_prepaid");
	} else {
		$("#RechargeForm").attr("action", Base_URL + "recharge/payment/process/" + service_type);
	}
	if (opid == "364" || opid == "363" || opid == "362" || opid == "361" || opid == "360" || opid == "359") {
		/* Common Function Used */
	} else {
		var thisE = $("#RechargeForm");
		var error_box = thisE.find('.error-box');
		if(error_box.length) {
		} else {
			thisE.prepend('<div class="error-box"></div>');
			var error_box = thisE.find('.error-box');
		}
		error_box.html('');
		var url = thisE.attr('action');
		var formData = new FormData(thisE[0]);
		formData.append("ajax", "ajax");
		global_submit_form_data_ajax(url, formData, function (output) {
			try {
				var res = JSON.parse(output);
				if (res.status) {
					window.open(res.data.redirect,'_self');
				} else {
					globalSetErrorText(error_box, 400, res.message);
				}
			} catch (e) {
				globalSetErrorText(error_box, 400, 'Some Error #' + e);
			}
		});
	}

}

function recharge_plan_details() {
	var service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
	var opid = document.getElementsByName("opid")[0].value;
	var mtnl_bsnl_type = $("form#RechargeForm input:radio[name=mtnl_bsnl_type]:checked").val();
	var cirid = document.getElementsByName("cirid")[0].value;
	var amount = document.getElementsByName("amount")[0].value;
	var amount_pre = amount;
	amount = parseInt(amount);
	flag_ssid = true;
	if (service_type != undefined && service_type == "mobile_prepaid") {
		document.getElementsByName("opid")[0].classList.remove("inpt_border_error");
		document.getElementsByName("cirid")[0].classList.remove("inpt_border_error");
		document.getElementsByName("amount")[0].classList.remove("inpt_border_error");
		document.getElementsByClassName("opid_error")[0].innerHTML = "";
		document.getElementsByClassName("cirid_error")[0].innerHTML = "";
		document.getElementsByClassName("amount_error")[0].innerHTML = "";
		if (opid == "" || opid == undefined) {
			flag_ssid = false;
			document.getElementsByClassName("opid_error")[0].innerHTML = "Please enter";
			document.getElementsByName("opid")[0].classList.add("inpt_border_error");
		} else {
			document.getElementsByName("opid")[0].classList.remove("inpt_border_error");
		}
		if (opid == 1138 || opid == 1139) {
			if (mtnl_bsnl_type == "" || mtnl_bsnl_type == undefined) {
				flag_ssid = false;
				document.getElementsByClassName("mtnl_bsnl_type_error")[0].innerHTML = "Please select";
				document.getElementsByName("mtnl_bsnl_type")[0].classList.add("inpt_border_error");
			} else {
				document.getElementsByName("mtnl_bsnl_type")[0].classList.remove("inpt_border_error");
			}
		} else {
			document.getElementsByName("mtnl_bsnl_type")[0].classList.remove("inpt_border_error");
		}
		if (cirid == "" || cirid == undefined) {
			flag_ssid = false;
			document.getElementsByClassName("cirid_error")[0].innerHTML = "Please enter";
			document.getElementsByName("cirid")[0].classList.add("inpt_border_error");
		} else {
			document.getElementsByName("cirid")[0].classList.remove("inpt_border_error");
		}
		if (amount_pre == "" || amount_pre == undefined) {
			flag_ssid = false;
			document.getElementsByClassName("amount_error")[0].innerHTML = "Please enter";
			document.getElementsByName("amount")[0].classList.add("inpt_border_error");
		} else if (isNaN(amount)) {
			flag_ssid = false;
			document.getElementsByClassName("amount_error")[0].innerHTML = "Enter valid amount";
			document.getElementsByName("amount")[0].classList.add("inpt_border_error");
		} else if (amount < 1) {
			flag_ssid = false;
			document.getElementsByClassName("amount_error")[0].innerHTML = "Enter valid amount";
			document.getElementsByName("amount")[0].classList.add("inpt_border_error");
		} else {
			document.getElementsByName("amount")[0].classList.remove("inpt_border_error");
		}

		if (flag_ssid == true) {
			$('.amount_description').html('');
			$.ajax({
				type: 'POST',
				url: Base_URL + "recharge/service/recharge_plan_details",
				data: {
					'service_type': service_type,
					'opid': opid,
					'mtnl_bsnl_type': mtnl_bsnl_type,
					'cirid': cirid,
					'amount': amount,
				},
				success: function (data) {
					var obj = JSON.parse(data);
					if (obj.error_code == 200) {
						$('.amount_error').html('');
						$('.amount_description').html('');
						$('.amount_description').html(obj.data.Description);
						document.getElementById("submit_button").disabled = false;
					} else {
						document.getElementsByClassName("amount_error")[0].innerHTML = "Plan Not Found";
						document.getElementsByName("amount")[0].classList.add("inpt_border_error");
						document.getElementById("submit_button").disabled = true;
					}
				},
				error: function (jqXHR, textStatus, errorThrown) {

				}
			});
		}
	}
}

function mobile_details_finder() {
	var service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
	if (service_type != undefined && (service_type == "mobile_prepaid" || service_type == "mobile_postpaid")) {
		var reset_operator = true;
		var is_fetch = true;
		if (typeof page_name !== 'undefined') {
			if (page_name == "mobile_operator_index") {
				reset_operator = false;
			}
		}
		$(".operator_list_search ul li.active").removeClass("active");
		if (is_fetch == true) {
			var ssid = document.getElementsByName("ssid")[0].value;
			var ssid_first = ssid.substring(0, 1);
			var flag_ssid = false;
			document.getElementsByName("ssid")[0].classList.remove("inpt_border_error");
			document.getElementsByClassName("ssid_error")[0].innerHTML = "";
			if (ssid == "" || ssid == undefined) {
				document.getElementsByClassName("ssid_error")[0].innerHTML = "Please enter";
				document.getElementsByName("ssid")[0].classList.add("inpt_border_error");
			} else if (!(ssid.match(/^[0-9]+$/))) {
				document.getElementsByClassName("ssid_error")[0].innerHTML = "Invalid mobile no.";
				document.getElementsByName("ssid")[0].classList.add("inpt_border_error");
			} else if (ssid_first == 0 || ssid_first == 1 || ssid_first == 2 || ssid_first == 3 || ssid_first == 4 || ssid_first == 5) {
				document.getElementsByClassName("ssid_error")[0].innerHTML = "Invalid mobile no.";
				document.getElementsByName("ssid")[0].classList.add("inpt_border_error");
			} else {
				if (ssid.length == 10) {
					document.getElementsByName("ssid")[0].classList.remove("inpt_border_error");
					flag_ssid = true;
				} else {
					document.getElementsByName("ssid")[0].classList.add("inpt_border_error");
				}
			}
			if (flag_ssid == true) {
				if (reset_operator == false) {
					$('.loader_fetch_bill_text').html("Please wait. Fetching Circle");
				} else {
					$('.loader_fetch_bill_text').html("Please wait. Fetching Circle/Operator");
				}
				$('.loader_fetch_bill_main').show();
				var ssid_new = ssid;
				$.ajax({
					type: 'POST',
					url: Base_URL + "recharge/service/mobile_details_finder",
					data: {
						'mobile': ssid_new,
						'service_type': service_type,
						"verify_request": "verify_request"
					},
					success: function (data) {
						$("#mobileRechargeContainer").fadeIn(0);
						$('.loader_fetch_bill_main').hide();
						$('.loader_fetch_bill_text').html("Please wait.");
						if (data) {
							var obj = JSON.parse(data);
							var circleId = obj.circleId;
							var opId = obj.opId;
							if (opId != "" && opId != undefined) {
								if (reset_operator == true) {
									if ($('form#RechargeForm select[name="opid"]').val() == "") {
										$('form#RechargeForm select[name="opid"]').val(opId).trigger('change');
										$('form#RechargeForm select[name="opid"]').selectpicker('refresh');
									}
									$('.prepaid_option').removeClass('active');
									$(".operator_list_search li").removeClass("active");
									$(".operator_list_search ul").find("li[data-id='" + opId + "']").addClass("active");
									$('form#RechargeForm select[name="opid"]').val(opId);
									$('.valuable_input input').val($(".operator_list_search ul").find("li[data-id='" + opId + "']").attr('data-name'));
									$('form#RechargeForm input[name="ssid"]').val(ssid);
									if (opId == 1138 || opId == 1139) {
										var mtnl_bsnl_type = obj.mtnl_bsnl_type;
										$('.mtnl_bsnl_type').show();
										if (mtnl_bsnl_type == 'topup') {
											document.RechargeForm.mtnl_bsnl_type.value = "topup";
										}
										if (mtnl_bsnl_type == 'special') {
											document.RechargeForm.mtnl_bsnl_type.value = "special";
										}
									} else {
										$('.mtnl_bsnl_type').hide();
									}
								}
							}
							if (circleId != "" && circleId != undefined) {
								filterData(circleId);
							}
							$("form#RechargeForm input[name=amount]").focus();
							if (media_type != "" && media_type != undefined && media_type == "desktop") {
								browse_plan();
							}
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						$("#mobileRechargeContainer").fadeIn(0);
						$('.loader_fetch_bill_main').hide();
						$('.loader_fetch_bill_text').html("Please wait.");
					}
				});
			}
		}
	}
}

function close_plan() {
	$(".all_plans").css('display', 'none');
}
$(document).on('click', ".getRechPayAmt", function (e) {
	e.preventDefault();
	var thisE = $(this);
	var rc_amt = thisE.attr("data-value");
	$('#amount').val(rc_amt);
	var amount = $('#amount').val();
	$("form#RechargeForm input[name=amount]").removeClass("inpt_border_error");
	if (amount == "" || amount == undefined) {
		$('.amount_error').html('Please enter ');
		$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
	} else if (amount < 1) {
		$('.amount_error').html('Invalid amount ');
		$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
	} else if (amount % 1 != 0) {
		$('.amount_error').html("Decimal value not allowed ");
		$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
	} else {
		$('.amount_error').html('');
		$("form#RechargeForm input[name=amount]").removeClass("inpt_border_error");
		var amount_description = thisE.closest('ul').siblings('p').text();
		if (amount_description == "") {
			amount_description = thisE.find('p').text();
		}
		if (amount_description != "" && amount_description != undefined) {
			$('.amount_description').html(amount_description);
		} else {
			$('.amount_description').html('');
		}
	}
	$(".all_plans").css('display', 'none');
});
$(document).on('click', ".getRechPayAmtOpen", function () {
	var rc_amt = $(this).attr("data-value");
	$('#amount').val(rc_amt);
	var amount = $('#amount').val();
	$("form#RechargeForm input[name=amount]").removeClass("inpt_border_error");
	if (amount == "" || amount == undefined) {
		$('.amount_error').html('Please enter ');
		$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
	} else if (amount < 1) {
		$('.amount_error').html('Invalid amount ');
		$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
	} else if (amount % 1 != 0) {
		$('.amount_error').html("Decimal value not allowed ");
		$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
	} else {
		$('.amount_error').html('');
		$("form#RechargeForm input[name=amount]").removeClass("inpt_border_error");
		var amount_description = $(this).closest('tr').children('td:eq(3)').text();
		if (amount_description != "" && amount_description != undefined) {
			$('.amount_description').html(amount_description);
		} else {
			$('.amount_description').html('');
		}
	}
});

function browse_plan() {
	var opid = document.getElementsByName("opid")[0].value;
	var mtnl_bsnl_type = $("form#RechargeForm input:radio[name=mtnl_bsnl_type]:checked").val();
	var cirid = document.getElementsByName("cirid")[0].value;
	var service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
	document.getElementsByClassName("opid_error")[0].innerHTML = "";
	document.getElementsByClassName("cirid_error")[0].innerHTML = "";
	document.getElementsByName("opid")[0].classList.remove("inpt_border_error");
	document.getElementsByName("cirid")[0].classList.remove("inpt_border_error");
	$("form#RechargeForm input:radio[name=service_type]:checked").removeClass("inpt_border_error");
	$("form#RechargeForm input:radio[name=mtnl_bsnl_type]:checked").removeClass("inpt_border_error");
	var plan_flag = true;
	if (opid == "" || opid == undefined) {
		document.getElementsByClassName("opid_error")[0].innerHTML = "Please select ";
		document.getElementsByName("opid")[0].classList.add("inpt_border_error");
		plan_flag = false;
	}
	if (opid == 1138 || opid == 1139) {
		if (mtnl_bsnl_type == "" || mtnl_bsnl_type == undefined) {
			document.getElementsByClassName("mtnl_bsnl_type_error")[0].innerHTML = "Please select ";
			document.getElementsByName("mtnl_bsnl_type")[0].classList.add("inpt_border_error");
			plan_flag = false;
		}
	}
	if (cirid == "" || cirid == undefined) {
		document.getElementsByClassName("cirid_error")[0].innerHTML = "Please select ";
		document.getElementsByName("cirid")[0].classList.add("inpt_border_error");
		plan_flag = false;
	}
	if (service_type == "" || service_type == undefined) {
		document.getElementsByClassName("service_type_error")[0].innerHTML = "Please select ";
		$("form#RechargeForm input:radio[name=service_type]:checked").addClass("inpt_border_error");
		plan_flag = false;
	} else if (service_type == "mobile_postpaid") {
		plan_flag = false;
	} else {}


	if (plan_flag == true) {
		$('.loader_fetch_bill_main').show();
		$('.loader_fetch_bill_text').html('Please wait. Fetching Plans');
		if (media_type != "" && media_type != undefined && media_type == "mobile") {
			var plan_function_name = "recharge_plan_mobile"
		} else {
			var plan_function_name = "recharge_plan";
		}
		$.ajax({
			type: 'POST',
			url: Base_URL + "recharge/service/" + plan_function_name,
			data: {
				'opid': opid,
				'mtnl_bsnl_type': mtnl_bsnl_type,
				'cirid': cirid
			},
			success: function (data) {
				document.getElementsByClassName("all_plans")[0].innerHTML = data;
				if (typeof media_type != "undefined") {
					if (media_type == 'desktop') {
						/* $(".content_scroll_x").mCustomScrollbar({
							scrollButtons: {
								axis: "x",
								advanced: {
									autoExpandHorizontalScroll: true
								}
							}
						});
						$(".content_scroll_n").mCustomScrollbar({
							scrollButtons: {
								enable: true
							}
						}); */

					}
				}
				$('.loader_fetch_bill_main').hide();
				$('.loader_fetch_bill_text').html('Please wait. Fetching Plans');
				$(".all_plans").css('display', 'block');
			},
			error: function (jqXHR, textStatus, errorThrown) {
				$('.loader_fetch_bill_main').hide();
				$('.loader_fetch_bill_text').html('Please wait. Fetching Plans');
				$(".all_plans").css('display', 'none');
			}
		});

	}
}
