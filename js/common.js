$(document).ready(function(){     

    $('.pageProofs__resurse-row').slick({                     // SLIDER            
        slidesToShow: 4,
        slidesToScroll: 1,
        dots: false,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 2000,
        nextArrow: '.pageProofs__resurse-button-next',
        prevArrow: '.pageProofs__resurse-button-prev',
        responsive: [
        {
          breakpoint: 992,
          settings: {
            slidesToShow: 3,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1
          }
        }
      ]
    });

    var windowHeight = $(window).height(); 
    
    function getAnim(elem, callback){                                // PRELOADER
        setTimeout(function(){
            $(elem).addClass('translate');
        }, 2000);
        callback();
    }
    getAnim('.logo', function(){
        setTimeout(function(){
            $('.preloader').fadeOut();
        }, 3000);       
    });    
    
    $('.header__button').on('click', function(){
        $('.header__button').toggleClass('transform');                //ANIMATE BUTTON
        if($('.navigate').offset().left != 0){                        //ANIMATE NAVIGATION
            $('.navigate').css('left', '0');
            setTimeout(function(){
                $.each($('.navigate__item-link'), function(i, l){
                    var self = $(this);
                    var navItem = setInterval(function(){
                        self.css('padding-left', '0').css('opacity', '1');
                        clearInterval(navItem);
                    }, i * 150);
                });
             },400);                
        } else{
            $('.navigate').css('left', '100%');
            $('.navigate__item-link').css('padding-left', '300px').css('opacity', '0');
        }
    });

    $('.navigate__item-link').on('click', function(){                 //NAVIGATION HIDE
        var self = $(this);
        var move = $(window).width() - $(this).offset().left;
        self.css('transform', 'translateX(' + move + 'px)');
        setTimeout(function(){
            $('.navigate').css('left', '100%');
            $('.header__button').removeClass('transform');
            $('.navigate__item-link').css('padding-left', '300px').css('opacity', '0');
            self.removeAttr('style');
        }, 400); 
    });

    $('.gexagon-item').each(function(){                               //SVG TRANSFORM-ORIGIN
        var self = $(this)[0];
        var x = parseFloat(self.getAttribute('x'));
        var y = parseFloat(self.getAttribute('y'));
        var w = self.getClientRects()[0].width;
        var h = self.getClientRects()[0].width;
        var transformX = x + w / 2;
        var transformY = y + h / 2;
        self.style.transformOrigin = transformX + 'px ' + ' ' + transformY + 'px';
    });
    
    function getFoto(el, time){                                       //FOTO SVG ANIMATION
        setTimeout(function(){
            $.each(el, function(i, l){
                var self = $(this)[0];
                var navItem = setInterval(function(){
                    self.style.transform = 'rotateX(0deg)';
                }, i * 50);
            });
        },time);
    }

    $(window).scroll(function(){
        $('.title').each(function() {                                 //TITLE SVG TRANSFORM
            var self = $(this),
                heightUp = self.offset().top - windowHeight / 1.2,
                heightDown = self.offset().top  - windowHeight / 2,
                move = ($(document).scrollTop()  - heightUp),
                moveTitle = move * 0.2;
            if ($(document).scrollTop() < heightUp) {
                self.children().css('stroke-dashoffset', '565px');              
            } 
            if ($(document).scrollTop() > heightDown) {
                self.children().css('stroke-dashoffset', '0px');              
            } 
            if ($(document).scrollTop() < heightDown && $(document).scrollTop() >= heightUp) {
                self.css('transform', 'translateX(' + moveTitle + 'px)'); 
                self.children().css('stroke-dashoffset',  (565 - move * 1.8)  + 'px');              
            } 
            
        });

        var svgFoto = $('.myfoto').offset().top  - windowHeight / 2;   
        if ($(document).scrollTop() >= svgFoto) {
            getFoto($('.first'), 400);              
            getFoto($('.second'), 420);              
            getFoto($('.third'), 440);              
        } 
    });
});