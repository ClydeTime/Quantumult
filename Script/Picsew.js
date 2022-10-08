/******************************

脚本功能：Picsew滚动截图+解锁订阅
Author：彭于晏
软件版本：3.8.6
更新时间：2022-10-8
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/buy\.itunes\.apple\.com\/verifyReceipt url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Picsew.js

[mitm] 
hostname = buy.itunes.apple.com

*******************************/

var body = body = JSON.parse($response.body);

body = {
    receipt:
    {
        receipt_type: "Production",
        adam_id: 1208145167,
        app_item_id: 1208145167,
        bundle_id: "com.sugarmo.ScrollClip",
        application_version: "3082",
        download_id: 9999,
        version_external_identifier: 837747342,
        receipt_creation_date: "2020-01-01 00:00:00 Etc/GMT",
        receipt_creation_date_ms: "1587700000000",
        receipt_creation_date_pst: "2020-01-01 00:00:00 America/Los_Angeles",
        request_date: "2020-01-01 00:00:00 Etc/GMT",
        request_date_ms: "1587700000000",
        request_date_pst: "2020-01-01 00:00:00 America/Los_Angeles",
        original_purchase_date: "2020-01-01 00:00:00 Etc/GMT",
        original_purchase_date_ms: "1587700000000",
        original_purchase_date_pst: "2020-01-01 00:00:00 America/Los_Angeles",
        original_application_version: "3082",
        in_app:
        [
            {
                quantity: "1",
                product_id: "com.sugarmo.ScrollClip.pro",
                transaction_id: "1000000000000000",
                original_transaction_id: "1000000000000000",
                purchase_date: "2020-01-01 00:00:00 Etc/GMT",
                purchase_date_ms: "1587700000000",
                purchase_date_pst: "2020-01-01 00:00:00 America/Los_Angeles",
                original_purchase_date: "2020-01-01 00:00:00 Etc/GMT",
                original_purchase_date_ms: "1587700000000",
                original_purchase_date_pst: "2020-01-01 00:00:00 America/Los_Angeles",
                is_trial_period: "false"
            }
        ]
    },
    status: 0,
    environment: "Production"
}

$done({ body: JSON.stringify(body) });
