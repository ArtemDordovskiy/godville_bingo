jQuery(document).ready(function() {
  jQuery('#diary').on('DOMNodeInserted', "[title='Этот глас не представляет из себя ничего интересного и остроумного']", function(){
    window.console.log(jQuery('.vote_link').parent('.d_msg').text());
    jQuery(this).click();
  });
});
