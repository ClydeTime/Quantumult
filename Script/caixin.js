/***********************************

> 应用名称：财新
> 软件版本：7.9.7
> 下载地址：https://apps.apple.com/us/app/id356023612
> 更新时间：2022-10-14
> 使用说明：解锁文章，无需登录，财新通，非数据通会员

[rewrite_local]

^https?:\/\/gateway\.caixin\.com\/api\/app\-api\/auth\/(validate|validateAudioAuth) url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/caixin.js

[mitm]

hostname = gateway.caixin.com

***********************************/
var headers = $request["headers"];
delete headers["User-Agent"];
delete headers["Accept-Language"];
const url = $request["url"]
  ["replace"](/uid=(\d+|)/g, "uid=12622061")
  ["replace"](/code=(\w+|)/g, "code=DFDA516BB81A452BC80D9A288A8F67AD")
  ["replace"](
    /device=(\w+|)/g,
    "device=b3107e958f22af8ed9f0ca123b84d87420fa7929"
  )
  ["replace"](/deviceType=(\d+|)/g, "deviceType=1");
if ($request["url"]["indexOf"]("validateAudioAuth") != -0x1) {
  headers["appinfo"] = "fuckcaixin";
}
$done({ url: url, headers: headers });
