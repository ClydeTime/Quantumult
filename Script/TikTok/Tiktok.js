/*
搬运自Tartarus2014
*/
var watermark = (data) => {
    try {
        let body = JSON.parse(data);
        if (body.data) body.data = Follow(body.data);
        if (body.aweme_list) body.aweme_list = Feed(body.aweme_list);
        if (body.aweme_detail) body.aweme_detail = Share(body.aweme_detail);
        if (body.aweme_details) body.aweme_details = Feed(body.aweme_details);
        $done({ body: JSON.stringify(body) });
} catch (err) {
        console.log("替换异常\n" + err);
        $done({});
    }
}

watermark($response.body);

function Follow(data) {
    if (data && data.length > 0) {
        for (let i in data) {
            if (data[i].aweme.video) video_lists(data[i].aweme);
        }
    }
    return data;
}

function Feed(aweme_list) {
    if (aweme_list && aweme_list.length > 0) {
        for (let i in aweme_list) {
            if (aweme_list[i].is_ads == true) {
                aweme_list.splice(i, 1);
            } else if (aweme_list[i].video) {
                video_lists(aweme_list[i]);
            } else {
                if (!enabled_live) aweme_list.splice(i, 1);
            }
        }
    }
    return aweme_list;
}

function Share(aweme_detail) {
    if (aweme_detail.video) video_lists(aweme_detail);
    return aweme_detail;
}

function video_lists(lists) {
    lists.prevent_download = false;
    lists.status.reviewed = 1;
    lists.video_control.allow_download = true;
    lists.video_control.prevent_download_type = 0;
    delete lists.video.misc_download_addrs;
    lists.video.download_addr = lists.video.play_addr;
    lists.video.download_suffix_logo_addr = lists.video.play_addr;
    lists.aweme_acl.download_general.mute = false;
    if (lists.aweme_acl.download_general.extra) {
        delete lists.aweme_acl.download_general.extra;
        lists.aweme_acl.download_general.code = 0;
        lists.aweme_acl.download_general.show_type = 2;
        lists.aweme_acl.download_general.transcode = 3;
        lists.aweme_acl.download_mask_panel = lists.aweme_acl.download_general;
        lists.aweme_acl.share_general = lists.aweme_acl.download_general;
    }
    if (lists.image_post_info.images) {
        for (let i in lists.image_post_info.images) {
            lists.image_post_info.images[i].owner_watermark_image.url_list = lists.image_post_info.images[i].display_image.url_list;
            lists.image_post_info.images[i].user_watermark_image.url_list = lists.image_post_info.images[i].thumbnail.url_list;
        }
        lists.without_watermark = true;
    }
    return lists;
}
