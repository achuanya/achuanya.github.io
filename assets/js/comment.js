/*
 * @Description: 
 * @author: 阿川 ahuan@achuan.io
 * @Date: 2019-02-16 11:05:35
 * @LastEditTime: 2019-03-03 12:43:15
 */
comment_el = '.comment';
load_valine = function () {
    if ($(comment_el).length) {
    new Valine({ 
        av: AV,
        el: comment_el,
        emoticon_url: 'https://cloud.panjunwen.com/alu',
        emoticon_list: ["喷血.png","狂汗.png","不说话.png","汗.png","坐等.png","献花.png","不高兴.png","中刀.png","害羞.png"],
        app_id: 'ImLcr7kTj5GeJaFXoPelSR9O-gzGzoHsz',
        app_key: 'JU73J3Gg1BHagGWiMj1jr1nE',
        placeholder: 'Write a Comment'
        });
    }
};
$(document).ready(load_valine);
$(document).on('pjax:complete', function() {
    load_valine();
});