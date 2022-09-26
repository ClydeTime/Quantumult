/*
 *
 *
脚本功能：哔哩哔哩解锁大会员
软件版本：6.90.0
更新时间：2022-09-26
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

# > 哔哩哔哩大会员
^https?:\/\/ap(i|p)\.bilibili\.com\/bilibili\.\w{3,9}\..+\/(View|PlayView|DmView|Window|DynSpace|UserPreference|SuggestEmotes|DmSegMobile|PlayConf|PlayerOnline|MainList|ViewProgress)$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/BiLiBiLiBVIPCrack.js
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/myinfo\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/biliCrack.js
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/mine\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili.js
^https:\/\/app\.bilibili\.com\/x\/v2\/space\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili2.js
^https:\/\/api\.bilibili\.com\/x\/vip\/web\/vip_center\/ url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili3.js
^https:\/\/api\.bilibili\.com\/x\/vip\/price\/panel\/ url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili4.js
^https:\/\/api\.bilibili\.com\/x\/vip\/top_panel_info\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili5.js

[mitm] 

hostname = *.bili*.*, 124.239.240.*, 101.89.57.66, 218.94.210.66, 240e:b1:9801:206:11:0:0:*
*
*
*/

var modifiedHeaders = $request['headers'];
modifiedHeaders['Cookie'] = '_uuid=F3C4755B-D66F-4238-1388-312DCAB6810B560840infoc; b_nut=1663775361; buvid3=FEA83920-6F31-EC5C-D929-2753F0DAECC960970infoc; buvid4=0B85906E-33CB-98E9-6F7C-077475B055C060970-122092123-o3RWjav/umhY+1MdlDVPeA%3D%3D; buvid_fp=76d3698460b36ff009b3796d54bb0460; PVID=2; Buvid=ZC4147CFB1A9154740EFAB429F1FE215383E; DedeUserID=18866638; DedeUserID__ckMd5=068cecaa89d60c4c; SESSDATA=6787263b%2C1679622099%2C998bed91; bili_jct=f2d8b22381fb848ca8d371aae557672d; sid=7a8ab1af';
modifiedHeaders['Authorization'] = 'identify_v1 8a3d5913ef4b6d8a84de10b1e11fdb91';
modifiedHeaders['User-Agent'] = 'bili-universal/70000100 os/ios model/iPhone 12 Pro Max mobi_app/iphone osVer/16.0.2 network/2';
modifiedHeaders['x-bili-locale-bin'] = 'Eg4KAnpoEgRIYW5zGgJDTg==';
modifiedHeaders['x-bili-device-bin'] = 'CAEQ5LuwIRokWkM0MTQ3Q0ZCMUE5MTU0NzQwRUZBQjQyOUYxRkUyMTUzODNFIgZpcGhvbmUqA2lvczIFcGhvbmU6BWFwcGxlQgVBcHBsZUoRaVBob25lIDEyIFBybyBNYXhSBjE2LjAuMmoFNy4wLjByQDk0MDZGODJEMkJFMEI3NEI3MEI4MDhDQTVDQTNERTY4MjAxOTA5MTQxNDM3MzBGRUQ4MzI0Njc5M0VBNkVDNzN4v6Oyg+Au';
modifiedHeaders['x-bili-metadata-bin'] = 'CiA4YTNkNTkxM2VmNGI2ZDhhODRkZTEwYjFlMTFmZGI5MRIGaXBob25lGgVwaG9uZSDku7AhKgVhcHBsZTIkWkM0MTQ3Q0ZCMUE5MTU0NzQwRUZBQjQyOUYxRkUyMTUzODNFOgNpb3M=';
modifiedHeaders['x-bili-fawkes-req-bin'] = 'CgZpcGhvbmUSBHByb2QaCDU1YTdjZWIy';
$done({ 'headers': modifiedHeaders });
