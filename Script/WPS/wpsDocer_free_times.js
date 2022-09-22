/******************************
脚本功能：WPS Office+解锁VIP
软件版本：11.26.0
更新时间：2022-9-22
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]
^https?:\/\/client\.docer\.wps\.cn\/android\/mb\/buy_info url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wpsDocer_free_times.js

[mitm]
hostname = *.docer.wps.cn
**************************/

var body = JSON.parse($response.body);
body.data.is_docer_vip = 1;
body.data.free_times = 300;
$done({ body: JSON.stringify(obj) });
