// toolbar functionality
$('.tooltip-demo').tooltip({ selector: "a" });
/* smoothscroll */
$('ul.shortcuts-sidenav a').click(function() {
event.preventDefault();
var link = this;
$.smoothScroll({
scrollElement: $('#combos'),
scrollTarget: link.hash
});
return false;
});
/* show Pro Tools HD functions by default */
$('#hdon').button('toggle');
// search results depending on active keyboard 
descriptionMacPC = (function() {
$('#myresult:visible').livequery(function() {
if (activeKeyboard == 'Mac') {
$('.windescr').hide(); 
$('.macdescr').show();   
}
else {
$('.windescr').show();
$('.macdescr').hide();	   
}
})})
();