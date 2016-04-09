function godvilleTest() {
  function accPrana(mutation) {
    var minusLink = mutation.target.querySelector('a.vote_link[title="Этот глас не представляет из себя ничего интересного и остроумного"]');
    if (minusLink !== null) {
      minusLink.click();  
      window.console.log('-1');
    }
  }
  
  function tryBingo(mutation) {
    var regHome = new RegExp(/домой|город|столиц|вернулся/);
    var feed = mutation.target.innerText;
    if (regHome.test(feed)) {
      window.console.log(feed);
      jQuery.get('https://godville.net/news', function(news_page){
        jQuery.get('https://godville.net/news/bgn_show_inventory', function(data){
          attempts = parseInt(document.getElementById('b_cnt').innerText);
          minItems = jQuery(news_page).find('#bgn_block td').length / 3;
          minItems = Number.isInteger(minItems) ? minItems - 1 : parseInt(minItems);
          minItems = (data.old_score > 0 && data.old_score < 15 && (data.score + data.old_score) < 24 && attampts === 1) ? minItems + 1 : minItems;
          minScore = minItems * 2;
          window.console.log("Min items: " + minItems);
          window.console.log("Min score: " + minScore);
          window.console.log('Get new score: ' + data.score);
          window.console.log('Previous sum of scores: ' + data.old_score);
          window.console.log('Found items: ' + data.found);
          if (data.score >= minScore && data.found >= minItems) { 
            jQuery.post('https://godville.net/news/bgn_use_inventory', 
              function(new_data){ 
                window.console.log(new_data); 
              }
            )
          } else if (data.score < minScore) {
            window.console.log('not enough score');
          } else if (data.found < minItems) {
            window.console.log('not enough items');
          }
        })
      })
    }
  }
  
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.className.includes('d_content')) {
        accPrana(mutation)
      } 
      if (mutation.target.className.includes('f_news')) {
        tryBingo(mutation)
      }
    });    
  });
    
  var config = { childList: true, subtree: true };
    
  observer.observe(document, config);
}

var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode('('+ godvilleTest +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
