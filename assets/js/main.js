/*
GIVEN I am using a daily planner to create a schedule
WHEN I open the planner
*/

// Global vars.
let today = new Date();
let todayDate = toMonthName(today.getMonth()+1)+" "+today.getDate()+"   Year"+today.getFullYear();
let currentHour = today.getHours();
let curDateEl = $('#currentDate');
let curTimeEl = $('#currentTime');
let scheduleDisplay = $('#mainDisplay');

// THEN the current day is displayed at the top of the calendar
curDateEl.text(todayDate);
let displayHour = today.getHours();
if(displayHour > 12 ) displayHour-=12;
let minutes =today.getMinutes(); 
if( minutes < 10){
    minutes = "0"+minutes;
}
curTimeEl.text("Time:"+ displayHour+":"+minutes );

function toMonthName(monthNumber) {
// source https://bobbyhadz.com/
// Author Borislav Hadzhiev
    const date = new Date();
    date.setMonth(monthNumber - 1);
  
    return date.toLocaleString('en-US', {
      month: 'long',
    });
}
  
function getHourString(number){
    if(number === 12){
        return number+":00PM"
    } 
    if(number < 13){
        return number+":00AM"
    } 
    return (number-12) +":00PM"
}

function getNote(time){
    let note = localStorage.getItem(time);
    if(note){
        return note;
    }
    return " ";
}

function saveNote(event){
    localStorage.setItem( $(event.target).parent().attr('data-time') ,$(event.target).parent().children('.noteEvent').val() );
}
  // so let's create the time blocks.
let timeBlocks = [7,8,9,10,11,12,13,14,15,16,17,18]; 
// THEN I am presented with timeblocks for standard business hours
for(let i in timeBlocks){
/* Element structure with class attr.
        <li class ="listHourEvent">
            <h2 class="timeEvent"> 11:50 </h2>
            <textarea class ="noteEvent" multiple> Stuff happening </textarea>
            <button class = "saveEvent"> Save </button>
        </li>
*/
    
    let timeString = getHourString(timeBlocks[i]);
    
    let listElement = $('<li>');
        listElement.attr('class','listHourEvent rounded p-3 m-2 ');
        listElement.attr('data-time',timeBlocks[i]);

    let timeElement = $('<h2>');
        timeElement.attr('class','timeEvent');
        timeElement.text(timeString);

        listElement.append(timeElement);

    //WHEN I click into a timeblock
//    THEN I can enter an event
    let noteElement = $('<textarea>');
        noteElement.attr('class','noteEvent rounded');
//    WHEN I refresh the page
//    THEN the saved events persist
        noteElement.val( getNote(timeBlocks[i]) );

        listElement.append(noteElement);

//    WHEN I click the save button for that timeblock
//    THEN the text for that event is saved in local storage
    let saveElement = $('<button>');
        saveElement.attr('class','saveEvent btn  btn-info m-1');
        saveElement.text('save:????')

        listElement.on('click',saveNote);
        listElement.append(saveElement);

    scheduleDisplay.append(listElement);
//    WHEN I view the timeblocks for that day
//    THEN each timeblock is color coded to indicate whether it is in the past, present, or future
//    let currentHour = 10;
    if(currentHour == timeBlocks[i]){
        listElement.attr('class','currentHourEvent rounded p-3 m-2');
    } else 
    if(currentHour > timeBlocks[i]){
        listElement.attr('class','pastHourEvent rounded p-3 m-2');
    }
}