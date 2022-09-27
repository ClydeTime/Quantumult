/******************************
脚本功能：WPS Office+解锁VIP
软件版本：11.29.2
更新时间：2022-9-28
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]
^https?:\/\/(drive|account)\.wps\.cn\/api\/(users|v3\/(spaces|mine\/vips)) url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wps.js
^https?:\/\/(client|userinfo)\.docer\.wps\.cn\/(android\/mb\/buy|user\/v1\/vip\_dl\_times) url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wpsDocer_times.js
^https?:\/\/.+\.(docer.)?wps.cn\/(download\/v1\/ios|user\/v1\/vip|android\/mb\/buy|partner\/invoke\/usable|(api|rank)\/v1(\/mobile\/mb)?\/detail) url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/WPS/wpsDocer.js


[mitm]
hostname = *.docer.wps.cn, vipapi.wps.cn, account.wps.cn, drive.wps.cn

**************************/

const url = $request.url;
const method = $request.method;
if (!$response.body) {
    // 有undefined的情况
    console.log("body is undefined!");
    $done({});
}
let body = JSON.parse($response.body);


const users = "/users";
const vips = "/vips";
const spaces = "/spaces";

if (url["indexOf"](users) != -1 && method == "GET") {
  body = {
    exp: 0,
    level: 3,
    privilege: [
      { spid: "data_recover", times: 0, expire_time: 4102415999 },
      { spid: "ocr", times: 0, expire_time: 4102415999 },
      { spid: "pdf2doc", times: 0, expire_time: 4102415999 },
      { spid: "pdf_merge", times: 0, expire_time: 4102415999 },
      { spid: "pdf_sign", times: 0, expire_time: 4102415999 },
      { spid: "pdf_split", times: 0, expire_time: 4102415999 }
    ],
    result: "ok",
    total_buy: 0,
    total_cost: -30,
    userid: body.userid,
    vip: {
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
    wealth: 0,
    expire_time: 4102415999
    };
}
if (url["indexOf"](vips) != -1 && method == "GET") {
  body.vips = [
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
     name: "稻壳会员",
     has_ad: 0,
     memberid: 12,
     expire_time: 4102415999,     
     enabled: null
    }
  ];
}
if (url["indexOf"](spaces) != -1 && method == "GET") {
  body.total = 391915765760;
}

$done({ body: JSON.stringify(body) });
