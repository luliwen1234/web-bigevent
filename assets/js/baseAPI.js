//注意：每次调用$.get(),$.post()或$.ajax()方法时
//都会先调用ajaxprefilter()函数
//在这个函数中可以拿到我们给ajax提供的配置对象
$.ajaxPrefilter(function(options){
   //在发起ajax请求前拼接好路径
   options.url = 'http://ajax.frontend.itheima.net' + options.url;
   console.log(options.url);
   
});