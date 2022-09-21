/*

[rewrite_local]
^https:\/\/app\.bilibili\.com\/x\/v2\/space\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili2.js

[mitm]

hostname= *.bilibili.*

*/

var body = JSON.parse($response.body);

body.data.card.fans = 9999999;
body.data.card.level_info.current_level = 6;
body.data.card.level_info.identity = 2;
body.data.card.likes.like_num = 9999999;
body.data.card.attention = 0;
body.data.card.level_info.current_min = 28800;
body.data.card.level_info.current_exp = 39900;
body.data.card.level_info.next_exp = "--";
body.data.card.space_tag_bottom[0].title = "IP属地：火星";

body.data.card.nameplate = {
        level: "稀有勋章",
        condition: "单个自制视频总播放数>=100万",
        nid: 1,
        name: "黄金殿堂",
        image: "http://i1.hdslb.com/bfs/face/82896ff40fcb4e7c7259cb98056975830cb55695.png",
        image_small: "http://i1.hdslb.com/bfs/face/627e342851dfda6fe7380c2fa0cbd7fae2e61533.png"
};
body.data.card.vip = {
	vipStatusWarn: "",
	vipType: 2,
	dueRemark: "",
	vipDueDate: 4102329600000,
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
