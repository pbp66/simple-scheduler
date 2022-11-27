/* Date-Time Settings */
const DateTime = luxon.DateTime;
const now = DateTime.now();
let currentDay = $('#currentDay');
currentDay.text(now.toLocaleString(DateTime.DATETIME_MED));

function createTimeBlock(hour) {
    const timeBlock = $('<p>')
        .addClass('hour')
        .addClass('time');
    timeBlock.text(hour);
    return timeBlock;
}

function createEventDiv(time) {  
    const eventDiv = $('<div>').addClass('event')//.attr('id', id);
    eventDiv.append($('<textarea>'));

    if (time.hour < now.hour) {
        eventDiv.addClass('past');
    } else if (time.hour > now.hour) {
        eventDiv.addClass('future');
    } else {
        eventDiv.addClass('present');
    }
    return eventDiv;
}

function createSaveButton() {
    const button = $('<button>')
        .addClass('saveBtn')
        .click(handleOnClick)
        .append('<i class="fas fa-save"></i>');
    return button;
}

function handleOnClick(event) {
    console.log(event);
    console.log(event.currentTarget);
}

function init() {
    const startHour = 9;
    const endHour = 17;
    const dt = DateTime.fromObject({hour: startHour});

    const schedule = $('#schedule');
    const list = $('<ol>');

    for (let i = startHour; i <= endHour; i++) {
        const emptyListElement = $('<li>');

        const time = dt.set({hour: i});
        let hour = '';
        if (time.toFormat('HH') >= 12) {
            hour += time.toFormat('h') + ' PM';
        } else {
            hour += time.toFormat('h') + ' AM';
        }

        let rowDiv = $('<div>').addClass('row').attr('id', hour);
        rowDiv.append(
            createTimeBlock(hour),
            createEventDiv(time),
            createSaveButton()
        );



        emptyListElement.append(rowDiv);
        list.append(emptyListElement);
    }
    schedule.append(list);
}

init();