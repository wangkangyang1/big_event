//  在利用jQuery 进行使用 ajax 的时候  会首先调用这个函数 
$(function() {
    $.ajaxPrefilter(function(options) {

        options.url = 'http://api-breakingnews-web.itheima.net' + options.url
        console.log(options.url);
    })
})