/*
$(window).load( function(){

var arrayimg = ['dhs6009detail02_0.jpg', 'dhs6492doorwaystothekingdomofheavendtl1_cr_1.jpg', 'dhs7873detailtatecat_0.jpg', 'science_25_01_2_0.jpg', 'dhs9898detailthumb_0.jpg']

function preload(arrayimg) {
    $(arrayimg).each(function () {
        $('<img />').attr('src',this).appendTo('body').css('display','none');
    });
}

$('div.zn1').css({'background-image': 'none'});

setTimeout(function() {
$('div.zn1').css({'background-image': 'url(images/' + arrayimg[Math.floor(Math.random() * arrayimg.length)] + ')'});
}, 1000);

});
*/
/*
window.onbeforeunload = function(e) {
   var myImages = '';
      setTimeout(function () {
       $('div.zn1').css('background-image', 'none');
      }, 3000);
};
*/

var bckimg = new Array('vertical-vinyl-1.jpeg');

var topimg = new Array('oksauce-blk-30x25.png','oksauce-red-30x25.png');

var news = new Array('blackhead','orangehead','greenhead','purplehead','redhead');

$(window).load(function() {

  $('div.zn1').css({'background-image': 'none'});
  var random = bckimg[Math.floor(Math.random() * bckimg.length)];
      random = 'url(images/' + random + ')';
      $('div.zn1').css('background-image', random);
      //setInterval(function() {SetImg();}, 5000);

  var topdom = topimg[Math.floor(Math.random() * topimg.length)];
      topdom = 'assets/img/' + topdom + ')';
      $('#topimg').attr('src','/'+ topdom );
      SetTop('oksauce-blk-30x25.png');
      setInterval(function() {SetTop();}, 10000);

  var newdom = news[Math.floor(Math.random() * news.length)];
      $('#news').removeClass().toggleClass('' + newdom + '');
      SetNew('blackhead');
      setInterval(function() {SetNew();}, 5000);
});

    function SetTop(n) {
        var topdom = topimg[Math.floor(Math.random() * topimg.length)];
        if( n == 'oksauce-blk-30x25.png') { topdom = 'oksauce-blk-30x25.png'};
        topdom = 'assets/img/' + topdom;
        // setTimeout(function () {
        $('#topimg').attr('src','/'+ topdom);
        //$('div.zn1').fadeIn(2000);
        // }, 2000);
    }

    function SetImg() {
        var random = bckimg[Math.floor(Math.random() * bckimg.length)];
        random = 'url(images/' + random + ')';
        //$('div.zn1').fadeOut(2000);
        //$('div.zn1').css({'background-image': 'none'});
        //setTimeout(function () {
          $('div.zn1').css('background-image', random);
        //$('div.zn1').fadeIn(2000);
        //}, 2000);
    }

    function SetNew(n) {
        var newdom = news[Math.floor(Math.random() * news.length)];
        if( n == 'blackhead') { newdom = 'blackhead'};
        $('#news').removeClass().toggleClass('' + newdom + '');
    }


