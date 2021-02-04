$(function () {
  //获取文章类别
  function initArt() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success: function (res) {
        if (res.status !== 0) {
          return layui.layer.msg("数据获取失败");
        }
        var htmlStr = template('art_cat', res);
        $("[name=cate_id]").html(htmlStr);
        layui.form.render();
      }
    })
  }
  initArt();
  initEditor();

  // 1. 初始化图片裁剪器
  var $image = $('#image')
  // 2. 裁剪选项
  var options = {
    aspectRatio: 400 / 280,
    preview: '.img-preview'
  }
  // 3. 初始化裁剪区域
  $image.cropper(options)

  //绑定file文件选择框
  $("#selectCover").on('click', function () {
    $("#file").click();
  });
  //选择图片渲染页面中
  $("#file").on("change", function (e) {
    //  获取file文件
    console.log(e);

    var files = e.target.files;
    if (files.length === 0) {
      return
    }
    var newImgURL = URL.createObjectURL(files[0])
    $image
      .cropper('destroy')      // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options)        // 重新初始化裁剪区域
  });

  //定义状态变量
  var state = "已发布";
  $("#rough").on('click', function () {
    state = "草稿";
  });
  //form提交事件
  $("#form_art").on("submit", function (e) {
    e.preventDefault();
    //创建formDate对象 这里将当前的jquery对象转换为dom对象
    var fd = new FormData($(this)[0]);
    //将当前状态存入formData中
    fd.append('state', state);
    // 4. 将封面裁剪过后的图片，输出为一个文件对象
    $image
      .cropper('getCroppedCanvas', {
        // 创建一个 Canvas 画布
        width: 400,
        height: 280
      })
      .toBlob(function (blob) {
        // 将 Canvas 画布上的内容，转化为文件对象
        // 得到文件对象后，进行后续的操作
        // 5. 将文件对象，存储到 fd 中
        fd.append('cover_img', blob)
        // 6. 发起 ajax 数据请求
        publishEssay(fd);
      })
  });

  function publishEssay(fd){
    $.ajax({
      method:"post",
      url:'/my/article/add',
      data:fd,
      //注意：如果像服务器提交formData格式的数据
      //必须添加以下两个配置
      contentType:false,
      processData:false,
      success:function(res){
        if(res.status !== 0){
           return layui.layer.msg("上传失败");
        }
        layui.layer.msg('上传成功');
        location.href ="/article/art_list.html";
      }
    });
  }
})
