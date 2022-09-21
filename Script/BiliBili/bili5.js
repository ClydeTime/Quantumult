/*
[rewrite_local]
^https:\/\/api\.bilibili\.com\/x\/vip\/top_panel_info\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili5.js

[mitm]
hostname= *.bilibili.*
*/

var body = JSON.parse($response.body);

body.data = {
	never_vip: false,
	vip_overdue_time: 0,
	vip_type: 2,
	tv: "超级大会员：有效期至2099-12-31",
	face: "http://i1.hdslb.com/bfs/face/6e49b6f3fdcacecb511be4c06467792fc7bbf236.jpg",
	vip_status: 1,
	user_name: body.data.user_name.toString(),
	vip: "大会员：有效期至2099-12-31",
	tv_vip_status: 1,
	vip_block_explain: ""
};

$done({ body: JSON.stringify(body) });
