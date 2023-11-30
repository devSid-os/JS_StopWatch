const playButton = document.getElementById("playButton");
var playStatus = false;
var miliSecondsHtml = document.getElementById("miliSeconds");
var secondsHtml = document.getElementById("seconds");
var minutesHtml = document.getElementById("minutes");
var timeObject = {
    miliSeconds: 0,
    seconds: 0,
    minutes: 0
};
var playInterval;

function incrementMinute() {
    timeObject.minutes = parseInt(minutesHtml.textContent);
    timeObject.minutes++;
    if (timeObject.minutes < 10) minutesHtml.textContent = "0" + timeObject.minutes;
    else minutesHtml.textContent = timeObject.minutes;
}

function incrementSecond() {
    timeObject.seconds = parseInt(secondsHtml.textContent);
    timeObject.seconds++;
    if (timeObject.seconds >= 60) {
        secondsHtml.textContent = "00";
        incrementMinute();
    }
    else if (timeObject.seconds < 10) secondsHtml.textContent = "0" + timeObject.seconds;
    else secondsHtml.textContent = timeObject.seconds;
}

playButton.addEventListener("click", function () {
    if (!playStatus) {
        playStatus = !playStatus;
        playInterval = setInterval(() => {
            timeObject.miliSeconds = parseInt(miliSecondsHtml.textContent);
            timeObject.miliSeconds++;
            if (timeObject.miliSeconds >= 100) {
                miliSecondsHtml.textContent = "00";
                incrementSecond();
            }
            else if (timeObject.miliSeconds < 10)
                miliSecondsHtml.textContent = "0" + timeObject.miliSeconds;
            else miliSecondsHtml.textContent = timeObject.miliSeconds;

        }, 10);
    }
    else {
        clearInterval(playInterval);
        playStatus = !playStatus;
    }
});