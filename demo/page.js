$(function() {

    // upload without other settings
    $(".js-btn-upload").coreImageUpload ({
        url: "./upload.php",
        inputOfFile: 'image',
        uploadedCallback: function (result) {
            alert(result);
        }
    });
    $(".js-btn-crop").coreImageUpload ({
        url: "./upload.php",
        inputOfFile: 'image',
        enableCrop: true,
        enableCrop: '1:1',
        uploadedCallback: function (result) {
            alert(result);
        }
    });
    
})