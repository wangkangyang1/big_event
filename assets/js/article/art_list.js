$(function() {

    //  引入layer
    var layer = layui.layer
    var form = layui.form
    var laypage = layui.laypage;
    //  定义自己请求数据的data q

    var q = {
            pagenum: 1, //页码值
            pagesize: 2, // 每页显示多少条数据
            cate_id: '', // 文章分类的 Id
            state: '' // 文章的状态，可选值有：已发布、草稿
        }
        // 调用数据
    getData()
        // 获得分类项
    initCate()


    //  定义一个过滤器用来过滤标准时间
    template.defaults.imports.dataFormat = function(date) {
        const dt = new Date(date)
        var y = dt.getFullYear()
        var m = dt.getMonth() + 1
        m = m < 10 ? '0' + m : m
        var s = dt.getDate()
        s = s < 10 ? '0' + s : s

        var hh = dt.getHours()
        hh = hh < 10 ? '0' + hh : hh
        var mm = dt.getMinutes()
        mm = mm < 10 ? '0' + mm : mm
        var ss = dt.getSeconds()
        ss = ss < 10 ? '0' + ss : ss

        return y + '-' + m + '-' + s + ' ' + hh + ':' + mm + ':' + ss
    }



    // 请求数据的函数 
    function getData() {
        $.ajax({
            method: 'GET',
            url: '/my/article/list',
            data: q,
            success: function(res) {


                //  有数据的时候的试试看
                // console.log(res);
                if (res.status !== 0) {
                    return layer.msg('获取列表失败')
                }

                var html = template('dataList', res)
                $('#tbody').html(html)
                    //  求结束之后就调用数据    
                paging(res.total)

            }
        })
    }
    //  请求文章分类
    function initCate() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function(res) {

                if (res.status !== 0) {
                    return layer.msg('获取分类数据失败！')
                }
                // 调用模板引擎渲染分类的可选项
                var htmlStr = template('objectList', res)
                $('[name=cate_id]').html(htmlStr)
                    // 通过 layui 重新渲染表单区域的UI结构
                form.render()
            }
        })
    }
    //  给筛选按钮绑定事件 
    $('#shaixuan').on('submit', function(e) {
        e.preventDefault()
        var cate_id = $('[name=cate_id]').val()
        var state = $('[name=state]').val()
        console.log(state);
        q.cate_id = cate_id
        q.state = state
        getData()
    })


    //  分页的设置 设置一个函数 
    function paging(total) {
        laypage.render({
            elem: 'test1', //注意，这里的 test1 是 ID，不用加 # 号

            count: total, //数据总数，从服务端得到 
            limit: q.pagesize, // 每页显示几条数据
            curr: q.pagenum, // 设置默认被选中的分页
            // limit: 10,
            layout: ['count', 'limit', 'prev', 'page', 'next', 'skip'],
            limits: [1, 2, 3, 4, 10],
            // curr: pagenum  
            jump: function(obj, first) {
                //obj包含了当前分页的所有参数，比如：
                // console.log(obj.curr); //得到当前页，以便向服务端请求对应页的数据。
                // console.log(obj.limit); //得到每页显示的条数

                q.pagenum = obj.curr
                q.pagesize = obj.limit

                //首次不执行
                if (!first) {
                    //do something
                    getData()
                }
            }
        });
    }


    //  删除功能的安排  利用代理进行绑定事件 
    $('#tbody').on('click', '.deleData', function() {
        var id = $(this).attr('data-id')
        var len = $('.deleData').length
        console.log(len);
        console.log(id);
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/delete/' + id,
                success: function(res) {
                    if (res.status !== 0) {
                        return layer.msg('删除文章失败！')
                    }
                    layer.msg('删除文章成功！')
                        // 当数据删除完成后，需要判断当前这一页中，是否还有剩余的数据
                        // 如果没有剩余的数据了,则让页码值 -1 之后,
                        // 再重新调用 initTable 方法
                        // 4
                    console.log(q.pagenum);
                    if (len === 1) {
                        // 如果 len 的值等于1，证明删除完毕之后，页面上就没有任何数据了
                        // 页码值最小必须是 1
                        q.pagenum = q.pagenum === 1 ? 1 : q.pagenum - 1
                    }
                    q.pagenum = q.pagenum
                    console.log(q);
                    getData()
                }
            })

            layer.close(index)
        })
    })

    $('#bianji').on('click', function() {

    })

    $('#tbody').on('click', '#bianji', function() {
        location.href = 'art_bianji.html'
    })

})