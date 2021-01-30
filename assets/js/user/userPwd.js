$(function () {
  var form = layui.form
  form.verify({
    //验证密码
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位，且不能出现空格'
    ],
    twoPwd: function (value) {
      if (value === $("[name=oldpwd]").val()) {
        return "新密码不能和旧密码相同"
      }
    },
    somePwd: function (value) {
      if (value !== $("[name=newpwd]").val()) {
        return "两次输入密码不一样"
      }
    }
  })
  
  $(".layui-form").on("submit", function (e) {
    //阻止默认提交
    e.preventDefault();
    $.ajax({
      method: 'POST',
      dataType:'json',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function(res) {
        if (res.status !== 0) {
          return layui.layer.msg('更新密码失败！')
        }
        layui.layer.msg('更新密码成功！')
        // 重置表单
        $('.layui-form')[0].reset()
      }
    })
  });
})