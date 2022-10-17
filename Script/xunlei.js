/******************************
脚本功能：迅雷-你的专享云盘+解锁VIP
软件版本：1.5.8
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

^https:\/\/xluser-ssl\.xunlei\.com\/xluser\.core\.login\/v\d\/(getuserinfo|loginkey) url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/xunlei.js

[mitm]

hostname = xluser-ssl.xunlei.com

*******************************/
var body = JSON["parse"]($response["body"]);
body.vipList = [{
	isAutoDeduct: "0",
	isYear: "1",
	payId: "0",
	isVip: "1",
	vipLevel: "7",
	register: "0",
	expireDate: "20991231",
	payName: "---",
	vipDayGrow: "20",
	vipGrow: "840",
	vasid: "2",
	vasType: "5"
}];
$done({ body: JSON["stringify"](body) });
