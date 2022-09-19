/******************************

脚本功能：扫描全能王-手机扫描仪+解锁VIP
更新时间：2022-9-19
使用声明：⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️

*******************************

[rewrite_local]

^https:\/\/(api|api-cs)\.intsig\.net\/purchase\/cs\/query_property\?.+\%(7CCamScanner_Pdfword%) url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/smqnw_2.js

[mitm]

hostname = ap*.intsig.net

**************************/

var body = JSON.parse($response.body);
body["data"] = {
    watchad_vip_chance_total : "999",
    pdfword_balance : "0",
    points_exchange_cfgrs : {
      CamScanner_ID_Card_Credit : 500,
      CamScanner_Pdf2ppt : 500,
      CamScanner_Sign : 500,
      CamScanner_ID_Card_Authenticity : 500,
      CamScanner_Excel : 500,
      CamScanner_Watermarks : 50,
      CamScanner_Pdf2excel : 500,
      CamScanner_CertMode : 200,
      CamScanner_Profile_Card_Format : 500,
      CamScanner_Pdfword : 500,
      CamScanner_CloudCap_1G : 1000,
      CamScanner_CloudOCR : 50,
      CamScanner_Translation : 50,
      CamScanner_AlbumImport : 300
    },
    vip_imagerestore_balance : 1000,
    removead : "0",
    dir : {
      license_total_num : 1000,
      vip_total_num : 5000,
      user_total_num : 8,
      total_num : 8,
      license_layer_num : 4,
      user_layer_num : 4,
      single_layer_num : 3,
      new_layer_num : 4,
      advanced_folder_num : 1000,
      normal_vip_layer_num : 6,
      edu_total_num : 1000,
      edu_layer_num : 6,
      vip_layer_num : 6,
      normal_vip_total_num : 10,
      advanced_folder_layer : 6
    },
    balance_recolor : 999,
    no_login_ocr_balance : "2",
    used_points : "0",
    patting_balance : "3",
    bookmode_balance : 999,
    watchad_vip_chance : "3",
    balance_demoire : 998,
    CamScanner_RoadMap : "0",
    vip_balance_recolor : 1000,
    watermarks_balance : 0,
    immt_expy_points : "0",
    server_time : body.data.server_time.toString(),
    points : "9999",
    fax_balance : "0",
    CamScanner_Erase : 1000,
    greetcard_list : {
      CamScanner_NONVIP_PayGreetCard_1 : "0",
      greeting_card_6 : "0",
      greeting_card_2 : "0",
      CamScanner_NONVIP_PayGreetCard_2 : "0",
      CamScanner_PayGreetCard_3 : "0",
      CamScanner_NONVIP_PayGreetCard_3 : "0",
      greeting_card_9 : "0",
      greeting_card_5 : "0",
      CamScanner_PayGreetCard_6 : "0",
      CamScanner_PayGreetCard_1 : "0",
      greeting_card_1 : "0",
      greeting_card_10 : "0",
      greeting_card_4 : "0",
      CamScanner_PayGreetCard_4 : "0",
      CamScanner_PayGreetCard_2 : "0",
      greeting_card_3 : "0",
      greeting_card_11 : "0",
      CamScanner_PayGreetCard_5 : "0"
    },
    cert_mode_balance : 0,
    trans_balance : "999",
    login_ocr_balance : "10",
    upload_pdf_balance : "5",
    excel_balance : "1",
    imagerestore_balance : 999,
    ocr_balance : 999,
    psnl_vip_property : {
      product_id : "com.intsig.camscanner.premiums.oneyear.autorenewable.svip.low",
      initial_tm : "1614867690",
      svip : 1,
      auto_renewal : true,
      ms_first_pay : 0,
      pending : 0,
      group2_paid : 0,
      inherited_flag : 0,
      nxt_renew_tm : "9915126887",
      level_info : {
        level : 1,
        days : 1,
        end_days : 30
      },
      group1_paid : 1,
      ys_first_pay : 0,
      renew_type : "year",
      expiry : 8487890487,
      grade : 2,
      renew_method : "appstore",
      last_payment_method : "appstore"
    }    
};

$done({ body: JSON.stringify(body) });
