//  在利用jQuery 进行使用 ajax 的时候  会首先调用这个函数 

$(function() {
    //  这是设置url的
    $.ajaxPrefilter(function(options) {
        options.url = 'http://api-breakingnews-web.itheima.net' + options.url

        // 设置headers 属性 首先只有/my/ 才会发起请求
        if (options.url.indexOf('/my/') !== -1) {
            options.headers = {
                Authorization: localStorage.getItem('token') || ''
            }
        }


        // 优化 complete 代码 
        // 防止页面执行登录到首页 
        options.complete = function(res) {
            console.log(res);
            // responseJSON  status    "身份认证失败！"  
            if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
                location.href = './login.html'
                localStorage.removeItem('token')
            }
        }
    })


})