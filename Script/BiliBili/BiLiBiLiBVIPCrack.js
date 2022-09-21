/*
 *
 *
脚本功能：哔哩哔哩解锁大会员
软件版本：6.90.0
更新时间：2022-09-20
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

# > 哔哩哔哩解锁大会员
^https?:\/\/ap(i|p)\.bilibili\.com\/bilibili\.\w{3,4}\..+\/(View|PlayView|DmView|Window|DynSpace|UserPreference|SuggestEmotes|DmSegMobile|PlayConf|PlayerOnline|MainList|ViewProgress)$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/BiLiBiLiBVIPCrack.js
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/mine\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili.js
^https:\/\/app\.bilibili\.com\/x\/v2\/space\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili2.js
^https:\/\/api\.bilibili\.com\/x\/vip\/web\/vip_center\/ url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili3.js
^https:\/\/api\.bilibili\.com\/x\/vip\/price\/panel\/ url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili4.js
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/biliCrack.js

[mitm] 

hostname = *.bili*.*, 124.239.240.*, 101.89.57.66, 218.94.210.66, 240e:b1:9801:206:11:0:0:*
*
*
*/

var modifiedHeaders = $request['headers'];
modifiedHeaders['Cookie'] = 'Buvid=ZC4147CFB1A9154740EFAB429F1FE215383E; DedeUserID=18866638; DedeUserID__ckMd5=068cecaa89d60c4c; SESSDATA=8611887c%2C1679225351%2Ccf5fea91; bili_jct=03dc098ee4b9c1a73b63e704cdee569f; sid=6b4nlvk9';
modifiedHeaders['Authorization'] = 'identify_v1 b01dfd8d053ab64187aa3697410a2591';
modifiedHeaders['User-Agent'] = 'bili-universal/69000100 os/ios model/iPhone 12 Pro Max mobi_app/iphone osVer/16.0 network/2';
modifiedHeaders['x-bili-locale-bin'] = 'Eg4KAnpoEgRIYW5zGgJDTg==';
modifiedHeaders['x-bili-device-bin'] = 'CAEQpLfzIBokWkM0MTQ3Q0ZCMUE5MTU0NzQwRUZBQjQyOUYxRkUyMTUzODNFIgZpcGhvbmUqA2lvczIFcGhvbmU6BWFwcGxlQgVBcHBsZUoRaVBob25lIDEyIFBybyBNYXhSBDE2LjBqBjYuOTAuMHJAOTQwNkY4MkQyQkUwQjc0QjcwQjgwOENBNUNBM0RFNjgyMDE5MDkxNDE0MzczMEZFRDgzMjQ2NzkzRUE2RUM3M3i/o7KD4C4=';
modifiedHeaders['x-bili-metadata-bin'] = 'CiBiMDFkZmQ4ZDA1M2FiNjQxODdhYTM2OTc0MTBhMjU5MRIGaXBob25lGgVwaG9uZSCkt/MgKgVhcHBsZTIkWkM0MTQ3Q0ZCMUE5MTU0NzQwRUZBQjQyOUYxRkUyMTUzODNFOgNpb3M=';
modifiedHeaders['x-bili-fawkes-req-bin'] = 'CgZpcGhvbmUSBHByb2QaEGZmZmZmZmZmMDE3OTg0MDM=';
$done({ 'headers': modifiedHeaders });
