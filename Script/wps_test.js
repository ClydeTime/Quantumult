/******************************

脚本功能：WPS解锁稻壳会员
软件版本：11.26.0
更新时间：2022-07-05
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]
# > WPS解锁稻壳会员
^https?:\/\/account\.wps\.cn\/api\/v3\/mine\/vips url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/wps_test.js

[mitm] 
hostname = account.wps.cn

*******************************/

var body = $response.body;
var objc = JSON.parse(body);

objc.vips = [
    {
     name: "超级会员",
     has_ad: 0,
     memberid: 40,
     expire_time: 4102415999,
     enabled: [
      { memberid: 40, name: "超级会员", expire_time: 4102415999 },
      { memberid: 20, name: "WPS会员", expire_time: 4102415999 },
      { memberid: 12, name: "稻壳会员", expire_time: 4102415999 }
    ]
    },
    {
      "memberid" : 12,
      "expire_time" : 4102415999,
      "name" : "稻壳会员",
      "has_ad" : 0,
      "enabled" : null
    }
];

body = JSON.stringify(objc);
$done({ 
    body 
});
