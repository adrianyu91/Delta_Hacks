// var minutesLabel = document.getElementById("minutes");
// var secondsLabel = document.getElementById("seconds");
// var totalSeconds = 0;
// setInterval(setTime, 1000);

// function setTime()
// {
//     ++totalSeconds;
//     secondsLabel.innerHTML = pad(totalSeconds%60);
//     minutesLabel.innerHTML = pad(parseInt(totalSeconds/60));
// }

// function pad(val)
// {
//     var valString = val + "";
//     if(valString.length < 2)
//     {
//         return "0" + valString;
//     }
//     else
//     {
//         return valString;
//     }
// }

// setTime()

var timerVar = setInterval(countTimer, 1000);
var totalSeconds = 0;

function countTimer(){
    ++totalSeconds;

    var hour = Math.floor(totalSeconds/3600)
    var minute = Math.floor((totalSeconds - hour * 3600) / 60);
    var seconds = totalSeconds - (hour*360 + minute * 60);
    minute_str = minute;
    second_str = seconds;
    if (minute <= 9) {
        minute_str = "0" + minute_str;
    }
    if (seconds <= 9) {
        second_str = "0" + second_str;
    }

    document.getElementById("MyClockDisplay").innerHTML = minute_str + ":" + second_str;
}

countTimer();

