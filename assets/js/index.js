$(function () {
  //调用 用户信息
  userInfo()
  var layer = layui.layer;
  //实现退出功能
  $("#clear").on('click',function(){
    layer.confirm("确认退出程序？", {icon: 3, title:'提示'}, function(index){
      //do something
      //退出后清空数据
      localStorage.removeItem('token');
      //回到登录页面
      location.href = '/login.html';
      layer.close(index);
       
    });
  });
});

//获取用户信息函数
function userInfo() {
  $.ajax({
    method: 'get',
    url: '/my/userinfo',
  // headers: {
  //     Authorization: localStorage.getItem('token') || ""
  //   },  
    success: function (res) {
      if (res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      //获取用户成功后调用更换头像函数
      changeAvatar(res.data);
    },
    // //控制用户访问权限 此函数不管是成功还是失败都会执行的函数
    // complete: function(res){
    //   if(res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！"){
    //       //强制清空 token
    //       localStorage.removeItem('token');
    //       //强制跳转登陆页面
    //       location.href = '/login.html';
    //   }
      
    // }
  });
}

//更换头像函数
function changeAvatar(res) {
  //获取用户名 
  var name = res.nickname || res.username
  //将获取过来的用户名第一位字母转换成大写
  var str = name[0].toUpperCase();
  $(".welcome").html("欢迎&nbsp;"+name);
  //判断是用户名登录还是第一次登录
  if(res.user_pic != null){
    //有头像
    $('.layui-nav-img').attr('src',res.user_pic).show()
    $('.span-img').hide();
  }else{
     //没有像
     $('.layui-nav-img').hide()
     $('.span-img').html(str).show();
  }
}