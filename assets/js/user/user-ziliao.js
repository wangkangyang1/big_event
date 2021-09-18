$(function() {
    var form = layui.form
    var layer = layui.layer
    form.verify({
        nickname: function(value) { //value：表单的值、item：表单的DOM对象
            if (value.length < 1 || value.length > 6) {
                return '昵称长度在1-6之间的字符'
            }
        }

    })
    getUserInfo()

    //  去的基本数的数据 
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message)
                }
                //   利用layer 中的表单赋值 完场获取值
                form.val('formUserInfo', res.data);
            }
        })
    }
    //  点击重置按钮修改没有保存的数据 同时要把数据库中的数据再拿一份 也就是再渲染一下
    $('#btnReset').on('click', function(e) {
            e.preventDefault()
                // 再调用一份渲染数据
            getUserInfo()
        })
        //  点击提交修改按钮重新提交
    $('form').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('用户修改失败')
                }
                layer.msg('用户修改成功')
                console.log(res);
                // window  是值的是window parent  就是 index.html
                window.parent.getInfo()
            }
        })
    })

})