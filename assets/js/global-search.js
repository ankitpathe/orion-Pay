var POPULAR_SEARCH_JSON = [];
$(document).ready(function () {
  $.getJSON(Base_URL + "assets/specific-json-file/popular_search_list.json", function (json) {
    POPULAR_SEARCH_JSON = json;
  });
});
$("body").click(function () {
  $(".top_search").hide();
});
$("#except, #searchkeyword").click(function (event) {
  event.stopPropagation();
});
var searchKeyword = document.getElementById('searchkeyword');
if (searchKeyword != null && searchKeyword != undefined) {
  searchKeyword.addEventListener("click", function (e) {
    if (chunkArray == "" || chunkArray == null) {
      chunk_arr();
    }
    if (searchKeyword.value != "") {
      document.getElementById('GlobalSearchList').style.display = "block";
      document.getElementById('globalTrendingSearch').style.display = "none";
      document.getElementById('globalPopularSearch').style.display = "block";
    } else {
      document.getElementById('GlobalSearchList').style.display = "block";
      document.getElementById('globalTrendingSearch').style.display = "block";
      document.getElementById('globalPopularSearch').style.display = "none";
    }
  });

  var last_search = "";
  let returnLimit = 30; // Maximum number of results to return
  let characterLen = 3; // Maximum number of results to return
  let intervalItr = null; // A handle used for iterating through the array with an interval timer
  let intervalItr_new = null; // A handle used for iterating through the array with an interval timer
  var found = false;
  var chunkArray = [];
  var chunkArrayIndex = [];
  var chunkArray_new = [];
  var chunkArrayIndex_new = [];

  chunk_arr();

  searchKeyword.addEventListener('keyup', function (e) {
    var q = searchKeyword.value;
    if (last_search != q) {
      found = false;
      last_search = q;
      document.getElementById('GlobalSearchList').style.display = "block";
      document.getElementById('globalPopularSearch').style.display = "block";
      document.getElementById('globalTrendingSearch').style.display = "none";

      if (intervalItr) {
        clearInterval(intervalItr); // If we were iterating through a previous search, stop it.
      }
      if (intervalItr_new) {
        clearInterval(intervalItr_new); // If we were iterating through a previous search, stop it.
      }
      if (q.length >= characterLen) {
        search(q);
      } else {
        document.getElementById('globalPopularSearch').style.display = "none";
        document.getElementById('globalTrendingSearch').style.display = "block";
      }
    }
  });

  // document.getElementsByTagName('body').;
  // document.getElementsByTagName('body').addEventListener('click', function (e) {
  /* document.getElementById('GlobalSearchList').style.display = "none"; */
  // });

  function chunk_arr() {
    if (POPULAR_SEARCH_JSON != undefined && POPULAR_SEARCH_JSON != null && POPULAR_SEARCH_JSON != "") {
      const chunkSize = 200;
      for (let i = 0; i < POPULAR_SEARCH_JSON.length; i += chunkSize) {
        chunkArray.push(POPULAR_SEARCH_JSON.slice(i, i + chunkSize));
        chunkArrayIndex.push(0);
      }
    }
  }

  let reg, idx, foundI, idx_new;
  var searchTextDot = ".";

  function search(enteredName) {
    reg = new RegExp(enteredName, 'i');
    idx_new = idx = foundI = 0;

    for (let index = 0; index < chunkArray.length; index++) {
      chunkArrayIndex[index] = 0;
    }
    chunkArray_new = JSON.parse(JSON.stringify(chunkArray));

    // Kick off the search by creating an interval that'll call searchNext() with a 0ms delay.
    // This will prevent the search function from locking the main thread while it's working,
    // allowing the DOM to be updated as you type
    intervalItr = setInterval(searchNext, 0);
  }

  function search_new(enteredName) {
    for (let index = 0; index < chunkArray_new.length; index++) {
      chunkArrayIndex_new[index] = 0;
    }

    splitTextArr = enteredName.split(" ");

    // Kick off the search by creating an interval that'll call searchNext() with a 0ms delay.
    // This will prevent the search function from locking the main thread while it's working,
    // allowing the DOM to be updated as you type
    if (splitTextArr.length > 1) {
      intervalItr_new = setInterval(searchNext_new, 0);
    }
  }

  function searchNext() {
    if (idx >= POPULAR_SEARCH_JSON.length || foundI > returnLimit) {
      if (found == false) {
        document.getElementById('globalPopularSearch').innerHTML = '<li><a href="javascript:void(0);">No Result Found</a></li>';
      }
      if (foundI < returnLimit) {
        search_new(searchKeyword.value);
      }
      clearInterval(intervalItr);
      return;
    }

    for (let index = 0; index < chunkArray.length; index++) {
      if (chunkArrayIndex[index] < chunkArray[index].length) {
        idx++;
        var item = chunkArray[index][chunkArrayIndex[index]].name;
        if (reg.test(item)) {
          chunkArray_new[index].splice(chunkArrayIndex[index], 1);
          foundI++;
          found = true;
          if (foundI != 1) {
            document.getElementById('globalPopularSearch').innerHTML += '<li><a href="' + Base_URL + chunkArray[index][chunkArrayIndex[index]].url + '"><img alt="Easemydeal" src="' + Base_URL + 'assets/image/header/trending-up-icon.svg" class="product-icon">' + chunkArray[index][chunkArrayIndex[index]].name + '</a></li>';
          } else {
            document.getElementById('globalPopularSearch').innerHTML = '<li><a href="' + Base_URL + chunkArray[index][chunkArrayIndex[index]].url + '"><img alt="Easemydeal" src="' + Base_URL + 'assets/image/header/trending-up-icon.svg" class="product-icon">' + chunkArray[index][chunkArrayIndex[index]].name + '</a></li>';
          }
        } else if (found == false) {

          if (searchTextDot == ".") searchTextDot = '..';
          else if (searchTextDot == "..") searchTextDot = '...';
          else if (searchTextDot == "...") searchTextDot = '....';
          else if (searchTextDot == "....") searchTextDot = '.....';
          else searchTextDot = '.';

          document.getElementById('globalPopularSearch').innerHTML = '<li><a href="javascript:void(0);"><img alt="Easemydeal" src="' + Base_URL + 'assets/image/header/trending-up-icon.svg" class="product-icon">Searching' + searchTextDot + '</a></li>';
        }
      }
      chunkArrayIndex[index] = chunkArrayIndex[index] + 1;
    }
  }

  function searchNext_new() {
    if (idx_new >= POPULAR_SEARCH_JSON.length || foundI > returnLimit) {
      if (found == false) {
        document.getElementById('globalPopularSearch').innerHTML = '<li><a href="javascript:void(0);">No Result Found</a></li>';
      }
      clearInterval(intervalItr_new);
      return;
    }

    for (let index = 0; index < chunkArray_new.length; index++) {
      if (chunkArrayIndex_new[index] < chunkArray_new[index].length) {
        idx_new++;
        var item = chunkArray_new[index][chunkArrayIndex_new[index]].name;
        var checkF = false;
        for (let cc = 0; cc < splitTextArr.length; cc++) {
          var reg_new = new RegExp(splitTextArr[cc], 'i');
          if (reg_new.test(item)) {
            checkF = true;
          }
        }

        if (checkF) {
          foundI++;
          found = true;
          if (foundI != 1) {
            document.getElementById('globalPopularSearch').innerHTML += '<li><a href="' + Base_URL + chunkArray_new[index][chunkArrayIndex_new[index]].url + '"><img alt="Easemydeal" src="' + Base_URL + 'assets/image/header/trending-up-icon.svg" class="product-icon">' + chunkArray_new[index][chunkArrayIndex_new[index]].name + '</a></li>';
          } else {
            document.getElementById('globalPopularSearch').innerHTML = '<li><a href="' + Base_URL + chunkArray_new[index][chunkArrayIndex_new[index]].url + '"><img alt="Easemydeal" src="' + Base_URL + 'assets/image/header/trending-up-icon.svg" class="product-icon">' + chunkArray_new[index][chunkArrayIndex_new[index]].name + '</a></li>';
          }
        } else if (found == false) {

          if (searchTextDot == ".") searchTextDot = '..';
          else if (searchTextDot == "..") searchTextDot = '...';
          else if (searchTextDot == "...") searchTextDot = '....';
          else if (searchTextDot == "....") searchTextDot = '.....';
          else searchTextDot = '.';

          document.getElementById('globalPopularSearch').innerHTML = '<li><a href="javascript:void(0);"><img alt="Easemydeal" src="' + Base_URL + 'assets/image/header/trending-up-icon.svg" class="product-icon">Searching' + searchTextDot + '</a></li>';
        }
      }
      chunkArrayIndex_new[index] = chunkArrayIndex_new[index] + 1;
    }
  }
}