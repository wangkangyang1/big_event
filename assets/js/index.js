$(function() {
    //  获得用户数据
    getInfo()
        // 退出功能
    $('#btnLogout').on('click', function() {
        layer.confirm('确定退出吗?', { icon: 3, title: '提示' }, function(index) {
            //do something
            localStorage.removeItem('token')
            location.href = './login.html'

            // 关闭提示框
            layer.close(index);
        });
    })
})

// 获得用户信息

function getInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function(res) {
            // 获取用户名和头像 
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            renderAvatar(res.data)
        }


    })
}

//  获得用户名或者头像
function renderAvatar(user) {
    // 获得用户名 欢迎谁谁登录
    var name = user.nickname || user.username
    $('.welcome').html('欢迎&nbsp;&nbsp;' + name)
        // 获得头像  如果有图片就显示图片，如果没有就不显示图片 

    if (user.user_pic !== null) {
        //   设置用户图片 
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.userimg').hide()
    } else {
        // 设置文本头像 

        $('.userimg').html(name[0].toUpperCase()).show()
        $('.layui-nav-img').hide()

    }
}