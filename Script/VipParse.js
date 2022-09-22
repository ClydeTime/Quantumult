// ==UserScript==
// @ScriptName        QX快捷解析VIP视频
// @UpdateTime        2022-09-22
// @Function          更加方便观看全网VIP视频
// @Attention         腾讯视频跳转还有点问题,需要在跳转后的页面手动刷新
// @ScriptURL         https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/VipParse.js


hostname = m.iqiyi.com ,im1907.top ,m.youku.com ,m.v.qq.com ,m.bilibili.com


# > 04 爱奇艺
(^https?:\/\/m\.iqiyi\.com\/v_.*) url 307 https://im1907.top/?jx=$1
# > 03 优酷视频
(^https?:\/\/m\.youku\.com\/.*) url 307 https://im1907.top/?jx=$1
# > 02 腾讯视频
(^https?:\/\/m\.v\.qq\.com\/x\/(m\/)?play.*) url 307 https://im1907.top/?jx=$1
# > 01 哔哩哔哩
(^https?:\/\/m\.bilibili\.com\/bangumi\/play\/.*) url 307 https://im1907.top/?jx=$1
