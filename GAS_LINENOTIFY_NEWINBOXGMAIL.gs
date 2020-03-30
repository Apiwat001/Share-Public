// แจ้ง LINE ของ Gmail ตามผลการค้นหา

var FindSubject = 'Subject:(Test) : ';

function getMail(){

  // ค้นหาและดึงกระทู้ที่มีหัวเรื่องที่ระบุ
  
  var myThreads = GmailApp.search(FindSubject, 0, 10);
  
  // รับเมลจาก Thread และ Store ใน Array
  var myMessages = GmailApp.getMessagesForThreads(myThreads);

  for(var i in myMessages){
    
    for(var j in myMessages[i]){

      // ประมวลผลข้อความที่ "ไม่" ติดดาวเท่านั้น"  
      if(!myMessages[i][j].isStarred()){

        var strDate　=　myMessages[i][j].getDate();
        var strSubject　=　myMessages[i][j].getSubject();
        var strMessage　=　myMessages[i][j].getPlainBody().slice(0,200);

      // ส่งข้อความถึง LINE
        sendLine(strDate,strSubject,strMessage);

        // ติดดาวข้อความที่ประมวลผล ไปแล้วก่อนหน้านี้
        myMessages[i][j].star();
        
      }
    }
  }
}

function sendLine(strDate,strSubject,strMessage){

  // โทเค็นเพื่อส่งไปที่ Line
  var strToken = "Line Token ที่ได้จาก Line Notify";
  var options =
   {
     "method"  : "post",
     "payload" : "message=" + strDate + '\n' + "\หัวข้อ : " + strSubject + '\n' + "\ข้อความ : " + strMessage,
     "headers" : {"Authorization" : "Bearer "+ strToken}

   };

   UrlFetchApp.fetch("https://notify-api.line.me/api/notify",options);
}
