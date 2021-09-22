$(function() {
    //  获取得到的layer 
    var layer = layui.layer
        //  获取数据 
    var form = layui.form
        //    调用函数 渲染表格数据 
    getData()
        // 自定义函数渲染数据
    function getData() {
        //  先利用ajax 请求数据 
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('请求数据失败')
                }
                var HTML = template('table', res.data)
                $('#tbody').html(HTML)
            }
        })
    }

    //  这是open的使用方法 关闭的时候需要用到
    var indexID = null
    $('#addClass').on('click', function() {
        indexID = layer.open({
            type: 1,
            title: ['添加文章分类', 'font-size:18px;'],
            area: ['500px', '270px'],
            content: $('#Addinput').html()
        });
    })

    // 添加数据到数据库 使用了代理 
    $('body').on('submit', '#Addform', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('提交失败')
                }
                layer.msg('添加分类成功')
                getData()
                layer.close(indexID);
            }
        })
    })

    // 编辑按钮使用代理   //   使用代理点击 确认编辑按钮拿到数据 
    var indexEdit = null
    $('#tbody').on('click', '#add_edit', function(e) {
            indexEdit = layer.open({
                type: 1,
                title: ['修改文章分类', 'font-size:18px;'],
                area: ['500px', '270px'],
                content: $('#add_Eit').html()
            });
            var id = $(this).attr('data-id')
            $.ajax({
                method: 'GET',
                url: '/my/article/cates/' + id,
                success: function(res) {
                    // form.val('AddEdit', res.data)
                    form.val('AddEdit', res.data);

                }
            })
        })
        // 添加数据到数据库 使用了代理 
    $('body').on('submit', '#AddEdit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改分类成功')
                getData()
                layer.close(indexEdit);
            }
        })
    })

    // 修改数据 
    $('body').on('submit', '#AddEdit', function(e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/article/updatecate',
            data: $(this).serialize(),
            success: function(res) {
                if (res.status !== 0) {
                    return layer.msg('修改失败')
                }
                layer.msg('修改分类成功')
                getData()
                layer.close(indexEdit);
            }
        })
    })

    // 删除数据 

    $('#tbody').on('click', '#del_edit', function() {
        var id = $(this).attr('data-id')
        layer.confirm('确定删除', { icon: 3, title: '提示' }, function(index) {
            //do something
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function(res) {
                    // console.log(res);
                    if (res.status !== 0) {
                        return layer.msg('删除失败')
                    }
                    layer.msg('删除分类成功')
                    getData()
                    layer.close(index);
                    getData()
                        // layer.close(indexEdit);

                }
            })

        });

    })
})