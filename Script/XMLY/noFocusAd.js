/******************************

脚本功能：去除喜马拉雅首页轮盘滚动广告（非广告推荐不删除）
更新时间：2023-2-18

*******************************
[rewrite_local]

^https?:\/\/(mobile|mobilehera|mobwsa)\.ximalaya\.com\/focus-mobile\/focusPic\/info url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/XMLY/noFocusAd.js

[mitm]

hostname= *.ximalaya.com
*/

let obj = JSON.parse($response.body)
obj.header[0].item.list[0].data =
obj.header[0].item.list[0].data.filter(x=>!x.isAd)
$done({body:JSON.stringify(obj)})
