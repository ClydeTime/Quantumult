/*
吾爱破解签到脚本

更新时间: 2022.6.18
脚本兼容: QuantumultX, Surge, Loon, Node.js
电报频道: @NobyDa
问题反馈: @NobyDa_bot

************************
QX, Surge, Loon说明：
************************
手动登录 https://www.52pojie.cn/home.php 如通知成功获取cookie, 则可以使用此签到脚本.
获取Cookie后, 请将Cookie脚本禁用并移除主机名, 以免产生不必要的MITM.
脚本将在每天上午9点执行, 您可以修改执行时间.


************************
QuantumultX 远程脚本配置:
************************

[task_local]
# 吾爱签到
0 9 * * * https://raw.githubusercontent.com/NobyDa/Script/master/52pojie-DailyBonus/52pojie.js

[rewrite_local]
# 获取Cookie
https:\/\/www\.52pojie\.cn\/home\.php\? url script-request-header https://raw.githubusercontent.com/NobyDa/Script/master/52pojie-DailyBonus/52pojie.js

[mitm] 
hostname= www.52pojie.cn


const $ = API('nobyda_52pojie');
const date = new Date();
const reqData = {
  url: 'https://www.52pojie.cn/home.php?mod=task&do=apply&id=2',
  headers: {
    Cookie: $.read("COOKIE"),
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:101.0) Gecko/20100101 Firefox/101.0",
  }
};
if ($.env.isRequest) {
  GetCookie()
} else if (!reqData.headers.Cookie) {
  $.notify('吾爱破解', ``, `未填写/未获取Cookie!`);
} else if (!reqData.headers.Cookie.includes('_auth=')) {
  $.notify('吾爱破解', ``, `Cookie关键授权字段缺失, 需重新获取!`);
} else {
  $.http.put(reqData)
    .then((resp) => {
      if (resp.body.match(/(ÒÑÍê³É|\u606d\u559c\u60a8|��̳΢�š��ᰮ�ƽ�)/)) {
        $.msgBody = date.getMonth() + 1 + "月" + date.getDate() + "日, 签到成功 🎉"
      } else if (resp.body.match(/(ÄúÒÑ|\u4e0b\u671f\u518d\u6765|>��Ǹ������)/)) {
        $.msgBody = date.getMonth() + 1 + "月" + date.getDate() + "日, 已签过 ⚠️"
      } else if (resp.body.match(/(ÏÈµÇÂ¼|\u9700\u8981\u5148\u767b\u5f55|�Ҫ�ȵ�¼���ܼ�)/)) {
        $.msgBody = "签到失败, Cookie失效 ‼️‼️"
      } else if (resp.statusCode == 403) {
        $.msgBody = "服务器暂停签到 ⚠️"
      } else {
        $.msgBody = "脚本待更新 ‼️‼️"
      }
    })
    .catch((err) => ($.msgBody = `签到失败 ‼️‼️\n${err || err.message}`))
    .finally(async () => {
      $.notify('吾爱破解', ``, $.msgBody);
      $.done();
    })
}

function GetCookie() {
  const TM = $.read("TIME");
  const CK = $request.headers['Cookie'] || $request.headers['cookie'];
  if (CK && CK.includes('_auth=')) {
    $.write(CK, "COOKIE");
    if (!TM || TM && (Date.now() - TM) / 1000 >= 21600) {
      $.notify("吾爱破解", "", `写入Cookie成功 🎉`);
      $.write(JSON.stringify(Date.now()), "TIME");
    } else {
      $.info(`吾爱破解\n写入Cookie成功 🎉`)
    }
  } else {
    $.info(`吾爱破解\n写入Cookie失败, 关键值缺失`)
  }
  $.done()
}
