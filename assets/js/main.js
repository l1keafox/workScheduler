/*
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner

WHEN I scroll down
THEN I am presented with timeblocks for standard business hours
WHEN I view the timeblocks for that day
THEN each timeblock is color coded to indicate whether it is in the past, present, or future
WHEN I click into a timeblock
THEN I can enter an event
WHEN I click the save button for that timeblock
THEN the text for that event is saved in local storage
WHEN I refresh the page
THEN the saved events persist */


// THEN the current day is displayed at the top of the calendar
let todayDate = "Friday, March 4th  Year 2020";

let curDateEl = $('#currentDate');
let scheduleDisplay = $('#mainDisplay');

curDateEl.text(todayDate);

// so let's create the time blocks.

let timeBlocks = [7,8,9,10,11,12,1,2,3,4,5,6];

for(let i in timeBlocks){
    //
    let timeString = timeBlocks[i]+":00";
    let listElement = $('<li>');
//    listElement.text(timeString);
listElement.attr('class','listHourEvent');
listElement.attr('data-time',timeBlocks[i]);

    let timeElement = $('<h2>');
    timeElement.attr('class','timeEvent');
    timeElement.text(timeString);
    listElement.append(timeElement);
    let noteElement = $('<textarea>');
    noteElement.attr('class','noteEvent');
    listElement.append(noteElement);

    let saveElement = $('<button>');
    saveElement.attr('class','saveEvent');
    saveElement.text('save:💾')
    listElement.append(saveElement);

    scheduleDisplay.append(listElement);
}
//let timeBlocks = [7,8,9,10,11,12,13,14,15,16,17,18]; if we do european
// timeBlocks is the data structure
/*an Event will have
{
    timeHour: // only the hour no need to complicate this
    info:
} */
/* as an element it is in the <ol> element

        <li class ="listHourEvent">
            <h2 class="timeEvent"> 11:50 </h2>
            <textarea class ="noteEvent" multiple> Stuff happening </textarea>
            <button class = "saveEvent"> Save </button>
        </li>
*/



// Then we would create a day scheduler starting at 5 am and finishing at 5 pm
// so it would need to create 12 of these

// It will also need to load data from localStorage or whatever.

// so first let's just create some fake data to work wiht.
