/*

[rewrite_local]
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/mine\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili.js

[mitm]

hostname= *.bilibili.*

*/

var body = JSON.parse($response.body);
body.data.coin = 99999;
body.data.bcoin = 99999.9;
body.data.following = 999.9;
body.data.follower = 9999999;
body.data.dynamic = 0;
body.data.vip_type = 2;
body.data.level = 6;
body.data.vip_section_v2 = {
	id: 6465,
	title: "我的大会员",
	url: "https://big.bilibili.com/mobile/index?navhide=1&from_spmid=minetab&order_report_params=%7B%22exp_group_tag%22%3A%22def%22%2C%22exp_tag%22%3A%22def%22%2C%22material_type%22%3A%223%22%2C%22position_id%22%3A%223%22%2C%22request_id%22%3A%2250837b2dd4ac1454324827c96d1c9061%22%2C%22tips_id%22%3A%226465%22%2C%22unit_id%22%3A%222036%22%2C%22vip_status%22%3A%221%22%2C%22vip_type%22%3A%222%22%7D",
	desc: "热播内容看不停"
};
body.data.vip_section = {
	title: "热播内容看不停",
	url: "https://big.bilibili.com/mobile/index?navhide=1&from_spmid=minetab&order_report_params=%7B%22exp_group_tag%22%3A%22def%22%2C%22exp_tag%22%3A%22def%22%2C%22material_type%22%3A%223%22%2C%22position_id%22%3A%223%22%2C%22request_id%22%3A%2250837b2dd4ac1454324827c96d1c9061%22%2C%22tips_id%22%3A%226465%22%2C%22unit_id%22%3A%222036%22%2C%22vip_status%22%3A%221%22%2C%22vip_type%22%3A%222%22%7D",
	start_time: 1652716800,
	end_time: 1672459200
};
body.data.vip = {
	status: 1,
	avatar_subscript: 1,
	nickname_color: "#FB7299",
	due_date: 4102329600000,
	role: 3,
	vip_pay_type: 0,
	avatar_subscript_url: "",
	label: {
		bg_color: "#FB7299",
		bg_style: 1,
		text: "年度大会员",
		border_color: "",
		path: "",
		image: "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
		label_theme: "annual_vip",
		text_color: "#FFFFFF"
	},
	type: 2,
	themeType: 0,
	theme_type: 0
};
$done({ body: JSON.stringify(body) });
