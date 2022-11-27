/* Date-Time Settings */
const DateTime = luxon.DateTime;
const now = DateTime.now();
let currentDay = $('#currentDay');
currentDay.text(now.toLocaleString(DateTime.DATE_HUGE));

// Temporary Globals to define current working hours
const startHour = 9;
const endHour = 17;

function loadEvents() {
    const scheduledEvents = [];
    const allSavedItems = Object.keys(localStorage);
    let prefix, time;
    for (const item of allSavedItems) {
        [prefix, ...time] = item.split('-');
        if (prefix === 'scheduler') {
            scheduledEvents.push(
                {
                    time: time.join(' '),
                    event: localStorage.getItem(item)
                }
            );
        }
    }
    return scheduledEvents;
}

function createTimeBlock(hour) {
    const timeBlock = $('<p>')
        .addClass('hour')
        .addClass('time');
    timeBlock.text(hour);
    return timeBlock;
}

function createEventDiv(time, savedEventContent) {  
    const eventDiv = $('<div>').addClass('event');
    eventDiv.append(
        $('<textarea>').val(savedEventContent)
    );

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
    const scheduledEvent = 
        event.currentTarget.parentElement.children[1].firstChild.value;
    const scheduledTime = event.currentTarget.parentElement.firstChild.innerText;

    if (scheduledEvent.length !== 0) {
        localStorage.setItem(
            'scheduler-' + scheduledTime.replace(' ', '-'), 
            scheduledEvent
        );

        const alert = $('#alert');
        const newEvent = `Saved Event to <span class="highlight">Local Storage</span>!<br>Time: ${scheduledTime}<br>Details: ${scheduledEvent}`;
    
        if (alert.length === 0) {
            $('#schedule').prepend($('<p>').html(newEvent).attr('id', 'alert'));
        } else {
            alert.html(newEvent);
        }
    }
}

function init() {
    const dt = DateTime.fromObject({hour: startHour});

    const schedule = $('#schedule');
    const list = $('<ol>').addClass('time-block');
    const savedEvents = loadEvents();

    for (let i = startHour; i <= endHour; i++) {
        const emptyListElement = $('<li>');

        const time = dt.set({hour: i});
        let hour = '';
        if (time.toFormat('HH') >= 12) {
            hour += time.toFormat('h') + ' PM';
        } else {
            hour += time.toFormat('h') + ' AM';
        }

        let savedEventContent = '';
        for (let j = 0; j < savedEvents.length; j++) {
            if (savedEvents[j].time === hour) {
                savedEventContent = savedEvents[j].event;
                savedEvents.splice(j, 1);
                break;
            } else {
                continue;
            }
        }

        let rowDiv = $('<div>').addClass('row');
        rowDiv.append(
            createTimeBlock(hour),
            createEventDiv(time, savedEventContent),
            createSaveButton()
        );

        emptyListElement.append(rowDiv);
        list.append(emptyListElement);
    }
    schedule.append(list);
}

init();