/*
百度网盘 解锁在线视频倍率/清晰度

***************************

[rewrite_local]

https:\/\/pan\.baidu\.com\/rest\/\d\.\d\/membership\/user url script-response-body https://raw.githubusercontent.com/NobyDa/Script/master/Surge/JS/BaiduCloud.js

[mitm]

hostname = pan.baidu.com

**************************/

let body = JSON.parse($response.body);
body.product_infos = [{
	product_id: "5210897792128633390",
	end_time: 4102415999,
	buy_time: "1577808000",
	cluster: "offlinedl",
	status: "1",
	start_time: 1577808000,
	function_num: 2,
	buy_description: "离线下载套餐(永久)",
	product_description: "离线下载套餐(永久)",
	detail_cluster: "offlinedl",
	product_name: "offlinedl_permanent"
}, 
{
	product_id: "14040884078253912436",
	end_time: 4102415999,
	buy_time: 0,
	cluster: "vip",
	status: 1,
	start_time: 1577808000,
	function_num: 4,
	buy_description: "高级用户套餐",
	product_description: "超级会员"
	detail_cluster: "svip",
	product_name: "svip2_nd"
}];
body.level_info = {
	history_value: 58000,
	current_level: 8,
	last_manual_collection_time: 0,
	current_value: 58000,
	history_level: 8
};
body.user_tag = "{\"has_buy_record\":0,\"has_buy_vip_svip_record\":0,\"last_buy_record_creat_time\":0,\"is_vip\":0,\"is_svip\":1,\"last_vip_type\":0,\"last_vip_svip_end_time\":1640966399,\"is_svip_sign\":1,\"notice_user_type\":1,\"notice_user_status\":0,\"is_first_act\":0}";

$done({ body: JSON.stringify(body) });
