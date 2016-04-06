jQuery.get('https://godville.net/news', function(news_page){
  jQuery.get('https://godville.net/news/bgn_show_inventory', function(data){ 
    min_score = parseInt(jQuery(news_page).find('#bgn_block td').length / 3) * 2;
    if (data.score >= min_score) { 
      jQuery.post('https://godville.net/news/bgn_use_inventory', 
        function(new_data){ 
    	  console.log(new_data); 
        }
      )
    } else if (data.score < min_score) {
      console.log('not now')
    }
  })
})
