// Declare global variables.
var eleTimeBlock = $(".container"),
    colorStatus;

// Function to change the color of the textarea based on time of the day.
function setColorStatus(i) {
    if ((moment().hour()) > i) {
        colorStatus = "past";
    } else if ((moment().hour()) === i) {
        colorStatus = "present";
    } else if ((moment().hour()) < i) {
        colorStatus = "future";
    }
}

// Generate Time Block by using JQuery and backtick. It also set the color of the textbox by calling Set Color Status function.
function genTimeBlock() {

    for (i = 9; i <= 17; i++) {
        var timeValue;

        if (i < 12) {
            timeValue = (i + "AM");
        } else if (i === 12) {
            timeValue = (i + "PM");
        } else if (i > 12) {
            timeValue = ((i - 12) + "PM");
        }

        setColorStatus(i);

        eleTimeBlock.append(
            `<div class="row justify-content-md-center">
                <div class="col-1 d-flex justify-content-center align-items-center hour">${timeValue}</div>
                <textarea id="hour-${i}" class="col-10 d-flex align-items-center ${colorStatus}"></textarea>
                <div class="col-1 d-flex justify-content-center align-items-center saveBtn">💾</div>
            </div>`
        );

    }

}

// Funtion to update the color (by calling Set Color Status function) of the textarea in the Time Block after being generated.
function updateTimeBlock() {

    for (i = 9; i <= 17; i++) {

        setColorStatus(i);

        if ($("#hour-" + i).hasClass("past")) {
            $("#hour-" + i).removeClass("past");
            $("#hour-" + i).addClass(colorStatus);
        } else if ($("#hour-" + i).hasClass("present")) {
            $("#hour-" + i).removeClass("present");
            $("#hour-" + i).addClass(colorStatus);
        } else if ($("#hour-" + i).hasClass("future")) {
            $("#hour-" + i).removeClass("future");
            $("#hour-" + i).addClass(colorStatus);

        }
    }
}

// Display the current day. The function refreshes every second. It also call the update Time Block function.
function displayCurrentTime() {
    setInterval(function () {
        $("#currentDay").text(moment().format('[Today is ]dddd, MMMM Do YYYY'));
        updateTimeBlock();
    }, 1000);
}

// Intializes the page by calling Display Current Time funtion and Generate Time Block function, as well as calling the saved events from the Local Storage.
function pageInitialize() {
    $("#currentDay").text(moment().format('[Today is ]dddd, MMMM Do YYYY'));
    displayCurrentTime();
    genTimeBlock();

    if ((JSON.parse(localStorage.getItem("savedevents"))) !== null) {
        var loadSavedEvents = JSON.parse(localStorage.getItem("savedevents"));

        for (i = 0; i < loadSavedEvents.length; i++) {
            $("#" + loadSavedEvents[i].eventHour).val(loadSavedEvents[i].eventContent);
        }

    } else { }

}

// Call for page initialization.
pageInitialize();

// Once a Save Button is clicked, the function assess whether a previous event entry exist in the Local Storage.
// If exist, overwrite. Otherwise, push to the end of a private array and save to Local Storage again.
// Array.find() method: https://www.w3schools.com/jsref/jsref_find.asp#:~:text=%20JavaScript%20Array%20find%20%28%29%20Method%20%201,Details.%20%206%20More%20Examples.%20%20More%20
$(".saveBtn").on("click", (event) => {
    var savedEvents = [];

    if ((JSON.parse(localStorage.getItem("savedevents"))) !== null) {
        savedEvents = JSON.parse(localStorage.getItem("savedevents"));
    } else { }

    if (savedEvents.length !== 0) {
        if (savedEvents.find(se => se.eventHour === event.target.previousElementSibling.id) !== undefined) {
            savedEvents.find(se => se.eventHour === event.target.previousElementSibling.id).eventContent = ($("#" + event.target.previousElementSibling.id).val());
        } else if (savedEvents.find(se => se.eventHour === event.target.previousElementSibling.id) === undefined) {
            savedEvents.push({
                eventHour: (event.target.previousElementSibling.id),
                eventContent: ($("#" + event.target.previousElementSibling.id).val())
            });
        }
    } else {
        savedEvents.push({
            eventHour: (event.target.previousElementSibling.id),
            eventContent: ($("#" + event.target.previousElementSibling.id).val())
        });
    }

    localStorage.setItem("savedevents", JSON.stringify(savedEvents));
});