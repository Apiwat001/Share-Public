// Line Token
var lineToken = "Line Token ที่ได้จาก Line Notify";

//ตั้งเวลาเพื่อรับอีเมลใหม่ในปัจจุบัน # ควรตั้ง Trigger ให้ตรงกับตรงนี้ !!
var get_interval = 1;

function send_line(Me){
  var payload = {'message' :   Me};
  var options ={
        "method"  : "post",
        "payload" : payload,
        "headers" : {"Authorization" : "Bearer "+ lineToken}  
      };
    UrlFetchApp.fetch("https://notify-api.line.me/api/notify", options);
}

function fetchContactMail() {
  //ช่วงเวลา
  var now_time= Math.floor(new Date().getTime() / 1000) ;
  var time_term = now_time - (60 * get_interval);

  //คุณสมบัติการค้นหา
  var strTerms = '(is:unread after:'+ time_term + ')';

  //Inbox ใน Gmail 
  var myThreads = GmailApp.search(strTerms);
  var myMsgs = GmailApp.getMessagesForThreads(myThreads);
  var valMsgs = [];
  for(var i = 0; i < myMsgs.length;i++){
    valMsgs[i] = "\n【Date】: " + myMsgs[i].slice(-1)[0].getDate()　
                  + "\n【From】: " + myMsgs[i].slice(-1)[0].getFrom()
                  + "\n【Subject】: " + myMsgs[i].slice(-1)[0].getSubject()
                  + "\n【Body】: " + myMsgs[i].slice(-1)[0].getPlainBody().slice(0,200); 
    // ทำเครื่องหมายข้อความว่าอ่านแล้ว ให้เอา Comment ด้านล่างออก
     myMsgs[i][0].markRead(); 
  }

  return valMsgs;

}

function main() {
  new_Me = fetchContactMail()
  if(new_Me.length > 0){
    for(var i = new_Me.length-1; i >= 0; i--){
      send_line(new_Me[i])
    }
  }
}
