
$(document).ready(function() {
    $(".loading__icon").hide();
    $(".loading").slideUp(1000).promise().done(function() {
        $(".js--onLoad").removeClass("js--onLoad").promise().done(function() {
            $(".heading-primary,.header__sub-text").addClass("animate");
        });
    });
});
