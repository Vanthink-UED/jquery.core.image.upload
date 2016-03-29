/*****
 ** a plugin for image upload
 ** view doc https://github.com/Vanthink-UED/jquery.core.image.upload
 ******/

(function (a) {
    var f;
    a.fn.uploadAjax = function (g) {
        var b = a.extend({
            accept: /^(jpg|png|gif)/gi,
            acceptEx: "",
            name: "file",
            method: "POST",
            url: "/",
            data: !1,
            maxFileSize: 1048576,
            onSubmit: function () {
                return !0
            },
            onComplete: function () {
                return !0
            },
            extError: function () {
                return !1
            }
        }, g);
        return this.each(function () {
            var e = a(this);
            e.css("position", "relative");
            e.setData = function (a) {
                b.data = a
            };
            var c = a('<form  method="' + b.method + '" enctype="multipart/form-data" action="' + b.url + '"> <input name="' + b.name + '" type="file" accept="' + b.acceptEx + '" /></form>'),
                h = c.find("input[name=" + b.name + "]");
            h.css("display", "none");

            h.css({
                cursor: "pointer",
                display: "block",
                position: "absolute",
                left: 0,
                top: 0,
                width: e.width() <= 0 ? 132 : e.width() + 30,
                height: e.height() <= 0 ? 32 : e.height(),
                "font-size": "100pt",
                cursor: "hand",
                opacity: 0,
                filter: "alpha(opacity=0)",
                "z-index": 10,
                overflow: "hidden"
            }).attr("title", "选择一个图片");

            h.on("change", function (fe) {
                d = h.val().replace(/C:\\fakepath\\/i, "");
                d = d.substring(d.lastIndexOf(".") + 1);
                if (!b.accept.test(d)) {
                    return b.extError.call(e, this), c.get(0).reset(), !1
                }

                if (fe.target.files[0].size > b.maxFileSize) {
                    var formatSize;
                    if (parseInt(b.maxFileSize / 1024 / 1024) > 0) {
                        formatSize = (b.maxFileSize / 1024 / 1024).toFixed(2) + 'MB';
                    } else if (parseInt(b.maxFileSize / 1024) > 0) {
                        formatSize = (b.maxFileSize / 1024).toFixed(2) + 'kB';
                    } else {
                        formatSize = b.maxFileSize.toFixed(2) + 'Byte';
                    }
                    alert('文件不能超过(' + formatSize + ')');
                    return;
                }
                c.find("input[type=hidden]").remove();
                b.onSubmit.call(e, a(this));
                b.data && a.each(b.data, function (b, d) {
                    c.append(a('<input type="hidden" name="' + b + '" value="' + d + '">'))
                });
                c.submit();
                a(c).find("input[type=file]").attr("disabled", "disabled")
            });
            a(e).append(c);
            f || (f = a('<iframe id="picture-element-iframe" name="picture-element-iframe"></iframe>').attr("style", 'style="width:0px;height:0px;border:0px solid #fff;"').hide(), f.attr("src", ""), a(document.body).append(f));
            var g = function () {
                a(c).find("input[type=file]").removeAttr("disabled");
                var d = a(this).contents().find("html body").text();
                a(c).get(0).reset();
                b.onComplete.call(e, d);
                f.unbind()
            };
            c.submit(function (a) {
                f.load(g);
                c.attr("target", "picture-element-iframe");
                a.stopPropagation()
            })
        })
    }
})(jQuery);

(function ($) {
    
    
    var defaultOptions = {

        
    };
    
    
    var methods = {
        clear: function (Options) {
            return this.each(function () {
                var InputOfImageDirectory = $(this).find(".picture-element-image-directory");
                InputOfImageDirectory.val("").change()
            })
        },
        init: function (Options) {
            var OptionsIfEmpty = {
                actionToSubmitUpload: "src/php/upload.php",
                actionToSubmitCrop: "src/php/crop.php",
            };
            
            var Options = $.extend(defaultOptions, Options);
            var ImageBoxObj = {};
            if (Options.cropModes != undefined) {
                Options.cropModes = $.extend(defaults.CropModes, Options.cropModes);
            }

            Options.actionToSubmitUpload = (Options.actionToSubmitUpload == "") ? OptionsIfEmpty.actionToSubmitUpload : Options.actionToSubmitUpload;
            Options.actionToSubmitCrop = (Options.actionToSubmitCrop == "") ? OptionsIfEmpty.actionToSubmitCrop : Options.actionToSubmitCrop;
            //  Options.DefaultImageButton = (Options.DefaultImageButton == "") ? Options.PluginFolderOnServer + OptionsIfEmpty.DefaultImageButton : Options.DefaultImageButton;
            if (Options.inputOfFile == "") {
                Options.inputOfFile = "file-" + Options.inputOfImageDirectory
            };


            return this.each(function () {
                var Elemento;



                var initUpload = function (element) {
                    element.css({
                        "cursor": "pointer",
                        "overflow": "hidden"
                    }).addClass("g-core-image-upload-element");
                    // support drage
                    element.on('dragenter', function (e) {
                        if ($(e.target).attr("name") == Options.inputOfFile) {
                            element.addClass("picture-dropped")
                        } else {
                            element.removeClass("picture-dropped")
                        };
                        e.stopPropagation();
                        e.preventDefault()
                    });
                    $(document).on('drop dragend', function (e) {
                        element.removeClass("picture-dropped");
                        e.stopPropagation()
                    });
                    element.on("mouseout", function (e) {
                        element.removeClass("picture-dropped");
                        e.stopPropagation()
                    });

                    var $inputHidden = $("<input type='hidden' name='" + Options.InputOfImageDirectory + "' id='" + Options.InputOfImageDirectory + "'>");
                    $inputHidden.addClass("picture-element-image-directory");
                    element.append($inputHidden);
                    //$inputHidden.attr(Options.InputOfImageDirectoryAttr);
                };
                var getExt = function (name) {
                    return name.slice(name.lastIndexOf(".") + 1);
                };
                var Setando_AjaxUpload = function (element) {
                    var post = Options.DataPost;
                    post["request"] = "upload";
                    var CustomRegex = new RegExp("^(" + Options.extensions.join("|") + ")", "i");
                    element.uploadAjax({
                        accept: CustomRegex,
                        acceptEx: "image/*",
                        name: Options.inputOfFile,
                        method: 'POST',
                        url: Options.actionToSubmitUpload,
                        data: post,
                        onSubmit: function () {

                            var icon_str = '<div class="core-upload-svg-icon" style="position:absolute;left:0;top:0;width:100%;height:100%;text-align:center;background-color:';
                            icon_str += element.css('background-color');
                            icon_str += ';">';
                            icon_str += '<svg version="1.1" id="loader-1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="25px" height="25px" style="vertical-align:middle;" viewBox="0 0 50 50" style="enable-background:new 0 0 50 50;" xml:space="preserve"><path fill="#fff" d="M25.251,6.461c-10.318,0-18.683,8.365-18.683,18.683h4.068c0-8.071,6.543-14.615,14.615-14.615V6.461z" transform="rotate(293.601 25 25)"><animateTransform attributeType="xml" attributeName="transform" type="rotate" from="0 25 25" to="360 25 25" dur="0.6s" repeatCount="indefinite"></animateTransform></path></svg>';
                            icon_str += '上传中...</div>';
                            $loading = $(icon_str);

                            element.append($loading);
                        },
                        onComplete: function (response) {
                            $loading.remove();
                            $loading = '';
                            var response = $.parseJSON(response);
                            ImageBoxObj = new ImageBox(response);


                        },
                        extError: function () {
                            alert("请选择 " + (Options.extensions.join(",")).toString() + " 类型的文件")
                        }
                    });
                    element.find(":file[name='" + Options.inputOfFile + "']").mouseenter(function () {
                        element.addClass("TuyoshiImageUpload_div")
                    }).mouseout(function () {
                        element.removeClass("TuyoshiImageUpload_div")
                    })
                };

                var ImageBox = function (response) {
                    if (!response) {
                        response = {
                            'errno': 2,
                            'errmsg': '系统错误'
                        };
                    }
                    this.response = response;
                    this.dialog = $('<div class="g-core-image-corp-container"></div>');
                    this.imageAside = $('<div class="image-aside"></div>');
                    this.infoAside = $('<div class="info-aside"></div>');
                    this.show();

                }

                ImageBox.prototype = {
                    show: function () {
                        this.dialog.append(this.imageAside, this.infoAside);
                        $('body').append(this.dialog);
                        this.outputConfigInfo();
                        this._initButtons();
                        if (Options.enableCrop) {
                            this._initCropBox();
                        } else {
                            this.initPic();
                        }

                        this._bind();
                    },

                    hide: function () {
                        this.dialog.remove();
                    },

                    initPic: function ($container) {
                        $imageSrc = this.response.data.src;
                        this.pic = $('<img src="' + $imageSrc + '"/>');
                        var H = $(window).height() - 80;
                        var W = $(window).width() - 380;
                        var imageWidth = this.response.data.width;
                        var imageHeight = this.response.data.height;
                        var R = imageWidth / imageHeight;
                        var Rs = W / H;
                        if (R > Rs) {
                            this.pic.css({
                                'width': W,
                                'height': W / R
                            });
                            if ($container) {
                                $container.css({
                                    'width': W,
                                    'height': W / R,
                                    'margin-top': (H - W / R) / 2
                                });
                            }
                        } else {
                            this.pic.css({
                                'width': H * R,
                                'height': H
                            });
                            if ($container) {
                                $container.css({
                                    'width': H * R,
                                    'height': H,
                                    'margin-left': (W - H * R) / 2
                                });
                            }
                        }
                        if (!$container) {
                            this.imageAside.append(this.pic);
                        } else {
                            $container.append(this.pic);
                        }
                        Options.imgChangeRatio = imageWidth / this.pic.width();
                        // Options.changgedImgRatio=parseFloat(this.pic.width())/parseFloat(this.pic.height());
                        //alert(Options.changgedImgRatio);

                    },

                    _bind: function () {
                        var me = this;
                        this.btnUpload.on('click', function (e) {
                            if (Options.enableCrop) {
                                return me.doCropEvent(e);
                            }
                            if (Options.uploadedCallback) {
                                Options.uploadedCallback(me.response);
                                me.hide();
                            }
                        });
                        this.btnCancel.on('click', function () {
                            me.dialog.remove();
                        });
                    },

                    _initButtons: function () {
                        this.btnUpload = $('<button type="button" class="btn btn-upload">确定</button>');
                        if (Options.enableCrop) {
                            this.btnUpload.text('确定裁剪');
                        }
                        if (this.response.errno) {
                            this.btnUpload.attr('disabled', true);
                        }
                        this.btnCancel = $('<button type="button" class="btn btn-cancel">取消</button>');
                        var $btnGroup = $('<p class="btn-groups"></p>');
                        $btnGroup.append(this.btnUpload, this.btnCancel);
                        this.infoAside.append($btnGroup);

                    },

                    outputConfigInfo: function () {
                        //this.setNotice(this.response);
                        if (Options.enableCrop) {
                            $title = $('<h4 class="task-name">图片裁剪</h4>');
                        } else {
                            $title = $('<h4 class="task-name">图片上传</h4>');
                        }
                        this.infoAside.append($title);
                        if (Options.enableCrop) {
                            this.infoAside.append('<p class="corp-info">' + Options.cropRatio + '</p>');
                            this.showThumbImage();
                        }
                        if (!Options.enableCrop)
                            this._outputImageDetails();


                    },
                    setNotice: function (result) {
                        this.notice = $('<div class="notice-info">' + result.errmsg + '</div>')
                        if (!this.infoAside.find('notice-info').length) {
                            this.infoAside.prepend(this.notice);

                        } else {
                            this.notice.text(result.errmsg);
                        }
                        if (this.response.errno) {
                            this.notice.show;
                        }
                        if (this.response.errno == 2) {
                            this.infoAside.find('.notice-info').addClass('errro');
                        }
                    },
                    _outputImageDetails: function () {
                        var $table = $('<table class="image-details"></table>');
                        var htmlStr = '<tr><td>图片名称</td><td>' + this.response.data.name + '</td></tr>';
                        htmlStr += '<tr><td>图片宽度</td><td>' + this.response.data.width + 'px</td></tr>';
                        htmlStr += '<tr><td>图片高度</td><td>' + this.response.data.height + 'px</td></tr>';
                        $table.html(htmlStr);
                        var $configInfo = $('<div class="config-info"></div>');
                        $configInfo.append($table);
                        this.infoAside.append($configInfo);
                    },

                    showThumbImage: function () {
                        this.thumbImage = $('<img src="' + this.response.data.src + '"/>');
                        var $imageCorpPreview = $('<div class="image-corp-preview"></div>');
                        var ratioW = parseInt(Options.cropRatio.split(':')[0]);
                        ratioH = parseInt(Options.cropRatio.split(':')[1]);

                        $imageCorpPreview.append(this.thumbImage);
                        this.infoAside.append($imageCorpPreview);
                        //$imageCorpPreview.css('width',280);

                        if (ratioW < ratioH) {
                            $imageCorpPreview.css('height', $imageCorpPreview.width());
                            $imageCorpPreview.css('width', $imageCorpPreview.height() * ratioW / ratioH);
                            return;
                        }
                        $imageCorpPreview.css('height', $imageCorpPreview.width() * ratioH / ratioW);
                        var R = this.response.data.width / this.response.data.height;


                        this.thumbImage.css('width', $imageCorpPreview.width() / 80 * 100);
                        this.thumbImage.css('height', this.thumbImage.width() / R)
                            .css({
                                'margin-top': -((this.thumbImage.height() - $imageCorpPreview.height()) / 2),
                                'margin-left': -((this.thumbImage.width() - $imageCorpPreview.width()) / 2)
                            });

                    },
                    changeRatio: function (w, h) {
                        Options.cropRatio = w + ":" + h;
                        var selector = $(".select-recorte");
                        var sWidth = selector.width();
                        var sHeight = sWidth / parseInt(w) * parseInt(h);
                        if (sHeight > selector.parent().height()) {
                            sHeight = selector.parent().height();
                            sWidth = sHeight / parseInt(h) * parseInt(w);
                        }
                        selector.css({
                            "width": sWidth,
                            "height": sHeight
                        });

                        var x = selector.css('left');
                        var y = selector.css('top');
                        var w = selector.width();
                        var h = selector.height();
                        this.changeThumbImage(parseInt(x), parseInt(y), w, h);

                    },
                    changeThumbImage: function (x, y, w, h) {
                        var imageWidth = this.thumbImage.width();
                        var imageHeight = this.thumbImage.height();
                        var containerWidth = this.thumbImage.parent().width();
                        var containerHeight = this.thumbImage.parent().height();
                        var transformRatio = containerWidth / w;
                        this.thumbImage.parent().css("height", h * transformRatio);
                        this.thumbImage.css({
                            "width": this.pic.width() * transformRatio,
                            "height": this.pic.height() * transformRatio,
                            "margin-left": -(x * transformRatio),
                            "margin-top": -(y * transformRatio)
                        });


                    },

                    _initCropBox: function () {
                        this.imageAside.append('<div class="g-crop-image-box"><div class="g-crop-image-principal"><div></div>');
                        var $principal = this.imageAside.find('.g-crop-image-principal');
                        this.initPic($principal);
                        this.showCropBox($principal, 'create');
                    },
                    // crop
                    showCropBox: function ($wrap, state) {
                        var $selectCrop = $('<div class="select-recorte"></div>');
                        $wrap.append($selectCrop);
                        var response = this.response;
                        var imageWidth = parseInt($wrap.css('width'));
                        var imageHeight = parseInt($wrap.css('height'));
                        var ratioW = Options.cropRatio.split(':')[0],
                            ratioH = Options.cropRatio.split(':')[1];
                        var Swidth = (imageWidth / 100) * 80;
                        var Sheight = (Swidth / ratioW) * ratioH;
                        $selectCrop.css({
                            "width": Swidth,
                            "height": Sheight,
                            "left": (imageWidth - Swidth) / 2,
                            "top": (imageHeight - Sheight) / 2
                        });
                        if (Sheight > imageHeight) {
                            Sheight = (imageHeight / 100) * 80;
                            Swidth = (Sheight * ratioW) / ratioH;
                            $selectCrop.css({
                                "width": Swidth,
                                "height": Sheight,
                                "left": (imageWidth - Swidth) / 2,
                                "top": (imageHeight - Sheight) / 2
                            });
                        };
                        if (state == "create") {

                            var me = this;

                            $selectCrop.resizable({
                                containment: "parent",
                                aspectRatio: Options.cropRatio,
                                minWidth: (Swidth / 100) * 10,
                                minHeight: (Sheight / 100) * 10,
                                resize: function (e) {
                                    var ui = $(e.target);
                                    var x = ui.css('left');
                                    var y = ui.css('top');
                                    var w = ui.width();
                                    var h = ui.height();
                                    me.changeThumbImage(parseInt(x), parseInt(y), w, h);

                                }
                            });
                            $selectCrop.draggable({
                                containment: "parent",
                                drag: function (e) {
                                    var ui = $(e.target);
                                    var x = ui.css('left');
                                    var y = ui.css('top');
                                    var w = ui.width();
                                    var h = ui.height();
                                    me.changeThumbImage(parseInt(x), parseInt(y), w, h);
                                }
                            });

                        };


                    },

                    doCropEvent: function (e) {
                        var thisBtn = $(e.target);
                        thisBtn.attr("disabled", "disabled");

                        thisBtn.text('裁剪中...');

                        var $selectCrop = this.dialog.find('.select-recorte');
                        ratioW = Options.cropRatio.split(':')[0];
                        ratioH = Options.cropRatio.split(':')[1];
                        var data = this.response.data;
                        data["request"] = "crop";
                        data["toCropImgX"] = parseInt($selectCrop.css('left')) * Options.imgChangeRatio;
                        data["toCropImgY"] = parseInt($selectCrop.css('top')) * Options.imgChangeRatio;
                        data["toCropImgW"] = $selectCrop.width() * Options.imgChangeRatio;
                        data["toCropImgH"] = $selectCrop.height() * Options.imgChangeRatio;
                        data["maxWidth"] = $(".maxWidthHeight input[name='maxwidth']").val();
                        data["maxHeight"] = $(".maxWidthHeight input[name='maxheight']").val();
                        data["ratioW"] = ratioW;
                        data["ratioH"] = ratioH;
                        data["currentFileName"] = data['src'];
                        data['fileType'] = this.response.data.type;
                        data['fileHash'] = this.response.data.hash;
                        var me = this;
                        $.post(Options.actionToSubmitCrop, data, function (result) {
                            thisBtn.removeAttr("disabled");
                            thisBtn.text('确定裁剪');
                            if (!result.errno) {
                                me.hide();
                                Options.uploadedCallback(result);

                            } else {
                                this.setNotice(result);
                            }

                        }, "JSON");
                    },
                };



                $elemenTo = $(this);
                initUpload($elemenTo);
                Setando_AjaxUpload($elemenTo);
                if (Options.enableButton) {
                    $enableButton = $("<input type='button' value='Selecionar imagem' />").button().css({
                        "font-size": "12px",
                        "margin-top": 5,
                        "margin-left": "-0.5px"
                    });
                    Elemento.after($enableButton);
                    $enableButton.unbind("click").bind("click", function () {
                        Elemento.find("input[name='" + Options.inputOfFile + "']:file").click()
                    });
                }
            })
        }
    };
    $.fn.coreImageUpload = function (options) {
        // if (window.jQuery.ui === undefined) alert("Could not instantiate the PictureCut is missing jquery.ui");
        if (methods[options]) {
            return methods[options].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof options === 'object' || !options) {
            return methods.init.apply(this, arguments)
        }
    }
})(jQuery);

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function($, window, document, undefined){

    "use strict"; 

    var pluginName = 'coreImageUpload';

    function Plugin(element, options){

        this.obj = $(element);
        this.o   = $.extend({}, $.fn[pluginName].defaults, options);
        this.init();
    };

    Plugin.prototype = {

        init: function(){

            var self = this;

        },

        _private: function(param){ 
            var self = this;
        },

        destroy: function(){
            $.removeData(this.obj, this.pluginName);        
        }

    };

    $.fn[pluginName] = function(option, param) {
        return this.each(function() {
            var $this   = $(this);
            var data    = $this.data(pluginName);
            var options = typeof option == 'object' && option;
            if (!data){ 
              $this.data(pluginName, (data = new Plugin(this, options)))
            }
            if (typeof option == 'string'){
                 data[option](param);
            }
        });
    };

    // default options
    
    $.fn[pluginName].defaults = {
        
        extensions: ['jpg', 'jpeg', 'gif', 'bmp', 'png'],
        
        // upload file name
        inputOfFile: "",
        onSubmit: function() {
            
        },
        // the data you want to pass
        data: {},
        maximumSize: 1024,
        enableMaximumSize: false,
        // crop
        enableCrop: false,
        enableResize: true,
        minimumWidthToResize: 1024,
        minimumHeightToResize: 630,
        enableButton: false,
        cropRatio: '16:9',
        imgChangeRatio: '',
        uploadedCallback: function (response) {}   

    };


})(jQuery, window, document));