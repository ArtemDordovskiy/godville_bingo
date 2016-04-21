function godvilleTest() {
  var config = { childList: true, subtree: true };

  function redirectToSuperhero() {
    setTimeout(function(){
      window.location.href = 'https://godville.net/superhero';
    }, 180000)
  }

  function smeltBrick() {
    var templehood = parseInt(document.querySelector('#pantheons a[href^="/pantheon/show/templehood"]').innerText);

    if (templehood === NaN) {
      var gold = parseInt(document.querySelector('#hk_gold_we .l_val').innerText.replace(/\D+(\d+)\D+/, '$1'));
      var prana = parseInt(document.querySelector('.gp_val').innerText);

      if (gold > 3200 && prana > 50) {
        var posts = parseInt(document.querySelector('#hk_distance .l_val').innerText);
        var items = document.querySelectorAll('#inv_block_content li:not([class="heal_item"])');

        if (posts !== NaN || items.length === 0) {
          var alignment = document.querySelector('#hk_alignment .l_val').innerText;
          var goodAlignments = ['абсолютное добро', 'добродетельный', 'миролюбивый', 'добродушный', 'беззлобный'];
          // var badAlignments = ['чистое зло!', 'чистое зло', 'злобный', 'агрессивный', 'озлобленный', 'недовольный', 'нейтральный'];

          var health = eval(document.querySelector('#hk_health .l_val').innerText);

          var makeGood = document.querySelector('#cntrl1 .enc_link');
          var makeBad = document.querySelector('#cntrl1 .pun_link');
          var goldBricks = parseFloat(document.querySelector('#hk_bricks_cnt .l_val').innerText);
          var oldGoldBricks = goldBricks;

          if (goodAlignments.includes(alignment) && health >= 0.8) {
            makeGood.click();
          } else {
            makeBad.click();
          }

          if (goldBricks === oldGoldBricks) {
            setTimeout(smeltBrick(), 10000);
          }
        }
      }
    }
  }

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
          attempts = parseInt(jQuery(news_page).find('#b_cnt').text());
          minItems = jQuery(news_page).find('#bgn_block td').length / 4;
          minItems = parseInt(minItems);
          minItems = (data.old_score > 0 && data.old_score < 15 && (data.score + data.old_score) < 24 && attempts === 1) ? minItems + 1 : minItems;
          minScore = minItems * 2;
          if (data.score >= minScore) {
            jQuery.post('https://godville.net/news/bgn_use_inventory', 
              function(new_data){ 
                window.console.log(new_data); 
              }
            )
          } else if (data.score < minScore) {
            window.console.log('not enough score');
          }
        })
      })
    }
  }
  
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
    
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.className.includes('d_content')) {
        observer.disconnect();
        accPrana(mutation);
        observer.observe(document, config);
      } 
      if (mutation.target.className.includes('f_news')) {
        observer.disconnect();
        tryBingo(mutation);
        observer.observe(document, config);
      }
      if (mutation.target.baseURI === "https://godville.net/news") {
        observer.disconnect();
        redirectToSuperhero();
        observer.observe(document, config);
      }
      if (mutation.target.id === 'hk_gold_we') {
        observer.disconnect();
        smeltBrick();
        observer.observe(document, config);
      }
    });
  });
    
  observer.observe(document, config);
}

var script = document.createElement('script');
script.type = 'text/javascript';
script.appendChild(document.createTextNode('('+ godvilleTest +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
