$(function() {

    var layer = layui.layer
    var form = layui.form
        // 初始化富文本编辑器
    initEditor()



    //  渲染文章分类列表
    getData()

    function getData() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                var html = template('selection', res)
                $('#seletions').html(html)
                form.render()
            }
        })
    }

    // 1. 初始化图片裁剪器
    var $image = $('#image')

    // 2. 裁剪选项
    var options = {
        aspectRatio: 400 / 280,
        preview: '.img-preview'
    }

    // 3. 初始化裁剪区域
    $image.cropper(options)


    //  当点击按钮的时候能偶触发上传照片
    $('#btnImage').on('click', function() {
        $('#inputFile').click()
    })

    //  监听用户是否是文件传过来 如果没有就不执行  有就执行
    $('#inputFile').on('change', function(e) {
        if (e.target.files.length < 0) {
            return
        }
        var file = e.target.files[0]
        var newImgURL = URL.createObjectURL(file)
        $image
            .cropper('destroy') // 销毁旧的裁剪区域
            .attr('src', newImgURL) // 重新设置图片路径
            .cropper(options) // 重新初始化裁剪区域
    })

    //  定义一个文章的发布状态 
    var art_state = ''

    为存为草稿状态的时候
    $('#save').on('click', function() {
        art_state = '草稿'
    })


    //  监听表单提交事件 
    $('#btnpub').on('submit', function(e) {
        //  阻止表单的默认行为
        e.preventDefault()
            // 基于form 表单快速创建一个formData 对象
        var fd = new FormData($(this)[0])
        fd.append('state', art_state)
            // 将剪切的照片输出一个文件
        $image
            .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
                width: 400,
                height: 280
            })
            .toBlob(function(blob) { // 将 Canvas 画布上的内容，转化为文件对象
                // 得到文件对象后，进行后续的操作
                //    所有的数据就可以拿到了 就可以进行发发起请求了 
                fd.append('cover_img', blob)
                publishArticle(fd)
            })

    })

    //  定义一个提交数据函数 
    function publishArticle(fd) {
        $.ajax({
            method: 'POST',
            url: '/my/article/add',
            data: fd,
            // 注意：如果向服务器提交的是 FormData 格式的数据，
            // 必须添加以下两个配置项
            contentType: false,
            processData: false,
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('发布文章失败！')
                }
                layer.msg('发布文章成功！')
                    // 发布文章成功后，跳转到文章列表页面
                location.href = '/article/art_list.html'
            }
        })
    }
})