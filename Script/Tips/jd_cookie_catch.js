/*
脚本名称：获取京东Cookie
脚本作者：MartinsKing
使用方法：登录m.jd.com网页后自动弹出
更新时间：2022-11-12
使用声明：⚠️此脚本仅供学习与交流⚠️⚠️⚠️
*******************************
[rewrite_local]

^https:\/\/home\.m\.jd\.com\/myJd\/ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Tips/jd_cookie_catch.js


[mitm]

hostname= *.m.jd.com
*/

const cookie2object = (cookie) => {
  var obj = {};
  var arr = cookie.split("; ");
  arr.forEach(function (val) {
    var brr = val.split("=");
    obj[brr[0]] = brr[1];
  });
  return obj;
};
const config = {
  cookie: {},
  headers: {}
};

config.headers = $request.headers;
config.cookie = cookie2object(config.headers.Cookie);
var nessary_headers = {};
nessary_headers.Cookie = `pt_key=${config.cookie.pt_key}; pt_pin=${config.cookie.pt_pin}`;
console.log(JSON.stringify(nessary_headers));
$notify("京东cookie获取", "获取成功", JSON.stringify(nessary_headers));
$done({});
