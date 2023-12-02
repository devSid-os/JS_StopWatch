const playButton = document.getElementById("playButton");
const resetButton = document.getElementById("resetButton");
const timeLapseButton = document.getElementById("timeLapse");
var playStatus = false;
const miliSecondsHtml = document.getElementById("miliSeconds");
const secondsHtml = document.getElementById("seconds");
const minutesHtml = document.getElementById("minutes");
const hoursHtml = document.getElementById("hours");
const timeLapseTable = document.getElementById("timeLapseTable");
var timeObject = {
    miliSeconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0
};
var playInterval;
var timeLapseIndex = 0;
var timeStamps = {
    miliSeconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0
}

function incrementHour() {
    timeObject.hours = parseInt(hoursHtml.textContent);
    timeObject.hours++;
    if (timeObject.hours < 10) hoursHtml.textContent = "0" + timeObject.hours;
    else hoursHtml.textContent = timeObject.hours;
};

function incrementMinute() {
    timeObject.minutes = parseInt(minutesHtml.textContent);
    timeObject.minutes++;
    if (timeObject.minutes >= 60) {
        hoursHtml.classList.remove("hidden");
        hoursHtml.nextElementSibling.classList.remove("hidden");
        minutesHtml.textContent = "00";
        incrementHour();
    }
    else if (timeObject.minutes < 10) minutesHtml.textContent = "0" + timeObject.minutes;
    else minutesHtml.textContent = timeObject.minutes;
};

function incrementSecond() {
    timeObject.seconds = parseInt(secondsHtml.textContent);
    timeObject.seconds++;
    if (timeObject.seconds >= 60) {
        secondsHtml.textContent = "00";
        incrementMinute();
    }
    else if (timeObject.seconds < 10) secondsHtml.textContent = "0" + timeObject.seconds;
    else secondsHtml.textContent = timeObject.seconds;
};

function startStopWatch() {
    timeObject.miliSeconds = parseInt(miliSecondsHtml.textContent);
    timeObject.miliSeconds++;
    if (timeObject.miliSeconds >= 100) {
        miliSecondsHtml.textContent = "00";
        incrementSecond();
    }
    else if (timeObject.miliSeconds < 10)
        miliSecondsHtml.textContent = "0" + timeObject.miliSeconds;
    else miliSecondsHtml.textContent = timeObject.miliSeconds;
};

playButton.addEventListener("click", function () {
    if (!playStatus) {
        playStatus = !playStatus;
        playButton.classList.remove("fa", "fa-play");
        playButton.classList.add("fa", "fa-pause");
        resetButton.classList.add("hidden");
        timeLapseButton.classList.remove("hidden");
        playInterval = setInterval(startStopWatch, 10);
    }
    else {
        playButton.classList.remove("fa", "fa-pause");
        playButton.classList.add("fa", "fa-play");
        clearInterval(playInterval);
        resetButton.classList.remove("hidden");
        timeLapseButton.classList.add("hidden");
        playStatus = !playStatus;
    }
});

resetButton.addEventListener("click", function () {
    clearInterval(playInterval);
    playStatus = false;
    miliSecondsHtml.textContent = "00";
    secondsHtml.textContent = "00";
    minutesHtml.textContent = "00";
    hoursHtml.textContent = "00";
    playButton.classList.remove("fa", "fa-pause");
    playButton.classList.add("fa", "fa-play");
    hoursHtml.classList.add("hidden");
    hoursHtml.nextElementSibling.classList.add("hidden");
    while (timeLapseTable.firstChild) timeLapseTable.removeChild(timeLapseTable.firstChild);
    timeLapseTable.classList.add("hidden");
    timeLapseIndex = 0;
    differenceTimeObject.miliSeconds = 0;
    differenceTimeObject.seconds = 0;
    differenceTimeObject.minutes = 0;
    timeObject.miliSeconds = 0;
    timeObject.seconds = 0;
    timeObject.minutes = 0;
});

function setValue(value) {
    if (value < 10) return `0${value}`;
    return value.toString();
}

timeLapseButton.addEventListener("click", function () {
    var includeHours = hoursHtml.classList.contains("hidden");
    var currentTime = !includeHours ? setValue(timeObject.hours) + " : " + setValue(timeObject.minutes) + " : " + setValue(timeObject.seconds) + " : " + setValue(timeObject.miliSeconds) : setValue(timeObject.minutes) + " : " + setValue(timeObject.seconds) + " : " + setValue(timeObject.miliSeconds);
    ++timeLapseIndex;
    timeLapseTable.classList.remove("hidden");
    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");
    td1.textContent = timeLapseIndex < 10 ? "0" + timeLapseIndex : timeLapseIndex;
    if (timeLapseIndex === 1) {
        timeStamps.miliSeconds = parseInt(miliSecondsHtml.textContent);
        timeStamps.seconds = parseInt(secondsHtml.textContent);
        timeStamps.minutes = parseInt(minutesHtml.textContent);
        td2.textContent = "+ " + setValue(timeObject.minutes) + " : " + setValue(timeObject.seconds) + " : " + setValue(timeObject.miliSeconds);
    }
    else {
        td2.textContent = "+ " + setValue(Math.abs(parseInt(minutesHtml.textContent) - timeStamps.minutes)) + " : " + setValue(Math.abs(parseInt(secondsHtml.textContent) - timeStamps.seconds)) + " : " + setValue(Math.abs(parseInt(miliSecondsHtml.textContent) - timeStamps.miliSeconds));
        timeStamps.minutes = parseInt(minutesHtml.textContent);
        timeStamps.seconds = parseInt(secondsHtml.textContent);
        timeStamps.miliSeconds = parseInt(miliSecondsHtml.textContent);
    }
    td3.textContent = currentTime;
    td1.classList.add("border", "border-slate-500", "text-center");
    td2.classList.add("border", "border-slate-500", "text-center");
    td3.classList.add("border", "border-slate-500", "text-center");
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    timeLapseTable.prepend(tr);
});