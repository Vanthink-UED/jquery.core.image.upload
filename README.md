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

+ `extensions:` limit the file type `@array` eg:`[jpg,png]`;`required`

+ `inputOfFile:` upload file form name `@string`;`required`

+ `onSubmit:` when you uploading your file your function callback `@function`

+ `uploadedCallback:` after finish your uploading your callback `@function`;`required`


### MIT LICENSE