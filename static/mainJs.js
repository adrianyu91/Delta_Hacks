// var timerVar = setInterval(countTimer, 10000);
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

function start(x){

    if (x==true){

        document.getElementById("StartBtn").onclick = function() {
            this.disabled = true;
        }
        document.getElementById("StopBtn").onclick = function() {
            this.disabled = false;
        }

    var timerVar = setInterval(countTimer, 1000);
    }
    else if(x==false){
         document.getElementById("StartBtn").onclick = function() {
             this.disabled = false;
         }
        document.getElementById("StopBtn").onclick = function() {
          this.disabled = true;
    }
    }
}

// countTimer();

// function changeCol(){
// fetch('/toofast')
//   .then(response => response.text())
//   .then(data =>{
//        if (data === "True")
//        {
//            document.body.style.backgroundColor = "red"
//        }
//        else{
//            document.body.style.backgroundColor = "green"
//        }
//     })
//   ;  
// }
// setInterval(changeCol, 50)