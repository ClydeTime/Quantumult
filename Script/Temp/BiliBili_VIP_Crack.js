/*
脚本功能：哔哩哔哩解锁大会员
软件版本：6.90.0
更新时间：2022-10-31
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]

# > 哔哩哔哩大会员
^https?:\/\/ap(i|p)\.bilibili\.com\/bilibili\.\w{3,9}\..+\/(View|Play(URL|View|Conf|erOnline)|MainList|ViewProgress)$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Temp/BiliBili_VIP_Crack.js

[mitm] 
hostname = *.bilibili.com, 124.239.240.*, 101.89.57.66, 218.94.210.66, 240e:b1:9801:206:11:0:0:*
*/

var headers = $request['headers'];
modifiedheaders = {"Cookie":"DedeUserID=400825589; DedeUserID__ckMd5=74eca1c0cd603ce4; SESSDATA=a3702838%2C1682919121%2C68a212b2; bili_jct=b56f02867aadae08217073491a2e9313; sid=g40k84oj","Authorization":"identify_v1 0d13d99b053423e94fd7a67d466a47b2","User-Agent":"bili-inter/70000100 os/ios model/iPhone XR mobi_app/iphone_i osVer/15.6.1 network/2","x-bili-locale-bin":"Eg4KAnpoEgRIYW5zGgJUVw==","x-bili-device-bin":"CA4Q5LuwIRokWTI0MzBDMjkzNTkyNTYwMTRDMkNBOUJFN0UzQTdGMkM3RjI5IghpcGhvbmVfaSoDaW9zMgVwaG9uZToFYXBwbGVCBUFwcGxlSglpUGhvbmUgWFJSBjE1LjYuMWoGMy4xNC4wckBEMzc1RjFGMDI5NjQ4MkFFQjUzOTYwOTZDQkI4RkFBNDIwMTkwOTE0MjMyNDU1OTk1QzA1MTcwMEY3QzRDQjc0eJW9/+7BMA==","x-bili-metadata-bin":"CiAwZDEzZDk5YjA1MzQyM2U5NGZkN2E2N2Q0NjZhNDdiMhIIaXBob25lX2kaBXBob25lIOS7sCEqBWFwcGxlMiRZMjQzMEMyOTM1OTI1NjAxNEMyQ0E5QkU3RTNBN0YyQzdGMjk6A2lvcw==","x-bili-fawkes-req-bin":"CghpcGhvbmVfaRIEcHJvZBoQZmZmZmZmZmYwYTM0MDZhNA=="};

headers['Cookie'] = modifiedheaders.Cookie;
headers['Authorization'] =  modifiedheaders.Authorization;
headers['User-Agent'] = modifiedheaders['User-Agent'];
headers['x-bili-locale-bin'] = modifiedheaders['x-bili-locale-bin'];
headers['x-bili-device-bin'] = modifiedheaders['x-bili-device-bin'];
headers['x-bili-metadata-bin'] = modifiedheaders['x-bili-metadata-bin'];
headers['x-bili-fawkes-req-bin'] = modifiedheaders['x-bili-fawkes-req-bin'];

$done({ 'headers': headers });
