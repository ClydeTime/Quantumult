/******************************

脚本功能：扫描全能王-手机扫描仪+解锁VIP
更新时间：2022-9-9
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/smqnw.js

[mitm]

hostname = ap*.intsig.net

**************************/

let body = JSON[parse]($response[body]);
body[data]["psnl_vip_property"] = {
      "product_id" : "com.intsig.camscanner.premiums.oneyear.autorenewable.svip.low",
      "initial_tm" : "1614867690",
      "svip" : 1,
      "auto_renewal" : true,
      "ms_first_pay" : 0,
      "pending" : 0,
      "group2_paid" : 0,
      "inherited_flag" : 0,
      "nxt_renew_tm" : "1614867690",
      "level_info" : {
        "level" : 1,
        "days" : 1,
        "end_days" : 30
      },
      "group1_paid" : 1,
      "ys_first_pay" : 0,
      "renew_type" : "year",
      "expiry" : 8487890487,
      "grade" : 2,
      "renew_method" : "appstore",
      "last_payment_method" : "appstore"
};
$done({ body: JSON[stringify](body) });
