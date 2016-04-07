jQuery('#news').bind('DOMSubtreeModified', function() {
  feed = jQuery(this).find('.f_news').text();
  reg_home = new RegExp(/домой|город/);
  if (reg_home.test(feed)) {
    jQuery.get('https://godville.net/news', function(news_page){
      jQuery.get('https://godville.net/news/bgn_show_inventory', function(data){
        min_items = parseInt(jQuery(news_page).find('#bgn_block td').length / 3);
        min_score = min_items * 2;
        window.console.log("Min items: " + min_items);
        window.console.log("Min score: " + min_score);
        //need to improve this condition --------------------------------------------------------------------------
        if (data.old_score > 3*min_score) { min_items > 3 ? min_items = min_items - 2 : min_items = min_items - 1 }
        //---------------------------------------------------------------------------------------------------------
        window.console.log('Get new score: ' + data.score);
        window.console.log('Previous sum of scores: ' + data.old_score);
        window.console.log('Found items: ' + data.found);
        if (data.score >= min_score && data.found >= min_items) { 
          jQuery.post('https://godville.net/news/bgn_use_inventory', 
            function(new_data){ 
        	    window.console.log(new_data); 
            }
          )
        } else if (data.score < min_score) {
          window.console.log('not enough score');
        } else if (data.found < min_items) {
          window.console.log('not enough items');
        }
      })
    }) 
  }
});
