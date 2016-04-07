jQuery(document).ready(function(){
  jQuery('#diary').bind('DOMSubtreeModified', function(){
    if jQuery('.vote_link').length > 0 {
      jQuery(this).find('.vote_link:contains("-")').click();
    }  
  });
});
