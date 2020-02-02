
$(document).ready(function(){
    function doResize() {
        // FONT SIZE
        var ww = $('body').width();
        var maxW = $(".background").css("max-width").replace("px","");
        let minW = 320;

        if(ww < maxW) {
            let fsize = Math.min(1,((ww + minW) / (maxW)));
            console.log(fsize)
            $('.header-tag-main').css('font-size',(Math.max(100,fsize * 250))+'%');
            $('.header-tag-sub').css('font-size',(Math.max(50,fsize * 100))+'%');
        }
    }

    doResize();

    $( window ).resize(function() {
        doResize();
    });
});