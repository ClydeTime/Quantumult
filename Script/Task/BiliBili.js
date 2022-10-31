/*
脚本功能：哔哩哔哩签到
脚本作者：MartinsKing
软件功能：登录/观看/分享/投币/直播签到/银瓜子转硬币
更新时间：2022-10-31
使用平台：圈X, 其他平台未适配
脚本参考：Nobyda、Wyatt1026、ABreadTree、chavyleung感谢以上人员的开源奉献
使用方法：
    ①将[https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Task/Remote_Cookie.conf]添加远程重写。
    ②打开手机B站客户端，提示获取cookie成功,获取成功后关闭远程①的重写，直到cookie过期，再次使用①获取即可。
    ③将此脚本加到定时任务如[10 9 * * * https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Task/BiliBili.js, tag=B站升级任务, enabled=true]。
    ④等待定时任务执行，或手动执行。
    ⑤提示投币失败可尝试多次手动执行。
注意事项：
  抓取cookie时注意保证账号登录状态；
  账号内须有一定数量的关注数，否则无法完成投币；
  保证硬币数量充足；
  长期使用脚本存在多次投币同一视频的现象，导致投币失败，手动执行或尽量多关注UP即可。
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************
[rewrite_local]

^https:\/\/app\.bilibili\.com\/x\/resource\/domain\? url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Task/BiliBili.js

[mitm]

hostname= app.bilibili.com
*/


const format = (date, fmt = "yyyy-MM-dd hh:mm:ss") => {
  date = new Date(date);
  var o = {
    "M+": date.getMonth() + 1, //月份
    "d+": date.getDate(), //日
    "h+": date.getHours(), //小时
    "m+": date.getMinutes(), //分
    "s+": date.getSeconds(), //秒
    "q+": Math.floor((date.getMonth() + 3) / 3), //季度
    S: date.getMilliseconds(), //毫秒
  };
  if (/(y+)/.test(fmt))
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + "").substr(4 - RegExp.$1.length)
    );
  for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length)
      );
  return fmt;
};

const check = (key) =>
  !config.hasOwnProperty(key) ||
  !config[key].hasOwnProperty("time") ||
  format(new Date().toDateString()) > config[key].time;

const cookie2object = (cookie) => {
  var obj = {};
  var arr = cookie.split("; ");
  arr.forEach(function (val) {
    var brr = val.split("=");
    obj[brr[0]] = brr[1];
  });
  return obj;
};

const name = "bilibili";
const clyde = init();
const startTime = Date.now();
const config = {
  cookie: {},
  cards: [],
  headers: {
    accept: "*/*",
    "user-agent":
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/98.0.4758.80 Safari/537.36",
    "accept-language": "zh-CN,zh;q=0.9",
    "sec-ch-ua":
      '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
  }
};

if (clyde.isRequest) {
  console.log("- 正在获取cookie，请稍后。");
  GetCookie();
} else {
  console.log("- 任务正在进行，请耐心等待。");
  signBiliBili();
}

function GetCookie() {
  if ("object" == typeof $request) {
    console.log("正在获得 cookie");
    config.headers.Cookie = $request.headers.Cookie;
    console.log(
      clyde.write(JSON.stringify(config.headers), name + "_headers")
        ? clyde.notify(name, "cookie catch success", "获得 cookie 成功")
        : clyde.notify(name, "cookie catch failed", "获得 cookie 失败")
    );
  }
  clyde.done();
}

async function signBiliBili() {
  config.headers = JSON.parse(clyde.read(name + "_headers") || "{}");
  config.user = JSON.parse(clyde.read(name + "_user") || "{}");
  config.watch = JSON.parse(clyde.read(name + "_watch") || "{}");
  config.share = JSON.parse(clyde.read(name + "_share") || "{}");
  config.coins = JSON.parse(clyde.read(name + "_coins") || "{}");
  config.cookie = cookie2object(config.headers.Cookie);
  await queryStatus();
  if (config.cookie && (await me())) {
    await dynamic();
    if (config.cards.length) {
      item = config.cards[Math.floor(Math.random() * config.cards.length)];
      card = JSON.parse(item.card);
      await watch(item.desc.rid, item.desc.bvid, card.cid);
      await share(item.desc.rid, item.desc.bvid);
    }else{
      console.log("获取视频失败，请重试或寻求帮助");
    }
    let exec_times = 5 - (config.coins.num / 10);
    if (config.user.money < 5) {
      console.log("- 硬币不足, 投币失败");
      exec_times = 0;
    } else {
      if (exec_times == 0){
        console.log(`#### 投币任务`);
        console.log(`- 今日已完成投币 ${config.coins.time}`);
      } else{
        console.log(`准备投币次数 ${exec_times}`);
        for (var i=0; i<exec_times; i++) {
          if (config.user.money < 5) {
            console.log("- 硬币不足, 投币失败");
            break;
          } else {
            await coin();
          }
        }
      }
    }

    await silver2coin();
    await liveSign();
    var flag = true;
    if (config.user.num < 1 || config.watch.num < 1 || config.share.num < 1 || config.coins.num < 50) {
      flag = false;
    }
    let title = `${name} 每日任务 登录${config.user.num}/观看${config.watch.num}/分享${config.share.num}/投币${config.coins.num / 10}${flag ? "已完成" : "未完成"}`;
    console.log(`#### ${title}`);

    let u = `登录时间: ${config.user.time}`;
    let w = `观看时间: ${config.watch.time}`;
    let s = `分享时间: ${config.share.time}`;
    let z = `投币时间: ${config.coins.time}`;

    console.log(`- ${u}`);
    console.log(`- ${w}`);
    console.log(`- ${s}`);
    console.log(`- ${z}`);

    //clyde.notify(title, `📅  ${format(startTime)}`, `${u}\n${w}\n${s}`);

    notice = {
      title: `${name} [${config.user.uname}]`,
      content:
        `更新时间: ${format(startTime)}\n` +
        `任务:登录(观看)${check("watch") ? "" : "+10exp"} 分享${check("share") ? "" : "+5exp"} 投币${check("coins") ? "" : "+50exp"}\n` +
        `经验:当前${config.user.level_info.current_exp}/下级${config.user.level_info.next_exp}/满级28800\n` +
        `等级:${config.user.level_info.current_level} 升级${
          config.user.next_day
        }/满级${config.user.v6_day}/满级(投币方式)${Math.ceil(
          (config.user.v6_exp - config.user.money * 10) / 65
        )}/天`,
    };
    clyde.notify(notice.title, "", notice.content);
    clyde.done();
  } else{
    clyde.notify(`${name} 任务失败`,`📅 ${format(startTime)}`,"请更新cookie");
    clyde.done();
  }
}

async function queryStatus() {
  console.log(`#### 检查任务进行状况`);
  const url = "https://api.bilibili.com/x/member/web/exp/reward";
  const method = "GET";
  const headers = {
    "cookie": `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`
  };
  const myRequest = {
      url: url,
      method: method, // Optional, default GET.
      headers: headers // Optional.
  };
  return await $task.fetch(myRequest).then(
        (response) => {
          const body = JSON.parse(response.body);
          if (body.code == 0) {
            if (body.data.login){
              console.log("- 今日已登录");
            } else {
              console.log("- 今日尚未登录");
            }
            if (body.data.watch){
              console.log("- 今日已观看");
              config.watch = {
                num: (config.watch.num=0 ? 1 : config.watch.num),
                time: format(startTime),
              };
              clyde.write(
                JSON.stringify(config.watch),
                name + "_watch"
              );
            } else {
              console.log("- 今日尚未观看");
              config.watch = {};
              clyde.write(
                JSON.stringify(config.watch),
                name + "_watch"
              );
            }
            if (body.data.share){
              console.log("- 今日已分享");
              config.share = {
                num: (config.share.num=0 ? 1 : config.share.num),
                time: format(startTime)
              };
              clyde.write(
                JSON.stringify(config.share),
                name + "_share"
              );
            } else {
              console.log("- 今日尚未分享");
              config.share = {};
              clyde.write(
                JSON.stringify(config.share),
                name + "_share"
              );
            }
            if (body.data.coins == 50){
              console.log("- 今日已投币");
              config.coins = {
                num: 50,
                time: format(startTime)
              };
              clyde.write(
                JSON.stringify(config.coins),
                name + "_coins"
              );
            } else {
              console.log("- 今日尚未投币(或不足五次投币)");
              config.coins = {
                num: body.data.coins,
                time: format(startTime)
              };
              clyde.write(
                JSON.stringify(config.coins),
                name + "_coins"
              );
            }
            return true;
          } else {
            console.log("message " + JSON.stringify(body.message));
            console.log("查询失败");
            return false;
          }
        }, (reason) =>  {
          console.log(`- headers ${JSON.stringify(response.headers)}`);
          console.log(`- 查询失败`);
          return false;
        }
    );
}

async function coin(){
  console.log(`#### 投币任务`);
  if (config.coins.num == 50) {
    console.log(`- 今日已完成投币 ${config.coins.time}`);
    return true;
  } else{
    const url = "https://api.bilibili.com/x/web-interface/coin/add";
    const method = "POST";
    const headers = {
      'accept': 'application/json, text/plain, */*',
      'accept-language': 'zh-CN,zh;q=0.9',
      'content-length': '94',
      'content-type': 'application/x-www-form-urlencoded',
      'origin': 'https://www.bilibili.com',
      'referer': 'https://www.bilibili.com/video/BV1MT411G7fG?vd_source=1970993e2eff4af7be029aefcfa468b8',
      'sec-ch-ua': '" Not A;Brand";v="99", "Chromium";v="102", "Google Chrome";v="102"',
      'sec-ch-ua-mobile': '?0',
      'sec-ch-ua-platform': '"macOS"',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'same-site',
      'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/102.0.0.0 Safari/537.36',
      'cookie': `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`
    };
    let like_uid_list = await getFavUid();
    if (like_uid_list && like_uid_list.length > 0){
      let aid = await getFavAid(like_uid_list);
      //console.log("即将投币的视频aid: " + aid);
      if (aid != 0) {
        const body = `aid=${aid}&multiply=1&select_like=1&cross_domain=true&csrf=${config.cookie.bili_jct}`;
        const myRequest = {
          url: url,
          headers: headers,
          method: method, // Optional, default GET.
          body: body
        };
        console.log("- 正在投币");
        return await $task.fetch(myRequest).then(
          (response) => {
            const body = JSON.parse(response.body);
            if (body.code == 0 && body.data.like) {
              console.log("- 投币成功");
              config.user.money -= 5;
              config.coins = {
                num: (config.coins.num += 10),
                time: format(startTime)
              };
              clyde.write(
                JSON.stringify(config.coins),
                name + "_coins"
              );
              return true;
            } else {
              console.log("- 投币失败");
              console.log("message " + JSON.stringify(body.message));
              // if (config.user.money > 5) {
              //   console.log("- 正在重试...");
              //   await coin();
              // }              
              return false;
            }
          }, (reason) =>  {
            console.log(`- headers ${JSON.stringify(response.headers)}`);
            console.log("- 投币失败");
            return false;
          }
        );
      }else {
        console.log("获取随机投币视频失败");
        return false;
      }
    }else {
      console.log("获取随机关注用户列表失败");
      return false;
    }
  }
}

async function silver2coin() {
  console.log(`#### 银瓜子兑换硬币任务`);
  const url = "https://api.live.bilibili.com/xlive/revenue/v1/wallet/silver2coin";
  const method = "POST";
  const headers = {
    'cookie': `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`
  };
  const body = `csrf=${config.cookie.bili_jct}&csrf_token=${config.cookie.bili_jct}`;
  const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers,
    body: body
  }
  await $task.fetch(myRequest).then(
   (response) => {
      let result = JSON.parse(response.body)
      let title = `${name} 银瓜子转硬币`
      // 兑换成功
      if (result && result.code == 0) {
        let subTitle = `${result.message}`
        let detail = `- 成功兑换: ${result.data.coin} 个硬币\n当前银瓜子: ${result.data.silver} , 当前金瓜子: ${result.data.gold}`
        console.log(detail)
        clyde.notify(title, subTitle, detail)
        return true;
      }
      // 兑换中止（重复兑换&银瓜子不足）
      else if (result && result.code == 403) {
        let subTitle = `未成功兑换`
        let detail = `- 说明: ${result.message}`
        console.log(detail)
        clyde.notify(title, subTitle, detail)
        return false;
      }
      // 兑换失败
      else {
        let subTitle = `兑换失败`
        let detail = `- 说明: ${result.message}`
        console.log(detail)
        clyde.notify(title, subTitle, detail)
        return false;
      }
    },
    (reason) => {
      console.log(`- headers ${JSON.stringify(response.headers)}`);
      console.log("- 兑换失败");
      return false;
    }
  );
}

async function liveSign(){
  console.log(`#### 直播签到任务`);
  const url = "https://api.live.bilibili.com/xlive/web-ucenter/v1/sign/DoSign";
  const method = "GET";
  const headers = {
    'cookie': `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`
  };
  const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers
  };
  await $task.fetch(myRequest).then(
   (response) => {
      let body = JSON.parse(response.body)
      if (body && body.code == 0) {
        console.log("- 直播签到成功");
        console.log(`签到奖励:${body.data.text},连续签到${body.data.hadSignDays}天`);
        return true;
      }
      // 签到失败
      else {
        console.log("- 直播签到失败");
        console.log("- message ${body.message}");
        return false;
      }
    },
    (reason) => {
      console.log(`- headers ${JSON.stringify(response.headers)}`);
      console.log("- 直播签到失败");
      return false;
    }
  );
}

async function getFavUid(){
  console.log(`#### 获取关注列表`);
  const url = `https://api.bilibili.com/x/relation/followings?vmid=${config.cookie.DedeUserID}&ps=10&order_type=attention`;
  const method = "GET";
  const headers = {
    'cookie': `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`
  };
  const myRequest = {
    url: url,
    headers: headers,
    method: method // Optional, default GET.
  };
  const like_uid_list = new Array();
  return await $task.fetch(myRequest).then(
    (response) => {
      const body = JSON.parse(response.body);
      if (body.code == 0) {
        console.log("- 获取关注列表成功");
        let like_list = body.data.list;
        //let name_list = new Array();
        for (var i=0; i<like_list.length; i++) {
          //name_list[i] = like_list[i].uname;
          like_uid_list[i] = like_list[i].mid;
        }
        //console.log(JSON.stringify(name_list));
        return like_uid_list;
      } else {
        console.log("- 获取关注列表成失败");
        console.log("message " + JSON.stringify(body.message));
        return like_uid_list;
      }
    },
    (reason) => {
      console.log(`- headers ${JSON.stringify(response.headers)}`);
      console.log("- 获取关注列表成失败");
      return like_uid_list;
    }
  );
}

async function getFavAid(arr){
  console.log(`#### 获取关注列表中的随机视频`);
  var random_int = Math.floor((Math.random()*arr.length));
  var random_mid = arr[random_int];
  console.log(random_mid);
  const url = `https://api.bilibili.com/x/space/arc/search?mid=${random_mid}`;
  const method = "GET";
  const headers = {
    'cookie': `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`
  };
  const myRequest = {
    url: url,
    headers: headers,
    method: method // Optional, default GET.
  }
  return await $task.fetch(myRequest).then(
    (response) => {
      const body = JSON.parse(response.body);
      if (body.code == 0) {
        console.log("- 获取随机视频成功, 即将投币");
        let vlist = body.data.list.vlist;
        random_v_int = Math.floor((Math.random()*vlist.length));
        aid = vlist[random_v_int].aid;
        console.log("视频内容: 作者" + vlist[random_v_int]['author'] + "视频标题" + vlist[random_v_int]['title']);
        return aid;
      } else {
        console.log("- 获取随机视频失败");
        console.log("message " + JSON.stringify(body.message));
        return 0;
      }
    },
    (reason) => {
      console.log(`- headers ${JSON.stringify(response.headers)}`);
      console.log("- 获取随机视频失败");
      return 0;
    }
  );
}

async function watch(aid, bvid, cid) {
  console.log(`#### 观看(登录)任务`);

  if (check("watch")) {
    console.log(`- 正在观看(登录)(${bvid}) ${config.watch?.time || ""}`);

    const url = "https://api.bilibili.com/x/click-interface/web/heartbeat";
    const method = "POST";
    const headers = {
      "cookie": `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`,
      "referrer": `https://www.bilibili.com/video/${bvid}`
    };
    const body = `aid=${aid}&cid=${cid}&bvid=${bvid}&mid=${config.user.mid}&csrf=${config.cookie.bili_jct}&played_time=1&real_played_time=1&realtime=1&start_ts=${Date.parse(new Date()) / 1000}&type=3&dt=2&play_type=0&from_spmid=0&spmid=0&auto_continued_play=0&refer_url=https%3A%2F%2Ft.bilibili.com%2F&bsource=`;

    const myRequest = {
        url: url,
        method: method, // Optional, default GET.
        headers: headers, // Optional.
        body: body
    };
    return await $task.fetch(myRequest).then(
        (response) => {
          const body = JSON.parse(response.body);
          if (body.code == 0) {
            console.log(`- 累计观看(登录)次数 ${(config.watch.num || 0) + 1}`);

            config.watch = {
              num: (config.watch.num || 0) + 1,
              time: format(startTime),
            };

            clyde.write(
              JSON.stringify(config.watch),
              name + "_watch"
            );

            return true;
          } else {
            console.log("headers " + JSON.stringify(response.headers));
            console.log("data " + JSON.stringify(response.body));
            console.log("观看(登录)失败");
            return false;
          }
        },
        (reason) => {
          console.log(`- headers ${JSON.stringify(response.headers)}`);
          console.log(`- data ${JSON.stringify(response.body)}`);
          console.log(`- 观看(登录)失败`);
          return false;
        }
      );
  } else {
    console.log(`- 今天已经观看 ${config.watch.time}`);
    return false;
  }
}

async function share(aid, bvid) {
  console.log(`#### 分享任务`);

  if (check("share")) {
    console.log(`- 正在分享(${aid},${bvid}) ${config.share?.time || ""}`);
    const url = "https://api.bilibili.com/x/web-interface/share/add";
    const method = "POST";
    const headers = {
      "cookie": `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`,
      "referrer": `https://www.bilibili.com/video/${bvid}`
    };
    const body = `aid=${aid}&csrf=${config.cookie.bili_jct}`;
    const myRequest = {
        url: url,
        method: method, // Optional, default GET.
        headers: headers, // Optional.
        body: body
    };
    return await $task.fetch(myRequest).then((response) => {
        const data = JSON.parse(response.body);
        if (data.code == 0) {
          config.share = {
            num: (config.share.num || 0) + 1,
            time: format(startTime)
          };
          console.log("- 分享成功");
          return clyde.write(
            JSON.stringify(config.share),
            name + "_share"
          );
        } else {
          console.log(`- headers ${JSON.stringify(response.headers)}`);
          console.log(`- data ${JSON.stringify(response.body)}`);
          console.log(`- 分享失败`);
          return false;
        }
      });
  } else {
    console.log(`- 今天已经分享 ${config.share.time}`);
    return false;
  }
}

async function me(){
  console.log(`#### 用户信息`);
  const url = "https://api.bilibili.com/x/web-interface/nav";
  const method = "GET";
  const headers = {"cookie": `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`};

  const myRequest = {
      url: url,
      method: method, // Optional, default GET.
      headers: headers // Optional.
  };

  await $task.fetch(myRequest).then(response => {
      const body = JSON.parse(response.body);

      if (body.code) {
        console.log(
          "- 获得用户信息失败(请更新cookie) " + JSON.stringify(body.data)
        );
        clyde.notify(name, "cookie in expires", JSON.stringify(body));
        clyde.write(null, name + "_user");
        return false;
      } else {
        console.log("- cookie有效即将开始任务");
        config.user = body.data;
        config.user.num = (config.user.num || 0) + 1;
        config.user.time = format(startTime);
        clyde.write(JSON.stringify(config.user), name + "_user");
        return true;
      }
  }, reason => {
      // reason.error
      $notify(name, "- 获得用户信息失败", reason.error); // Error!
      return false;
  });

  config.user.mext_exp = config.user.level_info.next_exp - config.user.level_info.current_exp;
  config.user.next_day = Math.ceil(config.user.mext_exp / 15);
  config.user.v6_exp = 28800 - config.user.level_info.current_exp;
  config.user.v6_day = Math.ceil(config.user.v6_exp / 15);

  console.log("- 用户名称: " + config.user.uname);
  console.log("- 用户ID: " + config.user.mid);
  console.log("- 用户硬币: " + config.user.money);
  console.log("- 用户B币: " + config.user.wallet.bcoin_balance);
  console.log("- 用户等级: " + config.user.level_info.current_level);
  console.log(
    `- 当前经验:${config.user.level_info.current_exp}/${config.user.level_info.next_exp}`
  );

  console.log(`- 升级还需经验: ${config.user.mext_exp}`);

  console.log(
    `- 距离下级还需: ${config.user.next_day}天(登录+5 观看+5 分享+5)`
  );

  console.log(
    `- 距离满级(6级)还需: ${config.user.v6_day}天(登录+5 观看+5 分享+5)`
  );

  console.log(`- 最多投币: ${(config.user.money - 1) / 4} 天`);

  console.log(
    "- 距离满级(6级)最快还需: " +
      Math.ceil((config.user.v6_exp - config.user.money * 10) / 65) +
      "天(登录+5 观看+5 分享+5 投币+5*10)"
  );

  return true;
}

async function dynamic() {
  console.log(`#### 更新动态`);

  const url = `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=18866638&type_list=8&from=&platform=web`;
  const method = "GET";
  const headers = {"cookie": `DedeUserID=${config.cookie.DedeUserID}; DedeUserID__ckMd5=${config.cookie.DedeUserID__ckMd5}; SESSDATA=${config.cookie.SESSDATA}; bili_jct=${config.cookie.bili_jct}; sid=${config.cookie.sid}`};

  const myRequest = {
    url: url,
    method: method, // Optional, default GET.
    headers: headers // Optional.
  };
  return await $task.fetch(myRequest).then(response => {
    const body = JSON.parse(response.body);
    if (body.data.cards) {
      console.log(`- 刷新视频动态成功`);
      config.cards = body.data.cards;
    } else {
      console.log(`- 刷新视频动态失败 ${body}`);
    }
  })
}

function init() {
  const isRequest = typeof $request != "undefined"
  const notify = (title, subtitle, message) => {
    $notify(title, subtitle, message)
  }
  const write = (value, key) => {
    return $prefs.setValueForKey(value, key)
  }
  const read = (key) => {
    return $prefs.valueForKey(key)
  }
  const done = (value = {}) => {
    return $done(value)
  }
  return { isRequest, notify, write, read, done }
}
