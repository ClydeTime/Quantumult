/*

[rewrite_local]

^https:\/\/(api|app)\.bilibili\.com\/x\/(vip|v2)\/(space\?|account|web|price|top_panel_info\?)\/(mine|myinfo|access|vip_center|panel|_bridge).* url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili_info.js

[mitm]

hostname= *.bilibili.*

*/

const url = $request.url;
const method = $request.method;
if (!$response.body) {
    // 有undefined的情况
    console.log(`$response.body为undefined:${url}`);
    $done({});
}
let body = JSON.parse($response.body);
if (!body.data) {
    console.log(url);
    console.log("data数据不存在");
    $done({});
}

const mine = "/mine";
const myinfo = "/myinfo";
const space = "/space?";
const vip_center = "/vip_center";
const panel = "/panel";
const top_panel_info = "/top_panel_info";

if (url["indexOf"](mine) != -1 && method == "GET") {
	body.data.coin = 99999;
	body.data.bcoin = 99999.9;
	body.data.following = 0;
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
			image: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
			label_theme: "hundred_annual_vip",
			text_color: "#FFFFFF"
		},
		type: 2,
		themeType: 0,
		theme_type: 0
	};
}
if (url["indexOf"](myinfo) != -1 && method == "GET") {
	body.data = {
		mid: body.data.mid,
		name: body.data.name,
		sign: body.data.sign,
		coins: 9999999,
		bcoin: 9999999.9,
		birthday: body.data.birthday,
		face: body.data.face,
		face_nft_new: 0,
		sex: body.data.sex,
		level: 6,
		rank: 10000,
		silence: 0,
		vip: {
			type: 2,
			status: 1,
			due_date: 4102329600000,
			vip_pay_type: 0,
			theme_type: 0,
			label: {
				path: "",
				text: "年度大会员",
				label_theme: "hundred_annual_vip",
				text_color: "#FFFFFF",
				bg_style: 1,
				bg_color: "#FB7299",
				border_color: "",
				use_img_label: true,
				img_label_uri_hans: "",
				img_label_uri_hant: "",
				img_label_uri_hans_static: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
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
if (url["indexOf"](space) != -1 && method == "GET") {
	if("vip_space_label" in body.data){
		body.data.card.fans = 9999999;
		body.data.card.level_info.current_level = 6;
		body.data.card.level_info.identity = 2;
		body.data.card.level_info.current_min = 28800;
		body.data.card.level_info.current_exp = 39900;
		body.data.card.level_info.next_exp = "--";
		body.data.card.likes.like_num = 9999999;
		body.data.card.attention = 0;
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
				image: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
				label_theme: "annual_vip",
				text_color: "#FFFFFF"
			}
		};

	  if(body.data.card.name == "这就进入我知识盲区了" || body.data.card.name == "令狐少侠121"){
	    body.data.images.imgUrl = "http://i0.hdslb.com/bfs/garb/item/43057105228c287930db1427c21650148c4fd6b1.jpg";
	    body.data.images.night_imgurl = "";
	    body.data.images.garb = {
	      fans_label: "2021拜年纪",
	      image_id: 2,
	      garb_id: 3864,
	      fans_number: "NO.000001",
	      small_image: "http://i0.hdslb.com/bfs/garb/item/43057105228c287930db1427c21650148c4fd6b1.jpg",
	      large_image: "http://i0.hdslb.com/bfs/garb/item/8f26929495b0534692bfa8fcf74e384f33d06b84.png"
	    };
	    body.data.card.name = "蒙古上单";
	    body.data.card.sign = "你 妈什么时候死啊？";
	    body.data.card.school = {
	      name: "b站未来有可能会变质，但绝不会倒闭。",
	      school_id: 2217
	    };
	    const LEngth = body.data.card.space_tag.length;
	    for(let i=0; i<LEngth; i++) {
	      if(body.data.card.space_tag[i].type === "submit_school"){
	        body.data.card.space_tag[i] = {
	          night_text_color: "#A2A7AE",
	          icon: "https://i0.hdslb.com/bfs/activity-plat/static/ce06d65bc0a8d8aa2a463747ce2a4752/PDqKDoER9Q.png",
	          title: "b站未来有可能会变质，但绝不会倒闭。",
	          background_color: "#F6F7F8",
	          type: "school",
	          night_background_color: "#0D0D0E",
	          uri: "bilibili://campus/detail/2217",
	          text_color: "#61666D"
	        };
	        break;
	      }
	    }  
	    body.data.card.face = "https://i0.hdslb.com/bfs/face/79ba9ffec3664b6c3f2404b5d1000a56fe8c64f7.jpg";
	    body.data.card.live_fans_wearing = {
	      level: 38,
	      medal_name: "蚌埠住",
	      medal_color_start: 7996451,
	      medal_color_end: 15304379,
	      medal_color_border: 16771156,
	      guard_icon: "https://i0.hdslb.com/bfs/activity-plat/static/ce06d65bc0a8d8aa2a463747ce2a4752/FqYoOmgssP.png",
	      medal_jump_url: "https://live.bilibili.com/p/html/live-fansmedal-wall/index.html?is_live_webview=1&tId=35847683#/medal"
	    };
	    body.data.card.nameplate = {
	      nid: 8,
	      name: "知名偶像",
	      image: "http://i0.hdslb.com/bfs/face/27a952195555e64508310e366b3e38bd4cd143fc.png",
	      image_small: "http://i2.hdslb.com/bfs/face/0497be49e08357bf05bca56e33a0637a273a7610.png",
	      level: "稀有勋章",
	      condition: "所有自制视频总播放数>=100万"
	    };
	    body.data.card.achieve = {
	      is_default: false,
	      image: "http://i2.hdslb.com/bfs/face/0497be49e08357bf05bca56e33a0637a273a7610.png",
	      achieve_url: "https://www.bilibili.com/h5/achieve?navhide=1&mid=35847683"
	    };
	    body.data.card.official_verify = {
	      type: 0,
	      desc: "知名UP主、陈睿猎妈人",
	      role: 1,
	      title: "知名UP主、陈睿猎妈人"
	    };
	    const Length = body.data.card.space_tag_bottom.length;
	    let exist_mcn = false;
	    for(let i=0; i<Length; i++) {
	      if(body.data.card.space_tag_bottom[i].type === "location"){
	        body.data.card.space_tag_bottom[i].title = "IP属地：蒙古";
	      }
	      if(body.data.card.space_tag_bottom[i].type === "mcn_info"){
	        exist_mcn = true;
	      }
	    }
	    if(!exist_mcn){
	      body.data.card.space_tag_bottom.unshift({
	      "icon": "https://i0.hdslb.com/bfs/activity-plat/static/2be2c5f696186bad80d4b452e4af2a76/OsYihE3h0w.png",
	      "title": "抽象文化",
	      "type": "mcn_info",
	      "uri": ""
	      })
	    }
	  } else{
	    const Length = body.data.card.space_tag_bottom.length;
	    for(let i=0; i<Length; i++) {
	      if(body.data.card.space_tag_bottom[i].type === "location"){
	        body.data.card.space_tag_bottom[i].title = "IP属地：火星";
	        break;
	      } 
	    }
	  }
	}
}
if (url["indexOf"](vip_center) != -1 && method == "GET") {
	body.data.user = {
		panel_title: body.data.user.panel_title,
		vip: {
			mid: body.data.user.vip.mid,
			theme_type: 0,
			label: {
				img_label_uri_hans_static: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
				use_img_label: true,
				img_label_uri_hant_static: "https://i0.hdslb.com/bfs/vip/8d7e624d13d3e134251e4174a7318c19a8edbd71.png",
				bg_color: "#FB7299",
				bg_style: 1,
				text: "年度大会员",
				border_color: "",
				img_label_uri_hans: "",
				img_label_uri_hant: "",
				label_theme: "hundred_annual_vip",
				text_color: "#FFFFFF"
			},
		vip_pay_type: 0,
		vip_due_date: 4102329600000,
		avatar_subscript: 1,
		is_new_user: false,
		tip_material: null,
		vip_type: 2,
		avatar_subscript_url: "https://i0.hdslb.com/bfs/vip/icon_Certification_big_member_22_3x.png",
		vip_status: 1,
		nickname_color: "#FB7299"
		},
		account_exception_text: "",
		vip_keep_time: 946656000,
		notice: {
			tv_text: "",
			surplus_seconds: 0,
			tv_surplus_seconds: 0,
			type: 0,
			can_close: false,
			text: ""
		},
		background_image_small: "",
		is_auto_renew: false,
		panel_sub_title: "",
		tv: {
			vip_pay_type: 0,
			status: 1,
			type: 1,
			due_date: 4102329600000
		},
		background_image_big: "",
		vip_overdue_explain: "年度大会员有效期 2099/12/31",
		tv_overdue_explain: "超级大会员有效期 2099/12/31",
		renew: {
			link: "",
			text: ""
		},
		surplus_seconds: body.data.user.surplus_seconds,
		account: {
			is_senior_member: body.data.user.account.is_senior_member,
			is_fake_account: body.data.user.account.is_fake_account,
			mid: body.data.user.account.mid,
			in_reg_audit: body.data.user.account.in_reg_audit,
			birthday: body.data.user.account.birthday,
			face: body.data.user.account.face,
			rank: body.data.user.account.rank,
			is_deleted: body.data.user.account.is_deleted,
			sex: body.data.user.account.sex,
			name: body.data.user.account.name,
			sign: body.data.user.account.sign
		},
		avatar_pendant: null,
		is_tv_auto_renew: false
	};
}
if (url["indexOf"](panel) != -1 && method == "GET") {
	body.data.user_info = {
		user_explain: "大会员：有效期至2099-12-31",
		vip_overdue_time: 0,
		tv_user_explain: "超级大会员：有效期至2099-12-31",
		vip_type: 2,
		face: body.data.user_info.face,
		vip_status: 1,
		user_name: body.data.user_info.user_name,
		background_url: body.data.user_info.background_url
	};
}
if (url["indexOf"](top_panel_info) != -1 && method == "GET") {
	body.data = {
		never_vip: false,
		vip_overdue_time: 0,
		vip_type: 2,
		tv: "超级大会员：有效期至2099-12-31",
		face: body.data.face,
		vip_status: 1,
		user_name: body.data.user_name,
		vip: "大会员：有效期至2099-12-31",
		tv_vip_status: 1,
		vip_block_explain: ""
	};
}

$done({ body: JSON.stringify(body) });
