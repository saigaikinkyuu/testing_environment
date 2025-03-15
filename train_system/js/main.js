const log_dis_ck = document.getElementById("log_1");
const log_dis_em = document.getElementById("log_2");

//DATE FUNCTION
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

// ONLOAD
(() => {
  //setInterval(() => {
    let d = timeTypeChanger();
    log_dis_ck.innerHTML += "<span class='log_ttl'>TESTING FUNC</span><span class='log_time'>" + d + "</span><span class='log_body'>THIS IS TESTING.</span><br>";
    log_dis_em.innerHTML += "<span class='log_ttl'>TESTING FUNC</span><span class='log_time'>" + d + "</span><span class='log_body'>THIS IS TESTING.</span><br>";
    if (log_dis_ck.scrollHeight > log_dis_ck.clientHeight) {
      log_dis_ck.scrollTop = log_dis_ck.scrollHeight;
    }
    if (log_dis_em.scrollHeight > log_dis_em.clientHeight) {
      log_dis_em.scrollTop = log_dis_em.scrollHeight;
    }
  //},1000)
})()
