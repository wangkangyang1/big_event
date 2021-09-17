$(function() {
    //   在登录页面点击去注册跳转到去登录
    $('#goReg').on('click', function() {
            $('.login-box').hide()
            $('.reg-box').show()
        })
        //   在注册页面点击去注册跳转到去注册
    $('#goLogin').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    var form = layui.form
    var layer = layui.layer
        //  自定义表单验证 
    form.verify({
        pwd: [
            /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
        ],
        repwd: function(value) {
            // 这里面的value 只要密码框调用就会会的密码框里面的值 
            var pwds = $('.reg-box [name=password]').val()
            if (pwds !== value) {
                return '两次密码输入不一致';
            }
        }
    });

    //  data = {username :  $(#regPost [name=username] ") ,

    // 利用post注册表单
    $("#regPost").on('submit', function(e) {
        e.preventDefault()
        $('#goLogin').click()
        var data = {
            username: $('#regPost [name=username]').val(),
            password: $('#regPost [name=password]').val()
        }
        console.log(data);
        $.post('/api/reguser', data, function(res) {


            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            layer.msg('注册成功');
        })
    })


    //  登录事件  

    $('#entry').on('submit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg(res.message);
                localStorage.setItem('token', res.token)
                location.href = './index.html'
            }
        })
    })


})