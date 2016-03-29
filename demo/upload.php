<?php
    var $file = $_FILES['image'];

    if(!isset[$file]) {
        echo json_decode(array(
            'errcode' => 500,
            'data' => '',
            'errmsg' => 'not found your image'
        ));
        return;
    }
    echo json_decode(array(
        'errcode' => 0,
        'data' => $file,
        'errmsg' => ''
    ));
?>