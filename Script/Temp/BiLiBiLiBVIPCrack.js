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
hostname = *.bilibili.com, 124.239.240.*, 101.89.57.66, 218.94.210.66, 120.192.82.76, 240e:b1:9801:206:11:0:0:*
*/

var headers = $request['headers'];
headers['Cookie'] = 'DedeUserID=18866638; DedeUserID__ckMd5=068cecaa89d60c4c; SESSDATA=eede2898%2C1682474864%2C75d3efa1; bili_jct=97ade97115e35dc530a50841ecc2dd0e; sid=5uihjy9l';
headers['Authorization'] = 'identify_v1 9510f95f856e6051642a055c98ef53a1';
headers['User-Agent'] = 'bili-universal/70200100 os/ios model/iPad mini 5G mobi_app/iphone osVer/15.5 network/2';
headers['x-bili-locale-bin'] = 'Eg4KAnpoEgRIYW5zGgJKUA==';
headers['x-bili-device-bin'] = 'CAEQpNa8IRokWkQ0MjcwREM5NTg5N0JFNjRBM0JCNzgwN0YyNDVDNThCNkQ5IgZpcGhvbmUqA2lvczIDcGFkOgVhcHBsZUIFQXBwbGVKDGlQYWQgbWluaSA1R1IEMTUuNWoFNy4yLjByQDJDMTBCQjNBNTAzQjE4REFCQTQxRjI5MUU5MzFFM0QzMjAxOTA5MzAxNzIyMjE0QzBCQTBEMzI1NjRGMzJFM0N4r8Gh4ewt';
headers['x-bili-metadata-bin'] = 'CiA5NTEwZjk1Zjg1NmU2MDUxNjQyYTA1NWM5OGVmNTNhMRIGaXBob25lGgNwYWQgpNa8ISoFYXBwbGUyJFpENDI3MERDOTU4OTdCRTY0QTNCQjc4MDdGMjQ1QzU4QjZEOToDaW9z';
headers['x-bili-fawkes-req-bin'] = 'CgZpcGhvbmUSBHByb2QaCGFjMDVkNWE5';
$done({ 'headers': headers });
