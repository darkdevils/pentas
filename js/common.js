'use strict';
let h = 0;

const common = {
    init: function() {
        //this.lnbList();
        this.slideLayer.slideType();
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
                console.log('111');
                const _this = $(this);
                const layerPopup = $("#" + $(this).attr("aria-controls"));
                const layerObjClose = layerPopup.find(".layer_popup_close");
                const layerObj = layerPopup.find("button, input:not([type='hidden']), select, iframe, textarea, [href], [tabindex]:not([tabindex='-1'])");
                const layerObjFirst = layerObj && layerObj.first();
                const layerObjLast = layerObj && layerObj.last();
                let tabDisable;

                // Slide Popup 시 내용이 길어서 Scroll 생성 및 Title Line 생성
                const slideheaderH = layerPopup.find('.layer_popup_header').outerHeight();
                console.log(slideheaderH, "slideheaderH")
                const slideH = layerPopup.outerHeight() - slideheaderH;
                //const layerScrollTop = $('.slideLayerScroll').scrollTop();
               // layerPopup.find(".slideLayerScroll").outerHeight(slideH - 70);
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
                });

                $('.dim').on("click",  layerClose);

                $(document).on("keydown.lp_keydown", function(event) {
                    // Esc키 : 레이어 닫기
                    const keyType = event.keyCode || event.which;

                    if (keyType === 27) {
                        layerClose();
                    }
                });
            })
        }
    },
}


$(function(){
    common.init();
    $('.slide_layer').each(function(){
        h = $(this).outerHeight();
        $(this).css({bottom: -h});
    });
});

