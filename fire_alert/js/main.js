const starts = document.getElementById("start_button");
const fireThere = document.getElementById("fire_button");
const fireThereNot = document.getElementById("notFire_button");
const button2s = document.querySelectorAll(".button2");
let startFlag = false;
let playingFlag = false;
let audioStopFlag = false;
let fire = false;
let logs = [];
let floors = [];
/*
 <LOG>
 [(LN),(EF),(EN),(LT),(LB),(LTBF),(LTBN),(TM)]
*/
let logProJ = {
   "LN" : {
      "01" : "正常",
      "02" : "異常",
      "03" : "検知",
      "04" : "不明"
   },
   "EN" : {
      "01" : "弁不良",
      "02" : "検知機不具合",
      "03" : "自動停止",
      "04" : "数値異常",
      "05" : "不明"
   },
   "LTBN" : {
      "01" : {
         "t" : "起動α",
         "m" : "手動起動を検知"
      },
      "02" : {
         "t" : "起動β",
         "m" : "非常起動動作を検知"
      },
      "03" : {
         "t" : "検知１",
         "m" : "火災移行を検知"
      },
      "04" : {
         "t" : "検知２",
         "m" : "非火災移行を検知"
      }
   }
}

// DATE FUNCTION
function timeTypeChanger(){
  const newD = new Date();
  const year = newD.getFullYear();
  const month = ("0" + (newD.getMonth() + 1)).slice(-2);
  const day = ("0" + newD.getDate()).slice(-2);
  const hour = ("0" + newD.getHours()).slice(-2);
  const minute = ("0" + newD.getMinutes()).slice(-2);
  const second = ("0" + newD.getSeconds()).slice(-2);
  const second1000 = ("00" + newD.getMilliseconds()).slice(-3);
  const typeC = year + "." + month + "." + day + " " + hour + ":" + minute + ":" + second + "." + second1000;
  return typeC;
}

//NOT NEED TO ANYTHING EVENTS
let logsSetArray = new Proxy(logs, {
  set: function(target, property, value) {
    console.log(`配列の ${property} が ${value} に変更されました。`);
    target[property] = value;
    const newData = logs[0]
    // ディスプレイ表示を更新
    const vLN = logProJ["LN"][newData[0]]
    const vEF = newData[1]
    let vEN = "/-/"
    if(vEF){
      vEN = logProJ["EN"][newData[2]]
    }
    const vLT = newData[3]
    const vLB = newData[4]
    const vLTBF = newData[5]
    let vLEBN_t = "/-/"
    let vLEBN_m = "/-/"
    if(vLTBF){
      vLTBN_t = logProJ["LTBN"][newData[6]]["t"]
      vLTBN_m = logProJ["LTBN"][newData[6]]["m"]
    }
    const vTM = newData[7]
    let ttl
    let body
    let time = vTM
    if(vEF){
      ttl = vLT
      body = vEN
    }else {
      if(vLTBF){
        ttl = vLT + "<" + vLTBN_t + ">"
        body = vLTBN_m
      }else {
        ttl = vLT
        body = vLB
      }
    }
    document.getElementById("log_display").innerHTML = "<span>" + ttl + "</span>" + "<span>" + time + "</span>" + "<span>" + body + "</span><br>"
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
    fetch('../audio/ac/' + audioFileName + ".mp3")
    .then(response => response.arrayBuffer())
    .then(buffer => audioContext.decodeAudioData(buffer))
    .then(audioBuffer => {
      playingFlag = true;
      const source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      source.loop = true;
      source.start();

      const interval = setInterval(() => {
        if(audioStopFlag){
          audioStopFlag = false;
          playingFlag = false;
          clearInterval(interval)
        }
      },1000)
    });
  }
}

starts.addEventListener("click" , () => {
  startFlag = true;
  floors = [];
  const newDATE = timeTypeChanger();
  logsSetArray.push(["03",0,"00","/-/","/-/",0,"02",newDATE])
  audioPlay(1,[]);
});

fireThere.addEventListener("click" , () => {
 if(startFlag && floors.length > 0){
    fire = true;
    audioStopFlag = false;
    const newDATE = timeTypeChanger();
    logsSetArray.push(["03",0,"00","/-/","/-/",0,"03",newDATE])
    audioPlay(2,[]);
 }
});

fireThereNot.addEventListener("click" , () => {
 if(startFlag && floors.length > 0){
    fire = true;
    audioStopFlag = false;
    const newDATE = timeTypeChanger();
    logsSetArray.push(["03",0,"00","/-/","/-/",0,"04",newDATE])
    audioPlay(3,[]);
 }
});

button2s.forEach(element => {
  element.addEventListener("click", function() {
    const floorName = element.dataset.floor
    if(!floors.includes(floorName)){
      floors.push()
    }else {
      floors.splice(floors.indexOf(floorName),floors.indexOf(floorName) + 1)
    }
  });
});
