const starts = document.getElementById("start_button");
const fireThere = document.getElementById("fire_button");
const fireThereNot = document.getElementById("noFire_button");
const button2s = document.getElementsByclassname("Button2");
let startFlag = false;

function audioPlay(num,array){
  const audioFileArray = ["startsVoise"]
  let audioFileName = ""
  if(num){
    audioFileName = audioFileArray[num - 1]
  }
}

starts.addEventListener("click" , () => {
  startFlag = true;
  audioPlay(1,[]);
});
