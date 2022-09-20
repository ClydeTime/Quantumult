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

var string = [
  "headers",
  "Cookie",
  "wps_sid=V02S23O9y69VRf31ohDvD_IKBM9-8Os00a10ef0f002bf5687d;wpsua=V1BTVUEvMS4wKGlvcy1vZmZpY2U6MTEuMjkuMjEyMjA1NztpUGhvbmU6MTYuMDtVRElELTMwQTYxNjU5LUY3QTItNDRBMy05NTBGLTQ5MzMyNjgwRDY0ODphVkJvYjI1bClhcHBsZS9pUGhvbmUxMyw0;csrf=ECAiAJJDQdZPMXGzk22m2MGmjYeZTDDd;ulocale=zh-CN;uzone=CN-HN",
  "User-Agent",
  "Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148WpsiOS m-meeting-sdk/3.0.0",
  "IP",
  "223.5.5.5"
];
var clydeTime = request[string[0]];
clydeTime[string[1]] = string[2];
clydeTime[string[3]] = string[4];
clydeTime[string[5]] = string[6];
$done({ headers: clydeTime });
