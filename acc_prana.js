jQuery('#diary').bind('DOMNodeInserted', function(){
  window.console.log(jQuery('.d_msg').text());
  jQuery("[title='Этот глас не представляет из себя ничего интересного и остроумного']").click();
});
