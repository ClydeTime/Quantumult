/*
脚本名称：获取B站共享Cookie
脚本作者：MartinsKing
使用方法：打开B站客户端自动弹出
更新时间：2023-09-27
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]

^https:\/\/app\.bilibili\.com\/bilibili\.app\.wall\.v1\.Wall\/RuleInfo url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Tips/bili_cookie_catch.js

[mitm]

hostname= app.bilibili.com
*/

const config = {
  headers: {}
};

config.headers = $request.headers;
var nessary_headers = {};
nessary_headers.buvid = config.headers.buvid;
nessary_headers.Authorization = config.headers.Authorization;
nessary_headers['User-Agent'] = config['headers']['User-Agent'];
console.log(JSON.stringify(nessary_headers));
$notify("BiliBili-cookie获取", "获取成功", JSON.stringify(nessary_headers));
$done({});
