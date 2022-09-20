/*

[rewrite_local]
#哔哩哔哩解锁大会员
^http[s]?:\/\/((app|api)\.(\w{2,15})?\.(com|cn)).*player\.(v3|v2|v1).Play(URL|View).*$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/bili.js

[mitm]
hostname = *.biliapi.*, *.bilibili.*

*/


var modifiedHeaders = $request["headers"];
modifiedHeaders["Cookie"] =
  "_Buvid=Z04E330E0ADFD448408FA478A2E60C96172E; DedeUserID=384127042; DedeUserID__ckMd5=21c826fd6926210b; SESSDATA=308c078a%2C1653738849%2Cc7f2b8b1; _uuid=A8914705-059E-1EBC-DED2-7FD50AB94D1155393infoc; bili_jct=dd2215f4cea82d0e909ff4bbd6ca2172; buvid3=3F3E5548-60E2-4800-AB84-58FAA2478659167636infoc; sid=k0tuhr3t";
modifiedHeaders["Authorization"] = "identify_v1 3089061bf279afc4533b1c902beb6bb1";
modifiedHeaders["x-bili-device-bin"] =
  "CAEQpKX/HhokWjA0RTMzMEUwQURGRDQ0ODQwOEZBNDc4QTJFNjBDOTYxNzJFIgZpcGhvbmUqA2lvczIFcGhvbmU6BWFwcGxlQgVBcHBsZUoRaVBob25lIDEyIFBybyBNYXhSBDE0LjNqBjYuNTAuMHJAMTNCMzY4N0ZCNzk5RTUwM0RFNUUxMTQyMDUzRkRBNTgyMDIxMDIyMTIyMjM0MTM5Mjc3MEZBMTE1OEQyNzA0OQ==";
modifiedHeaders["User-Agent"] =
  "bili-universal/65000100 os/ios model/iPhone 12 Pro Max mobi_app/iphone osVer/14.3 network/1";
$done({ headers: modifiedHeaders });
