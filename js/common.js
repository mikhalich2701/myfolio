$(document).ready(function(){     

    $('#contianer').mixItUp({
        selectors: {
            target: '.works__block-elem'
        }
    });

    var flag = 0;

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
             },40);                
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

    //console.log($('.gexagon-item').css("transform"));

    $('.pageProofs__content').each(function(i){                       //Задержка анимациия для секции "ПРОЦЕСС ВЕРСТКИ"
        $(this).css("transition-delay", i * 0.3 + "s");
    });

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
        if ($(document).scrollTop() >= svgFoto && $('.gexagon-item').css("transform") !== "matrix(1, 0, 0, 1, 0, 0)") {
            getFoto($('.first'), 400);              
            getFoto($('.second'), 420);              
            getFoto($('.third'), 440);              
        } 

        var skillSvg = $('.skills').offset().top  - windowHeight / 2;
        if ($(document).scrollTop() >= skillSvg && flag == 0) {
            $('.skill').each(function(){
                var count = 0;
                var self    = $(this);
                var percent = parseInt(self.data('percent'));
                var persentChange = setInterval(function(){                    
                    if(count <= percent){
                        self.children().eq(0).text(count + '%');
                        self.children().eq(2).css("height", count + "%");
                    }
                    count++;
                }, 10);
            });
            flag = 1; 
        }

        if ($(document).scrollTop() >= $('.pageProofs').offset().top && $('.pageProofs__content').attr('class') !== 'pageProofs__content pageProofs__move'){
            $('.pageProofs__content').addClass('pageProofs__move');
            console.log($('.pageProofs__content').attr('class'));
        }
    });
});