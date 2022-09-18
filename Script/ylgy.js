/*************************************

羊了个羊通关999次
日期:2022.09.19

[rewrite_local]
^https:\/\/cat-match\.easygame2021\.com\/sheep\/v1\/game\/personal_info url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/ylgy.js
hostname = cat-match.easygame2021.com
**************************************/

var body = $response["body"]["replace"](
  /daily_count":\d+/g,
  "daily_count\x22:999"
);
$done({ body: body });
