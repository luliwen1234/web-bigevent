$(function () {
  var form = layui.form;
  form.verify({
    nickname :function (value) {
      if(value.length > 6){
          return "昵称长度必须在 1 ~ 6 位数之间"
      }
    }
  });
  //调用获取用户信息函数
  gainUserInfo();
  //获取用户基本信息渲染到文本框中
  function gainUserInfo() {
    $.ajax({
      method:'get',
      url:'/my/userinfo',
      success: function (res) {
        if(res.status !== 0){
          return layui.layer.msg(res.message);
        }
        // 使用layui为表单赋值 第一个参数是表单 form的lay-filter的值 第二个参数是获取的对象
        form.val('from-box', res.data);
      }
    });
  }

  //提交用户修改后的信息
  $(".layui-form").on('submit',function (e) {
    //阻止表单默认提交行为
    e.preventDefault();
    $.ajax({
      method:"POST",
      url:"/my/userinfo",
      data:$(this).serialize(),
      success: function (res) {
        if(res.status !== 0){
          return layui.layer.msg(res.message);
        }
        //调用主页中index.js中获取用户信息函数 更改用户名和头像
        layui.layer.msg("提交成功");
        window.parent.userInfo();
      }
    });
    
  });

  //重置
  $("#reset").on('click',function (e) {
    //阻止默认的重置行为
    e.preventDefault();
    //再次调用获取用户信息的函数
    gainUserInfo();

  });
})