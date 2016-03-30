/*****
 ** a plugin for image upload
 ** view doc https://github.com/Vanthink-UED/jquery.core.image.upload
 ******/

;(function (factory) {
    "use strict"; 
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory);
    } else {
        factory(window.jQuery);
    }
}(function ($, window, document) {

    "use strict"; 

    var pluginName = 'coreImageUpload';

    function Plugin(element, options) {

        this.$el = $(element);
        this.options = $.extend({}, $.fn[pluginName].defaults, options);
        this.init();
    }
    
    
    // dialog for preview image and crop
    // @param files the input of type=file value
    // @param options 
    var ImageBox = function (files,options) {
       this.image = {
           file: files,
       }; 
       if (files) {
            var reader = new FileReader();
            var slef = this;
            reader.onload = function (e) {
                self.image.src = e. e.target.result;
            }
            
            reader.readAsDataURL(files[0]);
        }
        this.dialog = $('<div class="g-core-image-corp-container"></div>');
        this.imageAside = $('<div class="image-aside"></div>');
        this.infoAside = $('<div class="info-aside"></div>');
        this.show();

    }

    ImageBox.prototype = {
        show: function () {
            this.dialog.append(this.imageAside, this.infoAside);
            $('body').append(this.dialog);
            //this.outputConfigInfo();
            this._initButtons();
            this._initCropBox();
            this._bind();
        },

        hide: function () {
            this.dialog.remove();
        },

        initPic: function ($container) {
            var pic = new Image();
            
            
            pic.onload = (function() {
                this.image.width = pic.width;
                this.image.height =pic.height;
                this.reseyLayout(image);
                
                
            }).bind(this);
            pic.src = this.image.src;
            

        },
        
        
        reseyLayout: function(image) {
            var H = $(window).height() - 80;
            var W = $(window).width() - 380;
            
            var imageWidth = this.image.width;
            var imageHeight = this.image.width;
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
                this.imageAside.append(image);
            } else {
                $container.append(image);
            }
            options.imgChangeRatio = imageWidth / image.width();
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
            var ratioW = options.cropRatio.split(':')[0],
                ratioH = options.cropRatio.split(':')[1];
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
    
    
    
    var methods = {
        clear: function (Options) {
           
        },
        init: function () {
            
            var Options = this.options;
            
            
            
           if (Options.url == "") {
                return alert('options.url must be defined');
            }
        

            //  Options.DefaultImageButton = (Options.DefaultImageButton == "") ? Options.PluginFolderOnServer + OptionsIfEmpty.DefaultImageButton : Options.DefaultImageButton;
            if (Options.inputOfFile == "") {
                return alert('options.inputOfFile must be defined');
            }


            

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
                    onComplete: function(response) {
                        $loading.remove();
                        $loading = '';
                        var response = $.parseJSON(response);
                        


                    }
                });
                element.find(":file[name='" + Options.inputOfFile + "']").mouseenter(function () {
                    element.addClass("TuyoshiImageUpload_div")
                }).mouseout(function () {
                    element.removeClass("TuyoshiImageUpload_div")
                })
            };

            



            initUpload(this.$el);
            
            this.__buildForm();
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
        },
        
        
        
        
        // we need build a form
        __buildForm: function() {
            var $el = this.$el;
            var options = this.options;
            $el.css("position", "relative");
            
            var htmlStr = '<form  method="post" enctype="multipart/form-data" action="' + options.url + '">';
                htmlStr += '<input name="' + options.inputOfFile + '" type="file" accept="image/*" />';
            var dataArr = [];
            if (typeof options.data === 'object') {
                for(var key in options.data) {
                    var str = '<input type="hidden" name=' + key + '> value="' + data[key] +  '"';
                    dataArr.push(str);
                }
            }
                htmlStr += dataArr.join('') + '</form>';
                
            var $form = $(htmlStr);
            var $inputUpload = $form.find('input[type="file"]');
            
            $form.css("display", "none");

            $form.css({
                cursor: "pointer",
                display: "block",
                position: "absolute",
                left: 0,
                top: 0,
                width: $el.width() <= 0 ? 132 : $el.width() + 30,
                height: $el.height() <= 0 ? 32 : $el.height(),
                cursor: "hand",
                opacity: 0,
                overflow: "hidden"
            });
            var self = this;
            $inputUpload.on("change", function (e) {
                var fileVal = $inputUpload.val().replace(/C:\\fakepath\\/i, "");
                var fileExt = fileVal.substring(fileVal.lastIndexOf(".") + 1);
                if(options.extensions.length>1) {
                    var reg = new RegExp('^[' + options.extensions.join('|') + ']+$','i');
                    if (!reg.test(fileExt)) {
                        return options.extensionError();
                    }
                }
                
                
                if (e.target.files[0].size > options.maxFileSize) {
                    var formatSize;
                    if (parseInt(options.maxFileSize / 1024 / 1024) > 0) {
                        formatSize = (options.maxFileSize / 1024 / 1024).toFixed(2) + 'MB';
                    } else if (parseInt(options.maxFileSize / 1024) > 0) {
                        formatSize = (options.maxFileSize / 1024).toFixed(2) + 'kB';
                    } else {
                        formatSize = options.maxFileSize.toFixed(2) + 'Byte';
                    }
                    options.maximumSizeError;
                    return;
                }
                options.files = e.target.files;
                
                if(options.enableCrop) {
                    this.imageBoxObj = new ImageBox(e.target.files,options);
                    return;
                }
                
                if(options.isAjax) {
                    self.tryAjaxUpload($form);    
                }
                $form.find("input[type=file]").attr("disabled", "disabled")
               // $form.submit();
            });
            $el.append($form);
             
            
        },
        
        tryAjaxUpload: function(form) {
            var self = this;
            var data = new FormData();
            $.each(this.options.files, function(key, value)
            {
                data.append(self.options.inputOfFile, value);
            });
            if (typeof self.options.data === 'object') { 
                $.each(this.options.data, function(key, value){
                    data.append(key, value);
                });       
                
            }
            
            $.ajax({
                url: this.options.url,
                type: 'POST',
                data: data,
                cache: false,
                dataType: 'json',
                processData: false, 
                contentType: false, 
                success: function(data) {
                   form.find("input[type=file]").removeAttr("disabled");
                    self.options.uploadedCallback(data)
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    console.error('ERRORS: ' + textStatus);
                }
            });           
        },
        // you should pay more attention to cross domain
        tryIframeUpload: function(form) {
            f || (f = $('<iframe id="core-image-upload-iframe" name="core-image-upload-iframe"></iframe>').attr("style", 'style="width:0px;height:0px;border:0px solid #fff;"').hide(), f.attr("src", ""), $(document.body).append(f));
            var g = function () {
                form.find("input[type=file]").removeAttr("disabled");
                var d = a(this).contents().find("html body").text();
                form.get(0).reset();
                this.options.uploadedCallback(data)
                f.unbind()
            };
            form.submit(function (e) {
                f.load(g);
                form.attr("target", "core-image-upload-iframe");
                e.stopPropagation()
            })    
        }
    };

    Plugin.prototype = methods;

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

    
    
    $.fn[pluginName].defaults = {
        
        extensions: ['jpg', 'jpeg', 'gif', 'bmp', 'png'],
        extensionError: function() {},
        url:'',
        // upload file name
        inputOfFile: "",
        onSubmit: function() {
            
        },
        // the data you want to pass
        data: {},
        isAjax: true,
        maximumSize: 1024,
        enableMaximumSize: false,
        MaximumSizeError: function() {
            
        },   
        // crop
        enableCrop: false,
        enableResize: true,
        minimumWidthToResize: 1024,
        minimumHeightToResize: 630,
        enableButton: false,
        cropRatio: '16:9',
        imgChangeRatio: '',
        uploadedCallback: function (response) {},    

    };
})(jQuery, window, document));