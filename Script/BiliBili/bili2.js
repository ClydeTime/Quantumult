/*

[rewrite_local]
^https:\/\/app\.bilibili\.com\/x\/v2\/space\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili2.js

[mitm]

hostname= *.bilibili.*

*/

var body = JSON.parse($response.body);

body.data.card.fans = 9999999;
body.data.card.level_info.current_level = 6;
body.data.card.level_info.identity = 2;
body.data.card.likes.like_num = 9999999;
body.data.card.attention = 0;
body.data.card.level_info.current_min = 28800;
body.data.card.level_info.current_exp = 39900;
body.data.card.level_info.next_exp = "--";
body.data.card.space_tag_bottom[0].title = "IP属地：火星";


$done({ body: JSON.stringify(body) });
