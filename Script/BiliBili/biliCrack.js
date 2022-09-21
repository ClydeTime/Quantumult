/*

[rewrite_local]
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/biliCrack.js

[mitm]

hostname= *.bilibili.*

*/

var body = JSON.parse($response.body);
var obj = {
	code: 0,
	message: "0",
	ttl: 1,
	data: {
		mid: body.data.mid,
		name: body.data.name.toString(),
		sign: "",
		coins: 9999999,
		bcoin: 9999999.9,
		birthday: body.data.birthday.toString(),
		face: body.data.face.toString(),
		face_nft_new: 0,
		sex: body.data.sex,
		level: 6,
		rank: 10000,
		silence: 1,
		vip: {
			type: 2,
			status: 1,
			due_date: 4102329600000,
			vip_pay_type: 0,
			theme_type: 0,
			label: {
				path: "",
				text: "年度大会员",
				label_theme: "annual_vip",
				text_color: "#FFFFFF",
				bg_style: 1,
				bg_color: "#FB7299",
				border_color: "",
				use_img_label: true,
				img_label_uri_hans: "",
				img_label_uri_hant: "",
				img_label_uri_hans_static: "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
				img_label_uri_hant_static: "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png"
				},
			avatar_subscript: 1,
			nickname_color: "#FB7299",
			role: 3,
			avatar_subscript_url: "",
			tv_vip_status: 1,
			tv_vip_pay_type: 0
		},
		email_status: 1,
		tel_status: 1,
		official: {
			role: 0,
			title: "",
			desc: "",
			type: -1
		},
	identification: 1,
	invite: {
		invite_remind: 1,
		display: true
	},
	is_tourist: 0,
	pin_prompting: 0,
	in_reg_audit: 0,
	has_face_nft: false
	}
}
$done({ body: JSON.stringify(obj) });
