function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("order");
    
    // 2. สร้าง Order ID (ตามวิดีโอต้นฉบับจะเรียงจากบนลงล่าง หรือใช้ UUID)
    var orderId = "ORD-" + Utilities.getUuid().substring(0, 8).toUpperCase(); 
    
    // 3. จัดการฟอร์แมตรายละเอียดออเดอร์สินค้า
    var formattedOrderDetails = data.orderDetails.map(function(item) {
      return item.name + "(" + item.price + "฿)-QTY: " + item.quantity;
    }).join(', ');

    // 4. บันทึกลงตารางตามลำดับคอลัมน์ใน Sheet "order" (ใช้ Array [ ])
    // ลำดับคอลัมน์: Order ID, UUID (LINE User ID), Name, Phone, OrderDetails
    sheet.appendRow([
      orderId,
      data.lineUid,
      data.name,
      "'" + data.telephone, // ใส่ตัวเขี้ยว ' ด้านหน้าเพื่อป้องกันไม่ให้เลข 0 ตัวแรกของเบอร์โทรหาย
      formattedOrderDetails
    ]);
    
    // ส่งข้อความกลับไปบอกหน้าบ้าน (Line LIFF) ว่าบันทึกสำเร็จ
    return ContentService.createTextOutput(JSON.stringify({ "status": "success" }))
                         .setMimeType(ContentService.MimeType.JSON);
                         
  } catch(error) {
    // กรณีระบบทำงานผิดพลาด ให้ส่งข้อความแจ้ง Error กลับไป
    return ContentService.createTextOutput(JSON.stringify({ "status": "error", "message": error.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

