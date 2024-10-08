var min_limit = false;
var max_limit = false;

function implement_input_form(opid, key, bbps_biller_arr) {
	var input_name = '';
	var input_placeholder = '';
	if (key == '0') {
		input_name = 'ssid';
	} else if (key == '1') {
		input_name = 'opvalue1';
	} else if (key == '2') {
		input_name = 'opvalue2';
	} else if (key == '3') {
		input_name = 'opvalue3';
	} else if (key == '4') {
		input_name = 'opvalue4';
	} else {}
	if (typeof bbps_biller_arr[opid]['customerParams'][key] != "undefined") {
		if (bbps_biller_arr[opid]['customerParams'][key]['paramName'] != "" && bbps_biller_arr[opid]['customerParams'][key]['paramName'] != undefined) {
			input_placeholder = bbps_biller_arr[opid]['customerParams'][key]['paramName'];
			if (bbps_biller_arr[opid]['customerParams'][key]['values'] != "" && bbps_biller_arr[opid]['customerParams'][key]['values'] != undefined) {
				var val_param = bbps_biller_arr[opid]['customerParams'][key]['values'];
				var val_param_arr = val_param.split(',');
				var val_param_html = '<select name="' + input_name + '" id="' + input_name + '" style="font-size: 13px;padding: 0 10px;"><option value="">Select ' + input_placeholder + '</option>';
				$.each(val_param_arr, function (key, val) {
					val_param_html = val_param_html + '<option value="' + val + '">' + val + '</option>';
				});
				val_param_html = val_param_html + '</select><span class="' + input_name + '_error error_txt_new"></span>';
				$('.' + input_name + '_container').html(val_param_html);
				// $('form#RechargeForm #' + input_name).selectpicker('refresh');
				$('.' + input_name + '_container').show();
			} else {
				var val_param_html = '<input type="text" class="form-control" name="' + input_name + '" id="' + input_name + '" placeholder="' + input_placeholder + '" autocomplete="off"> <span class="' + input_name + '_error error_txt_new"></span>';
				$('.' + input_name + '_container').html(val_param_html);
				$('.' + input_name + '_container').show();
			}
		}
	}
}

function validate_form_input(opid, key, input_value, focus_flag, bbps_biller_arr) {
	var focus_selector = '';
	var PreRechFlag = 1;
	if (key == '0') {
		input_name = 'ssid';
	} else if (key == '1') {
		input_name = 'opvalue1';
	} else if (key == '2') {
		input_name = 'opvalue2';
	} else if (key == '3') {
		input_name = 'opvalue3';
	} else if (key == '4') {
		input_name = 'opvalue4';
	} else {}
	if (typeof bbps_biller_arr[opid]['customerParams'][key] != "undefined") {
		if (bbps_biller_arr[opid]['customerParams'][key]['paramName'] != undefined) {
			var input_data_type = '';
			input_min_length = 0;
			var input_max_length = 0;
			var input_regex = '';
			var input_regex_custom = '';
			var input_regex_error_txt = '';
			var input_length = parseInt(input_value.length);
			var input_placeholder = bbps_biller_arr[opid]['customerParams'][key]['paramName'];
			if (typeof bbps_biller_arr[opid]['customerParams'][key]['dataType'] != "undefined") {
				if (bbps_biller_arr[opid]['customerParams'][key]['dataType'] != "") {
					input_data_type = bbps_biller_arr[opid]['customerParams'][key]['dataType'];
				}
			}
			if (typeof bbps_biller_arr[opid]['customerParams'][key]['minLength'] != "undefined") {
				if (bbps_biller_arr[opid]['customerParams'][key]['minLength'] > 0) {
					input_min_length = parseInt(bbps_biller_arr[opid]['customerParams'][key]['minLength']);
				}
			}
			if (typeof bbps_biller_arr[opid]['customerParams'][key]['maxLength'] != "undefined") {
				if (bbps_biller_arr[opid]['customerParams'][key]['maxLength'] > 0) {
					input_max_length = parseInt(bbps_biller_arr[opid]['customerParams']['0']['maxLength']);
				}
			}
			if (typeof bbps_biller_arr[opid]['customerParams'][key]['regex'] != "undefined") {
				if (bbps_biller_arr[opid]['customerParams'][key]['regex'] != '') {
					input_regex = bbps_biller_arr[opid]['customerParams'][key]['regex'];
				}
			}
			if (input_data_type == 'NUMERIC') {
				if (input_min_length > 0 && input_min_length == input_max_length) {
					input_regex_custom = '^[0-9]{' + input_max_length + '}$';
					if (input_max_length == 1) {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only numeric values are allowed (' + input_max_length + ' digit)';
					} else {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only numeric values are allowed (' + input_max_length + ' digits)';
					}

				} else if (input_min_length > 0 && input_max_length > 0) {
					input_regex_custom = '^[0-9]{' + input_min_length + ',' + input_max_length + '}$';
					input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only numeric values are allowed (' + input_min_length + '-' + input_max_length + ' digits)';
				} else if (input_min_length > 0) {
					input_regex_custom = '^[0-9]{' + input_min_length + '}$';
					if (input_min_length == 1) {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only numeric values are allowed (' + input_min_length + ' digit)';
					} else {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only numeric values are allowed (' + input_min_length + ' digits)';
					}
				} else if (input_max_length > 0) {
					input_regex_custom = '^[0-9]{' + input_max_length + '}$';
					if (input_max_length == 1) {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only numeric values are allowed (' + input_max_length + ' digit)';
					} else {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only numeric values are allowed (' + input_max_length + ' digits)';
					}
				} else {
					input_regex_custom = '^0|[1-9]\d*$';
					input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only numeric values are allowed';
				}
			} else if (input_data_type == 'ALPHANUMERIC') {
				if (input_min_length > 0 && input_min_length == input_max_length) {
					input_regex_custom = '^[a-zA-Z0-9/]{' + input_max_length + '}$';
					if (input_max_length == 1) {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only alpha-numeric values are allowed (' + input_max_length + ' character)';
					} else {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only alpha-numeric values are allowed (' + input_max_length + ' characters)';
					}
				} else if (input_min_length > 0 && input_max_length > 0) {
					input_regex_custom = '^[a-zA-Z0-9/]{' + input_min_length + ',' + input_max_length + '}$';
					input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only alpha-numeric values are allowed (' + input_min_length + '-' + input_max_length + ' characters)';
				} else if (input_min_length > 0) {
					input_regex_custom = '^[a-zA-Z0-9]{' + input_min_length + '}$';
					if (input_min_length == 1) {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only alpha-numeric values are allowed (' + input_min_length + ' character)';
					} else {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only alpha-numeric values are allowed (' + input_min_length + ' characters)';
					}
				} else if (input_max_length > 0) {
					input_regex_custom = '^[a-zA-Z0-9/]{' + input_max_length + '}$';
					if (input_max_length == 1) {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only alpha-numeric values are allowed (' + input_max_length + ' character)';
					} else {
						input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only alpha-numeric values are allowed (' + input_max_length + ' characters)';
					}
				} else {
					input_regex_custom = '^[a-zA-Z0-9]*$';
					input_regex_error_txt = 'Invalid ' + input_placeholder + ' Only alpha-numeric values are allowed';
				}
			} else {}
			if (input_regex == '' || input_regex == undefined || input_regex == 'undefined') {
				input_regex = input_regex_custom;
			}

			/* Start:: For Water */
			/*
			if(opid=="347" || opid=="345")
			{
				if(input_data_type!='')
				{
					input_regex='';
				}
			} */
			/* End:: For Water */

			if (input_value == "" || input_value == undefined) {
				if (focus_flag == false) {
					focus_flag = true;
					focus_selector = "form#RechargeForm input[name=" + input_name + "]";
				}
				$('form#RechargeForm .' + input_name + '_error').html("Please enter ");
				$("form#RechargeForm input[name=" + input_name + "]").addClass("inpt_border_error");
				$("form#RechargeForm select[name=" + input_name + "]").siblings('div:eq(0)').children('button:eq(0)').addClass("inpt_border_error");
				PreRechFlag = 2;
			} else {
				if (input_regex != '') {
					var input_regex_exp = new RegExp(input_regex);
					if (!input_regex_exp.test(input_value)) {
						if (focus_flag == false) {
							focus_flag = true;
							focus_selector = "form#RechargeForm input[name=" + input_name + "]";
						}
						if (input_regex_error_txt != '') {
							$('form#RechargeForm .' + input_name + '_error').html(input_regex_error_txt);
						} else {
							$('form#RechargeForm .' + input_name + '_error').html("Invalid input");
						}
						$("form#RechargeForm input[name=" + input_name + "]").addClass("inpt_border_error");
						$("form#RechargeForm select[name=" + input_name + "]").siblings('div:eq(0)').children('button:eq(0)').addClass("inpt_border_error");
						PreRechFlag = 2;
					}
				} else {
					$('form#RechargeForm .' + input_name + '_error').html("");
					$("form#RechargeForm input[name=" + input_name + "]").removeClass("inpt_border_error");
					$("form#RechargeForm select[name=" + input_name + "]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
				}
			}
		}
	}
	if (focus_flag == true) {
		$(focus_selector).focus();
	}
	return PreRechFlag;
}

$('form#RechargeForm [name=opid]').on('change', function () {
	var thisE = $("#RechargeForm");
	var error_box = thisE.find('.error-box');
	error_box.html('');
	var bill_details_box = thisE.find('.bill-details-box');
	bill_details_box.html('');


	$('.amount_container').attr('data-fetch', '0');
	$('.amount_description').html('');
	$("form#RechargeForm [name=opid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	var opid = document.getElementsByName("opid")[0].value;
	var mobile_service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
	if (mobile_service_type == "mobile_prepaid" || mobile_service_type == "mobile_postpaid") {
		var cirid = document.getElementsByName("cirid")[0].value;
		getCityList(opid);
	}
	if (mobile_service_type == "mobile_prepaid") {
		return false;
	}
	var billerid = $(this).find(':selected').attr('data-billerid');
	$('.ssid_container,.opvalue1_container,.opvalue2_container,.opvalue3_container').hide();
	$("form#RechargeForm input[name=ssid],form#RechargeForm input[name=opvalue1],form#RechargeForm select[name=opvalue1],form#RechargeForm input[name=opvalue2],form#RechargeForm input[name=opvalue2]").removeClass("inpt_border_error");
	$("form#RechargeForm input[name=ssid],form#RechargeForm input[name=opvalue1],form#RechargeForm select[name=opvalue1],form#RechargeForm input[name=opvalue2],form#RechargeForm input[name=opvalue3]").val('');
	$('form#RechargeForm .ssid_error,form#RechargeForm .opvalue1_error,form#RechargeForm .opvalue2_error,form#RechargeForm .opvalue3_error').html('');

	if (opid == "" || opid == undefined) {
		$('form#RechargeForm .opid_error').html("Please enter ");
		$("form#RechargeForm [name=opid]").siblings('div:eq(0)').children('button:eq(0)').addClass("inpt_border_error");
	} else {
		$('#ssid').attr("placeholder", "");
		$('.ssid_container').hide();
		$('#opvalue1').attr("placeholder", "");
		$('.opvalue1_container').hide();
		$('#opvalue2').attr("placeholder", "");
		$('.opvalue2_container').hide();
		$('#opvalue3').attr("placeholder", "");
		$('.opvalue3_container').hide();
		var bbps_biller_arr = [];
		if (bbps_biller_array != '' || bbps_biller_array != undefined) {
			bbps_biller_arr = bbps_biller_array;
		}

		implement_input_form(opid, 0, bbps_biller_arr);
		implement_input_form(opid, 1, bbps_biller_arr);
		implement_input_form(opid, 2, bbps_biller_arr);
		implement_input_form(opid, 3, bbps_biller_arr);
		$('form#RechargeForm button.dropdown-toggle').bind('click', function () {
			fnShowDropdown();
		});

		$('.dropdown-menu.inner li a').bind('click', function () {
			fnHideDropdown();
		});
		min_limit = false;
		max_limit = false;
		var isAdhoc = bbps_biller_arr[opid]['isAdhoc'];
		var fetchOption = bbps_biller_arr[opid]['fetchOption'];
		var paymentAmountExactness = bbps_biller_arr[opid]['paymentAmountExactness'];
		console.log('fetchOption:' + fetchOption + '   isAdhoc:' + isAdhoc + '    paymentAmountExactness:' + paymentAmountExactness);
		var is_show_amount_container = true;
		if (fetchOption == 'MANDATORY') {
			is_show_amount_container = false;
			/* if (isAdhoc == false) {
				is_show_amount_container = false;
			} */
		}
		if (is_show_amount_container == true) {
			$("form#RechargeForm input[name=amount]").show();
			$("form#RechargeForm input[name=amount]").attr("type", "text");
			$("form#RechargeForm input[name=amount]").next('.input-heading').show();
		} else {
			$("form#RechargeForm input[name=amount]").hide();
			$("form#RechargeForm input[name=amount]").next('.input-heading').hide();
		}

		$('form#RechargeForm .opid_error').html('');
		$("form#RechargeForm [name=opid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	}
});

$("form#RechargeForm").submit(function (e) {
	e.preventDefault();
	var thisE = $(this);
	var error_box = thisE.find('.error-box');
	if (error_box.length) {} else {
		thisE.prepend('<div class="error-box"></div>');
		var error_box = thisE.find('.error-box');
	}
	error_box.html('');

	$('.error_txt_new').html('');


	var PreRechFlag = 1;
	var service_type = $("form#RechargeForm input[name=service_type]").val();
	var mobile_service_type = $("form#RechargeForm input:radio[name=service_type]:checked").val();
	if (mobile_service_type == "mobile_prepaid" || mobile_service_type == "mobile_postpaid") {
		service_type = mobile_service_type;
	}
	if (service_type == "mobile_prepaid") {
		return false;
	}

	var ssid = $("form#RechargeForm input[name=ssid]").val();
	var opid = $("form#RechargeForm [name=opid]").val();
	var cirid = $("form#RechargeForm select[name=cirid]").val();
	var opvalue1 = $("form#RechargeForm [name=opvalue1]").val();
	var opvalue2 = $("form#RechargeForm [name=opvalue2]").val();
	var opvalue3 = $("form#RechargeForm [name=opvalue3]").val();
	var amount = $("form#RechargeForm input[name=amount]").val();
	var amount_pre = amount;
	amount = parseFloat(amount);
	var focus_flag = false;
	var focus_selector = '';
	$("form#RechargeForm form-group span").html("");
	$("form#RechargeForm input").removeClass("inpt_border_error");
	$("form#RechargeForm [name=opid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	$("form#RechargeForm select[name=cirid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	var bbps_biller_arr = [];
	if (bbps_biller_array != '' || bbps_biller_array != undefined) {
		bbps_biller_arr = bbps_biller_array;
	}

	if (service_type == "" || service_type == undefined) {
		PreRechFlag = 2;
	} else {
		$("#RechargeForm").attr("action", Base_URL + "recharge/payment/process/" + service_type);
		$('form#RechargeForm .service_type_error').html('');
	}

	/* if (service_type == "electricity_board" || service_type == "education" || service_type == "housing_society") {
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
	} */

	if (opid == "" || opid == undefined) {
		if (focus_flag == false) {
			focus_flag = true;
			focus_selector = "form#RechargeForm [name=opid]";
		}
		$('form#RechargeForm .opid_error').html("Please enter ");
		$("form#RechargeForm [name=opid]").siblings('div:eq(0)').children('button:eq(0)').addClass("inpt_border_error");
		PreRechFlag = 2;
	} else {
		$('form#RechargeForm .opid_error').html('');
		$("form#RechargeForm [name=opid]").siblings('div:eq(0)').children('button:eq(0)').removeClass("inpt_border_error");
	}

	var is_show_amount_container = true;
	var fetch_indicator = $('.amount_container').attr('data-fetch');
	fetch_indicator = parseInt(fetch_indicator);
	if (fetch_indicator == 1) {

	} else {
		if (opid == "" || opid == undefined) {
			is_show_amount_container = false;
			$("form#RechargeForm input[name=amount]").hide();
			$("form#RechargeForm input[name=amount]").next('.input-heading').hide();
		} else {
			var isAdhoc = bbps_biller_arr[opid]['isAdhoc'];
			var fetchOption = bbps_biller_arr[opid]['fetchOption'];
			var paymentAmountExactness = bbps_biller_arr[opid]['paymentAmountExactness'];
			if (fetchOption == 'MANDATORY') {
				// if (isAdhoc == false) {
				is_show_amount_container = false;
				// }
			}
			if (is_show_amount_container == true || service_type == 'mobile_prepaid') {
				$("form#RechargeForm input[name=amount]").show();
				$("form#RechargeForm input[name=amount]").next('.input-heading').show();
			} else {
				$("form#RechargeForm input[name=amount]").hide();
				$("form#RechargeForm input[name=amount]").next('.input-heading').hide();
			}
		}
	}

	if (is_show_amount_container == true) {
		if (amount_pre == "" || amount_pre == undefined) {
			if (focus_flag == false) {
				focus_flag = true;
				focus_selector = "form#RechargeForm input[name=amount]";
			}
			$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
			$('form#RechargeForm .amount_error').html("Please enter ");
			PreRechFlag = 2;
		} else if (isNaN(amount)) {
			if (focus_flag == false) {
				focus_flag = true;
				focus_selector = "form#RechargeForm input[name=amount]";
			}
			$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
			$('form#RechargeForm .amount_error').html("Invalid amount ");
			PreRechFlag = 2;
		} else if (amount < 1) {
			if (focus_flag == false) {
				focus_flag = true;
				focus_selector = "form#RechargeForm input[name=amount]";
			}
			$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
			$('form#RechargeForm .amount_error').html("Invalid amount ");
			PreRechFlag = 2;
		} else if (amount % 1 != 0) {
			if (focus_flag == false) {
				focus_flag = true;
				focus_selector = "form#RechargeForm input[name=amount]";
			}
			$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
			$('form#RechargeForm .amount_error').html("Decimal value not allowed ");
			PreRechFlag = 2;
		} else {
			var is_amt_valid = 1;
			if (min_limit == false) {
				min_limit = parseFloat(bbps_biller_arr[opid]['minLimit']);
			}
			if (max_limit == false) {
				max_limit = parseFloat(bbps_biller_arr[opid]['maxLimit']);
			}
			if (max_limit == 0) {} else {
				if (amount > max_limit) {
					is_amt_valid = 2;
				}
			}
			if (min_limit == 0) {} else {
				if (amount < min_limit) {
					is_amt_valid = 2;
				}
			}
			if (is_amt_valid == 1) {
				$("form#RechargeForm input[name=amount]").removeClass("inpt_border_error");
				$('form#RechargeForm .amount_error').html('');
			} else {
				if (focus_flag == false) {
					focus_flag = true;
					focus_selector = "form#RechargeForm input[name=amount]";
				}
				$("form#RechargeForm input[name=amount]").addClass("inpt_border_error");
				$('form#RechargeForm .amount_error').html('Allowed Amount ' + min_limit + '-' + max_limit);
				PreRechFlag = 2;
			}

		}
	}

	if (focus_flag == true) {
		$(focus_selector).focus();
	}

	if (opid == "" || opid == undefined) {} else {
		var PreRechFlagV0 = 1;
		var PreRechFlagV1 = 1;
		var PreRechFlagV2 = 1;
		var PreRechFlagV3 = 1;
		if (opid == "" || opid == undefined) {} else {
			PreRechFlagV0 = validate_form_input(opid, 0, ssid, focus_flag, bbps_biller_arr);
			PreRechFlagV1 = validate_form_input(opid, 1, opvalue1, focus_flag, bbps_biller_arr);
			PreRechFlagV2 = validate_form_input(opid, 2, opvalue2, focus_flag, bbps_biller_arr);
			PreRechFlagV3 = validate_form_input(opid, 3, opvalue3, focus_flag, bbps_biller_arr);
		}
		if (PreRechFlagV0 == 2 || PreRechFlagV1 == 2 || PreRechFlagV2 == 2 || PreRechFlagV3 == 2) {
			PreRechFlag = 2;
		}
	}


	if (PreRechFlag == 1) {
		if (fetchOption != 'MANDATORY') {
			// $('.loader_fetch_bill_text').html("Please wait.");
			// $('.loader_fetch_bill_main').show();
			// document.getElementById("RechargeForm").submit();
			ajaxRechargeForm();
		} else {
			if (fetch_indicator == 1) {
				// $('.loader_fetch_bill_text').html("Please wait.");
				// $('.loader_fetch_bill_main').show();
				// document.getElementById("RechargeForm").submit();
				ajaxRechargeForm();
			} else {
				var bill_details_box = thisE.find('.bill-details-box');
				if (bill_details_box.length) {} else {
					thisE.find('.amount_container').after('<div class="bill-details-box"></div>');
					var bill_details_box = thisE.find('.bill-details-box');
				}
				bill_details_box.html('');
				var bill_url = '';
				var data_object = {};
				if (isAdhoc == false) {
					bill_url = Base_URL + 'recharge/service/check_bill_details';
					data_object = {
						service_type: service_type,
						opid: opid,
						ssid: ssid,
						opvalue1: opvalue1,
						opvalue2: opvalue2,
						opvalue3: opvalue3,
						amount: 0
					};
				} else {
					bill_url = Base_URL + 'recharge/service/check_bill_details';
					data_object = {
						service_type: service_type,
						opid: opid,
						ssid: ssid,
						opvalue1: opvalue1,
						opvalue2: opvalue2,
						opvalue3: opvalue3,
						amount: amount
					};
				}
				$('.loader_fetch_bill_text').html("Please wait.");
				$('.loader_fetch_bill_main').show();
				document.getElementById("submit_button").disabled = true;

				$("form#RechargeForm input[name=amount]").removeClass("inpt_border_error");
				$('form#RechargeForm .amount_error').html('');
				$('form#RechargeForm .amount_description').html('');

				$.ajax({
					url: bill_url,
					type: 'POST',
					data: data_object,
					success: function (data) {
						var obj = JSON.parse(data);
						var resText = '';
						resText = obj.data.resText;
						if (obj.error_code == 200) {

							var billDetailsData = '<div class="bdx"><table class="table"><tr><td colspan="2">Consumer Details</td><tr>';
							if (obj.data.dueDate != undefined && obj.data.dueDate != "") {
								billDetailsData += '<tr class="due-date"><td>Due Date:</td><td>' + dateFormatter(obj.data.dueDate, "dd-mm-YYYY") + '</td></tr>';
							}
							if (obj.data.billDate != undefined && obj.data.billDate != "") {
								billDetailsData += '<tr><td>Bill Date:</td><td>' + dateFormatter(obj.data.billDate, "dd-mm-YYYY") + '</td></tr>';
							}
							if (obj.data.billName != undefined && obj.data.billName != "") {
								billDetailsData += '<tr><td>Consumer Name:</td><td>' + obj.data.billName + '</td></tr>';
							}
							if (obj.data.billAmount != undefined && obj.data.billAmount != "") {
								if (service_type == "fastag") {
									billDetailsData += '<tr><td>Available Balance:</td><td>₹' + obj.data.billAmount + '</td></tr>';
								} else if (service_type == "subscription") {
									billDetailsData += '<tr><td>Subscription Amount:</td><td>₹' + obj.data.billAmount + '</td></tr>';
								} else {
									billDetailsData += '<tr><td>Bill Amount:</td><td>₹' + obj.data.billAmount + '</td></tr>';
								}
							}
							billDetailsData += '</table></div>';
							bill_details_box.html(billDetailsData);
							$("html, body").animate({
								scrollTop: $('.amount_container').offset().top - 150
							}, 100);

							var billAmount = 0;
							var dueDate = '';
							var urid = '';
							/* var max_limit = 0;
							var min_limit = 1; */
							var ref_id = '';
							billAmount = obj.data.billAmount;
							if (obj.data.dueDate != undefined && obj.data.dueDate != '') {
								dueDate = obj.data.dueDate;
							}
							urid = obj.data.urid;
							ref_id = obj.data.orderId;
							min_limit = obj.data.min_limit;
							max_limit = obj.data.max_limit;
							$('.amount_container').attr('data-min_limit', min_limit);
							$('.amount_container').attr('data-max_limit', max_limit);
							if (ref_id != "" || ref_id != undefined) {
								$("form#RechargeForm input[name=ref_id]").val(ref_id);
							}
							if (urid != "" || urid != undefined) {
								if (isAdhoc == false) {
									if (billAmount > 0) {
										if (paymentAmountExactness == 'EXACT') {
											$("form#RechargeForm input[name=amount]").val(billAmount);
											var amount = $("form#RechargeForm input[name=amount]").val();
											if (amount > 0 && amount != undefined) {
												// document.getElementById("RechargeForm").submit();
												ajaxRechargeForm();
											} else {
												$('.loader_fetch_bill_main').hide();
												$('.amount_error').html('Amount should be above 0');
												$("form#RechargeForm input[name=amount]").show();
												$("form#RechargeForm input[name=amount]").attr("type", "text");
												$("form#RechargeForm input[name=amount]").next('.input-heading').show();
												document.getElementById("submit_button").disabled = false;
											}
										} else if (paymentAmountExactness == 'EXACT_AND_ABOVE') {
											console.log(obj);
											$('.loader_fetch_bill_main').hide();
											document.getElementById("submit_button").disabled = false;
											$("form#RechargeForm input[name=amount]").show();
											$("form#RechargeForm input[name=amount]").attr("type", "text");
											$("form#RechargeForm input[name=amount]").val(billAmount);
											$("form#RechargeForm input[name=amount]").next('.input-heading').show();
											$('.amount_container').attr('data-fetch', '1');
											if (max_limit > 0) {
												$('form#RechargeForm .amount_description').html('Allowed Amount ₹' + billAmount + ' to ₹' + max_limit);
											} else {
												$('form#RechargeForm .amount_description').html('Allowed Amount ₹' + billAmount + ' and above');
											}
										} else if (paymentAmountExactness == 'EXACT_AND_BELOW') {
											console.log(obj);
											$('.loader_fetch_bill_main').hide();
											document.getElementById("submit_button").disabled = false;
											$("form#RechargeForm input[name=amount]").show();
											$("form#RechargeForm input[name=amount]").attr("type", "text");
											$("form#RechargeForm input[name=amount]").val(billAmount);
											$("form#RechargeForm input[name=amount]").next('.input-heading').show();
											$('.amount_container').attr('data-fetch', '1');
											if (min_limit > 0) {
												$('form#RechargeForm .amount_description').html('Allowed Amount ₹' + min_limit + ' to ₹' + billAmount);
											} else {
												$('form#RechargeForm .amount_description').html('Allowed Amount ₹' + billAmount + ' and below ₹' + billAmount);
											}
										} else {
											$('.loader_fetch_bill_main').hide();
											$('.amount_error').html('Technical Error!');
											$("form#RechargeForm input[name=amount]").show();
											$("form#RechargeForm input[name=amount]").attr("type", "text");
											$("form#RechargeForm input[name=amount]").next('.input-heading').show();
											document.getElementById("submit_button").disabled = false;
										}
									} else {
										$('.loader_fetch_bill_main').hide();
										$('.amount_error').html('Amount should be above 0');
										$("form#RechargeForm input[name=amount]").show();
										$("form#RechargeForm input[name=amount]").attr("type", "text");
										$("form#RechargeForm input[name=amount]").next('.input-heading').show();
										document.getElementById("submit_button").disabled = false;
									}
								} else {
									$('.loader_fetch_bill_main').hide();
									document.getElementById("submit_button").disabled = false;
									$("form#RechargeForm input[name=amount]").show();
									$("form#RechargeForm input[name=amount]").attr("type", "text");
									$("form#RechargeForm input[name=amount]").next('.input-heading').show();
									$('.amount_container').attr('data-fetch', '1');
									$('form#RechargeForm .amount_description').html('Allowed Amount ₹' + min_limit + ' to ₹' + max_limit);
								}
							} else {
								// document.getElementById("RechargeForm").submit();
								ajaxRechargeForm();
							}
						} else if (obj.error_code == 201) {
							console.log('Err ' + resText);
							$('.loader_fetch_bill_main').hide();
							$('.amount_error').html(resText);
							document.getElementById("submit_button").disabled = false;
							$("form#RechargeForm input[name=amount]").hide();
							$("form#RechargeForm input[name=amount]").next('.input-heading').hide();
						} else if (obj.error_code == 400) {
							$('.loader_fetch_bill_main').hide();
							$('.amount_error').html(obj.error_message);
							document.getElementById("submit_button").disabled = false;
							$("form#RechargeForm input[name=amount]").hide();
							$("form#RechargeForm input[name=amount]").next('.input-heading').hide();
						} else {
							$('.loader_fetch_bill_main').hide();
							$('.amount_error').html('Technical Error! Try after 1 min');
							document.getElementById("submit_button").disabled = false;
							$("form#RechargeForm input[name=amount]").hide();
							$("form#RechargeForm input[name=amount]").next('.input-heading').hide();
						}
					},
					error: function (jqXHR, textStatus, errorThrown) {
						$('.loader_fetch_bill_main').hide();
						$('.amount_error').html('Technical Error! Try after 1 min');
						document.getElementById("submit_button").disabled = false;
						$("form#RechargeForm input[name=amount]").hide();
						$("form#RechargeForm input[name=amount]").next('.input-heading').hide();
					}
				});
			}
		}
	}
});

function ajaxRechargeForm() {
	$('.loader_fetch_bill_main').hide();
	var thisE = $("#RechargeForm");
	var error_box = thisE.find('.error-box');
	if (error_box.length) {} else {
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
				document.getElementById("submit_button").disabled = false;
				globalSetErrorText(error_box, 400, res.message);
			}
		} catch (e) {
			document.getElementById("submit_button").disabled = false;
			globalSetErrorText(error_box, 400, 'Some Error #' + e);
		}
	});
}

$(document).on('change', '.form-control', function(){
	var thisE = $(this);
	thisE.val(thisE.val().trim());
});