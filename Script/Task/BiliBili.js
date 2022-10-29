const check = (key) =>
  !config.hasOwnProperty(key) ||
  !config[key].hasOwnProperty("time") ||
  format(new Date().toDateString()) > config[key].time;
// prettier-ignore
const cookie2object = (cookie) => {var obj = {};var arr = cookie.split("; ");arr.forEach(function (val) {var brr = val.split("=");obj[brr[0]] = brr[1];});return obj;};

const format = (date = new Date(), fmt = "yyyy-MM-dd hh:mm:ss") => {
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

const name = "bilibili";
const clyde = init();
const startTime = Date.now();
console.log(name + " " + format(startTime));

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
  },
};

function me() {
  // https://api.bilibili.com/x/member/web/exp/log
  console.log(`#### 用户信息`);

  await $.http
    .get({
      url: `https://api.bilibili.com/x/web-interface/nav`,
      headers: {
        ...config.headers,
        Host: "api.bilibili.com",
        Origin: "https://www.bilibili.com",
        Referer: "https://space.bilibili.com/" + config.cookie.DedeUserID,
        "Referrer-Policy": "no-referrer-when-downgrade",
      },
      body: null,
    })
    .then((response) => {
      // console.log("headers " + JSON.stringify(response.headers));
      // console.log("data " + JSON.stringify(response.body));
      const data = JSON.parse(response.body);

      if (data.code) {
        console.log(
          "- 获得用户信息失败(请更新cookie) " + JSON.stringify(data.data)
        );
        $clyde.notify(name, "cookie in expires", JSON.stringify(data));
        $clyde.write(null, name + "_user");
        return false;
      } else {
        console.log("- 已通过 cookie 获得用户信息");

        config.user = {
          ...data.data,
          num: (config.user.num || 0) + 1,
          time: format(startTime),
        };
        $clyde.write(JSON.stringify(config.user), name + "_user");

        return true;
      }
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

function dynamic() {
  console.log(`#### 更新动态`);

  if (check("watch") || check("share")) {
    console.log(`- 观看(登录)任务:${check("watch")}`);
    console.log(`- 分享任务:${check("share")}`);

    return await $.http
      .get({
        url: `https://api.vc.bilibili.com/dynamic_svr/v1/dynamic_svr/dynamic_new?uid=${config.user.mid}&type_list=8&from=&platform=web`,
        headers: {
          ...config.headers,
          accept: "application/json, text/plain, */*",
          origin: "https://t.bilibili.com",
          referer: "https://t.bilibili.com",
          dnt: 1,
        },
      })
      .then((response) => {
        const data = JSON.parse(response.body);

        if (data.data.cards) {
          console.log(`- 刷新视频动态成功 ${data.data.cards.length} 个`);
          config.cards = data.data.cards;
        } else {
          console.log(`- 刷新视频动态失败 ${response.bod}`);
        }
      });
  } else {
    config.done = true;
    console.log(`- 今日任务已完成`);
    await me();
  }
}

function watch(aid, bvid, cid) {
  console.log(`#### 观看(登录)任务`);

  if (check("watch")) {
    console.log(`- 正在观看(登录)(${bvid}) ${config.watch?.time || ""}`);

    return await $.http
      .post({
        url: `https://api.bilibili.com/x/click-interface/web/heartbeat`,
        headers: {
          ...config.headers,
          accept: "application/json, text/javascript, */*; q=0.01",
          "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
          referrer: `https://www.bilibili.com/video/${bvid}`,
        },
        body: `aid=${aid}&cid=${cid}&bvid=${bvid}&mid=${config.user.mid}&csrf=${
          config.cookie.bili_jct
        }&played_time=1&real_played_time=1&realtime=1&start_ts=${
          Date.parse(new Date()) / 1000
        }&type=3&dt=2&play_type=0&from_spmid=0&spmid=0&auto_continued_play=0&refer_url=https%3A%2F%2Ft.bilibili.com%2F&bsource=`,
      })
      .then(
        (response) => {
          const data = JSON.parse(response.body);
          if (data.code == 0) {
            console.log(`- 累计观看(登录)次数 ${(config.watch.num || 0) + 1}`);

            config.watch = {
              num: (config.watch.num || 0) + 1,
              time: format(startTime),
            };

            $clyde.write(
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
        (err) => {
          console.log(`- headers ${JSON.stringify(response.headers)}`);
          console.log(`- data ${JSON.stringify(response.body)}`);
          console.log(`- 观看(登录)失败`);
          return false;
        }
      );
  } else {
    console.log(`- 今天已经观看 ${config.share.time}`);
    return false;
  }
}

function share(aid, bvid) {
  console.log(`#### 分享任务`);

  if (check("share")) {
    console.log(`- 正在分享(${aid},${bvid}) ${config.share?.time || ""}`);

    return await $.http
      .post({
        url: `https://api.bilibili.com/x/web-interface/share/add`,
        headers: {
          ...config.headers,
          accept: "application/json, text/plain, */*",
          Host: "api.bilibili.com",
          Origin: "https://www.bilibili.com",
          "content-type": "application/x-www-form-urlencoded",
          referrer: "https://www.bilibili.com/video/" + bvid,
        },
        body: `aid=${aid}&csrf=${config.cookie.bili_jct}`,
      })
      .then((response) => {
        const data = JSON.parse(response.body);
        // console.log(`分享结果 ${response.body}`);

        if (data.code == 0) {
          config.share = {
            num: (config.share.num || 0) + 1,
            time: format(startTime),
          };

          return $clyde.write(
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

function coin() {
  fetch("https://api.bilibili.com/x/web-interface/coin/add", {
    headers: {
      ...config.headers,
      accept: "application/json, text/plain, */*",
      "content-type": "application/x-www-form-urlencoded",
    },
    referrer: "https://www.bilibili.com/video/BV1GS4y1C7Zn",
    referrerPolicy: "no-referrer-when-downgrade",
    body: "aid=723929023&csrf=27ae456d34f62042234e4ae35f1ee41b",
    method: "POST",
    mode: "cors",
    credentials: "include",
  });
}

function fav() {
  fetch(
    "https://api.bilibili.com/x/v3/fav/resource/ids?media_id=66764025&platform=web",
    {
      headers: {
        accept: "*/*",
        "accept-language": "zh-CN,zh;q=0.9",
        "sec-ch-ua":
          '" Not A;Brand";v="99", "Chromium";v="98", "Google Chrome";v="98"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": '"macOS"',
        "sec-fetch-dest": "empty",
        "sec-fetch-mode": "cors",
        "sec-fetch-site": "same-site",
      },
      referrer: "https://www.bilibili.com/",
      referrerPolicy: "strict-origin-when-cross-origin",
      body: null,
      method: "GET",
      mode: "cors",
      credentials: "include",
    }
  );
}

if (clyde.isRequest) {
  GetCookie()
} else {
  signBiliBili()
}

function GetCookie() {
  if ("object" == typeof $request) {
    console.log("正在获得 cookie");
    config.user = {};
    config.watch = {};
    config.share = {};
    config.headers.Cookie = $request.headers.Cookie;
    console.log(
      $clyde.write(JSON.stringify(config.headers), name + "_headers")
        ? "获得 cookie 成功"
        : "获得 cookie 失败"
    );
  }
}

function signBiliBili() {
  config.headers = JSON.parse($clyde.read(name + "_headers") || "{}");
  config.user = JSON.parse($clyde.read(name + "_user") || "{}");
  config.watch = JSON.parse($clyde.read(name + "_watch") || "{}");
  config.share = JSON.parse($clyde.read(name + "_share") || "{}");
  config.cookie = cookie2object(config.headers.Cookie);

  console.log("cookie " + JSON.stringify(config.cookie));

  if (config.cookie && (await me())) {
    await dynamic();

    if (config.cards.length) {
      item = config.cards[Math.floor(Math.random() * config.cards.length)];
      card = JSON.parse(item.card);

      await watch(item.desc.rid, item.desc.bvid, card.cid);
      await share(item.desc.rid, item.desc.bvid);
    }

    await dynamic();

    let title = `${name} 每日任务 ${config.user.num}/${config.watch.num}/${
      config.share.num
    }${config.done ? "" : "未完成"}`;
    console.log(`#### ${title}`);

    let u = `登录时间: ${config.user.time}`;
    let w = `观看时间: ${config.watch.time}`;
    let s = `分享时间: ${config.share.time}`;

    console.log(`- ${u}`);
    console.log(`- ${w}`);
    console.log(`- ${s}`);

    clyde.notify(title, `📅  ${format(startTime)}`, `${u}\n${w}\n${s}`);

    return {
      title: `${name} [${config.user.uname}]`,
      content:
        `更新时间: ${format(startTime)}\n` +
        `任务:登录(观看)${check("watch") ? "" : "+10exp"} 分享${
          check("share") ? "" : "+5exp"
        }\n` +
        `经验:${config.user.level_info.current_exp}/${config.user.level_info.next_exp}/28800\n` +
        `等级:${config.user.level_info.current_level} ==> ${
          config.user.next_day
        }/${config.user.v6_day}/${Math.ceil(
          (config.user.v6_exp - config.user.money * 10) / 65
        )}/天`,
    };
  } else {
    clyde.notify(
      `${name} 任务失败`,
      `📅 ${format(startTime)}`,
      "无法获取 cookie 请先打开 MitM 以便获取 cookie"
    );

    return {
      title: `${name} 任务失败 📅 ${format(startTime)}`,
      content: `无法获取 cookie 请先打开 MitM 以便获取 cookie`,
    };
  }
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
  const adapterStatus = (response) => {
    if (response) {
      if (response.status) {
        response["statusCode"] = response.status
      } else if (response.statusCode) {
        response["status"] = response.statusCode
      }
    }
    return response
  }
  const get = (options, callback) => {
    if (typeof options == "string") options = {
      url: options
    }
    options["method"] = "GET"
    $task.fetch(options).then(response => {
      callback(null, adapterStatus(response), response.body)
    }, reason => callback(reason.error, null, null))
  }
  const post = (options, callback) => {
    if (typeof options == "string") options = {
      url: options
    }
    options["method"] = "POST"
    $task.fetch(options).then(response => {
      callback(null, adapterStatus(response), response.body)
    }, reason => callback(reason.error, null, null))
  }
  const done = (value = {}) => {
    return $done(value)
  }
  return {
    isRequest,
    notify,
    write,
    read,
    get,
    post,
    done
  }
}
clyde.done();
