/******************************
脚本功能：WPS解锁稻壳会员
软件版本：11.29.2
更新时间：2022-09-22
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > WPS解锁稻壳会员
^https?:\/\/.+\.(docer.)?wps.cn/download\/v1\/ios url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wps_download.js

[mitm] 
hostname = *.docer.wps.cn
*******************************/

var vip_user = [
  "wps_sid=V02SaEzMoENCwCQNeTIcUVvchy9ICc400a321c51002bf5687d",
  "Mozilla/5.0 (iPad; CPU OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148",
  "223.5.5.5"
];
var modifiedHeaders = $request["headers"];
modifiedHeaders["Cookie"] = vip_user[0];
modifiedHeaders["User-Agent"] = vip_user[1];
modifiedHeaders["IP"] = vip_user[2];
$done({ headers: modifiedHeaders });
