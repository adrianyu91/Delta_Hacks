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

    document.getElementById("MyClockDisplay").innerHTML = minute + ":" + seconds;
}

// countTimer();

function changeCol(){
fetch('/toofast')
  .then(response => response.text())
  .then(data =>{
       console.log(data) 
       if (data === "True")
       {
           document.body.style.backgroundColor = "red"
       }
       else{
           document.body.style.backgroundColor = "green"
       }
    })
  ;  
}
setInterval(changeCol, 200)
alert("testing")