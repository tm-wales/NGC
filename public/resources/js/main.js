let slickSlider = {
    init: function() {
        $('.no-fouc').removeClass('no-fouc');
    },
    quotes: function() {
        $('.quotes').slick({
            dots: true,
            infinite: true,
            autoplay: true,
            autoplaySpeed: 6000,
            speed: 800,
            slidesToShow: 1,
            adaptiveHeight: true
        });
    },
    casestudies: function() {
        $('.js--casestudies-slider').slick({
            dots: true,
            infinite: true,
            speed: 800,
            slidesToShow: 7,
            slidesToScroll: 7,
            responsive: [
              {
                breakpoint: 3000,
                settings: {
                  slidesToShow: 6,
                  slidesToScroll: 6,
                }
              },
              {
                breakpoint: 2500,
                settings: {
                  slidesToShow: 5,
                  slidesToScroll: 5,
                }
              },
              {
                breakpoint: 2000,
                settings: {
                  slidesToShow: 4,
                  slidesToScroll: 4,
                }
              },
              {
                breakpoint: 1500,
                settings: {
                  slidesToShow: 3,
                  slidesToScroll: 3,
                }
              },
              {
                breakpoint: 1000,
                settings: {
                  slidesToShow: 2,
                  slidesToScroll: 2,
                }
              },
              {
                breakpoint: 500,
                settings: {
                  slidesToShow: 1,
                  slidesToScroll: 1,
                }
              },
            ]
        });
    }

}

let caseFilter = {
    apiSource: "api/",
    loadCases: function(service, sector, callback) {
        let api = window.location.pathname
            api += (((window.location.pathname.substr(window.location.pathname.length - 1)) == '/') ? '' : '/')
            api +=  caseFilter.apiSource;

        service = service.toString().trim().replace(/ /g, "-")
        api += service + "/";

        sector = sector.toString().trim().replace(/ /g, "-")
        api += sector + "/";
  
        $.ajax({
            method: "GET",
            url: api,
            datatype: "html"
        })
        .done(function(html) {
            let div = "case-page__cases";
            $("." + div).fadeOut(250, function() {
                document.getElementsByClassName(div)[0].innerHTML = html;
                $("." + div).fadeIn(500);
            })
        })
        .fail(function(){
            alert("Failed to load case studies")
        })
    }
}

let newsFilter = {
    apiSource: "api/",
    loadNews: function(category, callback) {
        let api = window.location.pathname
            api += (((window.location.pathname.substr(window.location.pathname.length - 1)) == '/') ? '' : '/')
            api +=  newsFilter.apiSource;
        console.log(api)
        category = category.toString().trim().replace(/ /g, "-")
        api += category + "/";

        $.ajax({
            method: "GET",
            url: api,
            datatype: "html"
        })
        .done(function(html) {
            let div = "news-page__news";
            $("." + div).fadeOut(250, function() {
                document.getElementsByClassName(div)[0].innerHTML = html;
                $("." + div).fadeIn(500);
            })
        })
        .fail(function(){
            alert("Failed to load news")
        })
    }
}

$(document).ready(function() {
    slickSlider.init();
    slickSlider.quotes();
    slickSlider.casestudies();

    // Turn nav off once an item is clicked
    $('.navigation__link').click(function() {
        $("#navi-toggle").prop("checked", false);
    })

    // contact popup
    $('a[href*=\\#]:not([href=\\#])').click(function() {
      if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          console.log(this.hash)
          if (target.length) {
            if(this.hash == "#contact-us") {
              $("#contact-us").toggleClass("popup__show--js");
              return false;
            } else {
              $('html,body').animate({
                scrollTop: target.offset().top - 100
                }, 1000);
                return false;
            }
          }
      }
    });

    $('#contact-us, .popup__close').click(function(event) {
        event.stopPropagation();
        $("#contact-us").toggleClass("popup__show--js");
    })

    $(".popup__box").click(function(event) {
        event.stopPropagation();
    })

    $('.js--wp-1').waypoint(function(direction) {
        $('.navigation').toggleClass('js--fixed');
    },{offset: "10%"})

    $("select.case-page__filters").on("change", function() {
        let service = $(".case-page__filters--service option:selected").val();
        let sector = $(".case-page__filters--sector option:selected").val();
        caseFilter.loadCases(service,sector);
    });

    $(".news-page__filters--category li").click(function() {
        let category = $(this).attr("alt");
        console.log("Clicked")
        newsFilter.loadNews(category);
    });
});

