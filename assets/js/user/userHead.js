$(function () {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image')
  // 1.2 配置选项
  const options = {
    // 纵横比
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options)

  //点击上传触发file文件
  $("#btn-top").on("click", function () {
    //触发file文本域
    $("#file").click();
  });

  // 绑定file改变事件
  $("#file").on('change', function (e) {
    console.log('ok');
    
    //获取文件
    var newfile = e.target.files;
    //判断是否有文件
    if (newfile.length === 0) {
      return layui.layer.msg('请选择文件');
    }
    // 1. 拿到用户选择的文件
    var file = e.target.files[0]
    // 2. 将文件，转化为路径
    var imgURL = URL.createObjectURL(file)
    // 3. 重新初始化裁剪区域
    $image
      .cropper('destroy') // 销毁旧的裁剪区域
      .attr('src', imgURL) // 重新设置图片路径
      .cropper(options) // 重新初始化裁剪区域
  });

  $("#sure").on('click',function () {
    //获取截取下来的头像转化为png64头像
    var dataURL = $image
    .cropper('getCroppedCanvas', {
      // 创建一个 Canvas 画布
      width: 100,
      height: 100
    })
    .toDataURL('image/png')
    //调用ajax更新头像
    $.ajax({
      method:"post",
      url:"/my/update/avatar",
      data:{
        avatar:dataURL
      },
      success: function (res) {
        if(res.status !== 0){
          return layui.layer.msg('获取头像失败');
        }
        layui.layer.msg('获取头像成功');
        window.parent.userInfo();
      }
    });
  });

})
