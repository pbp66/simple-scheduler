/* Date-Time Settings */
const DateTime = luxon.DateTime;
const now = DateTime.now();
let currentDay = $('#currentDay');
currentDay.text(now.toLocaleString(DateTime.DATETIME_MED));

function createTimeBlock(time) {
    let hour = '';
    const timeBlock = $('<p>')
        .addClass('hour')
        .addClass('time');

    if (time.toFormat('HH') >= 12) {
        hour += time.toFormat('h') + ' PM';
    } else {
        hour += time.toFormat('h') + ' AM';
    }

    timeBlock.text(hour);
    return timeBlock;
}

function createEventDiv() {
    const eventDiv = $('<div>').addClass('event');
    eventDiv.append($('<textarea>'));
    return eventDiv;
}

function createSaveButton() {
    const button = $('<button>')
        .addClass('saveBtn')
        .append('<i class="fas fa-save"></i>');
    return button;
}

function init() {
    const startHour = 9;
    const endHour = 17;
    const dt = DateTime.fromObject({hour: startHour});

    const schedule = $('#schedule');
    const list = $('<ol>').addClass('time-block');

    for (let i = startHour; i < endHour; i++) {
        const emptyListElement = $('<li>');
        let rowDiv = $('<div>').addClass('row');
        rowDiv.append(
            createTimeBlock(dt.set({hour: i})),
            createEventDiv(),
            createSaveButton()
        );

        console.log(dt.hour);

        if (i < now.hour) {
            rowDiv.addClass('past');
        } else if (i > now.hour) {
            rowDiv.addClass('future');
        } else {
            rowDiv.addClass('present');
        }

        emptyListElement.append(rowDiv);
        list.append(emptyListElement);
    }
    schedule.append(list);
}

init();