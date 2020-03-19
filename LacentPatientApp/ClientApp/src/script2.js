
$(document).ready(function(e){

    if ('addEventListener' in document) {
      document.addEventListener('DOMContentLoaded', function() {
        FastClick.attach(document.body);
      }, false);
    }

  isLoggedin = $('#loggedin').attr("data-target");

  if (isLoggedin ===undefined || isLoggedin==="false"){
        $('#page-top').addClass("bg-gradient-primary");
        $('#page-top').css({"background-image": "linear-gradient(rgb(255, 137, 102) 10%, rgb(73, 250, 255) 100%)"});
    }
    else{
        $('#page-top').removeClass("bg-gradient-primary");
        $('#page-top').css({"background-image": "linear-gradient(rgb(255, 137, 102) 10%, rgb(73, 250, 255) 100%);"});
        //$('#page-top').css({"background-image": ""});
    }
    /*

    $("#sidebarToggleTop").on("click",function(e){

        e.preventDefault;
        var isOpened=$("#accordionSidebar").attr("data-target");
        if(isOpened==="false")
        {
            $("#accordionSidebar").addClass("toggled");
            $("#accordionSidebar").attr("data-target","true");
        }
        else{
            $("#accordionSidebar").attr("data-target","false");
            $("#accordionSidebar").removeClass("toggled");

        }
    });
*/

});
