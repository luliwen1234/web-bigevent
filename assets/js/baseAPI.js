//注意：每次调用$.get(),$.post()或$.ajax()方法时
//都会先调用ajaxprefilter()函数
//在这个函数中可以拿到我们给ajax提供的配置对象
<<<<<<< HEAD
$.ajaxPrefilter(function (options) {
  //在发起ajax请求前拼接好路径
  options.url = 'http://ajax.frontend.itheima.net' + options.url;
  //统一为有权限的接口设置 header 请求头
=======
$.ajaxPrefilter(function(options){
   //在发起ajax请求前拼接好路径
   options.url = 'http://ajax.frontend.itheima.net' + options.url;
   
    //统一为有权限的接口设置 header 请求头
>>>>>>> user
  if (options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  //优化权限控制代码
  //控制用户访问权限 此函数不管是成功还是失败都会执行的函数
  options.complete = function (res) {
<<<<<<< HEAD
    if (res.responseJSON.status === 1 && res.responseJSON.message === "身份认证失败！") {
=======
    if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
>>>>>>> user
      //强制清空 token
      localStorage.removeItem('token');
      //强制跳转登陆页面
      location.href = '/login.html';
    }
  }
<<<<<<< HEAD
=======
   
>>>>>>> user
});