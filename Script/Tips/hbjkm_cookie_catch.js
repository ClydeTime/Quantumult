/*
脚本名称：获取河北健康码Cookie
脚本作者：MartinsKing
使用方法：支付宝打开河北健康码后自动弹出
更新时间：2022-11-21
使用声明：⚠️此脚本仅供学习与交流⚠️⚠️⚠️
*******************************
[rewrite_local]

^https:\/\/zfbssl\.hbzwfw\.gov\.cn\/jkm\/jkm\.do\?method=\/common\/getBannerMsg url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Tips/hbjkm_cookie_catch.js

[mitm]

hostname= zfbssl.hbzwfw.gov.cn
*/

const token = $request.headers.accessToken;
console.log(JSON.stringify(token));
$notify("河北健康码cookie获取", "获取成功", JSON.stringify(token));
$done({});
