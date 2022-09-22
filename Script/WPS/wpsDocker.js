/******************************
脚本功能：WPS解锁稻壳会员
软件版本：11.29.2
更新时间：2022-09-20
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]
# > WPS解锁稻壳会员
^https?:\/\/.+\.(docer.)?wps.cn\/(user\/v1\/vip|android\/mb\/buy|partner\/invoke\/usable|(api|rank)\/v1(\/mobile\/mb)?\/detail) url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wpsDocker.js

[mitm] 
hostname = *.docer.wps.cn, vipapi.wps.cn

*******************************/

var vip_user = [
  "wps_sid=V02SaEzMoENCwCQNeTIcUVvchy9ICc400a321c51002bf5687d; wpsua=V1BTVUEvMS4wKGlvcy1vZmZpY2U6MTEuMjkuMjEyMjA1NztpUGFkOjE1LjU7VURJRC1DMTMwRUNBMi02Q0Q5LTQxOEMtOTc0MC02MjU5MkM0MkQ0NDg6NWJTVTVZcWI1WS1MNTVxRUlHbFFZV1E9KWFwcGxlL2lQYWQxMSwx",
  "Mozilla/5.0 (iPad; CPU OS 15_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Mobile/15E148 WpsiOS/11.29.2",
];
var modifiedHeaders = $request["headers"];
modifiedHeaders["Cookie"] = vip_user[0];
modifiedHeaders["User-Agent"] = vip_user[1];
$done({ headers: modifiedHeaders });
