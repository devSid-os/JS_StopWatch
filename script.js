const htmlTag = document.getElementsByTagName("html")[0];
const themeButton = document.getElementById("themeButton");
const playButton = document.getElementById("playButton");
const resetButton = document.getElementById("resetButton");
const timeLapseButton = document.getElementById("timeLapse");
const miliSecondsHtml = document.getElementById("miliSeconds");
const secondsHtml = document.getElementById("seconds");
const minutesHtml = document.getElementById("minutes");
const hoursHtml = document.getElementById("hours");
const timeLapseTable = document.getElementById("timeLapseTable");
var playStatus = false;
var timeObject = {
    miliSeconds: 0,
    seconds: 0,
    minutes: 0,
    hours: 0
};
var playInterval;
var timeLapseIndex = 0;
var lastTimeLapseValue;
var currentTime = 0;

function setValue(value, temp = false) {
    if (value >= 60 && temp) value = 0;
    if (value < 10) return `0${value}`;
    return value.toString();
}

function incrementHour() {
    hoursHtml.textContent = setValue(++timeObject.hours);
};

function incrementMinute() {
    ++timeObject.minutes;
    if (timeObject.minutes >= 60) {
        hoursHtml.classList.remove("hidden");
        timeObject.minutes = 0;
        minutesHtml.textContent = "00";
        incrementHour();
    }
    else minutesHtml.textContent = setValue(timeObject.minutes);
};

function incrementSecond() {
    ++timeObject.seconds;
    if (timeObject.seconds >= 60) {
        timeObject.seconds = 0;
        seconds.textContent = "00";
        incrementMinute();
    }
    else secondsHtml.textContent = setValue(timeObject.seconds);
};

function startStopWatch() {
    currentTime += 10;
    ++timeObject.miliSeconds;
    if (timeObject.miliSeconds >= 100) {
        timeObject.miliSeconds = 0;
        miliSecondsHtml.textContent = "00";
        incrementSecond();
    }
    else miliSecondsHtml.textContent = setValue(timeObject.miliSeconds);
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
    currentTime = 0;
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
    timeObject.miliSeconds = 0;
    timeObject.seconds = 0;
    timeObject.minutes = 0;
    timeObject.hours = 0;
});

timeLapseButton.addEventListener("click", function () {

    var includeHours = hoursHtml.classList.contains("hidden");
    ++timeLapseIndex;
    timeLapseTable.classList.remove("hidden");

    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    td1.textContent = setValue(timeLapseIndex);
    td3.textContent = !includeHours ? setValue(parseInt(currentTime / 60000 / 60)) : "";
    td3.textContent += setValue(parseInt(currentTime / 60000)) + " : ";
    td3.textContent += setValue(parseInt((currentTime % 60000) / 1000)) + " : ";
    td3.textContent += setValue(parseInt(((currentTime % 60000) % 1000) / 10));

    if (timeLapseIndex === 1) {
        td2.textContent = td3.textContent;
    }
    else {
        var timeLapseDiff = currentTime - lastTimeLapseValue;
        if (timeLapseDiff >= 3600000) {
            td2.textContent = setValue(parseInt(timeLapseButton / 60000 / 60));
        }
        td2.textContent += setValue(parseInt(timeLapseDiff / 60000)) + " : ";
        td2.textContent += setValue(parseInt((timeLapseDiff % 60000) / 1000)) + " : ";
        td2.textContent += setValue(parseInt(((timeLapseDiff % 60000) % 1000) / 10));
    }
    lastTimeLapseValue = currentTime;

    td1.classList.add("border", "border-slate-500", "text-sm", "text-center", "md:text-md");
    td2.classList.add("border", "border-slate-500", "text-sm", "text-center", "md:text-md");
    td3.classList.add("border", "border-slate-500", "text-sm", "text-center", "md:text-md");
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    timeLapseTable.prepend(tr);
});

themeButton.addEventListener("click", function () {
    if (htmlTag.classList.contains("dark")) {
        htmlTag.classList.remove("dark");
        document.querySelector("#modePath").setAttribute("d", "M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278M4.858 1.311A7.269 7.269 0 0 0 1.025 7.71c0 4.02 3.279 7.276 7.319 7.276a7.316 7.316 0 0 0 5.205-2.162c-.337.042-.68.063-1.029.063-4.61 0-8.343-3.714-8.343-8.29 0-1.167.242-2.278.681-3.286z");
    }
    else {
        htmlTag.classList.add("dark");
        document.querySelector("#modePath").setAttribute("d", "M8 11a3 3 0 1 1 0-6 3 3 0 0 1 0 6m0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8M8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0m0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13m8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5M3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8m10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0m-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707M4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z");
    }
});