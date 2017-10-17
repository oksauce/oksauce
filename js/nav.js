$(document).ready(function() {

    $("#icons [href]").each(function() {

      if (window.location.href.indexOf(this.href) > -1) {

          $(this).addClass("current");
    }
  });
});