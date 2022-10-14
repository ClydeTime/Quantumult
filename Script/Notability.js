/******************************

脚本功能：Notability +解锁订阅
更新时间：2022-10-14
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️


*******************************

[rewrite_local]


^https?:\/\/notability\.com\/subscriptions url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Notability.js

[mitm] 

hostname = notability.com

*******************************/

var body = JSON["parse"]($response["body"]);
var modifiedStatus = "HTTP/1.1 200 OK";
body = {
  data: {
    processAppleReceipt: {
      __typename: "SubscriptionResult",
      error: 0x0,
      subscription: {
        __typename: "AppStoreSubscription",
        status: "active",
        originalPurchaseDate: "2022-01-01T00:00:00.000Z",
        originalTransactionId: "12345987654321",
        expirationDate: "2099-12-31T11:59:59.000Z",
        productId: "com.yqc.premium_subscription",
        tier: "premium",
        refundedDate: null,
        refundedReason: null,
        user: null
      }
    }
  }
};
$done({ status: modifiedStatus, body: JSON["stringify"](body) });
