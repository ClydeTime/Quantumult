/******************************
脚本功能：WPS Office+解锁VIP
软件版本：11.29.2
更新时间：2022-9-28
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

^https?:\/\/(client|userinfo)\.docer\.wps\.cn\/(android\/mb\/buy|user\/v1\/vip\_dl\_times) url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wpsDocer_times.js

[mitm]
hostname = *.docer.wps.cn
**************************/

const url = $request.url;
const method = $request.method;
if (!$response.body) {
    // 有undefined的情况
    console.log("body is undefined!");
    $done({});
}
let body = JSON.parse($response.body);
const buy = "/buy";
const userinfo = "/userinfo";

if (url["indexOf"](buy) != -1 && method == "GET") {
	body.data.is_docer_vip = 1;
	body.data.free_times = 300;
}
if (url["indexOf"](userinfo) != -1 && method == "GET") {
	body.data.total = 300;
	body.data.remain = 300;
}

$done({ body: JSON.stringify(body) });
