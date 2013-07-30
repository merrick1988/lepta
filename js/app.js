$(function(){
    //init
    var hash = window.location.hash,
        options = {
            heightStyle: "content",
            animated : false,
            autoHeight : false,
            active:0,
            collapsible: true,
            create: function( event, ui ) {},
            beforeActivate: function( event, ui ) {
                if(ui.newHeader.offset()){
                    if (ui.newHeader.index() == 0) {
                        $('body,html').animate({scrollTop: 0});
                    } else {
                        if(ui.newHeader.offset() && ui.oldHeader.offset() && ui.newHeader.offset().top >  ui.oldHeader.offset().top){
                            $('body,html').animate({scrollTop: ui.newHeader.offset().top - $('header').height() - ui.oldPanel.height() -ui.oldHeader.height()});
                        } else{
                            $('body,html').animate({scrollTop: ui.newHeader.offset().top - $('header').height()});
                        }
                    }
                }
                if (document.all && !document.addEventListener) {
                    //return
                }else{
                    $(ui.oldHeader).find(".collapse-icon").animate({
                        transform: 'rotate(0deg)'
                    })
                    $(ui.newHeader).find(".collapse-icon").animate({
                        transform: 'rotate(90deg)'
                    });
                }
            },
            activate: function( event, ui ) {
                if(!ui.newHeader.hasClass("ui-state-active")){
                    ui.newHeader.addClass("close")
                }
            }
        };
    $( "#accordion" ).accordion(options);

    if(hash){
        setActiveMenu($("[href='" + hash + "']"));
        $( "#accordion" ).accordion( "option", "active", $('.section-header').index($(".section-header[data-hash='" + hash.slice(1) + "']")));
    }

    $("select").customSelect();

    // add listeners
    $("nav li").on("click", function(event){
        setActiveMenu(event.target);
        navigate(event);
    })
    $(".review-more").click(function(){
        $(".review-section").animate({marginTop: "-90px"}, 500, function(){
            $(".review-section .review").eq(0).clone().appendTo(".review-section");
            $(".review-section .review").eq(0).remove();
            $(".review-section").css({"marginTop":"0px"});
        });
    });
    $(".order-button").on("click", function(){
        show($("#orderModal"));

    })
    $(".delivery-button").on("click", function(){
        show($("#deliveryModal"));
    })
    $("#deliveryModal .order-button").on("click", function(){
        hide($("#deliveryModal"));
        show($("#orderModal"));
    });
    $(".modal").on('show', function(){
        $('html').css('overflow', 'hidden');
        $('.page-container').addClass('scroll');
    });
    $(".modal").on('hide', function(){
        $('html').css('overflow', 'auto');
        $('.page-container').removeClass('scroll');
    })
    $(".modal .close").on("click", function(){
        hide($(".modal"));
    })
    $(".section-header").on("click", function(){
        var hash = $(this).attr("data-hash");
        setActiveMenu($("[href='#" + hash + "']"));
        window.location.hash = hash;
    })
    // privet functions
    function show(modal){
        modal.removeClass("hide");
        modal.stop().animate({opacity: "1"},'slow');
        modal.trigger('show');
    }
    function hide(modal){
        modal.stop().animate({opacity: "0"},'fast', function(){
            modal.addClass("hide");
        });
        modal.trigger('hide');
    }
    function setActiveMenu(element){
        $("nav li a").removeClass("active");
        $(element).addClass("active")
    };

    function navigate(event){
        var target = $(event.target).attr("href");
        $( "#accordion" ).accordion( "option", "active", $('.section-header').index($(".section-header[data-hash='" + target.slice(1) + "']")));
        window.location.hash = target;


    };
})
