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

var myImages = new Array('oksauce-bw.jpeg');

$(window).load(function() {

  $('div.zn1').css({'background-image': 'none'});
  var random = myImages[Math.floor(Math.random() * myImages.length)];
      random = 'url(images/' + random + ')';
      $('div.zn1').css('background-image', random);
      //setInterval(function() {
        SetImage();
      //}, 5000);
});

    function SetImage() {
        var random = myImages[Math.floor(Math.random() * myImages.length)];
        random = 'url(images/' + random + ')';
        //$('div.zn1').fadeOut(2000);
        //$('div.zn1').css({'background-image': 'none'});
        //setTimeout(function () {
          $('div.zn1').css('background-image', random);
        //$('div.zn1').fadeIn(2000);
        //}, 2000);
    }
