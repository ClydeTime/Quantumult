/******************************

脚本功能：扫描全能王-手机扫描仪+解锁VIP
更新时间：2022-9-19
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/smqnw.js
[mitm]

hostname = ap*.intsig.net

**************************/

let body = JSON[parse]($response[body]);
body[data]["psnl_vip_property"] = {
  renew_method: appstore,
  initial_tm: 1614867690,
  svip: 0x1,
  auto_renewal: !![],
  ms_first_pay: 0x0,
  pending: 0x0,
  group2_paid: 0x0,
  inherited_flag: 0x0,
  nxt_renew_tm: "9915126887",
  level_info: { level: 0x1, days: 0x1, end_days: 0x1e },
  group1_paid: 0x1,
  ys_first_pay: 0x0,
  renew_type: year,
  expiry: 0x1f9eaee37,
  grade: 0x2,
  last_payment_method: appstore,
  product_id: com.intsig.camscanner.premiums.oneyear.autorenewable.svip.low
};
$done({ body: JSON[stringify](body) });
