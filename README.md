# jquery.core.image.upload 

jquery.core.upload  是一款轻量级图片以及裁剪插件,支持无刷新上传。

### 快速开始

```js
<script src="http://s1.vued.vanthink.cn/188f332f5204/core.upload.min.js"></script>


// AMD
define(['core.image.upload'],function(){

  ...
})

$(.btn).CoreUpload({
  extensions: [],
  actionToSubmitUpload: "",
  maximumSize: 1024,
  enableMaximumSize: false,
  enableButton: false,
  enableDrag: false,
  inputOfFile: 'file',
  loadingObj: '',
  uploadingFun: function() {

  }

})


```

### config Options

+ `url` your server url `@string` rg:`./src/upload.php`;`required`;

+ `uploadedCallback:` after finish your uploading your callback `@function`;`required`;

+ `inputOfFile:` upload file form name `@string`;`required`

+ `extensions:` limit the file type `@array` eg:`[jpg,png]`;

+ `onSubmit:` when you uploading your file your function callback `@function`

+ `isAjax`: we support two upload:`ajax` And 'iframe'.`@boolean`,default:`true` 


### Send server crop arguments

If you crop a image , your crop will send a request to your server with some crop arguments;

                        
<img src="http://img1.vued.vanthink.cn/vuedba0ed377b88fc84d51026310efcb255b.png" />


+ `toCropImgX`: the distance of cropbox to the image left;
+ `toCropImgY`: the distance of cropbox to the image top
+ `toCropImgW`: the width of cropbox
+ `toCropImgH`: the height of cropbox
+ `maxWidth`: the maxium width of your target image 
+ `maxHeight`: the maxium height of your target image 

``` javascript
<script src="../src/jquery-ui.min.js"></script>

$(".js-btn-crop").coreImageUpload ({
    url: "./crop.php",
    inputOfFile: 'image',
    enableCrop: true,
    cropRatio: '1:1',
    uploadedCallback: function (result) {
        alert( '裁剪成功! 图片宽高:' + result.data['toCropImgW'] + result.data['toCropImgH']);
    }
});
```

### MIT LICENSE