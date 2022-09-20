/*
 *
 *
脚本功能：哔哩哔哩解锁大会员
软件版本：6.58.0
下载地址：http://t.cn/AiOqwnn1
脚本作者：Hausd0rff
更新时间：2022-01-18
脚本发布：https://t.me/yqc_123
问题反馈：https://t.me/yqc_777
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

# > 哔哩哔哩解锁大会员
^https?:\/\/ap(i|p)\.bilibili\.com\/bilibili\.\w{3,4}\..+\/(View|PlayView|PlayConf|PlayerOnline|MainList|ViewProgress)$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiLiBiLiBVIPCrack.js
[mitm] 

hostname = *.bili*.*, 124.239.240.*, 101.89.57.66, 218.94.210.66, 240e:b1:9801:206:11:0:0:*
*
*
*/

var modifiedHeaders = $request['headers'];
modifiedHeaders['Cookie'] = '_uuid=4A3CE9C2-1078-A30A-19EA-C22B81664B6B63925infoc; buvid3=760FCB2E-CE9A-4A71-AACC-155BB626B652148806infoc; Buvid=Y24D822FB1AA2A704A7E98D6D7DBADFAC7AB; sid=je9bz5k2; SESSDATA=fddb001c%2C1658059735%2C843ca711; bili_jct=c669d4cf4eb0fbbb7d2f7db9b493856f; DedeUserID=1054839627; DedeUserID__ckMd5=79cbf5b08990c190';
modifiedHeaders['Authorization'] = 'identify_v1 ff14d9063a2ebd1f0eac2d5fb475a511';
modifiedHeaders['User-Agent'] = 'bili-universal/65600100 os/ios model/iPhone 11 mobi_app/iphone osVer/14.2 network/1';
modifiedHeaders['x-bili-locale-bin'] = 'Eg4KAnpoEgRIYW5zGgJDTg==';
modifiedHeaders['x-bili-device-bin'] = 'CAEQ5PSjHxokWTI0RDgyMkZCMUFBMkE3MDRBN0U5OEQ2RDdEQkFERkFDN0FCIgZpcGhvbmUqA2lvczIFcGhvbmU6BWFwcGxlQgVBcHBsZUoJaVBob25lIDExUgQxNC4yagY2LjU2LjByQERFNDUwRkM1NjA5MUVCNUE5NEUyQkYwRDUwRDcxOERFMjAyMTAyMTYxNzQzMTM5ODExMjlCNUY0QjJCMzM2Njh43u+Lm+Yv';
modifiedHeaders['x-bili-metadata-bin'] = 'CiBmZjE0ZDkwNjNhMmViZDFmMGVhYzJkNWZiNDc1YTUxMRIGaXBob25lGgVwaG9uZSDk9KMfKgVhcHBsZTIkWTI0RDgyMkZCMUFBMkE3MDRBN0U5OEQ2RDdEQkFERkFDN0FCOgNpb3M=';
modifiedHeaders['x-bili-fawkes-req-bin'] = 'CgZpcGhvbmUSBHByb2QaCDRkNTRhZDc5';
$done({ 'headers': modifiedHeaders });
