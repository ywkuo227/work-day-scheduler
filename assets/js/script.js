var eleTimeBlock = $(".container");
var colorStatus;

function setColorStatus(i) {
    if ((moment().hour() + 1) > i) {
        colorStatus = "past";
    } else if ((moment().hour() + 1) === i) {
        colorStatus = "present";
    } else if ((moment().hour() + 1) < i) {
        colorStatus = "future";
    }
}

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

function displayCurrentTime() {
    setInterval(function () {
        $("#currentDay").text(moment().format('[Today is ]dddd, MMMM Do YYYY'));
        updateTimeBlock();
    }, 1000);
}

function pageInitialize() {
    displayCurrentTime();
    genTimeBlock();
}

pageInitialize();