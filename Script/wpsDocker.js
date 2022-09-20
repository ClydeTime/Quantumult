/******************************
脚本功能：WPS解锁稻壳会员
软件版本：11.29.2
更新时间：2022-09-20
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]
# > WPS解锁稻壳会员
^https?:\/\/.+\.(docer.)?wps.cn\/(user\/v1\/vip|android\/mb\/buy|download\/v1\/ios|partner\/invoke\/usable|(api|rank)\/v1(\/mobile\/mb)?\/detail) url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/wpsDocker.js

[mitm] 
hostname = *.docer.wps.cn, vipapi.wps.cn

*******************************/

var vip_user = [
  "wps_sid=V02S23O9y69VRf31ohDvD_IKBM9-8Os00a10ef0f002bf5687d;wpsua=V1BTVUEvMS4wKGlvcy1vZmZpY2U6MTEuMjkuMjEyMjA1NztpUGhvbmU6MTYuMDtVRElELTMwQTYxNjU5LUY3QTItNDRBMy05NTBGLTQ5MzMyNjgwRDY0ODphVkJvYjI1bClhcHBsZS9pUGhvbmUxMyw0;SEC_SESSION=be338ae5-8ee7-4340-9c02-c9c99b5177b1;Sec_User_id=737503357",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 WpsiOS/11.26.0",
  "223.5.5.5"
];
var modifiedHeaders = $request["headers"];
modifiedHeaders["Cookie"] = vip_user[0];
modifiedHeaders["User-Agent"] = vip_user[1];
modifiedHeaders["IP"] = vip_user[2];
$done({ headers: modifiedHeaders });
