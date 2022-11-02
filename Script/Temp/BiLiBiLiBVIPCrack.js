/*
脚本功能：哔哩哔哩解锁大会员
软件版本：6.90.0
更新时间：2022-10-31
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]
# > 哔哩哔哩大会员
^https?:\/\/ap(i|p)\.bilibili\.com\/bilibili\.\w{3,9}\..+\/(View|Play(URL|View|Conf|erOnline)|MainList|ViewProgress)$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Temp/BiLiBiLiBVIPCrack.js
[mitm] 
hostname = *.bilibili.com, 124.239.240.*, 101.89.57.66, 218.94.210.66, 240e:b1:9801:206:11:0:0:*
*/

var headers = $request['headers'];
headers['Cookie'] = 'DedeUserID=400825589; DedeUserID__ckMd5=74eca1c0cd603ce4; SESSDATA=a83cd0d7%2C1682772575%2C25a814a2; bili_jct=3b92aaaced567a3678ae817a03f1c730; sid=q5lgiz12';
headers['Authorization'] = 'identify_v1 3b723486e6cae13db7d53514486e49a2';
headers['User-Agent'] = 'bili-inter/70000100 os/ios model/iPhone XR mobi_app/iphone_i osVer/15.6.1 network/2';
headers['x-bili-locale-bin'] = 'Eg4KAnpoEgRIYW5zGgJUVw==';
headers['x-bili-device-bin'] = 'CA4Q5LuwIRokWTI0MzBDMjkzNTkyNTYwMTRDMkNBOUJFN0UzQTdGMkM3RjI5IghpcGhvbmVfaSoDaW9zMgVwaG9uZToFYXBwbGVCBUFwcGxlSglpUGhvbmUgWFJSBjE1LjYuMWoGMy4xNC4wckBEMzc1RjFGMDI5NjQ4MkFFQjUzOTYwOTZDQkI4RkFBNDIwMTkwOTE0MjMyNDU1OTk1QzA1MTcwMEY3QzRDQjc0eJW9/+7BMA==';
headers['x-bili-metadata-bin'] = 'CiAzYjcyMzQ4NmU2Y2FlMTNkYjdkNTM1MTQ0ODZlNDlhMhIIaXBob25lX2kaBXBob25lIOS7sCEqBWFwcGxlMiRZMjQzMEMyOTM1OTI1NjAxNEMyQ0E5QkU3RTNBN0YyQzdGMjk6A2lvcw==';
headers['x-bili-fawkes-req-bin'] = 'CghpcGhvbmVfaRIEcHJvZBoQZmZmZmZmZmY2ZjAxYjZlYw==';
$done({ 'headers': headers });
