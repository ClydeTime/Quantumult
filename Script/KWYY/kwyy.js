/******************************

脚本功能：酷我音乐+解锁VIP【广告➕VIP➕数字➕下载】
更新日期：2023-01-01
软件版本：10.3.9
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************
[rewrite_local]

^https?:\/\/.*\.(kuwo|lrts)\.(cn|me)\/(a\.p|music\.pay|viptab|(vip\/(v2|enc)\/(theme|user\/vip|userbase\/vip\?op\=getMCInfo))|(EcomResource|(Mobile)?Ad)Serv(er|ice)).* url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/KWYY/kwyy_crack.js

[mitm] 

hostname = *.kuwo.cn, *.lrts.me

********************************/
