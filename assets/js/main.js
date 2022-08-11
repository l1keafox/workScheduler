/*
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner

WHEN I scroll down
 */


// THEN the current day is displayed at the top of the calendar
var today = new Date();
let todayDate = toMonthName(today.getMonth()+1)+" "+today.getDay()+"   Year"+today.getFullYear();
let currentHour = today.getHours();
let curDateEl = $('#currentDate');
let curTimeEl = $('#currentTime');
let scheduleDisplay = $('#mainDisplay');

curDateEl.text(todayDate);
curTimeEl.text("Time:"+ currentHour+":"+today.getMinutes() );
// so let's create the time blocks.

function toMonthName(monthNumber) {
// source https://bobbyhadz.com/
// Author Borislav Hadzhiev
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
  }
  
//let timeBlocks = [7,8,9,10,11,12,1,2,3,4,5,6];
let timeBlocks = [7,8,9,10,11,12,13,14,15,16,17,18]; 
// THEN I am presented with timeblocks for standard business hours

for(let i in timeBlocks){
    //
    let timeString = timeBlocks[i]+":00";
    
    let listElement = $('<li>');
    listElement.attr('class','listHourEvent');
    listElement.attr('data-time',timeBlocks[i]);

    let timeElement = $('<h2>');
    timeElement.attr('class','timeEvent');
    timeElement.text(timeString);
    listElement.append(timeElement);

    //WHEN I click into a timeblock
//    THEN I can enter an event
    let noteElement = $('<textarea>');
    noteElement.attr('class','noteEvent');
//    WHEN I refresh the page
//    THEN the saved events persist
    noteElement.val( getNote(timeBlocks[i]) );
    listElement.append(noteElement);

//    WHEN I click the save button for that timeblock
//    THEN the text for that event is saved in local storage
let saveElement = $('<button>');
    saveElement.attr('class','saveEvent');
    saveElement.text('save:💾')

    listElement.on('click',saveNote);
    listElement.append(saveElement);

    scheduleDisplay.append(listElement);
//    WHEN I view the timeblocks for that day
//    THEN each timeblock is color coded to indicate whether it is in the past, present, or future
    
    if(currentHour === timeBlocks[i]){
        listElement.attr('class','currentHourEvent');
    }
    if(currentHour > timeBlocks[i]){
        listElement.attr('class','pastHourEvent');
    }
}

function getNote(time){
    // this function will see if there is an note saved or not.
    // right now it will return empty;
    let note = localStorage.getItem(time);
    if(note){
        return note;
    }
    return " ";
}

function saveNote(event){
    localStorage.setItem( $(event.target).parent().attr('data-time') ,$(event.target).parent().children('.noteEvent').val() );
}
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
