/*
[rewrite_local]

^https?:\/\/ap(i|p)\.bilibili\.com\/bilibili\.\w{3,9}\..+\/(View|PlayView|DmView|Window|DynSpace|UserPreference|SuggestEmotes|DmSegMobile|PlayConf|PlayerOnline|MainList|ViewProgress)$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/tmpBl.js
^https:\/\/(api|app)\.bilibili\.com\/x\/(vip|v2)\/(space|account|web|price|top_panel_info)(\/|\?)(mine|myinfo|access|vip_center|panel|_bridge).* url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili_info.js

[mitm] 

hostname = *.bilibili.*, 124.239.240.*, 101.89.57.66, 218.94.210.66, 240e:b1:9801:206:11:0:0:*

*/

var headers = $request['headers'];
headers['Cookie'] = 'DedeUserID=18866638; DedeUserID__ckMd5=068cecaa89d60c4c; SESSDATA=24c3fca6%2C1679901762%2C4550c191; bili_jct=810a69cb600994784543a80bb0da23f1; sid=glqs3j34';
headers['Authorization'] = 'identify_v1 078f61f29927dc8506c99715418b3b91';
headers['User-Agent'] = 'bili-universal/70000100 os/ios model/iPad mini 5G mobi_app/iphone osVer/15.5 network/2';
headers['x-bili-locale-bin'] = 'Eg4KAnpoEgRIYW5zGgJDTg==';
headers['x-bili-device-bin'] = 'CAEQ5LuwIRokWkQ0MjcwREM5NTg5N0JFNjRBM0JCNzgwN0YyNDVDNThCNkQ5IgZpcGhvbmUqA2lvczIDcGFkOgVhcHBsZUIFQXBwbGVKDGlQYWQgbWluaSA1R1IEMTUuNWoFNy4wLjByQDJDMTBCQjNBNTAzQjE4REFCQTQxRjI5MUU5MzFFM0QzMjAxOTA5MzAxNzIyMjE0QzBCQTBEMzI1NjRGMzJFM0N4r8Gh4ewt';
headers['x-bili-metadata-bin'] = 'CiAwNzhmNjFmMjk5MjdkYzg1MDZjOTk3MTU0MThiM2I5MRIGaXBob25lGgNwYWQg5LuwISoFYXBwbGUyJFpENDI3MERDOTU4OTdCRTY0QTNCQjc4MDdGMjQ1QzU4QjZEOToDaW9z';
headers['x-bili-fawkes-req-bin'] = 'CgZpcGhvbmUSBHByb2QaEGZmZmZmZmZmYmJmODhiNmM=';
$done({ 'headers': headers });
