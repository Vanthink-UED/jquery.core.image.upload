$(function() {

    // upload without other settings
    $(".js-btn-upload").coreImageUpload ({
        url: "./upload.php",
        uploadedCallback: function (result) {
            alert(result);
        }
    });
    
})