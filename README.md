# jquery.core.image.upload 

jquery.core.upload   a plugin for image upload [Demo](http://vanthink-ued.github.io/jquery.core.image.upload/upload.html)

### how to use

#### Node
```bash
npm i jquery.core.image.upload --save-dev
```
``` js
<script src="./node_modules/jquery.core.image.upload/dist/jquery.core.image.upload.min.js"></script>
```

#### Git
```bash
git clone https://github.com/Vanthink-UED/jquery.core.image.upload.git
```

#### Basic Usage

```js
<script src="./dist/jquery.core.image.upload.min.js"></script>

$(".js-btn-upload").coreImageUpload ({
    url: "./upload.php",
    inputOfFile: 'image',
    uploadedCallback: function (result) {
        alert(result);
    }
});

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
<script src="./dist/jquery-ui.min.js"></script>
// if you want ot support mobile touch
<script src="./dist/jquery-ui.touch-pounch.min.js"></script>
$(".js-btn-crop").coreImageUpload ({
    url: "./crop.php",
    inputOfFile: 'image',
    enableCrop: true,
    cropRatio: '1:1',
    uploadedCallback: function (result) {
        alert( 'Success!:' + result.data['toCropImgW'] + result.data['toCropImgH']);
    }
});
```
Also We concat a single file with full scripts in `dist/jquery.core.image.upload.full.min.js`

### MIT LICENSE
