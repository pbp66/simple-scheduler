/* Date-Time Settings */

const DateTime = luxon.DateTime;
const now = DateTime.now();

let currentDay = $('#currentDay');
currentDay.text(now.toLocaleString(DateTime.DATETIME_MED));


let schedule = $('#schedule');