$(function () {
    // 点击注册页注册页隐藏登录页显示
    $("#click_reg").on("click", function () {
        $("#link-login").hide();
        $("#link-reg").show();
    });
    //点击登录页登录页隐藏注册页显示
    $("#click_login").on("click", function () {
        $("#link-login").show();
        $("#link-reg").hide();
    });
    //使用layui自定义密码值
    //先通过layui.form获取layui中的form属性
    var form = layui.form;
    //导出layer 用于提示用户注册成功或者失败
    var layer = layui.layer;
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        //需要判断两次密码值是否一样
        repwd: function (value) {
            var pwd = $('#link-reg [name=password]').val();
            if (pwd !== value) {
                return "两次密码不一样"
            }
        }
    });
    //使用ajax实现提交
    $("#form-reg").on("submit", function (e) {
        //阻止默认提交
        e.preventDefault();
        $.post("/api/reguser", { username: $("#form-reg [name=username]").val(), password: $("#form-reg [name=password]").val() }, function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message);
            }
            //注册成功提示
            layer.msg("注册成功,请登录");
            //自动调用登录的click方法
            $('#click_login').click();
        });
    });

    //调用接口实现登录功能
    $("#form-login").submit(function (e) {
        //阻止默认提交
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/api/login',
            //获取表单数据
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg(res.message);
                }
                layer.msg("登录成功");
                //登录成功后得到token字符串存入localStorage中
                //这里以键值对的方式存储
                localStorage.setItem("token", res.token)
                //登录成功跳转主页面
                location.href = "/index.html"
                
            }
        });
    });

})