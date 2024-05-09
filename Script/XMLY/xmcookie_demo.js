/******************************

脚本功能：喜马拉雅解锁VIP模板
更新时间：2024-05-09
使用声明：此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https?:\/\/(mobile(hera)?|m(ob)?wsa)\.ximalaya\.com\/(mobile-playpage\/track|mobile\/quickplay) url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/XMLY/xmcookie_demo.js


[mitm] 

hostname = *.ximalaya.com, 47.100.227.85, 61.164.145.12, 61.172.194.185, 61.172.194.186, 106.41.204.126, 112.80.180.72, 112.98.170.228, 112.99.146.108, 114.80.99.*, 118.25.119.177, 180.153.140.*, 180.153.250.*, 180.153.255.*

*******************************/

var headers = $request["headers"];
headers["cookie"] =
  "channel=ios-b1; 1&_device=???; impl=com.gemd.iting; NSUP=???; c-oper=???; net-mode=5G; res=???; 1&_token=???; idfa=???; device_model=???; fp=???";
$done({ 'headers': headers });