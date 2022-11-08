/*******************************
小猿搜题
待深入研究。。。
*******************************
[rewrite_local]
^https:\/\/xyst\.yuanfudao\.com\/solar-vip\/(api|iphone)\/users/* url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/xyst.js
[mitm] 
hostname = xyst.yuanfudao.com
*******************************/


var body = JSON["parse"]($response["body"]);
body["ytkUserId"] = 888888;
body["renewTexts"] = { ME: "已开通", VIP_CARD: "已开通" };
body["payUserStatus"] = 0;
body["expireTime"] = 4092599349000;
body["vip"] = true;
body["autoRenew"] = true;
body["payUser"] = true;

$done({ body: JSON["stringify"](body) });
