/*

[rewrite_local]
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/mine.*$ url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/biliCrack.js

[mitm]

hostname= *.biliapi.*, *.bilibili.*

*/

var obj = JSON.parse($response.body);
obj.data.coin = 999;
obj.data.bcoin = 999;
obj.data.face = "http://i1.hdslb.com/bfs/face/6e49b6f3fdcacecb511be4c06467792fc7bbf236.jpg";
obj.data.level = 6;
obj.data.vip.type = 2;
obj.data.vip.status = 1;
obj.data.vip.due_date = 1676476800000;
obj.data.vip.vip_pay_type = 1;
obj.data.vip.theme_type = 0;
obj.data.vip.label.text = "年度大会员";
obj.data.vip.label.label_theme = "annual_vip";
obj.data.vip.label.text_color = "#FFFFFF";
obj.data.vip.label.bg_style = 1;
obj.data.vip.label.bg_color = "#FB7299";
obj.data.vip.label.img_label_uri_hans = "";
obj.data.vip.label.img_label_uri_hant = "";
obj.data.vip.label.img_label_uri_hans_static = "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png";
obj.data.vip.label.img_label_uri_hant_static = "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png";
obj.data.vip.tv_vip_status = 0;
obj.data.vip.tv_vip_pay_type = 1;


$done({
    body: JSON.stringify(obj)
});
