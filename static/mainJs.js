// var timerVar = setInterval(countTimer, 10000);
var totalSeconds = 0;
var check = false;

function countTimer(){
    if (check) {
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
}

function start(x) {
    
    if (x == true) {

        document.getElementById("StartBtn").onclick = function() {
            document.getElementById("StartBtn").disabled = true;
            document.getElementById("StopBtn").disabled = false;
            check = true;
            if (totalSeconds == 0) {
                var timerVar = setInterval(this.countTimer, 1000);
            }
            totalSeconds = 0;
        }
        document.getElementById("StopBtn").onclick = function() {
            document.getElementById("StartBtn").disabled = false;
            document.getElementById("StopBtn").disabled = true;
            check = false;
        }

        document.getElementById("StartBtn").disabled = true;
        document.getElementById("StopBtn").disabled = false;
        check = true;
        if (totalSeconds == 0) {
            var timerVar = setInterval(this.countTimer, 1000);
        }
        totalSeconds = 0;
    }
    else {
        document.getElementById("StartBtn").onclick = function() {
            document.getElementById("StartBtn").disabled = true;
            document.getElementById("StopBtn").disabled = false;
            check = true;
            if (totalSeconds == 0) {
                var timerVar = setInterval(this.countTimer, 1000);
            }
            totalSeconds = 0;
        }
        document.getElementById("StopBtn").onclick = function() {
            document.getElementById("StartBtn").disabled = false;
            document.getElementById("StopBtn").disabled = true;
            check = false;
        }
        check = false
        if (totalSeconds == 0) {
            var timerVar = setInterval(this.countTimer, 1000);
        }
        totalSeconds = 0;
        document.getElementById("StartBtn").disabled = false;
        document.getElementById("StopBtn").disabled = true;
    }
}

function revealBox(){
    if (document.getElementById("instrucBox").style.display == "block"){
        document.getElementById("instrucBox").style.display = "none";
    }
    else{
        document.getElementById("instrucBox").style.display = "block";

    }


}

// countTimer();

function changeCol(){
    if (check) {
        fetch('/toofast')
        .then(response => response.text())
        .then(data =>{
            if (data === "True")
            {
                document.body.style.backgroundColor = "red"
            }
            else{
                document.body.style.backgroundColor = "green"
            }
            })
        ;  
    } else {
        document.body.style.backgroundColor = "#447EC2";
    }
}
setInterval(changeCol, 50)