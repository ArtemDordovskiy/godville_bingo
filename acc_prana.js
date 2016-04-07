jQuery('#diary').bind('DOMNodeInserted', function(){
  if (jQuery("[title='Этот глас не представляет из себя ничего интересного и остроумного']").lenght > 0) {
    window.console.log(jQuery('.d_msg').text());
    jQuery("[title='Этот глас не представляет из себя ничего интересного и остроумного']").click();
  }
});
