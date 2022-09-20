/*

[rewrite_local]
^https:\/\/app\.bilibili\.com\/x\/v2\/account\/mine\? url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/bili.js

[mitm]

hostname= *.biliapi.*, *.bilibili.*

*/


var body = JSON.parse($response.body);
var obj = {
 code: 0,
 message: "0",
 ttl: 1,
 data: {
   bcoin: 0,
   enable_bili_link: true,
   achievement: {

    },
   silence: 0,
   show_creative: 1,
   level: 5,
   audio_type: 0,
   sections_v2: [
      {
       items: [
          {
           id: 396,
           title: "离线缓存",
           icon: "http://i0.hdslb.com/bfs/archive/5fc84565ab73e716d20cd2f65e0e1de9495d56f8.png",
           common_op_item: {

            },
           uri: "bilibili://user_center/download"
          },
          {
           id: 397,
           title: "历史记录",
           icon: "http://i0.hdslb.com/bfs/archive/8385323c6acde52e9cd52514ae13c8b9481c1a16.png",
           common_op_item: {

            },
           uri: "bilibili://user_center/history"
          },
          {
           id: 398,
           title: "我的收藏",
           icon: "http://i0.hdslb.com/bfs/archive/d79b19d983067a1b91614e830a7100c05204a821.png",
           common_op_item: {

            },
           uri: "bilibili://user_center/favourite"
          },
          {
           id: 399,
           title: "稍后再看",
           icon: "http://i0.hdslb.com/bfs/archive/63bb768caa02a68cb566a838f6f2415f0d1d02d6.png",
           need_login: 1,
           uri: "bilibili://user_center/watch_later",
           common_op_item: {

            }
          }
        ],
       style: 1,
       button: {

        }
      },
      {
       up_title: "创作中心",
       title: "创作中心",
       items: [
          {
           need_login: 1,
           display: 1,
           id: 171,
           title: "创作首页",
           global_red_dot: 1,
           uri: "bilibili://uper/homevc",
           icon: "http://i0.hdslb.com/bfs/archive/d3aad2d07538d2d43805f1fa14a412d7a45cc861.png"
          },
          {
           need_login: 1,
           display: 1,
           id: 570,
           title: "UP主推荐",
           global_red_dot: 1,
           uri: "https://member.bilibili.com/york/up-invitation/latest?navhide=1",
           icon: "http://i0.hdslb.com/bfs/feed-admin/621e25266b15b2bf311eeb4314e84310836bd4d6.png"
          },
          {
           need_login: 1,
           display: 1,
           id: 533,
           title: "任务中心",
           global_red_dot: 1,
           uri: "https://member.bilibili.com/york/mission-center?navhide=1",
           icon: "http://i0.hdslb.com/bfs/archive/ae18624fd2a7bdda6d95ca606d5e4cf2647bfa4d.png"
          },
          {
           need_login: 1,
           display: 1,
           id: 174,
           title: "有奖活动",
           red_dot: 1,
           global_red_dot: 1,
           uri: "https://member.bilibili.com/york/hot-activity",
           icon: "http://i0.hdslb.com/bfs/archive/7f4fa86d99bf3814bf10f8ee5d6c8c9db6e931c8.png"
          },
          {
           id: 707,
           title: "主播中心",
           icon: "http://i0.hdslb.com/bfs/feed-admin/48e17ccd0ce0cfc9c7826422d5e47ce98f064c2a.png",
           need_login: 1,
           uri: "https://live.bilibili.com/p/html/live-app-anchor-center/index.html?is_live_webview=1#/",
           display: 1
          },
          {
           id: 708,
           title: "主播活动",
           icon: "http://i0.hdslb.com/bfs/feed-admin/5bc5a1aa8dd4bc5d6f5222d29ebaca9ef9ce37de.png",
           need_login: 1,
           uri: "https://live.bilibili.com/activity/live-activity-full/activity_center/mobile.html?is_live_webview=1",
           display: 1
          },
          {
           id: 709,
           title: "BLS秋季赛",
           icon: "http://i0.hdslb.com/bfs/feed-admin/960f2a9085b0387079b1ed317b474526b76090fc.png",
           need_login: 1,
           uri: "https://live.bilibili.com/activity/live-activity-full/full-next/index.html?app_name=bls_autumn_2022&is_live_full_webview=1#/",
           display: 1
          },
          {
           id: 710,
           title: "我的直播",
           icon: "http://i0.hdslb.com/bfs/feed-admin/a9be4fa50ea4772142c1fc7992cde28294d63021.png",
           need_login: 1,
           uri: "https://live.bilibili.com/p/html/live-app-center/index.html?is_live_webview=1&foreground=pink&background=white",
           display: 1
          }
        ],
       style: 1,
       button: {
         icon: "http://i0.hdslb.com/bfs/archive/205f47675eaaca7912111e0e9b1ac94cb985901f.png",
         style: 1,
         url: "bilibili://uper/user_center/archive_selection",
         text: "发布"
        },
       type: 1
      },
      {
       title: "推荐服务",
       items: [
          {
           id: 400,
           title: "我的课程",
           icon: "http://i0.hdslb.com/bfs/archive/aa3a13c287e4d54a62b75917dd9970a3cde472e1.png",
           common_op_item: {

            },
           uri: "https://m.bilibili.com/cheese/mine?navhide=1&native.theme=1&night=0&spm_id_from=main.my-information.0.0.pv&csource=Me_myclass"
          },
          {
           id: 401,
           title: "看视频免流量",
           icon: "http://i0.hdslb.com/bfs/archive/393dd15a4f0a149e016cd81b55bd8bd6fe40882c.png",
           common_op_item: {

            },
           uri: "bilibili://user_center/free_traffic"
          },
          {
           id: 402,
           title: "个性装扮",
           icon: "http://i0.hdslb.com/bfs/archive/0bcad10661b50f583969b5a188c12e5f0731628c.png",
           common_op_item: {

            },
           uri: "https://www.bilibili.com/h5/mall/home?navhide=1&from=myservice"
          },
          {
           id: 404,
           title: "我的钱包",
           icon: "http://i0.hdslb.com/bfs/archive/f416634e361824e74a855332b6ff14e2e7c2e082.png",
           common_op_item: {

            },
           uri: "bilibili://bilipay/mine_wallet"
          },
          {
           id: 403,
           title: "游戏中心",
           icon: "http://i0.hdslb.com/bfs/archive/873e3c16783fe660b111c02ebc4c50279cb5db57.png",
           common_op_item: {

            },
           uri: "bilibili://game_center/user?sourceFrom=100003"
          },
          {
           id: 622,
           title: "会员购中心",
           icon: "http://i0.hdslb.com/bfs/archive/19c794f01def1a267b894be84427d6a8f67081a9.png",
           common_op_item: {

            },
           uri: "bilibili://mall/mine?msource=mine"
          },
          {
           id: 514,
           title: "社区中心",
           icon: "http://i0.hdslb.com/bfs/archive/551a39b7539e64d3b15775295c4b2e13e5513b43.png",
           need_login: 1,
           uri: "https://www.bilibili.com/blackboard/dynamic/169422",
           common_op_item: {

            }
          },
          {
           id: 924,
           title: "哔哩哔哩公益",
           icon: "http://i0.hdslb.com/bfs/feed-admin/a943016e8bef03222998b4760818894ba2bd5c80.png",
           common_op_item: {

            },
           uri: "https://love.bilibili.com/h5/?navhide=1&b=1"
          },
          {
           id: 1438,
           title: "充能领福利",
           red_dot_for_new: true,
           red_dot: 1,
           common_op_item: {

            },
           uri: "https://www.bilibili.com/blackboard/powerup.html?from=wode",
           icon: "http://i0.hdslb.com/bfs/archive/38b0cde1957be09598bb8e6e8194e13ec2da43fb.png"
          },
          {
           id: 968,
           title: "工房",
           icon: "http://i0.hdslb.com/bfs/feed-admin/73a9e08e4490c95c494e657920144b64802850c6.png",
           common_op_item: {

            },
           uri: "https://mall.bilibili.com/neul-next/index.html?page=mall-up_market&noTitleBar=1&msource=mine&for_model=mine_buyer"
          },
          {
           id: 990,
           title: "能量加油站",
           icon: "http://i0.hdslb.com/bfs/feed-admin/6acb0cb1f719703c62eb443ba6cf3abfc51164ab.png",
           common_op_item: {

            },
           uri: "https://www.bilibili.com/blackboard/dynamic/306424"
          },
          {
           id: 1521,
           title: "校园招聘",
           icon: "http://i0.hdslb.com/bfs/legacy/1637499766f3c5c8f7e889cd7f0498fa984b6a69.png",
           need_login: 1,
           uri: "https://www.bilibili.com/blackboard/campus/activity-uaI7eL1CZf.html",
           common_op_item: {

            }
          }
        ],
       style: 1,
       button: {

        }
      },
      {
       title: "更多服务",
       items: [
          {
           id: 407,
           title: "联系客服",
           icon: "http://i0.hdslb.com/bfs/archive/7ca840cf1d887a45ee1ef441ab57845bf26ef5fa.png",
           common_op_item: {

            },
           uri: "bilibili://user_center/feedback"
          },
          {
           id: 812,
           title: "听视频",
           icon: "http://i0.hdslb.com/bfs/feed-admin/97276c5df099e516946682edf4ef10dc6b18c7dc.png",
           common_op_item: {

            },
           uri: "bilibili://podcast",
           red_dot_for_new: true
          },
          {
           id: 964,
           title: "青少年守护",
           icon: "http://i0.hdslb.com/bfs/feed-admin/90f5920ac351da19c6451757ad71704fcea8192b.png",
           common_op_item: {

            },
           uri: "https://www.bilibili.com/h5/teenagers/home?navhide=1"
          },
          {
           id: 410,
           title: "设置",
           icon: "http://i0.hdslb.com/bfs/archive/e932404f2ee62e075a772920019e9fbdb4b5656a.png",
           common_op_item: {

            },
           uri: "bilibili://user_center/setting"
          }
        ],
       style: 2,
       button: {

        }
      }
    ],
   rank: 10000,
   follower: 1,
   mall_home: {
     uri: "https://www.bilibili.com/h5/mall/skin/setting?navhide=1&from=mine",
     icon: "https://i0.hdslb.com/bfs/vc/d09ca33f19ba9ba5a5a4ffe3c33d65a845ad88b7.png",
     title: "个性装扮"
    },
   dynamic: 0,
   show_nft_face_guide: false,
   show_name_guide: false,
   coin: 775,
   vip_section_v2: {
     id: 6465,
     title: "我的大会员",
     url: "https://big.bilibili.com/mobile/index?navhide=1&from_spmid=minetab&order_report_params=%7B%22exp_group_tag%22%3A%22def%22%2C%22exp_tag%22%3A%22def%22%2C%22material_type%22%3A%223%22%2C%22position_id%22%3A%223%22%2C%22request_id%22%3A%2250837b2dd4ac1454324827c96d1c9061%22%2C%22tips_id%22%3A%226465%22%2C%22unit_id%22%3A%222036%22%2C%22vip_status%22%3A%221%22%2C%22vip_type%22%3A%222%22%7D",
     desc: "热播内容看不停"
    },
   following: 47,
   sex: 1,
   show_videoup: 1,
   senior_gate: {
     birthday_conf: null,
     member_text: ""
    },
   bubbles: null,
   name: "这就进入我知识盲区了",
   new_followers: 0,
   new_followers_rtime: 5000,
   mid: 18866638,
   show_face_guide: false,
   in_reg_audit: 0,
   face: "http://i1.hdslb.com/bfs/face/6e49b6f3fdcacecb511be4c06467792fc7bbf236.jpg",
   live_tip: {
     button_icon: "",
     url_text: "立即参与",
     id: 1636,
     button_text: "立即参与",
     text: "跃动的文字",
     mod: 1,
     icon: "http://i0.hdslb.com/bfs/feed-admin/5db388497eb56c4824030ce4b02f3825c498b9fb.png",
     url: "https://www.bilibili.com/blackboard/activity-U9gncGx4Ty.html"
    },
   face_nft_new: 0,
   vip_section_right: {
     id: 6465
    },
   official_verify: {
     type: -1,
     desc: ""
    },
   vip_section: {
     title: "热播内容看不停",
     url: "https://big.bilibili.com/mobile/index?navhide=1&from_spmid=minetab&order_report_params=%7B%22exp_group_tag%22%3A%22def%22%2C%22exp_tag%22%3A%22def%22%2C%22material_type%22%3A%223%22%2C%22position_id%22%3A%223%22%2C%22request_id%22%3A%2250837b2dd4ac1454324827c96d1c9061%22%2C%22tips_id%22%3A%226465%22%2C%22unit_id%22%3A%222036%22%2C%22vip_status%22%3A%221%22%2C%22vip_type%22%3A%222%22%7D",
     start_time: 1652716800,
     end_time: 1672459200
    },
   vip: {
     status: 1,
     avatar_subscript: 1,
     nickname_color: "#FB7299",
     due_date: 1676476800000,
     role: 3,
     vip_pay_type: 0,
     avatar_subscript_url: "",
     label: {
       bg_color: "#FB7299",
       bg_style: 1,
       text: "年度大会员",
       border_color: "",
       path: "",
       image: "https://i0.hdslb.com/bfs/vip/8d4f8bfc713826a5412a0a27eaaac4d6b9ede1d9.png",
       label_theme: "annual_vip",
       text_color: "#FFFFFF"
      },
     type: 2,
     themeType: 0,
     theme_type: 0
    },
   vip_type: 2,
   first_live_time: 1658739202
  }
}
$done({ body: JSON.stringify(obj) });
