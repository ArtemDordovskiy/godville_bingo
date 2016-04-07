jQuery('#diary').bind('DOMSubtreeModified', function(){
  if (jQuery('.vote_link').length > 0) {
    window.console.log(jQuery('.vote_link').parent('.d_msg').text());
    jQuery(this).find('.vote_link:contains("-")').click();
  }  
});
