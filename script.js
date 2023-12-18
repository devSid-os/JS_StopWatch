const htmlTag = document.getElementsByTagName("html")[0];
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
    var timeLapseDiff;
    ++timeLapseIndex;
    timeLapseTable.classList.remove("hidden");

    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    const td2 = document.createElement("td");
    const td3 = document.createElement("td");

    td1.textContent = setValue(timeLapseIndex);
    td3.textContent = setValue(parseInt(currentTime / 60000)) + " : ";
    td3.textContent += setValue(parseInt((currentTime % 60000) / 1000)) + " : ";
    td3.textContent += setValue(parseInt(((currentTime % 60000) % 1000) / 10));

    if (timeLapseIndex === 1) {
        td2.textContent = td3.textContent;
    }
    else {
        timeLapseDiff = currentTime - lastTimeLapseValue;
        td2.textContent = setValue(parseInt(timeLapseDiff / 60000)) + " : ";
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