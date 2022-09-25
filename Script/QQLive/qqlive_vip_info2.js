/*
[rewrite_local]

^https:\/\/i\.video\.qq\.com url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/QQLive/qqlive_vip_info2.js

[mitm]

hostname= vip.video.qq.com
*/

const url = $request.url;
const method = $request.method;
const noticeTitle = "腾讯视频修改vip脚本错误";
if (!$response.body) {
    // 有undefined的情况
    console.log(`$response.body为undefined:${url}`);
    $done({});
}
let body = JSON.parse($response.body);
if (!body.vip) {
    console.log("不存在vip字段");
    $notification.post(notifyTitle, url, "vip字段错误");
    $done({});
}

body.composite_icon.icon_url = "https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0";
body.svip_icon.icon_url = "https://puui.qpic.cn/vupload/0/20190428_SVIP_7grey_3x.png/0";
body.score = 99999;
body.endTime = "2099-12-31 00:00:00";
body.vip_icon.icon_url = "https://puui.qpic.cn/vupload/0/20190428_VIP_7_3x.png/0";
body.level = 7;
body.annualneedtime = "86400";
body.annualbegintime = 1577808000;
body.annualendtime = 4102300800;
body.beginTime = "2020-01-01 00:00:00";
body.vip = 1;

$done({ body: JSON.stringify(body) });
