/*!
 * Techmeleon js v1.0.0 (https://www.techmeleon.co.uk)
 * Copyright 2018 Techmeleon
 * Licensed under Techmeleon
 */

$(document).ready(function() {
    // jQuery addon to disable elements
    (function($) {
        $.fn.toggleDisabled = function(){
            return this.each(function(){
                this.disabled = !this.disabled;
            });
        };
    })(jQuery);
});