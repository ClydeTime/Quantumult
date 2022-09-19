/******************************

脚本功能：扫描全能王-手机扫描仪+解锁VIP
更新时间：2022-9-19
By MartinsKing
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/smqnw.js
^https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\?.+\%(7CCamScanner_Pdfword%) url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/smqnw_2.js

[mitm]

hostname = ap*.intsig.net

**************************/

var body = JSON.parse($response.body);
body["data"] = {
    fax_balance : "1",
    used_points : "0",
    cert_mode_balance : 0,
    login_ocr_balance : "10",
    points : "99999",
    psnl_vip_property : {
      product_id : "com.intsig.camscanner.premiums.oneyear.autorenewable.svip.low",
      initial_tm : "1662040800",
      svip : 1,
      auto_renewal : true,
      ms_first_pay : 0,
      pending : 0,
      group2_paid : 0,
      inherited_flag : 0,
      nxt_renew_tm : "9915126887",
      level_info : {
        level : 1,
        days : 1,
        end_days : 30
      },
      group1_paid : 1,
      ys_first_pay : 0,
      renew_type : "year",
      expiry : 4102415999,
      grade : 2,
      renew_method : "appstore",
      last_payment_method : "appstore"
    },
    pdfword_balance : "1",
    bookmode_balance : 999,
    immt_expy_points : "0",
    ocr_balance : 1000,
    no_login_ocr_balance : "2",
    server_time : body.data.server_time.toString(),
    CamScanner_RoadMap : "0"
};

$done({ body: JSON.stringify(body) });
