/*
[rewrite_local]
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/mine.*$ url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/biliCrack.js

[mitm]

hostname= *.biliapi.*, *.bilibili.*
*/
var obj = JSON.parse($response.body);
obj.data.name = "测试";
obj.data.coin = 999880;
obj.data.bcoin = 999880;
obj.data.face = "https://static1.keepcdn.com/avatar/2021/11/09/00/23/e8374efaeeaa36fe6004e73490e13b118606eac1.jpg";
obj.data.level = 8;
obj.data.vip.type = 1;
obj.data.vip.status = 1;
obj.data.vip.due_date = 32494611978000;
obj.data.vip.vip_pay_type = 1;
obj.data.vip.theme_type = 0;
obj.data.vip.label.text = "大会员";
obj.data.vip.label.label_theme = "vip";
obj.data.vip.label.text_color = "#FFFFFF";
obj.data.vip.label.bg_style = 1;
obj.data.vip.label.bg_color = "#FB7299";


$done({
    body: JSON.stringify(obj)
});
