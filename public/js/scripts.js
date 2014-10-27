    $('.bar-percentage[data-percentage]').each(function () {
      var progress = $(this);
      var percentage = Math.ceil($(this).attr('data-percentage'));
      $({countNum: 0}).animate({countNum: percentage}, {
        duration: 2000,
        easing:'linear',
        step: function() {
      // What todo on every count
      var pct = '';
      if(percentage == 0){
        pct = Math.floor(this.countNum) + '%';
      }else{
        pct = Math.floor(this.countNum+1) + '%';
      }
      progress.text(pct) && progress.siblings().children().css('width',pct);
    }
  });
    });


    $(document).ready(function() {
    // http://www.owlgraphic.com/owlcarousel/index.html#customizing

    $("#first-carousel").owlCarousel({

        navigation : true, // Show next and prev buttons
        slideSpeed : 300,
        paginationSpeed : 400,
        singleItem:true,
        autoPlay:true,
        autoHeight : true,
        navigation: false,
        responsiveRefreshRate: 50

      });

    $("#carousel-competition").owlCarousel({

        autoPlay: 3000, //Set AutoPlay to 3 seconds
        
        items : 5,
        stopOnHover: true,

        
      });

  });
