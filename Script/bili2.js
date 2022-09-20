/*

[rewrite_local]
^https:\/\/app\.bilibili\.com\/x\/v2\/space\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/bili2.js

[mitm]

hostname= *.bilibili.*

*/

var body = JSON.parse($response.body);
body.data.elec.list[0].vip_info = {
	vipType: 2,
	vipStatus: 1,
	vipDueMsec: 0
};
body.data.card.fans = 999;
body.data.card.level_info.current_level = 6;
body.data.card.friend = 999;
body.data.card.attention = 0;
body.data.card.vip = {
	vipStatusWarn: "",
	vipType: 2,
	dueRemark: "",
	vipDueDate: 1676476800000,
	accessStatus: 0,
	vipStatus: 1,
	themeType: 0,
	label: {
		bg_color: "#FB7299",
		bg_style: 1,
		text: "年度大会员",
		border_color: "",
		path: "",
		image: "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
		label_theme: "annual_vip",
		text_color: "#FFFFFF"
	}
};
body.data.vip_space_label.show_expire = false;
$done({ body: JSON.stringify(body) });
