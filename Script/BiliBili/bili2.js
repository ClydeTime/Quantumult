/*

[rewrite_local]

^https:\/\/app\.bilibili\.com\/x\/v2\/space\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili2.js

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
    console.log(`body:${$response.body}`);
    $notification.post(notifyTitle, url, "data字段错误");
    $done({});
}

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
$done({ body: JSON.stringify(body) });
