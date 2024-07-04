/*
腾讯视频签到脚本

更新时间: 2024-07-04
脚本兼容: QuantumultX, Surge, Loon
脚本作者: WowYiJiu
脚本修改: MartinsKing
软件功能: 腾讯视频每日签到
注意事项:
  抓取cookie时注意保证账号登录状态；
使用声明: ⚠️此脚本仅供学习与交流, 请勿贩卖！⚠️
使用说明：
- 进入腾讯视频app，点击右下角我的，点击头像下的视频VIP进入会员中心看到系统消息提示获取txspCookie成功即可
- 浏览器进入腾讯视频网页版，登录后切换成桌面版，刷新网页看到系统消息提示获取txspRefreshCookie、txspRefreshBody成功即可
- 获取Cookie后, 请将Cookie脚本禁用并移除主机名，以免产生不必要的MITM
致谢: 感谢WowYiJiu作者的开源脚本
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

const $ = new Env("腾讯视频");

let txspCookie = $.getItem('txspCookie') || "";
let txspRefreshCookie = $.getItem('txspRefreshCookie') || "";
let txspRefreshBody = $.getItem('txspRefreshBody') || "";
let dayOfGetMonthTicket = $.getItem('dayOfGetMonthTicket') || 1;
let isSkipTxspCheckIn = ($.getItem('isSkipTxspCheckIn') !== undefined && $.getItem('isSkipTxspCheckIn') !== '') ? JSON.parse($.getItem('isSkipTxspCheckIn')) : false;

let currentVersion = "v1.0.3", latestVersion = "";
let nickname = "";
let isTxspVip = false, isTxspSvip = false, isTxSportsVip = false, isTxSportsSvip = false;
let endTime = "", svipEndTime = "", txSportsEndTime = "", txSportsSvipEndTime = "";
let level = "", txSportsLevel = "";
let score = "", txSportsScore = "";
let month_received_score = "", month_limit = "";
let isTxspCheckIn = "", isTxSportsCheckIn = "";
let message = "";
$.taskInfo = "";

if ((isGetCookie = typeof $request !== `undefined`)) {
	getCookie();
	$.done();
} else if (!txspCookie){
	$.msg($.name, "您未获取腾讯视频Cookie", "点击此条跳转到腾讯视频获取Cookie", { 'open-url': 'tenvideo://', 'media-url': 'https://raw.githubusercontent.com/WowYiJiu/Personal/main/icon/videoqq.png' });
	$.done();
} else {
	!(async () => {
		await getVersion();
		$.log(`\n当前版本：${currentVersion}  最新版本：${latestVersion}\n`);
		$.version = `\n当前版本：${currentVersion}  最新版本：${latestVersion}\n`;
		if(!txspCookie){
			$.log(`未填写txspCookie环境变量`);
			return;
		}

		$.log("---- 开始 刷新vusession ----");
		await refresh_vusession();
		$.log(`--------- 结束 ---------\n`);
		$.log(`用户昵称：${nickname}`);
		await getVipInfo();
		if (isTxspVip){
			$.log(`---- 腾讯视频VIP信息 ----`);
			if (isTxspSvip){
				$.log(`当前是腾讯视频SVIP`);
			} else {
				$.log(`当前是腾讯视频VIP`);
			}
			$.log(`当前等级：${level}`);
			$.log(`当前成长：${score}`);
			if (isTxspSvip){
				$.log(`SVIP到期时间：${svipEndTime}`);
			}
			$.log(`VIP到期时间：${endTime}`);
			$.log(`--------- 结束 ---------\n`);
		}
		if (isTxSportsVip){
			$.log(`--- 腾讯体育VIP信息 ---`);
			if (isTxSportsSvip){
				$.log(`当前是腾讯体育超级VIP`);
			} else {
				$.log(`当前是腾讯体育VIP`);
			}
			$.log(`当前等级：${txSportsLevel}`);
			$.log(`当前成长：${txSportsScore}`);
			if (isTxSportsSvip){
				$.log(`SVIP到期时间：${txSportsSvipEndTime}`);
			}
			$.log(`VIP到期时间：${txSportsEndTime}`);
			$.log(`--------- 结束 ---------\n`);
		}
		if (isTxspVip){
			$.log(`---- 开始 腾讯视频签到 ----`);
			if (isSkipTxspCheckIn){
				$.log(`当前设置为不进行腾讯视频签到，跳过`);
			} else {
				await readTxspTaskList();
				await waitRandom(1000, 2000);
				if (month_received_score === month_limit){
					$.log(`本月活跃任务已满${month_limit}V力值，下个月再来哦`);
				} else if (isTxspCheckIn){
					$.log(`今天已签到, 明日再来吧`);
				} else {
					await txspCheckIn();
					await waitRandom(1000, 2000);
					await txVideoDownTasks();
					await waitRandom(1000, 2000);
				}
			}
			$.log(`--------- 结束 ---------\n`);
		}
		if (isTxSportsVip){
			$.log(`---- 开始 腾讯体育签到 ----`);
			await readTxSportsTaskList();
			await waitRandom(1000, 2000);
			if (isTxSportsCheckIn){
				$.log(`今天已签到, 明日再来吧`);
			} else {
				await txSportsCheckIn();
				await waitRandom(1000, 2000);
			}
			$.log(`--------- 结束 ---------\n`);
			$.log(`---- 开始 领取每日球票 ----`);
			await getDayTicket();
			await waitRandom(1000, 2000);
			$.log(`--------- 结束 ---------\n`);
			$.log(`---- 开始 领取每月球票 ----`);
			var today = new Date();
			var date = today.getDate();
			if (date !== dayOfGetMonthTicket){
				$.log(`目标日期：${dayOfGetMonthTicket}号`);
				$.log(`今天是${date}号`);
				$.log(`跳过`);
			} else {
				$.log(`目标日期：${dayOfGetMonthTicket}号`);
				$.log(`今天是${date}号`);
				await getMonthTicket();
			}
			$.log(`--------- 结束 ---------\n`);
		}
	 await SendMsg();
	})()
		.catch((e) => $.logErr(e))
		.finally(() => $.done());
}

async function refresh_vusession() {
		let opt = {
			url: `https://pbaccess.video.qq.com/trpc.video_account_login.web_login_trpc.WebLoginTrpc/NewRefresh`,
			headers: {
				cookie: txspRefreshCookie,
				origin: 'https://v.qq.com',
				referer: 'https://v.qq.com/',
				'Content-Type': 'application/json'
			},
			body: txspRefreshBody
		};
		return await $.fetch(opt).then(response => {
			try {
				const obj = $.toObj(response.body)
				if (obj.data.errcode === 0) {
					let vqq_vusession = obj.data.vusession;
					nickname = decodeURIComponent(obj.data.nick);
						if (txspCookie.match(/main_login=([^;]*)/)[1] === "qq"){
							txspCookie = txspCookie.replace(/(vqq_vusession=)[^;]*/, `$1${vqq_vusession}`);
						} else if(txspCookie.match(/main_login=([^;]*)/)[1] === "wx"){
							txspCookie = txspCookie.replace(/(vusession=)[^;]*/, `$1${vusession}`);
						}
					$.log("vusession成功")
				} else {
					$.log("vusession失败");
				}
			} catch (e) {
				$.logErr(e, response)
			}
		})
}

async function getVipInfo() {
		let opt = {
			url: `https://vip.video.qq.com/rpc/trpc.query_vipinfo.vipinfo.QueryVipInfo/GetVipUserInfoH5`,
			headers: {
				cookie: txspCookie,
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({"geticon":1,"viptype":"svip|sports|nfl","platform":5})
		};
		return await $.fetch(opt).then(response => {
			try {
				const obj = $.toObj(response.body)
				if (!obj.servicetype) {
					throw new Error(`Cookie已失效`);
				} else {
					if (obj.vip === 1){
						isTxspVip = true;
						endTime = obj.endTime;
						level = obj.level;
						score = obj.score;
					}
					if (obj.svip_info.vip === 1){
						isTxspSvip = true;
						svipEndTime = obj.svip_info.endTime;
					}
					if (obj.sports.vip.vip === 1){
						isTxSportsVip = true;
						txSportsEndTime = obj.sports.vip.endTime;
						txSportsLevel = obj.sports.vip.level;
						txSportsScore = obj.sports.vip.score;
					}
					if (obj.sports.svip.vip === 1){
						isTxSportsSvip = true;
						txSportsSvipEndTime = obj.sports.svip.endTime;
					}
				}
			} catch (e) {
				$.logErr(e, response)
			}
		})
}

/**
 * 获取腾讯视频任务列表
 * @async
 * @function readTxspTaskList
 * @returns
 */
async function readTxspTaskList() {
		let opt = {
			url: `https://vip.video.qq.com/rpc/trpc.new_task_system.task_system.TaskSystem/ReadTaskList?rpc_data=%7B%22business_id%22:%221%22,%22platform%22:5%7D`,
			headers: {
				referer: "https://film.video.qq.com/x/grade/?ptag=user.apho&ovscroll=0&hidetitlebar=1&aid=V0$$1:0$2:7$3:8.11.01.25068$4:0$8:4&isDarkMode=1&uiType=REGULAR",
				cookie: txspCookie
			}
		};
		return await $.fetch(opt).then(response => {
			try {
				const obj = $.toObj(response.body)
				var code = obj.ret;
				let task_maintitle = "";
				if (code === 0) {
					month_received_score = obj.limit_info.month_received_score;
					month_limit = obj.limit_info.month_limit;
					let taskList = obj.task_list;
					let txspCheckInTask = taskList && taskList.find(task => task.task_maintitle === "VIP会员每日签到");
					isTxspCheckIn = txspCheckInTask.task_status;
				}  else {
					$.log(`获取腾讯视频任务列表失败，异常详细信息如下\n${data}`);
				}
			} catch (e) {
				$.logErr(e, response)
			}
		})
}


/**
 * 腾讯视频签到领取V力值
 * @async
 * @function txspCheckIn
 * @returns
 */
async function txspCheckIn() {
		let opt = {
			url: `https://vip.video.qq.com/rpc/trpc.new_task_system.task_system.TaskSystem/CheckIn?rpc_data==%7B%7D`,
			headers: {
				Referer: "https://film.video.qq.com/x/grade/?ptag=user.apho&ovscroll=0&hidetitlebar=1&aid=V0$$1:0$2:7$3:8.11.01.25068$4:0$8:4&isDarkMode=1&uiType=REGULAR",
				Cookie: txspCookie
			}
		};
		return await $.fetch(opt).then(response => {
			try {
				const obj = $.toObj(response.body);
				var code = obj.ret;
				let message;
				if (code === 0 && obj.check_in_score != undefined) {
					message = `签到成功：获得${obj.check_in_score}V力值`
					$.log(message);
				} else if (code === -2002) {
					message = `今天已签到, 明日再来吧`
					$.log(message);
				} else {
					message = `签到失败, 异常详细信息请查看日志\n`;
					$.log(`签到失败，异常详细信息如下\n${obj.msg}`);
				}
				$.taskInfo += message + `\n`;
			} catch (e) {
				$.logErr(e, response)
			}
		})
}

/**
 * 观看60分钟任务签到请求
 * @async
 * @function txVideoDownTasks
 * @returns
 */
async function txVideoDownTasks() {
	let opt = {
		url: `https://vip.video.qq.com/rpc/trpc.new_task_system.task_system.TaskSystem/ProvideAward?rpc_data=%7B%22task_id%22:1%7D`,
		headers: {
			referer: "https://film.video.qq.com/x/grade/?ptag=user.apho&ovscroll=0&hidetitlebar=1&aid=V0$$1:0$2:7$3:8.11.01.25068$4:0$8:4&isDarkMode=1&uiType=REGULAR",
			cookie: txspCookie
		}
	};
	return await $.fetch(opt).then(response => {
		try {
			const obj = $.toObj(response.body)
			var code = obj.ret;
			let check_in_score = obj.check_in_score;
			let message;
			if (code === 0 && check_in_score != undefined) {
				message = "观看任务签到成功：签到分数：" + check_in_score + "分 🎉" + "\n";
				$.log(message);
			} else if (code === -2002) {
				message = "观看任务签到成功：您已签到 ‼️‼️" + "\n";
				$.log(message);
			} else if (code === -2003) {
				message = "观看任务签到失败：任务未完成 ‼️‼️" + "\n";
				$.log(message);
			} else if (code === -2007) {
				message = "观看任务签到失败：非会员无法签到";
				$.log(message);
			} else {
				message = "观看任务签到失败：请查看控制台输出";
				$.log(`观看任务签到失败：异常详细信息如下\n${obj.msg}`);
			}
			$.taskInfo += message + `\n`;
		} catch (e) {
			$.logErr(e, response)
		}
	})
}


/**
 * 获取腾讯体育任务列表
 * @async
 * @function readTxSportsTaskList
 * @returns
 */
async function readTxSportsTaskList() {
	let opt = {
		url: `https://vip.video.qq.com/rpc/trpc.new_task_system.task_system.TaskSystem/ReadTaskList?rpc_data={"business_id":3,"channel_id":4,"platform":5}`,
		headers: {
			Referer: "https://film.video.qq.com/x/sports-grade/?ovscroll=0&hidetitlebar=1&immersive=1",
			Cookie: txspCookie,
		},
	};
	return await $.fetch(opt).then(response => {
		try {
			const obj = $.toObj(response.body)
			var code = obj.ret;
			let task_maintitle = "";
			if (code === 0) {
				let taskList = obj.task_list;
				let txSportsCheckInTasks = taskList && taskList.find(task => task.task_maintitle === "每日签到");
				isTxSportsCheckIn = txSportsCheckInTasks.task_status;
			}  else {
				$.log(`获取腾讯视频任务列表失败，异常详细信息如下\n${data}`);
			}
		} catch (e) {
			$.logErr(e, response)
		}
	})
}

/**
 * 腾讯体育签到领取热爱值
 * @async
 * @function txSportsCheckIn
 * @returns
 */
async function txSportsCheckIn() {
	let opt = {
		url: `https://vip.video.qq.com/rpc/trpc.new_task_system.task_system.TaskSystem/CheckIn?rpc_data={"task_id":8006}`,
		headers: {
			Referer:
				"https://film.video.qq.com/x/sports-grade/?ovscroll=0&hidetitlebar=1&immersive=1",
			Cookie: txspCookie,
		},
	};
	return await $.fetch(opt).then(response => {
		try {
			var code = obj.ret;
			let message;
			if (code === 0 && obj.check_in_score != undefined) {
				message = `签到成功：获得${obj.check_in_score}热爱值`;
				$.log(message);
			} else if (code === -2002) {
				message = `今天已签到, 明日再来吧`
				$.log(message);
			} else {
				message = `签到失败, 异常详细信息请查看日志\n`
				$.log(`签到失败，异常详细信息如下\n${opt.msg}`);
			}
			$.taskInfo += message + `\n`;
		} catch (e) {
			$.logErr(e, response)
		}
	})
}

/**
 * 领取每日球票
 * @async
 * @function getDayTicket
 * @returns
 */
async function getDayTicket() {
	let opt = {
		url: "https://activity.video.qq.com/fcgi-bin/asyn_activity?otype=xjson&act_id=118561&module_id=158089&type=90&option=5",
		headers: {
			Origin: "https://film.video.qq.com",
			Referer: "https://film.video.qq.com/x/sports-vip-channel/?from=tab",
			Cookie: txspCookie,
		},
	};
	return await $.fetch(opt).then(response => {
		try {
			const obj = $.toObj(response.body)
			var code = obj.ret;
			let message;
			if (code === 0) {
				message = `领取每日球票成功`;
				$.log(message);
			} else if (code === -2021) {
				message = `每日球票已领取, 明日再来吧`;
				$.log(message);
			} else {
				message = `领取每日球票失败，异常详细信息请查看日志\n`;
				$.log(`领取每日球票失败，异常详细信息如下\n${obj.msg}`);
			}
			$.taskInfo += message + `\n`;
		} catch (e) {
			$.logErr(e, response)
		}
	})
}

/**
 * 领取每月球票
 * @async
 * @function getMonthTicket
 * @returns
 */
async function getMonthTicket() {
	let opt = {
		url: "https://activity.video.qq.com/fcgi-bin/asyn_activity?otype=xjson&act_id=118561&module_id=165163&type=100160&option=100",
		headers: {
			Origin: "https://film.video.qq.com",
			Referer: "https://film.video.qq.com/x/sports-vip-channel/?from=tab",
			Cookie: txspCookie,
		},
	};
	return await $.fetch(opt).then(response => {
		try {
			const obj = $.toObj(response.body)
			var code = obj.ret;
			let message;
			if (code === 0) {
				message = `领取每月球票成功`
				$.log(message);
			} else if (code === -903) {
				message = `每月球票已领取，下个月再来哦`
				$.log(message);
			} else {
				message = `领取每月球票失败，异常详细信息请查看日志\n`
				$.log(`领取每月球票失败，异常详细信息如下\n${obj.msg}`);
			}
			$.taskInfo += message + `\n`;
		} catch (e) {
			$.logErr(e, response)
		}
	})
}

function getCookie() {
	if($request && $request.method !=`OPTIONS` && $request.url.match(/\/rpc\/trpc\.new_task_system\.task_system\.TaskSystem\/ReadTaskList/)){
		let txsp = $request.headers["Cookie"] || $request.headers["cookie"];
		if (txsp) {
			if (typeof txspCookie === "undefined" || (txspCookie && txspCookie.length === 0)) {
				$.setdata(txsp, "txspCookie");
				$.log(`Cookie: ${txsp}`);
				$.msg($.name, "🎉 Cookie写入成功", "不用请自行关闭重写!");
			} else if (txsp !== txspCookie) {
				$.setdata(txsp, "txspCookie");
				$.log(`Cookie: ${txsp}`);
				$.msg($.name, "🎉 Cookie更新成功", "不用请自行关闭重写!");
			} else {
				$.msg($.name, "⚠️ Cookie未变动 跳过更新", "不用请自行关闭重写!");
			}
		} else {
			$.msg($.name, "⚠️ Cookie未找到", "不用请自行关闭重写!");
		}
	}
	if($request && $request.method !=`OPTIONS` && $request.url.match(/\/trpc\.videosearch\.hot_rank\.HotRankServantHttp\/HotRankHttp/)){
		let refreshCookie = $request.headers["Cookie"] || $request.headers["cookie"];
		if (refreshCookie) {
			if (typeof txspRefreshCookie === "undefined" || (txspRefreshCookie && txspRefreshCookie.length === 0)) {
				$.setdata(refreshCookie, "txspRefreshCookie");
				$.log(`Cookie: ${refreshCookie}`);
				$.msg($.name, "🎉 refreshCookie写入成功", "不用请自行关闭重写!");
			} else if (refreshCookie !== txspRefreshCookie) {
				$.setdata(refreshCookie, "txspRefreshCookie");
				$.log(`Cookie: ${refreshCookie}`);
				$.msg($.name, "🎉 refreshCookie更新成功", "不用请自行关闭重写!");
			} else {
				$.msg($.name, "⚠️ refreshCookie未变动 跳过更新", "不用请自行关闭重写!");
			}
		} else {
			$.msg($.name, "⚠️ refreshCookie未找到", "不用请自行关闭重写!");
		}
	}
	if($request && $request.method !=`OPTIONS` && $request.url.match(/\/trpc\.video_account_login\.web_login_trpc\.WebLoginTrpc\/NewRefresh/)){
		let refreshBody = $request.body;
		if (refreshBody){
			if (typeof txspRefreshBody === "undefined" || (txspRefreshBody && txspRefreshBody.length === 0)) {
				$.setdata(refreshBody, "txspRefreshBody");
				$.log(`refreshBody: ${refreshBody}`);
				$.msg($.name, "🎉 refreshBody写入成功", "不用请自行关闭重写!");
			} else if (refreshBody !== txspRefreshBody) {
				$.setdata(refreshBody, "txspRefreshBody");
				$.log(`refreshBody: ${refreshBody}`);
				$.msg($.name, "🎉 refreshBody更新成功", "不用请自行关闭重写!");
			} else {
				$.msg($.name, "⚠️ refreshBody未变动 跳过更新", "不用请自行关闭重写!");
			}
		}
	}
}

async function getVersion() {
    const timeoutMs = 10000;
    const opt = { 
        url: "https://github.wowyijiu.today/https://raw.githubusercontent.com/WowYiJiu/Personal/main/Script/tenvideo.js",
        timeout: timeoutMs 
    };
		let data =  await $.fetch(opt).then(response => {
			try {
				if (response) {
					return response
				}else {
					return "undefined"
				}
			} catch (e) {
				$.logErr(e, response)
			}
		})
		data = $.toStr(data)
    const versionInfo = data.match(/@version\s+(v\d+\.\d+\.\d+)/);
	if (versionInfo) {
		latestVersion = versionInfo[1];
	} else {
		latestVersion = "undefined";
	}
    return latestVersion;
}

async function SendMsg() {
	$.msg($.name, "", `${$.version}\n${$.taskInfo}`);
}

async function waitRandom(min, max) {
	var time = getRandomInt(min, max);
	await $.wait(time);
}

// 随机生成整数
function getRandomInt(min, max) {
	min = Math.ceil(min);
	max = Math.floor(max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// 提取Cookie的指定字段
function extractValues(str, keys) {
	let results = keys.map((key) =>
		str.split("; ").find((s) => s.startsWith(key + "="))
	);
	return results.join(";");
}



/***************** Env *****************/
// prettier-ignore
// https://github.com/chavyleung/scripts/blob/master/Env.min.js

function Env(a,b){var c=Math.floor;return new class{constructor(a,b){this.name=a,this.version="1.7.4",this.data=null,this.logs=[],this.isMute=!1,this.isNeedRewrite=!1,this.logSeparator="\n",this.encoding="utf-8",this.startTime=new Date().getTime(),Object.assign(this,b),this.log("",`🔔${this.name}, 开始!`)}platform(){return"undefined"!=typeof $environment&&$environment["surge-version"]?"Surge":"undefined"!=typeof $environment&&$environment["stash-version"]?"Stash":"undefined"==typeof module||!module.exports?"undefined"==typeof $task?"undefined"==typeof $loon?"undefined"==typeof $rocket?"undefined"==typeof Egern?void 0:"Egern":"Shadowrocket":"Loon":"Quantumult X":"Node.js"}isQuanX(){return"Quantumult X"===this.platform()}isSurge(){return"Surge"===this.platform()}isLoon(){return"Loon"===this.platform()}isShadowrocket(){return"Shadowrocket"===this.platform()}isStash(){return"Stash"===this.platform()}isEgern(){return"Egern"===this.platform()}toObj(a,b=null){try{return JSON.parse(a)}catch{return b}}toStr(a,b=null){try{return JSON.stringify(a)}catch{return b}}lodash_get(a={},b="",c=void 0){Array.isArray(b)||(b=this.toPath(b));const d=b.reduce((a,b)=>Object(a)[b],a);return d===void 0?c:d}lodash_set(a={},b="",c){return Array.isArray(b)||(b=this.toPath(b)),b.slice(0,-1).reduce((a,c,d)=>Object(a[c])===a[c]?a[c]:a[c]=/^\d+$/.test(b[d+1])?[]:{},a)[b[b.length-1]]=c,a}toPath(a){return a.replace(/\[(\d+)\]/g,".$1").split(".").filter(Boolean)}getItem(a=new String,b=null){let c=b;switch(a.startsWith("@")){case!0:const{key:b,path:d}=a.match(/^@(?<key>[^.]+)(?:\.(?<path>.*))?$/)?.groups;a=b;let e=this.getItem(a,{});"object"!=typeof e&&(e={}),c=this.lodash_get(e,d);try{c=JSON.parse(c)}catch(a){}break;default:switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":c=$persistentStore.read(a);break;case"Quantumult X":c=$prefs.valueForKey(a);break;default:c=this.data?.[a]||null}try{c=JSON.parse(c)}catch(a){}}return c??b}setItem(a=new String,b=new String){let c=!1;switch(typeof b){case"object":b=JSON.stringify(b);break;default:b=b+""}switch(a.startsWith("@")){case!0:const{key:d,path:e}=a.match(/^@(?<key>[^.]+)(?:\.(?<path>.*))?$/)?.groups;a=d;let f=this.getItem(a,{});"object"!=typeof f&&(f={}),this.lodash_set(f,e,b),c=this.setItem(a,f);break;default:switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":c=$persistentStore.write(b,a);break;case"Quantumult X":c=$prefs.setValueForKey(b,a);break;default:c=this.data?.[a]||null}}return c}async fetch(a={},b={}){switch(a.constructor){case Object:a={...a,...b};break;case String:a={url:a,...b}}a.method||(a.method=a.body??a.bodyBytes?"POST":"GET"),delete a.headers?.Host,delete a.headers?.[":authority"],delete a.headers?.["Content-Length"],delete a.headers?.["content-length"];const c=a.method.toLocaleLowerCase();switch(this.platform()){case"Loon":case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:return a.policy&&(this.isLoon()&&(a.node=a.policy),this.isStash()&&this.lodash_set(a,"headers.X-Stash-Selected-Proxy",encodeURI(a.policy))),a.followRedirect&&((this.isSurge()||this.isLoon())&&(a["auto-redirect"]=!1),this.isQuanX()&&(a.opts?a.opts.redirection=!1:a.opts={redirection:!1})),a.bodyBytes&&!a.body&&(a.body=a.bodyBytes,delete a.bodyBytes),await new Promise((b,d)=>{$httpClient[c](a,(c,e,f)=>{c?d(c):(e.ok=/^2\d\d$/.test(e.status),e.statusCode=e.status,f&&(e.body=f,!0==a["binary-mode"]&&(e.bodyBytes=f)),b(e))})});case"Quantumult X":return a.policy&&this.lodash_set(a,"opts.policy",a.policy),"boolean"==typeof a["auto-redirect"]&&this.lodash_set(a,"opts.redirection",a["auto-redirect"]),a.body instanceof ArrayBuffer?(a.bodyBytes=a.body,delete a.body):ArrayBuffer.isView(a.body)?(a.bodyBytes=a.body.buffer.slice(a.body.byteOffset,a.body.byteLength+a.body.byteOffset),delete object.body):a.body&&delete a.bodyBytes,await $task.fetch(a).then(a=>(a.ok=/^2\d\d$/.test(a.statusCode),a.status=a.statusCode,a),a=>Promise.reject(a.error))}}time(a,b=null){const d=b?new Date(b):new Date;let e={"M+":d.getMonth()+1,"d+":d.getDate(),"H+":d.getHours(),"m+":d.getMinutes(),"s+":d.getSeconds(),"q+":c((d.getMonth()+3)/3),S:d.getMilliseconds()};for(let c in /(y+)/.test(a)&&(a=a.replace(RegExp.$1,(d.getFullYear()+"").slice(4-RegExp.$1.length))),e)new RegExp("("+c+")").test(a)&&(a=a.replace(RegExp.$1,1==RegExp.$1.length?e[c]:("00"+e[c]).slice((""+e[c]).length)));return a}getBaseURL(a){return a.replace(/[?#].*$/,"")}isAbsoluteURL(a){return /^[a-z][a-z0-9+.-]*:/.test(a)}getURLParameters(a){return(a.match(/([^?=&]+)(=([^&]*))/g)||[]).reduce((b,a)=>(b[a.slice(0,a.indexOf("="))]=a.slice(a.indexOf("=")+1),b),{})}getTimestamp(a=new Date){return c(a.getTime()/1e3)}queryStr(a){let b=[];for(let c in a)a.hasOwnProperty(c)&&b.push(`${c}=${a[c]}`);let c=b.join("&");return c}queryObj(a){let b={},c=a.split("&");for(let d of c){let a=d.split("="),c=a[0],e=a[1]||"";c&&(b[c]=e)}return b}msg(a=this.name,b="",c="",d){const e=a=>{switch(typeof a){case void 0:return a;case"string":switch(this.platform()){case"Surge":case"Stash":case"Egern":default:return{url:a};case"Loon":case"Shadowrocket":return a;case"Quantumult X":return{"open-url":a}}case"object":switch(this.platform()){case"Surge":case"Stash":case"Egern":case"Shadowrocket":default:{let b=a.url||a.openUrl||a["open-url"];return{url:b}}case"Loon":{let b=a.openUrl||a.url||a["open-url"],c=a.mediaUrl||a["media-url"];return{openUrl:b,mediaUrl:c}}case"Quantumult X":{let b=a["open-url"]||a.url||a.openUrl,c=a["media-url"]||a.mediaUrl,d=a["update-pasteboard"]||a.updatePasteboard;return{"open-url":b,"media-url":c,"update-pasteboard":d}}}default:}};if(!this.isMute)switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Shadowrocket":default:$notification.post(a,b,c,e(d));break;case"Quantumult X":$notify(a,b,c,e(d))}}log(...a){0<a.length&&(this.logs=[...this.logs,...a]),console.log(a.join(this.logSeparator))}logErr(a,b){switch(this.platform()){case"Surge":case"Loon":case"Stash":case"Egern":case"Shadowrocket":case"Quantumult X":default:this.log("",`❗️${this.name}, 错误!`,a,b)}}wait(a){return new Promise(b=>setTimeout(b,a))}done(a={}){const b=new Date().getTime(),c=(b-this.startTime)/1e3;switch(this.log("",`🔔${this.name}, 结束! 🕛 ${c} 秒`),this.platform()){case"Surge":a.policy&&this.lodash_set(a,"headers.X-Surge-Policy",a.policy),$done(a);break;case"Loon":a.policy&&(a.node=a.policy),$done(a);break;case"Stash":a.policy&&this.lodash_set(a,"headers.X-Stash-Selected-Proxy",encodeURI(a.policy)),$done(a);break;case"Egern":$done(a);break;case"Shadowrocket":default:$done(a);break;case"Quantumult X":a.policy&&this.lodash_set(a,"opts.policy",a.policy),delete a["auto-redirect"],delete a["auto-cookie"],delete a["binary-mode"],delete a.charset,delete a.host,delete a.insecure,delete a.method,delete a.opt,delete a.path,delete a.policy,delete a["policy-descriptor"],delete a.scheme,delete a.sessionIndex,delete a.statusCode,delete a.timeout,a.body instanceof ArrayBuffer?(a.bodyBytes=a.body,delete a.body):ArrayBuffer.isView(a.body)?(a.bodyBytes=a.body.buffer.slice(a.body.byteOffset,a.body.byteLength+a.body.byteOffset),delete a.body):a.body&&delete a.bodyBytes,$done(a)}}}(a,b)}