/******************************

脚本功能：酷我音乐+解锁VIP【广告➕VIP➕数字➕下载】
更新日期：2022-09-27
软件版本：10.3.3
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************
[rewrite_local]

^https?:\/\/.*\.(kuwo|lrts)\.(cn|me)\/(a\.p|music\.pay|(vip\/(v2|enc)\/(theme|user\/vip))|(EcomResource|(Mobile)?Ad)Serv(er|ice)).* url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/KWYY/kwyy.js

[mitm] 

hostname = *.kuwo.cn, *.lrts.me

********************************/



var url = $request["url"];
var body = $response["body"];
var method = $request["method"];
const Serv = "Serv";
const a_p = "/a.p";
const music_pay = "/music.pay";
const v2_vip = "/vip/v2/user/vip";
const enc_vip = "/vip/enc/user/vip";
const theme = "/vip/v2/theme";
const modified =
  "Vo4m6X2hTph/vfpPmau8PTT0sFN6JCgzxSLVH/u3sbEt7VniYsVHbRFgOgN+Uvs39rAI7R3C5HVpaSj8tr8U8dLYwYdDCjMILuUorh3z0BiQToiWxudHkcASIPHNrmZHZYC/yv3DP4b89hbzfqU5UUDUqaZpEBZr76sDF2wNPmYjUEFSVCMGyTl1F6j1DBmKJ1Tik0YuG/2UBa/Ilz12a1KneXsNs5x5EE41bXDke7EygIB3I+6SoITZXOLFAFQFZujdI0GzClNglDKtclpUxpjN3uVeJxHLU40FTwNWo3ZDNv8KSdZpYZ5BDEOCyZkifmHlf1wnocX2zTr2xRAM6JhAD2WaSSNQQVJUI5lv72QNZSN43Pj/qdzatHQP4Pp/H1YxyP36rv3qBcnnJy/55YouIczRc3eJjXExRgo54qdyTYRMYoS9GzNn/edR3hSNnMn9PnElBCfZhkL0R5kZ9JBFCM3vNOy7Cnp6RVyAG0GFHv/g2q1yqkJxibyDro5nlnnvHjhZrsOvSvTXI1BBUlQjGoRqqCTDUvHLoiNwWMoKKfxtswWQiXjoQ6mL5dazxjUsbsHzC1N8YNMVtzf8gBryr3nMWS44wyUpi1/0WhGTRW1wsCllO1DB24+ibTFH/yftWN+/apM9vbQAkc/J+aFy/01plK7rsGNwWYYKG0sr6CS8dGQzy0On6aFo07hiU+wjUEFSVCOf/wKzzX5Cn/OLMKeVa1BPDxV5tm39vCrsxIG6T29VHWx8ck93S/nXCm2dHfojuLySZKJ50B1FaN5uFIY+LA1RbO/0sL+CoSJhoNOLibzt75c5dleW+lbwxLAAdBh5AFq4Z1Uj8bPjm5mHcGWQuBAyZIO+ie8wP4yvWwQFf1ENJiNQQVJUIzwCo22cpAtoAzYZWm3XFPfSlov4G15JGaaHL2X5FG5BTeUwwbBiQfwUpcb6oT8dbIKh2SsUZCeJZW43lLI0UIo9u3y1+P4GMtOKEZ7Sx0aQ3ewknthU2tpL0gnykFtiEtKBxcfHjJEen158zVXrbxxC0W35SmaYOOwgAmEMfxwHI1BBUlQjhVUHnBabnJcnmXCICcyUBglrZkXcNLwg91p4889vKFTLlzROHTt20UzjfKWsNK3U8pYgKYXPbQtSzIuRheEEQDFhLvEhIGKaB6yDoacDLJZ0jgFRIKKFBkbK0VE4nIABi1qgQOXvq1sG4QeupjfEWYqMX8EyyqPHrsDiCltAF1wjUEFSVCNybeUusnxJF2zswj8xQtfPiwfDj3TwKWxKXCmkheqHy7/0Qpyc84xWvq+YXktsU97wUZLHrgJmARudJmQNEwAweIdHMafcwreBy731z6kGLojy5TLgTN7XSm5Ar+hgOW+1ZwkWLyrVvaCdO/8/zdYl1w/PQUCs6dw0ThIeahwjpQ==";
if (url["indexOf"](Serv) != -1 && method == "GET") {
  var modify = {};
  modify["body"] = "{}";
  $done(modify);
}
if (url["indexOf"](a_p) != -1 && method == "POST") {
  var body = $response["body"]
    ["replace"](/"playright":\d+/g, '"playright":1')
    ["replace"](/"downright":\d+/g, '"downright":1')
    ["replace"](/"policytype":\d+/g, '"policytype":3')
    ["replace"](/"policy":\d+/g, '"policy":5');
  var response = {};
  response["body"] = body;
  $done(response);
} else if (url["indexOf"](a_p) != -1 && url["indexOf"]("getvip") != -1) {
  var body = JSON["parse"](body);
  var packs = {};
  packs["end"] = 4102329600;
  packs["bought_vip"] = 1;
  packs["type"] = 1;
  packs["period"] = 31;
  packs["bought_vip_end"] = 4102329600;
  body["packs"] = packs;
  body = JSON["stringify"](body);
  var new_name = {};
  new_name["body"] = body;
  $done(new_name);
} else if (url["indexOf"](a_p) != -1 && url["indexOf"]("advertright") != -1) {
  $done({});
}
if (url["indexOf"](enc_vip) != -1 && method == "GET") {
  var new_no = {};
  new_no["body"] = modified;
  $done(new_no);
}
if (url["indexOf"](v2_vip) != -1 && url["indexOf"]("op=ui") != -1) {
  var body = JSON["parse"](body);
  var data = {};
  data["vipIcon"] =
    "https://image.kuwo.cn/fe/f2d09ac0-b959-404f-86fa-dc65c715c0e96.png";
  data["iconJumpurl"] =
    "http://vip1.kuwo.cn/vip/vue/anPay/pay/index.html?pageType=avip&MBOX_WEBCLOSE=1&FULLHASARROW=1";
  data["growthValue"] = "21600";
  data["vipTag"] = "VIP6";
  data["vipOverSeasExpire"] = "0";
  data["time"] = "1577808000000";
  data["goSvipPage"] = "1";
  data["isNewUser"] = "1";
  data["vipmIcon"] =
    "https://image.kuwo.cn/fe/34ad47f8-da7f-43e4-abdc-e6c995666368yyb.png";
  data["svipIcon"] =
    "https://image.kuwo.cn/fe/f2d09ac0-b959-404f-86fa-dc65c715c0e96.png";
  data["vipmExpire"] = "4102329600000";
  data["biedSong"] = "0";
  data["luxuryIcon"] =
    "https://image.kuwo.cn/fe/2fae68ff-de2d-4473-bf28-8efc29e44968vip.png";
  data["userType"] = "3";
  data["isYearUser"] = "2";
  data["vip3Expire"] = "0";
  data["experienceExpire"] = "0";
  data["luxAutoPayUser"] = "2";
  data["biedAlbum"] = "1";
  data["vipLuxuryExpire"] = "4102329600000";
  data["vipmAutoPayUser"] = "2";
  data["svipAutoPayUser"] = "2";
  data["vipExpire"] = "4102329600000";
  data["svipExpire"] = "4102329600000";
  body["data"] = data;
  body = JSON["stringify"](body);
  var response = {};
  response["body"] = body;
  $done(response);
} else if (
  url["indexOf"](v2_vip) != -1 &&
  url["indexOf"]("jsonpcallback") != -1
) {
  $done({});
}
if (url["indexOf"](music_pay) != -1 && method == "POST") {
  if (body["indexOf"]("audio") != -1) {
    var body = JSON["parse"](body);
    var sons_id = body["songs"][0]["id"];
    var audio_pid = body["songs"][0]["audio"][0]["pid"];
    var audio_price = body["songs"][0]["audio"][0]["price"];
    var audio_policy = body["songs"][0]["audio"][0]["policy"];
    var audio_policy_1 = audio_policy + "_1";
    var audio_length = body["songs"][0]["audio"]["length"];
    for (var i = 0; i < audio_length; i++) {
      body["songs"][0]["audio"][i]["st"] = 0;
    }
    var info = body["songs"][0];
    var user = {};
    user["pid"] = audio_pid;
    user["type"] = audio_policy;
    user["name"] = audio_policy_1;
    user["categray"] = audio_policy_1;
    user["id"] = sons_id;
    user["order"] = 375787919;
    user["final"] = [];
    user["buy"] = 1657425321;
    user["begin"] = 1657425321;
    user["end"] = 4102329600;
    user["CurEnd"] = 0;
    user["playCnt"] = 0;
    user["playUpper"] = 300;
    user["downCnt"] = 0;
    user["downUpper"] = 300;
    user["playVideoCnt"] = 0;
    user["playVideoUpper"] = 3000;
    user["downVideoCnt"] = 0;
    user["downVideoUpper"] = 3000;
    user["price"] = audio_price;
    user["period"] = 1000;
    user["feetype"] = 0;
    user["info"] = info;
    body["user"] = [user];
    var response = {};
    response["body"] = JSON["stringify"](body);
    $done(response);
  } else {
    $done({});
  }
} else if (url["indexOf"](music_pay) != -1 && method == "GET") {
  $done({});
}
if (url["indexOf"](theme) != -1 && url["indexOf"]("op=gd") != -1) {
  var body = JSON["parse"](body);
  body["data"]["needBieds"] = null;
  var response = {};
  response["body"] = JSON["stringify"](body);
  $done(response);
}
