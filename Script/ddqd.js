/******************************

脚本功能：滴答清单+解锁VIP
更新时间：10.19

*******************************

[rewrite_local]

^https:\/\/dida365\.com\/api\/v2\/user\/status url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/ddqd.js

[mitm] 

hostname = dida365.com

*******************************/

var body = JSON.parse($response.body);
body["proEndDate"] = "2099-12-31T23:59:59.000+0000";
body["needSubscribe"] = false;
body["pro"] = true;
$done({ body: JSON.stringify(body) });
