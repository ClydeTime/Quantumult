/*

[rewrite_local]

^https:\/\/vip1\.kuwo\.cn\/vip\/v2\/userbase\/vip\?op\=getMCInfo url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/KWYY/kwyy_userbase.js

[mitm]

hostname= vip1.kuwo.cn

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
    $done({});
}

body.data.ui = {
    isNewUser: body.data.ui.isNewUser,
    vipExpire: "4102329600000",
    vipOverSeasExpire: "0",
    isYearUser: "2",
    vip3Expire: "0",
    biedAlbum: "1",
    vipmAutoPayUser: "2",
    time: body.data.ui.time,
    vipmExpire: "4102329600000",
    luxAutoPayUser: "2",
    vipLuxuryExpire: "4102329600000",
    svipExpire: "4102329600000",
    svipAutoPayUser: "2",
    biedSong: "0",
    experienceExpire: "0"
}

body.data.vipui = {
    isComplainUser: body.data.vipui.isComplainUser,
    luxuryIcon: "https://image.kuwo.cn/fe/2fae68ff-de2d-4473-bf28-8efc29e44968vip.png",
    province: body.data.vipui.province,
    vipmAutoPayUser: "2",
    vipmExpire: "4102329600000",
    isQQKugou: body.data.vipui.isQQKugou,
    luxAutoPayUser: "2",
    vipTag: "VIP6",
    vipLuxuryExpire: "4102329600000",
    vipmIcon: "https://image.kuwo.cn/fe/34ad47f8-da7f-43e4-abdc-e6c995666368yyb.png",
    city: body.data.vipui.citytoString(),
    svipIcon: "https://image.kuwo.cn/fe/f2d09ac0-b959-404f-86fa-dc65c715c0e96.png",
    svipExpire: "4102329600000",
    svipAutoPayUser: "2",
    experienceExpire: 0
}

$done({ body: JSON.stringify(body) });
