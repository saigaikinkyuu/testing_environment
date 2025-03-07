const starts = document.getElementById("start_button");
const fireThere = document.getElementById("fire_button");
const fireThereNot = document.getElementById("noFire_button");
const button2s = document.getElementsByclassname("Button2");
let startFlag = false;
let logs = [];
let playingFlag = false;
let audioStopFlag = false;
let standby = false;
/*
 <LOG>
 [(LN),(EF),(EN),(LT),(LB),(LTBF),(LTBN),(TM)]
*/

// DATE FUNCTION
function timeTypeChanger(){
  const newD = new Date();
  const year = newD.getFullYear();
  const month = ("0" + (newD.getMonth() + 1)).slice(-2);
  const day = ("0" + newD.getDate()).slice(-2);
  const hour = ("0" + newD.getHours()).slice(-2);
  const minute = ("0" + newD.getMinutes()).slice(-2);
  const second = ("0" + newD.getSeconds()).slice(-2);
  const second1000 = newD.getMilliseconds();
  const typeC = year + "." + month + "." + day + " " + hour + ":" + minute + ":" + second + "." + (second1000 - (second * 1000));
  return typeC;
}

//NOT NEED TO ANYTHING EVENTS
let logsSetArray = new Proxy(logs, {
  set: function(target, property, value) {
    console.log(`配列の ${property} が ${value} に変更されました。`);
    target[property] = value;
    // ディスプレイ表示を更新
    return true;
  },
  deleteProperty: function(target, property) {
    console.log(`配列の ${property} が削除されました。`);
    delete target[property];
    // ディスプレイ表示を更新
    return true;
  }
});

(() => {
  const newDATE = timeTypeChanger();
  logsSetArray.push(["01",0,"00","/-/","/-/",0,"01",newDATE])
})()

//NEED TO ADMIRE EVENT
function audioPlay(num,array){
  const audioFileArray = ["startsVoise"]
  let audioFileName = ""
  if(num){
    audioFileName = audioFileArray[num - 1]
  }

  if(audioFileName){
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    fetch('../audio/ac/' + audioFileName)
    .then(response => response.arrayBuffer())
    .then(buffer => audioContext.decodeAudioData(buffer))
    .then(audioBuffer => {
      playingFlag = true;
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.loop = true;
      source.start();

      setInterval(() => {
        if(audioStopFlag){
          audioStopFlag = false;
          playingFlag = false;
        }
      },1000)
    });
  }
}

starts.addEventListener("click" , () => {
  startFlag = true;
  const newDATE = timeTypeChanger();
  logs.push(["02",0,"00","/-/","/-/",0,"02",newDATE])
  audioPlay(1,[]);
});

fireThere.addEventListener("click" , () => {
 if(startFlag && !standby){
    standby = true;
    audioPlay(2,[]);
 }
});
