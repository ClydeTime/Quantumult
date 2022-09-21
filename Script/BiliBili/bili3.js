/*
[rewrite_local]
^https:\/\/api\.bilibili\.com\/x\/vip\/web\/vip_center\/ url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili3.js

[mitm]
hostname= *.bilibili.*
*/


var body = JSON.parse($response.body);

body.data.user = {
      panel_title: body.data.user.panel_title.toString(),
      vip: {
        mid: body.data.user.vip.mid,
        theme_type: 0,
        label: {
          img_label_uri_hans_static: "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
          use_img_label: true,
          img_label_uri_hant_static: "https://i0.hdslb.com/bfs/activity-plat/static/20220614/e369244d0b14644f5e1a06431e22a4d5/VEW8fCC0hg.png",
          bg_color: "#FB7299",
          bg_style: 1,
          text: "年度大会员",
          border_color: "",
          img_label_uri_hans: "",
          img_label_uri_hant: "",
          label_theme: "annual_vip",
          text_color: "#FFFFFF"
        },
        vip_pay_type: 0,
        vip_due_date: 4102329600000,
        avatar_subscript: 1,
        is_new_user: false,
        tip_material: null,
        vip_type: 2,
        avatar_subscript_url: "https://i0.hdslb.com/bfs/vip/icon_Certification_big_member_22_3x.png",
        vip_status: 1,
        nickname_color: "#FB7299"
      },
      account_exception_text: "",
      vip_keep_time: 946656000,
      notice: {
        tv_text: "",
        surplus_seconds: 0,
        tv_surplus_seconds: 0,
        type: 0,
        can_close: false,
        text: ""
      },
      background_image_small: "",
      is_auto_renew: false,
      panel_sub_title: "",
      tv: {
        vip_pay_type: 0,
        status: 1,
        type: 1,
        due_date: 4102329600000
      },
      background_image_big: "",
      vip_overdue_explain: "年度大会员有效期 2099/12/31",
      tv_overdue_explain: "超级大会员有效期 2099/12/31",
      renew: {
        link: "",
        text: ""
      },
      surplus_seconds: body.data.user.surplus_seconds,
      account: {
        is_senior_member: body.data.user.account.is_senior_member,
        is_fake_account: body.data.user.account.is_fake_account,
        mid: body.data.user.account.mid,
        in_reg_audit: body.data.user.account.in_reg_audit,
        birthday: body.data.user.account.birthday,
        face: body.data.user.account.face.toString(),
        rank: 10000,
        is_deleted: body.data.user.account.is_deleted,
        sex: body.data.user.account.sex.toString(),
        name: body.data.user.account.name.toString(),
        sign: ""
      },
      avatar_pendant: null,
      is_tv_auto_renew: false
};
$done({ body: JSON.stringify(body) });
