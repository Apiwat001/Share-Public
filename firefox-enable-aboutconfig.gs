เปิด Firefox พิมพ์ตรง URL = about:config
ค้นหาที่ช่องว่าง พิมพ์ = dom.event.clipboardevents.enabled
ดับเบิ้ลคลิก เพื่อเปลี่ยน ค่า จากเดิมคือ true ให้เปลี่ยนเป็นค่า false
กด F12 ให้วาง Code ด้านล่างนี้ ไปยัง Console.

var allowPaste = function(e){
  e.stopImmediatePropagation();
  return true;
};
document.addEventListener('paste', allowPaste, true);
