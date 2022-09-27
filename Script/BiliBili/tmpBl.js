/*
[rewrite_local]

^https?:\/\/ap(i|p)\.bilibili\.com\/bilibili\.\w{3,9}\..+\/(View|PlayView|DmView|Window|DynSpace|UserPreference|SuggestEmotes|DmSegMobile|PlayConf|PlayerOnline|MainList|ViewProgress)$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/tmpBl.js
^https:\/\/(api|app)\.bilibili\.com\/x\/(vip|v2)\/(space|account|web|price|top_panel_info)(\/|\?)(mine|myinfo|access|vip_center|panel|_bridge).* url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili_info.js

[mitm] 

hostname = *.bilibili.*, 124.239.240.*, 101.89.57.66, 218.94.210.66, 240e:b1:9801:206:11:0:0:*

*/

var headers = $request['headers'];
headers['Cookie'] = '_uuid=F3C4755B-D66F-4238-1388-312DCAB6810B560840infoc; b_nut=1663775361; buvid3=FEA83920-6F31-EC5C-D929-2753F0DAECC960970infoc; buvid4=0B85906E-33CB-98E9-6F7C-077475B055C060970-122092123-o3RWjav/umhY+1MdlDVPeA%3D%3D; buvid_fp=76d3698460b36ff009b3796d54bb0460; PVID=2; Buvid=ZC4147CFB1A9154740EFAB429F1FE215383E; DedeUserID=18866638; DedeUserID__ckMd5=068cecaa89d60c4c; SESSDATA=6787263b%2C1679622099%2C998bed91; bili_jct=f2d8b22381fb848ca8d371aae557672d; sid=7a8ab1af';
headers['Authorization'] = 'identify_v1 8a3d5913ef4b6d8a84de10b1e11fdb91';
headers['User-Agent'] = 'bili-universal/70000100 os/ios model/iPhone 12 Pro Max mobi_app/iphone osVer/16.0.2 network/2';
headers['x-bili-locale-bin'] = 'Eg4KAnpoEgRIYW5zGgJDTg==';
headers['x-bili-device-bin'] = 'CAEQ5LuwIRokWkM0MTQ3Q0ZCMUE5MTU0NzQwRUZBQjQyOUYxRkUyMTUzODNFIgZpcGhvbmUqA2lvczIFcGhvbmU6BWFwcGxlQgVBcHBsZUoRaVBob25lIDEyIFBybyBNYXhSBjE2LjAuMmoFNy4wLjByQDk0MDZGODJEMkJFMEI3NEI3MEI4MDhDQTVDQTNERTY4MjAxOTA5MTQxNDM3MzBGRUQ4MzI0Njc5M0VBNkVDNzN4v6Oyg+Au';
headers['x-bili-metadata-bin'] = 'CiA4YTNkNTkxM2VmNGI2ZDhhODRkZTEwYjFlMTFmZGI5MRIGaXBob25lGgVwaG9uZSDku7AhKgVhcHBsZTIkWkM0MTQ3Q0ZCMUE5MTU0NzQwRUZBQjQyOUYxRkUyMTUzODNFOgNpb3M=';
headers['x-bili-fawkes-req-bin'] = 'CgZpcGhvbmUSBHByb2QaCDU1YTdjZWIy';
$done({ 'headers': headers });
