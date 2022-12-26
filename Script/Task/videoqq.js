/*
腾讯视频签到脚本

更新时间: 2022-12-26
脚本兼容: QuantumultX, Surge, Loon
脚本作者: MayoBlueSky
脚本修改: MartinsKing
软件功能: 腾讯视频每日签到
注意事项:
  抓取cookie时注意保证账号登录状态；
使用声明: ⚠️此脚本仅供学习与交流, 请勿贩卖！⚠️
使用说明：
    ①获取cookie
        后台退出手机腾讯视频客户端的情况下,重新打开APP进入主页
        如通知成功获取cookie,则可以使用此签到脚本.
        获取Cookie后, 请将Cookie脚本禁用并移除主机名,以免产生不必要的MITM.
    ②获取pc_cookie以及ref_url添加到boxjs,boxjs订阅链接「https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/boxjs.json」
        ref_url获取教程: 「https://cdn.jsdelivr.net/gh/BlueskyClouds/Script/img/2020/11/1/img/v_1.jpg」
        pc_cookie获取教程: 「https://cdn.jsdelivr.net/gh/BlueskyClouds/Script/img/2020/11/1/img/v_2.jpg」
    ③脚本将在每天上午5点00执行,您可以修改执行时间.
致谢: 感谢MayoBlueSky作者提供脚本,本人未做联系,私自适配使用并公开,望见谅！
/***********************
Surge 远程脚本配置:
************************

[Script]
腾讯视频签到任务 = type=cron,cronexp=0 5 * * *,script-path=https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Task/videoqq.js,timeout=15,wake-system=1

# 腾讯视频获取Cookie
「请在模块中添加,成功获取cookie后模块应去除勾选」
https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Task/GetCookie.sgmodule

************************
QuantumultX 远程脚本配置:
************************

[task_local]
# 腾讯视频签到
0 5 * * * https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Task/videoqq.js, tag=腾讯视频签到, enabled=true, img-url=https://raw.githubusercontent.com/Orz-3/mini/master/Color/videoqq.png

[rewrite_remote]
# 腾讯视频获取Cookie
https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Task/Remote_Cookie.conf, tag=MartinsKing签到cookie, update-interval=172800, opt-parser=false, enabled=true

************************
Loon  远程脚本配置:
************************

[Script]
# 腾讯视频签到
cron "0 5 * * *" script-path=https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/Task/videoqq.js, tag=腾讯视频签到

[Plugin]
# 腾讯视频获取Cookie
https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Task/GetCookie.plugin, tag=MartinsKing签到Cookie, enabled=true

*/

const $ = new Env('腾讯视频会员签到');
const name = "videoqq"
const zh_name = "腾讯视频"
const config = {
  cookie: {},
  headers: {}
};
let cookie = $.getdata(name + "_cookie");
let ref_url = $.getdata(name + "_ref_url");
let pc_cookie = $.getdata(name + "_pc_cookie");
const auth = getAuth(cookie)

let notice = $.time('yyyy年MM月dd日') + "\n"

let headers = {
    'Referer' : `https://film.video.qq.com/`,
    'User-Agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 16_1_1 like Mac OS X) AppleWebKit/537.51.1 (KHTML, like Gecko) Mobile/11A465 QQLiveBrowser/8.7.45 AppType/UN WebKitCore/WKWebView iOS GDTTangramMobSDK/4.370.6 GDTMobSDK/4.370.6 cellPhone/iPhone 12 pro max'
}

!(async () => {
  if (typeof $request != "undefined") {
    console.log("- 正在获取cookie，请稍后")
    GetCookie()
    $.done()
  } else {
    console.log("- 任务正在进行，请耐心等待")
    ref_url_ver()
    if(typeof cookie == 'undefined') {
        console.log("您尚未获取cookie,请先获取cookie")
        $.msg(zh_name, "cookie catch error", "请先获取cookie")
        $.done()
    }
    if(typeof cookie == 'undefined') {
        console.log("您尚未添加pc_cookie,请先在boxjs中添加pc_cookie")
        $.msg(zh_name, "pc_cookie add error", "请先在boxjs中添加pc_cookie")
        $.done()
    }
    await main()
    $.done()
}
})()


function GetCookie() {
  if ("object" == typeof $request) {
    if (typeof $request.headers.cookie != 'undefined') {
      config.headers.Cookie = $request.headers.cookie;
    } else if (typeof $request.headers.Cookie != 'undefined') {
      config.headers.Cookie = $request.headers.Cookie;
    }
    config.cookie = getAuth(config.headers.Cookie);

    if (config.cookie.vdevice_qimei36) {
      console.log("- cookie获取成功");

      $.setdata(Object.keys(config.cookie).map(i => i + '=' + config.cookie[i]).join('; '), name + "_cookie")
      ? $.msg(zh_name, "cookie catch success", "获得 cookie 成功")
      : $.msg(zh_name, "cookie catch failed", "获得 cookie 失败")
    } else {
      console.log("- 尚未登录, 请登录后再重新获取cookie");
    }   
  }
  $.done();
}


const parseSet = (cookie) => {
  var obj = {};
  cookie = cookie.replace(/\GMT, /g,"GMT;"); 
  var arr = cookie.split(";");
  arr.forEach(function (val) {
    var brr = val.split("=");
    obj[brr[0]] = brr[1];
  });
  return obj;
};


function getAuth(cookie) {
    let needParams = [""]
    //适配微信登录
    if (cookie) {
        if (cookie.includes("main_login=wx")) {
            needParams = ["vdevice_qimei36", "video_platform", "pgv_pvid", "pgv_info", "video_omgid", "main_login", "access_token", "appid", "openid", "vuserid", "vusession"]
        } else if (cookie.includes("main_login=qq")) {
            needParams = ["vdevice_qimei36", "video_platform", "pgv_pvid", "video_omgid", "main_login", "vqq_access_token", "vqq_appid", "vqq_openid", "vqq_vuserid", "vqq_vusession"]
        } else {
            console.log("getAuth - 无法提取有效cookie参数")
        }
    }
    const obj = {}
    if (cookie) {
        cookie.split('; ').forEach(t => {
            const [key, val] = t.split(/\=(.*)$/, 2)
            needParams.indexOf(key) !== -1 && (obj[key] = val)
        })
    }
    return obj
}


function refCookie(url = ref_url) {
    return new Promise(resovle => {
        const options = {
          url: url,
          headers: {...headers, Cookie: pc_cookie}
        }
        $.get(options, (error, response, data) => {
            const obj = parseSet(response.headers['Set-Cookie'])
            const { vusession } = obj
            const { vqq_vusession } = obj
            const { access_token } = obj
            //微信多一个access_token
            if (typeof vusession != 'undefined') {
                auth['vusession'] = vusession
                auth['access_token'] = access_token
            } else {
                auth['vqq_vusession'] = vqq_vusession
            }
            // 刷新cookie后去签到
            resovle({
                ...headers, Cookie: Object.keys(auth).map(i => i + '=' + auth[i]).join('; ')
            })
        })
    })
}

function ref_url_ver(url = ref_url) {
    headers = {...headers, Cookie: pc_cookie}
    $.get({
        url, headers
    }, function (error, response, data) {
        if (error) {
            $.log(error);
            console.log("腾讯视频会员签到", "验证ref_url请求失败 ‼️‼️", error)
        } else {
            if (data.match(/nick/)) { //通过验证获取QQ昵称参数来判断是否正确
                console.log("验证成功，执行主程序")
            } else {
                console.log("验证ref_url失败,无法获取个人资料 ref_url或Cookie失效 ‼️‼️")
            }
        }
    })
}

// 手机端签到
function txVideoSignIn(headers) {
    return new Promise(resolve => {
    $.get({
        url: `https://vip.video.qq.com/rpc/trpc.new_task_system.task_system.TaskSystem/CheckIn?rpc_data=%7B%7D`, headers
    }, (error, response, data) => {
        if (error) {
            $.log(error);
            console.log("腾讯视频会员签到", "签到请求失败 ‼️‼️", error)
            $.msg(zh_name, "签到请求失败 ‼️‼️", error)
        } else {
            if (data != null) {
                let jsonParsed, code, check_in_score;
                jsonParsed = JSON.parse(data);
                code = jsonParsed.ret;
                check_in_score = jsonParsed.check_in_score;
                if (code === 0 && check_in_score != undefined) {
                    notice += "腾讯视频会员手机端签到成功：签到分数：" + check_in_score + "分 🎉" + "\n"
                    console.log("腾讯视频会员手机端签到成功：签到分数：" + check_in_score + "分 🎉")
                } else if (code === -2002) {
                    console.log("腾讯视频会员手机端签到失败：重复签到 ‼️‼️")
                    notice += "腾讯视频会员手机端签到失败：重复签到 ‼️‼️" + "\n"
                } else if (code === -2007) {
                    notice += "腾讯视频会员签到：非会员无法签到"
                    console.log("腾讯视频会员签到：非会员无法签到")
                } else {
                    console.log("腾讯视频会员手机端签到失败：未知错误请查看控制台输出 ‼️‼️\n" + data)
                    notice += "腾讯视频会员手机端签到失败：未知错误请查看控制台输出 ‼️‼️" + "\n" + data
                }

            } else {
                notice += "腾讯视频会员签到：签到失败-Cookie失效 ‼️‼️" + "\n"
                console.log("腾讯视频会员签到：签到失败, Cookie失效 ‼️‼️")
            }
            $.msg(zh_name, "", notice)
        }
        resolve()
    })
    })
}

//观看60分钟任务签到请求
function txVideoDownTasks(headers) {
    return new Promise(resolve => {
    $.get({
        url: `https://vip.video.qq.com/rpc/trpc.new_task_system.task_system.TaskSystem/ProvideAward?rpc_data=%7B%22task_id%22:1%7D`, headers
    }, (error, response, data) => {
        if (error) {
            $.log(error);
            console.log("腾讯视频会员签到", "观看任务签到请求 ‼️‼️", error)
        } else {
            if (data != null) {
                let jsonParsed, code, check_in_score;
                jsonParsed = JSON.parse(data);
                code = jsonParsed.ret;
                check_in_score = jsonParsed.check_in_score;
                if (code === 0 && check_in_score != undefined) {
                    notice += "腾讯视频会员观看任务签到成功：签到分数：" + check_in_score + "分 🎉" + "\n"
                    console.log("腾讯视频会员观看任务签到成功：签到分数：" + check_in_score + "分 🎉")
                } else if (code === -2002) {
                    console.log("腾讯视频会员观看任务签到成功：重复签到 ‼️‼️")
                    notice += "腾讯视频会员观看任务签到成功：重复签到 ‼️‼️" + "\n"
                } else if (code === -2003) {
                    console.log("腾讯视频会员观看任务签到失败：任务未完成 ‼️‼️")
                    notice += "腾讯视频会员观看任务签到失败：任务未完成 ‼️‼️" + "\n"
                } else if (code === -2007) {
                    notice += "腾讯视频会员签到：非会员无法签到"
                    console.log("腾讯视频会员签到：非会员无法签到")
                } else {
                    console.log("腾讯视频会员观看任务签到成功：未知错误请查看控制台输出 ‼️‼️\n" + data)
                    notice += "腾讯视频会员观看任务签到成功：未知错误请查看控制台输出 ‼️‼️" + "\n" + data
                }
            } else {
                notice += "腾讯视频会员签到：签到失败-Cookie失效 或 脚本待更新 ‼️‼️" + "\n"
                console.log("腾讯视频会员签到：签到失败, Cookie失效 或 脚本待更新 ‼️‼️")
            }
        }
        resolve()
    })
    })
}


async function main() {
    return refCookie().then(
      async (params) => {
        await txVideoSignIn(params)
        await txVideoDownTasks(params)
    })
}

function Env(t,e){class s{constructor(t){this.env=t}send(t,e="GET"){t="string"==typeof t?{url:t}:t;let s=this.get;return"POST"===e&&(s=this.post),new Promise((e,i)=>{s.call(this,t,(t,s,r)=>{t?i(t):e(s)})})}get(t){return this.send.call(this.env,t)}post(t){return this.send.call(this.env,t,"POST")}}return new class{constructor(t,e){this.name=t,this.http=new s(this),this.data=null,this.dataFile="box.dat",this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=(new Date).getTime(),Object.assign(this,e),this.log("",`🔔${this.name}, 开始!`)}isNode(){return"undefined"!=typeof module&&!!module.exports}isQuanX(){return"undefined"!=typeof $task}isSurge(){return"undefined"!=typeof $httpClient&&"undefined"==typeof $loon}isLoon(){return"undefined"!=typeof $loon}isShadowrocket(){return"undefined"!=typeof $rocket}isStash(){return"undefined"!=typeof $environment&&$environment["stash-version"]}toObj(t,e=null){try{return JSON.parse(t)}catch{return e}}toStr(t,e=null){try{return JSON.stringify(t)}catch{return e}}getjson(t,e){let s=e;const i=this.getdata(t);if(i)try{s=JSON.parse(this.getdata(t))}catch{}return s}setjson(t,e){try{return this.setdata(JSON.stringify(t),e)}catch{return!1}}getScript(t){return new Promise(e=>{this.get({url:t},(t,s,i)=>e(i))})}runScript(t,e){return new Promise(s=>{let i=this.getdata("@chavy_boxjs_userCfgs.httpapi");i=i?i.replace(/\n/g,"").trim():i;let r=this.getdata("@chavy_boxjs_userCfgs.httpapi_timeout");r=r?1*r:20,r=e&&e.timeout?e.timeout:r;const[o,n]=i.split("@"),a={url:`http://${n}/v1/scripting/evaluate`,body:{script_text:t,mock_type:"cron",timeout:r},headers:{"X-Key":o,Accept:"*/*"}};this.post(a,(t,e,i)=>s(i))}).catch(t=>this.logErr(t))}loaddata(){if(!this.isNode())return{};{this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e);if(!s&&!i)return{};{const i=s?t:e;try{return JSON.parse(this.fs.readFileSync(i))}catch(t){return{}}}}}writedata(){if(this.isNode()){this.fs=this.fs?this.fs:require("fs"),this.path=this.path?this.path:require("path");const t=this.path.resolve(this.dataFile),e=this.path.resolve(process.cwd(),this.dataFile),s=this.fs.existsSync(t),i=!s&&this.fs.existsSync(e),r=JSON.stringify(this.data);s?this.fs.writeFileSync(t,r):i?this.fs.writeFileSync(e,r):this.fs.writeFileSync(t,r)}}lodash_get(t,e,s){const i=e.replace(/\[(\d+)\]/g,".$1").split(".");let r=t;for(const t of i)if(r=Object(r)[t],void 0===r)return s;return r}lodash_set(t,e,s){return Object(t)!==t?t:(Array.isArray(e)||(e=e.toString().match(/[^.[\]]+/g)||[]),e.slice(0,-1).reduce((t,s,i)=>Object(t[s])===t[s]?t[s]:t[s]=Math.abs(e[i+1])>>0==+e[i+1]?[]:{},t)[e[e.length-1]]=s,t)}getdata(t){let e=this.getval(t);if(/^@/.test(t)){const[,s,i]=/^@(.*?)\.(.*?)$/.exec(t),r=s?this.getval(s):"";if(r)try{const t=JSON.parse(r);e=t?this.lodash_get(t,i,""):e}catch(t){e=""}}return e}setdata(t,e){let s=!1;if(/^@/.test(e)){const[,i,r]=/^@(.*?)\.(.*?)$/.exec(e),o=this.getval(i),n=i?"null"===o?null:o||"{}":"{}";try{const e=JSON.parse(n);this.lodash_set(e,r,t),s=this.setval(JSON.stringify(e),i)}catch(e){const o={};this.lodash_set(o,r,t),s=this.setval(JSON.stringify(o),i)}}else s=this.setval(t,e);return s}getval(t){return this.isSurge()||this.isLoon()?$persistentStore.read(t):this.isQuanX()?$prefs.valueForKey(t):this.isNode()?(this.data=this.loaddata(),this.data[t]):this.data&&this.data[t]||null}setval(t,e){return this.isSurge()||this.isLoon()?$persistentStore.write(t,e):this.isQuanX()?$prefs.setValueForKey(t,e):this.isNode()?(this.data=this.loaddata(),this.data[e]=t,this.writedata(),!0):this.data&&this.data[e]||null}initGotEnv(t){this.got=this.got?this.got:require("got"),this.cktough=this.cktough?this.cktough:require("tough-cookie"),this.ckjar=this.ckjar?this.ckjar:new this.cktough.CookieJar,t&&(t.headers=t.headers?t.headers:{},void 0===t.headers.Cookie&&void 0===t.cookieJar&&(t.cookieJar=this.ckjar))}get(t,e=(()=>{})){if(t.headers&&(delete t.headers["Content-Type"],delete t.headers["Content-Length"]),this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient.get(t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let s=require("iconv-lite");this.initGotEnv(t),this.got(t).on("redirect",(t,e)=>{try{if(t.headers["set-cookie"]){const s=t.headers["set-cookie"].map(this.cktough.Cookie.parse).toString();s&&this.ckjar.setCookieSync(s,null),e.cookieJar=this.ckjar}}catch(t){this.logErr(t)}}).then(t=>{const{statusCode:i,statusCode:r,headers:o,rawBody:n}=t,a=s.decode(n,this.encoding);e(null,{status:i,statusCode:r,headers:o,rawBody:n,body:a},a)},t=>{const{message:i,response:r}=t;e(i,r,r&&s.decode(r.rawBody,this.encoding))})}}post(t,e=(()=>{})){const s=t.method?t.method.toLocaleLowerCase():"post";if(t.body&&t.headers&&!t.headers["Content-Type"]&&(t.headers["Content-Type"]="application/x-www-form-urlencoded"),t.headers&&delete t.headers["Content-Length"],this.isSurge()||this.isLoon())this.isSurge()&&this.isNeedRewrite&&(t.headers=t.headers||{},Object.assign(t.headers,{"X-Surge-Skip-Scripting":!1})),$httpClient[s](t,(t,s,i)=>{!t&&s&&(s.body=i,s.statusCode=s.status?s.status:s.statusCode,s.status=s.statusCode),e(t,s,i)});else if(this.isQuanX())t.method=s,this.isNeedRewrite&&(t.opts=t.opts||{},Object.assign(t.opts,{hints:!1})),$task.fetch(t).then(t=>{const{statusCode:s,statusCode:i,headers:r,body:o}=t;e(null,{status:s,statusCode:i,headers:r,body:o},o)},t=>e(t&&t.error||"UndefinedError"));else if(this.isNode()){let i=require("iconv-lite");this.initGotEnv(t);const{url:r,...o}=t;this.got[s](r,o).then(t=>{const{statusCode:s,statusCode:r,headers:o,rawBody:n}=t,a=i.decode(n,this.encoding);e(null,{status:s,statusCode:r,headers:o,rawBody:n,body:a},a)},t=>{const{message:s,response:r}=t;e(s,r,r&&i.decode(r.rawBody,this.encoding))})}}time(t,e=null){const s=e?new Date(e):new Date;let i={"M+":s.getMonth()+1,"d+":s.getDate(),"H+":s.getHours(),"m+":s.getMinutes(),"s+":s.getSeconds(),"q+":Math.floor((s.getMonth()+3)/3),S:s.getMilliseconds()};/(y+)/.test(t)&&(t=t.replace(RegExp.$1,(s.getFullYear()+"").substr(4-RegExp.$1.length)));for(let e in i)new RegExp("("+e+")").test(t)&&(t=t.replace(RegExp.$1,1==RegExp.$1.length?i[e]:("00"+i[e]).substr((""+i[e]).length)));return t}queryStr(t){let e="";for(const s in t){let i=t[s];null!=i&&""!==i&&("object"==typeof i&&(i=JSON.stringify(i)),e+=`${s}=${i}&`)}return e=e.substring(0,e.length-1),e}msg(e=t,s="",i="",r){const o=t=>{if(!t)return t;if("string"==typeof t)return this.isLoon()?t:this.isQuanX()?{"open-url":t}:this.isSurge()?{url:t}:void 0;if("object"==typeof t){if(this.isLoon()){let e=t.openUrl||t.url||t["open-url"],s=t.mediaUrl||t["media-url"];return{openUrl:e,mediaUrl:s}}if(this.isQuanX()){let e=t["open-url"]||t.url||t.openUrl,s=t["media-url"]||t.mediaUrl,i=t["update-pasteboard"]||t.updatePasteboard;return{"open-url":e,"media-url":s,"update-pasteboard":i}}if(this.isSurge()){let e=t.url||t.openUrl||t["open-url"];return{url:e}}}};if(!this.isMute){if(this.isSurge()||this.isLoon()){$notification.post(e,s,i,o(r))}else if(this.isQuanX()){$notify(e,s,i,o(r))}}}log(...t){t.length>0&&(this.logs=[...this.logs,...t]),console.log(t.join(this.logSeparator))}logErr(t,e){const s=!this.isSurge()&&!this.isQuanX()&&!this.isLoon();s?this.log("",`❗️${this.name}, 错误!`,t.stack):this.log("",`❗️${this.name}, 错误!`,t)}wait(t){return new Promise(e=>setTimeout(e,t))}done(t={}){const e=(new Date).getTime(),s=(e-this.startTime)/1e3;this.log("",`🔔${this.name}, 结束! 🕛 ${s} 秒`),this.log(),this.isSurge()||this.isQuanX()||this.isLoon()?$done(t):this.isNode()&&process.exit(1)}}(t,e)}
