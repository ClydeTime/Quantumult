/*

[rewrite_local]
^https:\/\/app\.bilibili\.com\/x\/v2\/space\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili2.js

[mitm]

hostname= *.bilibili.*

*/

var body = JSON.parse($response.body);
if("vip_space_label" in body.data){  
  body.data.card.fans = 9999999;
  body.data.card.level_info.current_level = 6;
  body.data.card.level_info.identity = 2;
  body.data.card.likes.like_num = 9999999;
  body.data.card.attention = 0;
  body.data.card.level_info.current_min = 28800;
  body.data.card.level_info.current_exp = 39900;
  body.data.card.level_info.next_exp = "--";
  if(body.data.card.name = "这就进入我知识盲区了"){
    body.data.card.name = "蒙古上单";
    body.data.card.sign = "你 妈什么时候死啊？";
    body.data.card.face = "https://i0.hdslb.com/bfs/face/79ba9ffec3664b6c3f2404b5d1000a56fe8c64f7.jpg";
    body.data.card.official_verify = {
                type: 0,
                desc: "知名UP主、陈睿猎妈人",
                role: 1,
                title: "知名UP主、陈睿猎妈人"
            }
    const Length = body.data.card.space_tag_bottom.length;
    for(let i=0; i<Length; i++) {
      if(body.data.card.space_tag_bottom[i].type === "location"){
        body.data.card.space_tag_bottom[i].title = "IP属地：蒙古";
        break;
      } 
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
  }
}


$done({ body: JSON.stringify(body) });
