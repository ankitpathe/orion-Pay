$(document).ready(function () {
  $("body").click(function () {
    $(".more_icon_list").hide()
  });
  $("#except").click(function (event) {
    event.stopPropagation()
  });
  $(".more_icon_list, #showMoreService").click(function (event) {
    event.stopPropagation()
  });
  $("#showMoreService").on('click', function () {
    $(".more_icon_list").toggle()
  });
  $(".g-nav-main, .g-dropdown").hover(function () {
    $("body").addClass("open-desktop-menu");
    $("#except").hide();
    $(".more_icon_list").hide()
  }, function () {
    $("body").removeClass("open-desktop-menu")
  })
});
/* $(document).ready(function () {
  $.each(document.images, function () {
    var this_image = this;
    var src = $(this_image).attr('src') || '';
    if (!src.length > 0) {
      var lsrc = $(this_image).attr('lsrc') || '';
      var lalt = $(this_image).attr('data-alt');
      if (lsrc.length > 0) {
        var img = new Image();
        img.src = lsrc;
        if (lalt != undefined) {
          $(this_image).attr("alt", lalt)
        }
        $(img).load(function () {
          this_image.src = this.src;
          $(this_image).removeClass('blurimg')
        })
      }
    }
  })
}); */
$(document).ready(function () {
  $.each(document.images, function () {
    var this_image = this;
    var cls = $(this_image).hasClass("b-lazy")
    if (cls == 1) {
      var lsrc = $(this_image).attr('data-src') || '';
      var lalt = $(this_image).attr('data-alt');
      if (lsrc.length > 0) {
        if (lalt != undefined) {
          $(this_image).attr("alt", lalt)
        }
        $(this_image).attr('src', lsrc);
        $(this_image).removeClass('b-lazy')
      }
    }
  })
});

function show_all_faq() {
  $(".insideFaqs").css("display", "block");
  $(".allFaqShow").remove()
}

function showFaq() {
  $(".expandedArea").css("display", "block");
  $(".reaBtn").css("display", "none")
}

function hideFaq() {
  $(".expandedArea").css("display", "none");
  $(".reaBtn").css("display", "inline-block")
}
$('select.add_class_b').on('change', function () {
  $('.add_class_b').addClass('add_bold')
});
$('select.add_class_c').on('change', function () {
  $('.add_class_c').addClass('add_bold')
});
$('select.add_dth_o').on('change', function () {
  $('.add_dth_o').addClass('add_bold')
});
$('select.add_dth_c').on('change', function () {
  $('.add_dth_c').addClass('add_bold')
});
$('select.add_dcard_o').on('change', function () {
  $('.add_dcard_o').addClass('add_bold')
});
$('select.add_dcard_c').on('change', function () {
  $('.add_dcard_c').addClass('add_bold')
});
$('select.add_ele_o').on('change', function () {
  $('.add_ele_o').addClass('add_bold')
});
$('select.add_ele_c').on('change', function () {
  $('.add_ele_c').addClass('add_bold')
});
$('select.add_lnd_o').on('change', function () {
  $('.add_lnd_o').addClass('add_bold')
});
$('select.add_mob_o').on('change', function () {
  $('.add_mob_o').addClass('add_bold')
});
$('select.add_mob_c').on('change', function () {
  $('.add_mob_c').addClass('add_bold')
});
$('select.add_wt_o').on('change', function () {
  $('.add_wt_o').addClass('add_bold')
});
$('select.add_wt_c').on('change', function () {
  $('.add_wt_c').addClass('add_bold')
});
$('select.add_gs_o').on('change', function () {
  $('.add_gs_o').addClass('add_bold')
});
$('select.add_gs_c').on('change', function () {
  $('.add_gs_c').addClass('add_bold')
});
$('select.add_inc_o').on('change', function () {
  $('.add_inc_o').addClass('add_bold')
});
$('select.add_inc_c').on('change', function () {
  $('.add_inc_c').addClass('add_bold')
});
$('select.add_bra_o').on('change', function () {
  $('.add_bra_o').addClass('add_bold')
});
$('select.remove_bold').on('change', function () {
  $('.remove_bold').addClass('add_bolde')
});
$(document).ready(function () {
  $(document).click(function () {
    $(".hamburger_menu").hide()
  });
  $("#open_hamgurger,.hamburger_left,.hamburger_right").click(function (e) {
    $(".hamburger_menu").show();
    if (e.target.parentNode.id != undefined && e.target.parentNode.id == 'close_hamburger') {} else {
      e.stopPropagation()
    }
  });
  $("#close_hamburger").on('click', function (e) {
    $(".hamburger_menu").hide()
  });
  $("#tvpassport").mouseenter(function () {
    $(".hamburger_right").show();
    $(".hamburger_right").children("div").hide();
    $(".travel_inside").show()
  });
  $("#egorlicences").mouseenter(function () {
    $(".hamburger_right").show();
    $(".hamburger_right").children("div").hide();
    $(".egove_inside").show()
  });
  $("#business_for").mouseenter(function () {
    $(".hamburger_right").show();
    $(".hamburger_right").children("div").hide();
    $(".business_for_inside").show()
  });
  $("#tax_fill").mouseenter(function () {
    $(".hamburger_right").show();
    $(".hamburger_right").children("div").hide();
    $(".taxation_inside").show()
  });
  $("#rbill_pay").mouseenter(function () {
    $(".hamburger_right").show();
    $(".hamburger_right").children("div").hide();
    $(".recharge_bill_inside").show()
  });
  $("#faqs_hide").mouseenter(function () {
    $(".hamburger_right").hide();
    $(".hamburger_right").children("div").hide()
  })
})