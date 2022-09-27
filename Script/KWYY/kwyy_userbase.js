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

$done({ body: JSON.stringify(body) });
