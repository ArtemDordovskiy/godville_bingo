jQuery.get('https://godville.net/news', function(news_page){
  jQuery.get('https://godville.net/news/bgn_show_inventory', function(data){
    min_items = parseInt(jQuery(news_page).find('#bgn_block td').length / 3)
    min_score = min_items * 2;
    if (data.old_score > 3*min_score) { min_items = min_items - 1 } 
    if (data.score >= min_score && data.found >= min_items) { 
      jQuery.post('https://godville.net/news/bgn_use_inventory', 
        function(new_data){ 
    	  console.log(new_data); 
        }
      )
    } else if (data.score < min_score) {
      console.log('not enough score')
    } else if (data.found < min_items) {
      console.log('not enough items')
    }
  })
})
