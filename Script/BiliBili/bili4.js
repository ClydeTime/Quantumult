/*
[rewrite_local]
^https:\/\/api\.bilibili\.com\/x\/vip\/price\/panel\/ url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili4.js

[mitm]
hostname= *.bilibili.*
*/

var body = JSON.parse($response.body);
body.data.user_info = {
      user_explain: "大会员：有效期至2099-12-31",
      vip_overdue_time: 0,
      tv_user_explain: "超级大会员：有效期至2099-12-31",
      vip_type: 2,
      face: body.data.user_info.face.toString(),
      vip_status: 1,
      user_name: body.data.user_info.user_name.toString(),
      background_url: body.data.user_info.background_url.toString()
};
$done({ body: JSON.stringify(body) });
