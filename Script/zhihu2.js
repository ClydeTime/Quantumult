/*
脚本功能：知乎优化
使用声明：⚠️⚠️⚠️此脚本仅供学习与交流，请勿转载与贩卖！⚠️⚠️⚠️
*/


var status = 'HTTP/1.1 307 Temporary Redirect';
var location = decodeURIComponent($request['url']['replace']('https://link.zhihu.com/?target=', ''));
var headers = {
    'Location': location
};
var body = '';
var url = {
    'status': status,
    'headers': headers,
    'body': body
};
$done(url);
