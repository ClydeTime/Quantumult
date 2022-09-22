

/*
[rewrite_local]
^https?:\/\/ap(i|p)\.bilibili\.com\/bilibili\.\w{3,9}\..+\/(View|PlayView|DmView|Window|DynSpace|UserPreference|SuggestEmotes|DmSegMobile|PlayConf|PlayerOnline|MainList|ViewProgress)$ url script-request-header https://raw.githubusercontent.com/ClydeTime/Quantumult/main/Script/BiliBili/tmpBl.js

[mitm] 
hostname = *.bili*.*, 124.239.240.*, 101.89.57.66, 218.94.210.66, 240e:b1:9801:206:11:0:0:*

*/

var modifiedHeaders = $request['headers'];
modifiedHeaders['Cookie'] = '_uuid=F3C4755B-D66F-4238-1388-312DCAB6810B560840infoc; b_nut=1663775361; buvid3=FEA83920-6F31-EC5C-D929-2753F0DAECC960970infoc; buvid4=0B85906E-33CB-98E9-6F7C-077475B055C060970-122092123-o3RWjav/umhY+1MdlDVPeA%3D%3D; buvid_fp=76d3698460b36ff009b3796d54bb0460; Buvid=ZC4147CFB1A9154740EFAB429F1FE215383E; SESSDATA=715e4d19%2C1679327347%2Cb420df91; DedeUserID=18866638; DedeUserID__ckMd5=068cecaa89d60c4c; bili_jct=fd06dc0dc481e481ee14c5b19f5b3df8; sid=oir0tioz';
modifiedHeaders['Authorization'] = 'identify_v1 beffdae7f54e507f2fa064fb0e801791';
modifiedHeaders['User-Agent'] = 'bili-universal/69000100 os/ios model/iPhone 12 Pro Max mobi_app/iphone osVer/16.0 network/2';
modifiedHeaders['x-bili-locale-bin'] = 'Eg4KAnpoEgRIYW5zGgJDTg==';
modifiedHeaders['x-bili-device-bin'] = 'CAEQpLfzIBokWkM0MTQ3Q0ZCMUE5MTU0NzQwRUZBQjQyOUYxRkUyMTUzODNFIgZpcGhvbmUqA2lvczIFcGhvbmU6BWFwcGxlQgVBcHBsZUoRaVBob25lIDEyIFBybyBNYXhSBDE2LjBqBjYuOTAuMHJAOTQwNkY4MkQyQkUwQjc0QjcwQjgwOENBNUNBM0RFNjgyMDE5MDkxNDE0MzczMEZFRDgzMjQ2NzkzRUE2RUM3M3i/o7KD4C4=';
modifiedHeaders['x-bili-metadata-bin'] = 'CiBiZWZmZGFlN2Y1NGU1MDdmMmZhMDY0ZmIwZTgwMTc5MRIGaXBob25lGgVwaG9uZSCkt/MgKgVhcHBsZTIkWkM0MTQ3Q0ZCMUE5MTU0NzQwRUZBQjQyOUYxRkUyMTUzODNFOgNpb3M=';
modifiedHeaders['x-bili-fawkes-req-bin'] = 'CgZpcGhvbmUSBHByb2QaEGZmZmZmZmZmZDJkNWYxOWY=';
$done({ 'headers': modifiedHeaders });
