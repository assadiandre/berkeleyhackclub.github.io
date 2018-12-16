
function init() {
  var publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/18xGU3_X0DxJ44wNDljPXkVntO-h1umbmWQHd1T-CQ0Y/pubhtml';
   Tabletop.init( { key: publicSpreadsheetUrl, callback: function(data, tabletop) {
     var nextdate = findNextDate(data)
     $(".calendar_top").html(nextdate[0])
     $(".calendar_day").html(nextdate[1])
   },
   simpleSheet: true } )
}


function getCurrentDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth() + 1; //January is 0!

  var yyyy = today.getFullYear();
  if (dd < 10) {
    dd = '0' + dd;
  }
  if (mm < 10) {
    mm = '0' + mm;
  }
  var today = [mm,dd,yyyy]
  return today;
}

function formatDate(date) {
  return date.split("/");
}

function compareTwoDates(currentDate,date2) {
  if (currentDate[2] < date2[2]) { // different year
    return true;
  }
  else if (currentDate[0] < date2[0]) { // different month
    return true;
  }
  else if (currentDate[0] == date2[0]) { // same month, different day
    if (currentDate[1] < date2[1] ) {
      return true;
    }
    return false;
  }
}

function findNextDate(data) {
  for (var i = 0; i < data.length;i++) {
    var current_date = getCurrentDate();
    var upcoming_date = formatDate(data[i].rawdate);
    if ( compareTwoDates(current_date,upcoming_date) ) {
      return [data[i].month, data[i].day];
    }
  }
  return["none","none"]
}

init()
// window.addEventListener('DOMContentLoaded', init)
