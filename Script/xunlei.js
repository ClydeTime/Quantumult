/******************************
脚本功能：迅雷-你的专享云盘+解锁VIP
软件版本：1.5.8
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************
https://xluser-ssl.xunlei.com/xluser.core.login/v3/getuserinfo url script-response-body https://github.com/ClydeTime/Quantumult/blob/main/Script/xunlei.js
hostname = xluser-ssl.xunlei.com
*******************************/
var body= JSON["parse"]($response["body"]);
var vipList= {};
vipList["expireDate"] = "20991231";
vipList["isAutoDeduct"] = "0";
vipList["isVip"] = "1";
vipList["isYear"] = "1";
vipList["payId"] = "0";
vipList["payName"] = "---";
vipList["register"] = "0";
vipList["vasid"] = "2";
vipList["vasType"] = "5";
vipList["vipDayGrow"] = "20";
vipList["vipGrow"] = "840";
vipList["vipLevel"] = "7";
body["vipList"] = [vipList];
$done({ body: JSON["stringify"](body) });
