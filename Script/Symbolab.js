/******************************

脚本功能：Symbolab 解锁高级功能 (需登录)
更新时间：2022-9-29
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https?:\/\/scibug\.com\/appleSubscriptionValidate$ url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Symbolab.js

[mitm] 

hostname = scibug.com

*******************************/

let body = JSON.parse($response.body);

body = {"valid":true,"hasUserConsumedAppleFreeTrial":false,"isCurrentlyInFreeTrial":false,"newlyAssociated":false,"membership":{"isCurrentlyInFreeTrial":false,"valid":true,"hasUserConsumedAppleFreeTrial":false,"newlyAssociated":false}}

$done({ body: JSON.stringify(obj) });
