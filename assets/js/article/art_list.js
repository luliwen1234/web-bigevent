$(function () {
  //重新渲染时间格式函数
  template.defaults.imports.timeFun = function (date) {
    var time = new Date(date);
    //年月日
    var y = zeroize(time.getFullYear());
    var m = zeroize(time.getMonth() + 1);
    var d = zeroize(time.getDate());
    //时分秒
    var hh = zeroize(time.getHours());
    var mm = zeroize(time.getMinutes());
    var ss = zeroize(time.getSeconds());

    return y + "-" + m + "-" + d + " " + hh + ":" + mm + ":" + ss
  }
  //时间补零函数
  function zeroize(h) {
    //三元表达式
    return h > 9 ? h : "0" + h;
  }
  var form = layui.form;
  //创建对象p
  var p = {
    pagenum: 1,//默认选中第一页
    pagesize: 2,//每页显示2行
    cate_id: '',
    state: '',
  }
  //获取列表并渲染页面
  function crlList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/list',
      data: p,
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("数据获取失败");
        }
        var htmlStr = template('art_list', res);
        $("tbody").html(htmlStr);
        layui.form.render();
        paging(res.total);//调用分页的方法 将总共多少条数据传进去
      }
    });
  }
  //调用获取列表函数
  crlList();
  artAdd();
  //给添加分类动态添加数据
  function artAdd() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("数据获取失败");
        }
        var htmlStr = template('art_add', res);
        $("[name=cate_id]").html(htmlStr);
        form.render();
      }
    });
  }

  //实现筛选功能 为单提交submit事件
  $("#form_art").on('submit', function (e) {
    e.preventDefault();
    //获取下拉列表值
    var cate_id = $('[name=cate_id]').val();
    var state = $("[name=state]").val();
    //将获取过来的值赋值给p里面的状态值
    p.cate_id = cate_id;
    p.state = state;
    //最后刷新表单
    crlList();
  });

  //分页模板制作
  function paging(total){
    var laypage = layui.laypage;
    //执行一个laypage实例
    laypage.render({
      elem: 'codeList' //注意，这里的 test1 是 ID，不用加 # 号
      ,count: total, //数据总数，从服务端得到
      limit:p.pagesize,
      curr:p.pagenum,
      limits:[2,3,5,7],
      layout:['count','limit','prev', 'page', 'next','skip'],
      jump: function(obj, first){
        // 将当前点击后的值赋值给p对象
        p.pagesize = obj.limit;
        p.pagenum = obj.curr;
        //这里一定要判断 使用何种方式调用列表函数
        if(!first){
          crlList();
        }
      }      
    });
  }

  //删除板块 使用代理形式给删除添加点击事件
  $("body").on("click",".btn_delete",function(){
    //使用layui创建询问弹出层
    layui.layer.confirm('确定删除?', {icon: 3, title:'提示'}, function(index){
      //调用ajax删除数据
      var id = $(".btn_delete").attr('data-id');
      var len = $(".btn_delete").length;
      //do something
      $.ajax({
        method:"get",
        url:"/my/article/delete/"+id,
        success: function(res){
          if(res.status !== 0){
            return layui.layer.msg("删除失败");
          }
          layui.layer.msg("删除成功");
          // 使用if判断解决列表页不显示的问题
          if(len === 1){
            p.pagenum= p.pagenum === 1?1:p.pagenum-1;
          }
          crlList();
        }
      });
      layer.close(index);
    });
  })
})