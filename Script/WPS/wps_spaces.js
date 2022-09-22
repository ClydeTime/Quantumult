/******************************
脚本功能：WPS Office+解锁VIP
软件版本：11.26.0
更新时间：2022-9-22
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
^https?:\/\/drive\.wps\.cn\/api\/v3\/spaces url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wps_spaces.js

[mitm]
hostname = drive.wps.cn
**************************/

var body = JSON.parse($response.body);
body.total = 391915765760;
$done({ body: JSON.stringify(body) });
