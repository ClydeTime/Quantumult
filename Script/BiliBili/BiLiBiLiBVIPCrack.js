/*
脚本功能：哔哩哔哩解锁大会员
软件版本：6.90.0
更新时间：2022-10-22
使用声明：⚠️此脚本仅供学习与交流，
        请勿转载与贩卖！⚠️⚠️⚠️
*******************************

[rewrite_local]

# > 哔哩哔哩大会员
^https?:\/\/ap(i|p)\.bilibili\.com\/bilibili\.\w{3,9}\..+\/(View|PlayView|DmView|Window|DynSpace|UserPreference|SuggestEmotes|DmSegMobile|PlayConf|PlayerOnline|MainList|ViewProgress)$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/BiLiBiLiBVIPCrack.js
^https:\/\/(api|app)\.bilibili\.com\/x\/(vip|v2|resource)\/(space\?|account|web|price|top_panel_info\?|show)\/(mine|myinfo|access|vip_center|panel|_bridge|skin\?).* url script-response-body https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/bili_info.js

[mitm] 

hostname = *.bilibili.com, 124.239.240.*, 101.89.57.66, 218.94.210.66, 240e:b1:9801:206:11:0:0:*
*/

var _0xodE='jsjiami.com.v6',_0xodE_=['‮_0xodE'],_0x512e=[_0xodE,'wrbCpy3DkFrCuzjCtw==','w5ZxwqooZA==','DcODwohHwqE=','W8OhMMOcwq0=','AMKsBSki','E8KzaQLDoMO/Zw==','esK2bsKfLjNIw6pZcndJw6p9XUNtGALClcKqSsOtwrfClnzCrnYmQFRYUFrDiFozw5/CuT/CjxPCiTBGScOWV1bDnzLDsXXCsMO2DsOuwrDCm23CpsOhw67CjWM1McOPwrrCslbCvcOqUFslwo9Zw5HDvMKBwpcaw6Y7wqDDi8KfLEPCqQk7fMOnSxt4wrxef8KbE8Kiwo/Clj1/wpHCj8O4wpZedzRCJSIxw5Rsw5xuwqXDhsOHATtuecK1H8Kiw4Bgw7zDoMOECcKycsKgw7RvfMKCw4/CkMKUw4rCjlBqwqUPwpcgw40/QihkF2rDjkbCkMKhwp3CksOBGHDCgzDDlhPCjQ==','woTDqQRTLcOMEhfCp8OLFcKHw4B/wp/DvsK0woFuwrUNScOZw5rCuFIvO8KfZMOUIAcJDU3CqMOYw5JKbhbCrcK4GsO8F8Oawp/Dq8KREMKVKsO8woVKwpkiwq/DqQRfwrrCjMKswrgMw6XDk8OREMKMB8OKw7QJw7Mxeg4NwpU6w7NtwrvDoMKme1XDv8KhwofDv8KeOMOdw6tpdnPCm8O5wovDsjbCu8K0w4DDhsKzwrPClsKuw7w7w5FbwrN5w6M9wo0rRHvCvMKHWzsgw6UJw4w2w44DbwZdUHZsYAYpwq7CoMONHMOcA0UFSgnDl8OAw4HCgsOZw6DDl00bYsKODBx/w4YAYDhpw4zDrXXCnkXCkjzCpG1kUMKlQwklw63CuHvDv8KSwrjDmhPCrlwAF8Oww6PCmVfCm3IFwpPDqMOwwoNnwrR4e8OCw6nDnhdIW8KJwpAWw5ZSwqBLOjEVw4xEDzrCqMKUVBTCq0rDpsKVcAHDn8KdYcKfwoXCqMO8wpHDo8O7w79ZdlQPNMOmw54rwqFjS8KhwrM4XcOGJ0fDkMK0w4/CtsO5wqpjbHRnIcOHwovCgE3DvBbDvsOFKFTDu3fCu8OUPDZPMsKNfMOfwqU+w5bDkDXDiyTDo240wq/CscKNwrrDv8K6wqAlRkTCtngYWhEGwqNQw6Ihw6/Dnz0Dd8Kjw7PClcOpw6IEb8OeZcKDw68jwoTChVzCnDB1w41lB8OLw5ATNcK9wonCpMOgEWVACsKzY8OnHcOJPMK1w6TCri/DgMKiw6PCqBLDj8KnFyIJw6nCk8OcwrHChQDChsKLw5swUsKZSBDCvC0+XMOhdlgWwpbDvAbDiWDCqlTDusOaw6DDvsOUw6ISwo/DgsOvwp1LwrlZKynCphtTKMKRw45wCDvCvGlULsK3S8KYw77ChUNIGcKcw5tpw67DhcOgZsORwpfCssO8wqzDp8K/PcKHwozDsBUUGlDChgIoC0JTwqNEUcOMwonCtcOcwqzDosOgwpPCpykxVl8rGcKJwr1oJcOlUHA+wonDoCzCkwoaw7sVD8OVKsO0w6whRcODbsOCLlPDgsOywpNTdD3Dl0TCi0J8w5PDpcKQwpVsfE9Sw7AlI09KAsKEw6FWw57DuX4sbyLDrHsiFFTCvsOSw4gsQsKEHMKaccODw4EfJcKEQsOUwrrCqcKaacOPUMKifcKzJsOSeAQ9IjJHdnrCicOLwqfDmRLCjRrDrsKCwrHDlMOiw7fCnMKVBMOXw5vDsW/Ch8KRwq/ChBB6wonCg8OdwqZdHsOUFUImSAPCiC/CucO3w7t4HMOow78STVDCmxrCmU5cwrTCq0YKa8OLwrXCucK/M2d0w5jCmwEnJcORwrvCj1xUwqTDn8Onw7rDlCrCn3XDkw8twpc4wqQ0w5g7AG5Hw4bCgcOXLcOiRsK6w6rCpl59w70bw5fCjSYjTcOVd8ONMcKKSlVML3AmMzTCrE/DnE95NcOnw5HDgiXDrMKSwpMRwqAeLGnCjD0qNcK6w5nDq8OQw7AcOcKRVMKXw6g4wq8xw6nDsiPCrWACw4/ClC/DoMOPaFHDggjDpyREAABjXcKOw6Bqw53DiMKracKlX8O2wocQb3zCpgZGw5waA1s=','w6rCi8KEwrkX','w4/CpiU=','Y0HDrUICVcOsCMO6KiM=','PcOmMsOLfg==','w5rCpGo2YQ==','wp42QG3ChMK4GsKowpzCtyUO','jksjZiaBEmFIui.coem.v6yXNyDkb=='];if(function(_0x2d9971,_0x54f981,_0x4155b5){function _0x153cc5(_0x459ad7,_0x5d0ba6,_0x28d28b,_0xb4388e,_0x3c798b,_0x3e4388){_0x5d0ba6=_0x5d0ba6>>0x8,_0x3c798b='po';var _0x2e8a65='shift',_0x181d39='push',_0x3e4388='‮';if(_0x5d0ba6<_0x459ad7){while(--_0x459ad7){_0xb4388e=_0x2d9971[_0x2e8a65]();if(_0x5d0ba6===_0x459ad7&&_0x3e4388==='‮'&&_0x3e4388['length']===0x1){_0x5d0ba6=_0xb4388e,_0x28d28b=_0x2d9971[_0x3c798b+'p']();}else if(_0x5d0ba6&&_0x28d28b['replace'](/[kZBEFIueyXNyDkb=]/g,'')===_0x5d0ba6){_0x2d9971[_0x181d39](_0xb4388e);}}_0x2d9971[_0x181d39](_0x2d9971[_0x2e8a65]());}return 0x10bf27;};return _0x153cc5(++_0x54f981,_0x4155b5)>>_0x54f981^_0x4155b5;}(_0x512e,0x121,0x12100),_0x512e){_0xodE_=_0x512e['length']^0x121;};function _0x48bc(_0x28d485,_0x2783b0){_0x28d485=~~'0x'['concat'](_0x28d485['slice'](0x1));var _0x2d1f16=_0x512e[_0x28d485];if(_0x48bc['ULGOrk']===undefined){(function(){var _0x586384=typeof window!=='undefined'?window:typeof process==='object'&&typeof require==='function'&&typeof global==='object'?global:this;var _0x2e9439='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';_0x586384['atob']||(_0x586384['atob']=function(_0x304c22){var _0x5e68a1=String(_0x304c22)['replace'](/=+$/,'');for(var _0x2722d7=0x0,_0x39255e,_0x43eb98,_0x3ddb7a=0x0,_0x596fbc='';_0x43eb98=_0x5e68a1['charAt'](_0x3ddb7a++);~_0x43eb98&&(_0x39255e=_0x2722d7%0x4?_0x39255e*0x40+_0x43eb98:_0x43eb98,_0x2722d7++%0x4)?_0x596fbc+=String['fromCharCode'](0xff&_0x39255e>>(-0x2*_0x2722d7&0x6)):0x0){_0x43eb98=_0x2e9439['indexOf'](_0x43eb98);}return _0x596fbc;});}());function _0x205af4(_0x23e232,_0x2783b0){var _0x1f7795=[],_0x476741=0x0,_0x569e9d,_0x4f78ff='',_0x4b48e6='';_0x23e232=atob(_0x23e232);for(var _0x210b68=0x0,_0xfebd68=_0x23e232['length'];_0x210b68<_0xfebd68;_0x210b68++){_0x4b48e6+='%'+('00'+_0x23e232['charCodeAt'](_0x210b68)['toString'](0x10))['slice'](-0x2);}_0x23e232=decodeURIComponent(_0x4b48e6);for(var _0x1fb974=0x0;_0x1fb974<0x100;_0x1fb974++){_0x1f7795[_0x1fb974]=_0x1fb974;}for(_0x1fb974=0x0;_0x1fb974<0x100;_0x1fb974++){_0x476741=(_0x476741+_0x1f7795[_0x1fb974]+_0x2783b0['charCodeAt'](_0x1fb974%_0x2783b0['length']))%0x100;_0x569e9d=_0x1f7795[_0x1fb974];_0x1f7795[_0x1fb974]=_0x1f7795[_0x476741];_0x1f7795[_0x476741]=_0x569e9d;}_0x1fb974=0x0;_0x476741=0x0;for(var _0x2ac15c=0x0;_0x2ac15c<_0x23e232['length'];_0x2ac15c++){_0x1fb974=(_0x1fb974+0x1)%0x100;_0x476741=(_0x476741+_0x1f7795[_0x1fb974])%0x100;_0x569e9d=_0x1f7795[_0x1fb974];_0x1f7795[_0x1fb974]=_0x1f7795[_0x476741];_0x1f7795[_0x476741]=_0x569e9d;_0x4f78ff+=String['fromCharCode'](_0x23e232['charCodeAt'](_0x2ac15c)^_0x1f7795[(_0x1f7795[_0x1fb974]+_0x1f7795[_0x476741])%0x100]);}return _0x4f78ff;}_0x48bc['XaTQwP']=_0x205af4;_0x48bc['suqekc']={};_0x48bc['ULGOrk']=!![];}var _0x4964be=_0x48bc['suqekc'][_0x28d485];if(_0x4964be===undefined){if(_0x48bc['zjmXrM']===undefined){_0x48bc['zjmXrM']=!![];}_0x2d1f16=_0x48bc['XaTQwP'](_0x2d1f16,_0x2783b0);_0x48bc['suqekc'][_0x28d485]=_0x2d1f16;}else{_0x2d1f16=_0x4964be;}return _0x2d1f16;};eval(function(_0x2a4c0d,_0x102af2,_0x34a13e,_0x403b55,_0x28d027,_0x4d761d){var _0x339a2a={'eZzEb':function(_0x1c6f58,_0x36a240){return _0x1c6f58+_0x36a240;},'LjAIx':function(_0x941349,_0x18fbad){return _0x941349(_0x18fbad);},'vukuM':function(_0x4e1712,_0x22efa5){return _0x4e1712/_0x22efa5;},'pjfMj':_0x48bc('‮0','WG%]'),'GSmvp':function(_0x562b44,_0x4a9c20){return _0x562b44(_0x4a9c20);}};var _0x362ac4=_0x48bc('‮1','WvQ%')[_0x48bc('‮2','EHdg')]('|'),_0x57ee97=0x0;while(!![]){switch(_0x362ac4[_0x57ee97++]){case'0':return _0x2a4c0d;case'1':_0x28d027=function(_0x34a13e){return _0x17056b[_0x48bc('‫3','IDJz')](_0x34a13e<_0x102af2?'':_0x28d027(parseInt(_0x17056b['aPIpM'](_0x34a13e,_0x102af2))),(_0x34a13e=_0x34a13e%_0x102af2)>0x23?String[_0x48bc('‮4','aE@C')](_0x17056b['KpTDr'](_0x34a13e,0x1d)):_0x34a13e[_0x48bc('‮5','^@uy')](0x24));};continue;case'2':while(_0x34a13e--)if(_0x403b55[_0x34a13e])_0x2a4c0d=_0x2a4c0d['replace'](new RegExp(_0x339a2a[_0x48bc('‫6','])yT')]('\x5cb',_0x339a2a[_0x48bc('‮7','^Bi#')](_0x28d027,_0x34a13e))+'\x5cb','g'),_0x403b55[_0x34a13e]);continue;case'3':;continue;case'4':var _0x17056b={'XZHRd':function(_0x32c04d,_0x39dcee){return _0x32c04d+_0x39dcee;},'aPIpM':function(_0x16f7bf,_0x3aa6ac){return _0x339a2a[_0x48bc('‮8','SqB&')](_0x16f7bf,_0x3aa6ac);},'KpTDr':function(_0x389ad6,_0x370b55){return _0x389ad6+_0x370b55;},'DWBkf':_0x339a2a[_0x48bc('‮9','%8G3')]};continue;case'5':if(!''[_0x48bc('‫a','$eRh')](/^/,String)){while(_0x34a13e--)_0x4d761d[_0x339a2a['GSmvp'](_0x28d027,_0x34a13e)]=_0x403b55[_0x34a13e]||_0x28d027(_0x34a13e);_0x403b55=[function(_0x28d027){return _0x4d761d[_0x28d027];}];_0x28d027=function(){return _0x17056b['DWBkf'];};_0x34a13e=0x1;}continue;}break;}}(_0x48bc('‫b','EHdg'),0x31,0x31,_0x48bc('‮c','bLXU')[_0x48bc('‫d','(zND')]('|'),0x0,{}));;_0xodE='jsjiami.com.v6';
