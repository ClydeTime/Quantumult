/******************************

脚本功能：去除喜马拉雅首页轮盘滚动广告（非广告推荐不删除）
更新时间：2022-12-31

*******************************
[rewrite_local]

^https?:\/\/(mobile|mobilehera|mobwsa)\.ximalaya\.com\/focus-mobile\/focusPic\/info url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/XMLY/noFocusAd.js

[mitm]

hostname= *.ximalaya.com
*/

let body = JSON.parse($response.body);

var length = body.header[0].item.list[0].data.length;
let arr = [];
for(let i = 0; i < length; i++) {
	if(body.header[0].item.list[0].data[i].isAd == false) {
		arr.push(body.header[0].item.list[0].data[i]);
	}
}
body.header[0].item.list[0].data = arr;

$done({ body: JSON.stringify(body) });
