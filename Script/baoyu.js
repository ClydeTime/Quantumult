/******************************

鲍鱼Tv:

解锁付费房间

下载地址：

https://asdxzdf.com:9703/#/?type=1&uid=70880936
*******************************

[rewrite_local]

^http[s]?:\/\/42\.157\.129\.184:3308\/api(/video/report_item?|/live/room/detail?|/video/related?|/video/detail).*$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/baoyu.js

[mitm] 

hostname = 42.157.129.184

*******************************/
var modifiedHeaders = $request["headers"];
modifiedHeaders["authorization"] = "bearer 9fddbf3fb8ce8ef6c200bcb9e070b84a";
$done({ headers: modifiedHeaders });
