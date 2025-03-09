const starts = document.getElementById("start_button");
const fireThere = document.getElementById("fire_button");
const fireThereNot = document.getElementById("notFire_button");
const stopDetect = document.getElementById("stop_detect");
const button2s = document.querySelectorAll(".floor_button");
let startFlag = false;
let playingFlag = false;
let audioStopFlag = false;
let fire = false;
let logs = [];
let floors = [];
let system = false;
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
let source = null;
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
      "00" : {
         "t" : "SYSTEM",
         "m" : "SYSTEM STARTED!"
      },
      "99" : {
         "t" : "SYSTEM",
         "m" : "SYSTEM FINISHED!"
      },
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
      },
      "05" : {
         "t" : "起動・感知",
         "m" : "放送階感知を検知"
      },
      "06" : {
         "t" : "復位",
         "m" : "検知情報を正常に復位"
      },
      "07" : {
         "t" : "検知３",
         "m" : "火災システム終了を検知"
      },
      "08" : {
         "t" : "検知３",
         "m" : "誘導灯の終了を検知"
      },
      "09" : {
         "t" : "検知３",
         "m" : "放送階のリセットを検知"
      }
   }
}

// DATE FUNCTION
function timeTypeChanger(){
  if(!system) return
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
    if(property === "length") return true
    target[property] = value;
    const newData = logs[logs.length - 1]
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
    let vLTBN_t = "/-/"
    let vLTBN_m = "/-/"
    if(!vLTBF){
      vLTBN_t = logProJ["LTBN"][newData[6]]["t"]
      vLTBN_m = logProJ["LTBN"][newData[6]]["m"]
    }
    const vTM = newData[7]
    let ttl
    let body
    let time = vTM
    let message_array = [];
    if(vEF){
      message_array.push("<span style='color: red; margin-right: 15px;' id='log_ttl_" + logs.length + "'>")
      message_array.push(vLT)
      message_array.push("</span>")
      message_array.push("<span style='color: white; margin-right: 15px;' id='log_time_" + logs.length + "'>")
      message_array.push(time)
      message_array.push("</span>")
      message_array.push("<span style='color: red;' id='log_body_" + logs.length + "'>")
      message_array.push(vEN)
      message_array.push("</span><br>")
      ttl = "<span style='color: red; margin-right: 15px;'>" + vLT
      body = "<span style='color: red;'>" + vEN
    }else {
      if(!vLTBF){
        message_array.push("<span style='color: white; margin-right: 15px;' id='log_ttl_" + logs.length + "'>")
        message_array.push(vLN + "<" + vLTBN_t + ">")
        message_array.push("</span>")
        message_array.push("<span style='color: white; margin-right: 15px;' id='log_time_" + logs.length + "'>")
        message_array.push(time)
        message_array.push("</span>")
        message_array.push("<span style='color: white;' id='log_body_" + logs.length + "'>")
        message_array.push(vLTBN_m)
        message_array.push("</span><br>")
        ttl = "<span style='color: white; margin-right: 15px;'>" + vLN + "<" + vLTBN_t + ">"
        body = "<span style='color: white;'>" + vLTBN_m
      }else {
        message_array.push("<span style='color: white; margin-right: 15px;' id='log_ttl_" + logs.length + "'>")
        message_array.push(vLT)
        message_array.push("</span>")
        message_array.push("<span style='color: white; margin-right: 15px;' id='log_time_" + logs.length + "'>")
        message_array.push(time)
        message_array.push("</span>")
        message_array.push("<span style='color: white;' id='log_body_" + logs.length + "'>")
        message_array.push(vLB)
        message_array.push("</span><br>")
        ttl = "<span style='color: white; margin-right: 15px;'>" + vLT
        body = "<span style='color: white;'>" + vLB
      }
    }
    const message = ttl + "</span>" + "<span style='color: white; margin-right: 15px;'>" + time + "</span>" + body + "</span><br>"
    if((document.getElementById("log_display").innerHTML).includes(message)) return true
    document.getElementById("log_display").innerHTML = (document.getElementById("log_display").innerHTML).replace('<input type="text" id="log_terminal">',"")
    document.getElementById("log_display").innerHTML += message_array[0] + message_array[2]
    document.getElementById("log_display").innerHTML += message_array[3] + message_array[5]
    document.getElementById("log_display").innerHTML += message_array[6] + message_array[8]
    let element_id_name = ["log_ttl_","log_time_","log_body_"]
    for(let i = 0;i < 3;i++){
      let t = 1 + ( i * 3 );
      for(let u = 0;u<message_array[t].length;u++){
        if((document.getElementById(element_id_name[i] + logs.length).innerHTML).includes(message_array[t])) break
        setTimeout(() => {
          document.getElementById(element_id_name[i] + logs.length).innerHTML += message_array[t][u];
        },1000)
      }
    }
    document.getElementById("log_display").innerHTML += '<input type="text" id="log_terminal">';
    inputTerminal()
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
  system = true;
  const newDATE = timeTypeChanger();
  logsSetArray.push(["01",0,"00","/-/","/-/",0,"00",newDATE])
})()

//NEED TO ADMIRE EVENT
function audioPlay(num,array){
  if(!system) return
  const audioFileArray = ["startsVoise","一般①","誤報①","感知_1","感知_2","感知_3","感知_4"]
  let audioFileName = ""
  if(num){
    audioFileName = audioFileArray[num - 1]
  }

  if(audioFileName){
    if(playingFlag){
      source.stop();
      playingFlag = false;
    }
    fetch('../fire_alert/audio/ac/' + audioFileName + ".mp3")
    .then(response => response.arrayBuffer())
    .then(buffer => audioContext.decodeAudioData(buffer))
    .then(audioBuffer => {
      playingFlag = true;
      source = audioContext.createBufferSource();
      source.buffer = audioBuffer;
      source.connect(audioContext.destination);
      if(num !== 1){
        source.loop = true;
      }else {
        source.loop = false;
      }
      source.start();
    });
  }
}

starts.addEventListener("click" , () => {
  if(!system) return
  startFlag = true;
  floors = [];
  document.getElementById("ttlPage").style.color = "red"
  const newDATE = timeTypeChanger();
  logsSetArray.push(["03",0,"00","/-/","/-/",0,"02",newDATE])
  audioPlay(1,[]);
});

fireThere.addEventListener("click" , () => {
 if(!system) return
 if(startFlag && floors.length > 0){
    fire = true;
    source.stop();
    playingFlag = false;
    document.getElementById("ttlPage").style.color = "red"
    const newDATE = timeTypeChanger();
    logsSetArray.push(["03",0,"00","/-/","/-/",0,"03",newDATE])
    audioPlay(2,[]);
 }
});

fireThereNot.addEventListener("click" , () => {
 if(!system) return
 if(startFlag && floors.length > 0){
    fire = false;
    source.stop();
    playingFlag = false;
    document.getElementById("ttlPage").style.color = "red"
    const newDATE = timeTypeChanger();
    logsSetArray.push(["03",0,"00","/-/","/-/",0,"04",newDATE])
    audioPlay(3,[]);
 }
});

button2s.forEach(element => {
 if(!system) return
  element.addEventListener("click", function() {
    const floorName = element.dataset.floor
    const newDATE = timeTypeChanger();
    if(floors.length > 0 && !floors.includes(floorName)) return
    if(!floors.includes(floorName)){
      floors.push(floorName)
      logsSetArray.push(["03",0,"00","/-/","/-/",0,"05",newDATE])
      audioPlay((Number(floorName) + 3),[]);
    }else {
      floors.splice(floors.indexOf(floorName),floors.indexOf(floorName) + 1)
      source.stop();
    }
  });
});

stopDetect.addEventListener("click" , () => {
 if(!system) return
 if(startFlag && floors.length > 0){
    fire = false;
    source.stop();
    playingFlag = false;
    document.getElementById("ttlPage").style.color = "black"
    floors = [];
    if(fire){
      logsSetArray.push(["03",0,"00","/-/","/-/",0,"05",newDATE])
    }
    const newDATE = timeTypeChanger();
    setTimeout(() => {
      logsSetArray.push(["03",0,"00","/-/","/-/",0,"07",newDATE])
      setTimeout(() => {
        logsSetArray.push(["03",0,"00","/-/","/-/",0,"08",newDATE])
        setTimeout(() => {
          logsSetArray.push(["03",0,"00","/-/","/-/",0,"09",newDATE])
          setTimeout(() => {
            logsSetArray.push(["01",0,"00","/-/","/-/",0,"06",newDATE])
          },1000)
        },1000)
      },1000)
    },1000)
 }
});


function inputTerminal(){
  const logTerminal = document.getElementById('log_terminal');
  logTerminal.value = ">"
  logTerminal.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
      const newDATE = timeTypeChanger();
      const subLog = (logTerminal.value).replace(">","")
      if(subLog === "togle training"){
      }else if(subLog === "togle bell"){
        //
      }else if(subLog === "togle light"){
        //
      }else if(subLog === "system finish"){
        system = false;
        logsSetArray.push(["01",0,"00","/-/","/-/",0,"99",newDATE])
      }else if(subLog === "system start"){
        system = true;
        logsSetArray.push(["01",0,"00","/-/","/-/",0,"00",newDATE])
      }
    }
  });
}
