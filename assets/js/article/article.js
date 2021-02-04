$(function () {
  var layer = layui.layer;
  var form = layui.form;
  //使用ajax获取元素
  function gainEssayList() {
    $.ajax({
      method: "get",
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("获取文章列表失败");
        }
        var htmlStr = template('form-essay', res);
        $("tbody").html(htmlStr)
      }
    });
  }
  //调用获取文章列表函数
  gainEssayList();
  var index = null;
  //给添加类别绑定click事件
  $("#addGenre").on('click', function () {
    // e.preventDefault();
    index = layer.open({
      type: 1,
      area: ['450px', '250px'],
      title: '添加文章分类',
      content: $("#popup").html()
    });
  });

  //给确认添加按钮添加点击事件
  $("body").on("click", "#addBtn", function (e) {
    e.preventDefault();
    $.ajax({
      method: "POST",
      url: "/my/article/addcates",
      data: {
        name: $("[name=name]").val(),
        alias: $("[name=alias]").val()
      },
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg("添加失败");
        }
        //调用获取文章列表函数
        gainEssayList();
        layer.msg('添加成功');
        layer.close(index);
      }
    });
  });

  var index_edit = null;
  //使用代理给编辑按钮添加点击事件
  $("tbody").on('click', '.btn-edit', function () {
    //弹出层
    index_edit = layer.open({
      type: 1,
      area: ['450px', '250px'],
      title: '添加文章分类',
      content: $("#edit").html()
    });
    var id = $(this).attr('data-id');
    // 将数据渲染在弹出层中
    $.ajax({
      method: "GET",
      url: "/my/article/cates/" + id,
      success: function (res) {
        form.val('form-edit', res.data)
      }
    })
  })

  //点击确认修改 修改内容 通过代理的形式给却惹修改添加事件
  $("body").on("submit", "#form-edit", function (e) {
    e.preventDefault();
    // 通过ajxa修改数据
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success: function (res) {
        if (res.status !== 0) {
          return layer.msg('修改数据失败');
        }
        layer.msg('修改数据成功');
        layer.close(index_edit);
        gainEssayList();
      }
    });
  });

  //删除功能
  $("tbody").on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id');
    //弹出提示框
    layer.confirm('确认删除?', { icon: 3, title: '提示' }, function (index) {

      $.ajax({
        method: 'get',
        url: '/my/article/deletecate/'+ id,
        success: function (res) {
          if (res.status !== 0) {
            return layer.msg('删除失败');
          }
          layer.msg('删除成功');
          gainEssayList();
          //do something
          layer.close(index);
        }
      })
    });
  })
})