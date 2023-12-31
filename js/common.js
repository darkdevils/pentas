'use strict';
let h = 0;

const common = {
    init: function() {
        //this.lnbList();
        this.slideLayer.slideType();
        this.inputFocus();
        this.inputClear();
        //this.alertLayer()
        //this.slideLayer.layerCover();
       // this.fixedHeader();
        //this.dropdown();
        //this.textareaDisabled();
        //this.leftScroll();
    },

    // Tab
    tabType: function(e,num) {
        num = num || 0;
        const menu = $(e).children();
        const con = $(e + '__con').children();
        let select = $(menu).eq(num);
        let i = num;

        con.hide();
        select.addClass('on').prepend("<span class='blind'>현재선택</span>");
        con.eq(num).show();

        menu.click(function(){
            if(select !==null) {
                $(".blind").remove();
                select.removeClass('on');
                con.eq(i).hide();
            }
            select = $(this);
            i = $(this).index();

            select.addClass('on').prepend("<span class='blind'>현재선택</span>");
            con.eq(i).show();
            return false;
        });
    },

    // Input Focus
    inputFocus: function() {
        $('input[type="text"]').focus(function(){
            $(this).parent().addClass('focus');
        }).blur(function(){
            $(this).parent().removeClass('focus');
        });
    },
    inputClear: function() {
        const $ipt = $('.input_inner input');
        const $pw = $('.input_inner input[type="password"]');
        const $clearInt = $('.btn_delete');

        $ipt.keyup(function(){
            $(this).closest('.input_inner').find('.btn_delete').toggle(Boolean($(this).val()));
        });
        $clearInt.toggle(Boolean($ipt.val()));
        $clearInt.on('click',function(){
            $(this).parent().find($ipt).val('').focus();
            $(this).hide();
        });
        $pw.keyup(function() {
            if($(this).val().length > 0) {
                $(this).parent().addClass('active');
            } else {
                $(this).parent().removeClass('active');
            }

        })
        // $('input[type="password"]').focus(function(){
        //     $(this).parent().addClass('focus');
        // }).blur(function(){
        //     $(this).parent().removeClass('focus');
        // });
    },
    // Slide Layer
    slideLayer: {
        slideOpen: function(el) {
            const layerId = $("#" + el );
           // $('body').append('<div class="dim"></div>');
            layerId.animate({
                bottom: 0
            });
        },
        slideClose: function(el) {
            const layerH = $(el).closest('.slide_layer').height();
            $('.dim').fadeOut().queue(function(){
                $('.dim').remove();
            });
            $(el).closest('.slide_layer').animate({
                bottom: -layerH
            });
        },
        slideType: function() {
            $('.layer_open').on('click',function(){
                const _this = $(this);
                const layerPopup = $("#" + $(this).attr("aria-controls"));
                const layerObjClose = layerPopup.find(".layer_popup_close");
                const layerObj = layerPopup.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
                const layerObjFirst = layerObj && layerObj.first();
                const layerObjLast = layerObj && layerObj.last();
                let tabDisable;

                // Slide Popup 시 내용이 길어서 Scroll 생성 및 Title Line 생성
                const slideheaderH = layerPopup.find('.layer_popup_header').outerHeight();
                const slideH = layerPopup.outerHeight() - slideheaderH;
                layerPopup.css({"transform":"translate(0, 0)"});
                $('body').css({overflow : 'hidden' });

                /*$('.slideLayerScroll').scroll(function(){
                    if($(this).scrollTop() > 0) {
                        $('.slideLayer__header').addClass('borBtm');
                    } else {
                        $('.slideLayer__header').removeClass('borBtm');
                    }
                });*/

                function layerClose() {
                    const layerH = layerPopup.height();
                    $('.dim').fadeOut().queue(function(){
                        $('.dim').remove();
                    });
                    layerPopup.animate({
                        bottom: -layerH
                    });
                    if (tabDisable === true) layerPopup.attr("tabindex", "-1");
                    _this.focus();
                    $(document).off("keydown.lp_keydown");
                    $('body').css({overflow : 'auto' });
                }

                layerObjClose.on("click", layerClose); // 닫기 버튼 클릭 시 레이어 닫기

                $('body').append('<div class="dim"></div>');
                layerPopup.animate({
                    bottom: 0
                },200);

                $('.dim').on("click",  layerClose);

                $(document).on("keydown.lp_keydown", function(event) {
                    // Esc키 : 레이어 닫기
                    const keyType = event.keyCode || event.which;

                    if (keyType === 27) {
                        layerClose();
                    }
                });
            });

            $('.layer_cover').on('click',function(){
                const _this = $(this);
                const layerPopup = $("#" + $(this).attr("aria-controls"));
                const layerObjClose = layerPopup.find(".layer_popup_close");
                const layerObj = layerPopup.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
                let tabDisable;

                // Slide Popup 시 내용이 길어서 Scroll 생성 및 Title Line 생성
                const slideheaderH = layerPopup.find('.layer_popup_header').outerHeight();
                const slideH = layerPopup.outerHeight() - slideheaderH;
                layerPopup.css({"transform":"translate(0, 0)"});
                $('body').append('<div class="dim2"></div>');
                layerPopup.animate({
                    bottom: 0
                });
                function layerClose() {
                    const layerH = layerPopup.height();
                    $('.dim2').fadeOut().queue(function(){
                        $('.dim2').remove();
                    });
                    layerPopup.animate({
                        bottom: -layerH
                    });
                    if (tabDisable === true) layerPopup.attr("tabindex", "-1");
                    _this.focus();
                    $(document).off("keydown.lp_keydown");

                }

                layerObjClose.on("click", layerClose);
                $('.all_cancel').on("click",function(){
                    $('.slide_layer').each(function(){
                        let allHeight = $(this).height();
                        $(this).animate({
                            bottom: -allHeight
                        });
                    })
                    $('.dim,.dim2').fadeOut().queue(function(){
                        $('.dim').remove();
                        $('.dim2').remove();
                    });

                    if (tabDisable === true) layerPopup.attr("tabindex", "-1");
                    _this.focus();
                    $(document).off("keydown.lp_keydown");
                    $('body').css({overflow : 'auto' });
                });
            });
        },
    },
    alertLayer: function(el) {
        const layerId2 = $("#" + el );
        //$('body').append('<div class="dim"></div>');
        layerId2.show();
        layerId2.find('.layer_alert').css({
           "margin-top": -(layerId2.find('.layer_alert').outerHeight() / 2)
        });
    },
    alertClose: function(target) {
        let h = target.closest('.layer_alert').offsetHeight / 2;
        target.closest('.layer_wrap').style.display = "none";
        target.closest('.layer_wrap').style.height = `-${h}`;
    }
}

$(function(){
    common.init();
    $('.slide_layer').each(function(){
        h = $(this).outerHeight();
        $(this).css({bottom: -h});
    });
    $('.layer_alert').each(function(){
        h = $(this).outerHeight();
        $(this).css({"margin-top": -(h / 2)});
    });
    $('.tooltip_close').on('click',function(){
        $(this).parent().fadeOut();
    });
});

