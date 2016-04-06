jQuery(document).ready(function(){
  jQuery(document).ajaxComplete(function(event, xhr, settings) {
    feed = xhr.responseJSON;
    if (feed.hasOwnProperty('news_from_field')) {
      reg_home = new Regex('домой');
      if (reg_home.test(feed.news_from_field.msg)) {
        jQuery.get('https://godville.net/news', function(news_page){
          jQuery.get('https://godville.net/news/bgn_show_inventory', function(data){
            min_items = parseInt(jQuery(news_page).find('#bgn_block td').length / 3);
            min_score = min_items * 2;
            //need to improve this condition --------------------------------------------------------------------------
            if (data.old_score > 3*min_score) { min_items > 3 ? min_items = min_items - 2 : min_items = min_items - 1 }
            //---------------------------------------------------------------------------------------------------------
            console.log('Get new score: ' + data.score);
            console.log('Previous sum of scores: ' + data.old_score);
            console.log('Found items: ' + data.found);
            if (data.score >= min_score && data.found >= min_items) { 
              jQuery.post('https://godville.net/news/bgn_use_inventory', 
                function(new_data){ 
            	  console.log(new_data); 
                }
              )
            } else if (data.score < min_score) {
              console.log('not enough score');
            } else if (data.found < min_items) {
              console.log('not enough items');
            }
          })
        }) 
      }
    }
  }  
})
