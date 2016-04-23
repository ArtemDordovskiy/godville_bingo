function godvilleTest() {
  var config = { childList: true, subtree: true };
  var health, prana, goodAlignments, alignment, makeGood, feed, regHome, regGold, regHealth;

  function initProps(mutation) {
    health = eval(document.querySelector('#hk_health .l_val').innerText);
    prana = parseInt(document.querySelector('.gp_val').innerText);
    // var badAlignments = ['чистое зло!', 'чистое зло', 'злобный', 'агрессивный', 'озлобленный', 'недовольный', 'нейтральный'];
    goodAlignments = ['абсолютное добро', 'добродетельный', 'миролюбивый', 'добродушный', 'беззлобный'];
    alignment = document.querySelector('#hk_alignment .l_val').innerText;

    makeGood = document.querySelector('#cntrl1 .enc_link');

    regHome =   new RegExp(/домой|город|столиц|вернулся/);
    regGold =   new RegExp(/монет/);
    regHealth = new RegExp(/\d+/);
    feed = mutation.target.innerText;
  }

  function redirectToSuperhero() {
    setTimeout(function(){
      window.location.href = 'https://godville.net/superhero';
    }, 180000)
  }

  function healSelf() {
    if (health < 0.1 && prana >= 25 && goodAlignments.includes(alignment)) {
      window.console.log('heal self');
      makeGood.click();
    }
  }

  function smeltBrick() {
    var templehood = parseInt(document.querySelector('#pantheons a[href^="/pantheon/show/templehood"]').innerText);
    if (isNaN(templehood)) {
      var gold = parseInt(feed.replace(/\D+(\d+)\D+/, '$1'));

      if (gold >= 3200 && prana >= 50) {
        var posts = parseInt(document.querySelector('#hk_distance .l_val').innerText);
        var items = document.querySelectorAll('#inv_block_content li:not([class="heal_item"])');

        if (!isNaN(posts) || items.length === 0) {
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
  
  function tryBingo() {
    jQuery.get('https://godville.net/news', function(news_page){
      var attempts = parseInt(jQuery(news_page).find('#b_cnt').text());
      if (attempts > 0) {
        jQuery.get('https://godville.net/news/bgn_show_inventory', function(data){
          var minItems = jQuery(news_page).find('#bgn_block td').length / 4;
          var minItems2 = jQuery(news_page).find('#bgn_block td').length / 3;
          minItems = (parseInt(minItems2) - parseInt(minItems)) === 2 ? parseInt(minItems) + 1 : parseInt(minItems);
          minItems = ((data.score + data.old_score) < 24 && attempts === 1) ? minItems + 2 : minItems;
          var minScore = minItems * 2;
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
      }
    })
  }
  
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver;
    
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.baseURI === "https://godville.net/superhero") {
        initProps(mutation);
        if (mutation.target.className.includes('d_content')) {
          observer.disconnect();
          accPrana(mutation);
          observer.observe(document, config);
        }
        if (mutation.target.className.includes('f_news') && regHome.test(feed)) {
          observer.disconnect();
          window.console.log('Try to send items to bingo');
          window.console.log(feed);
          tryBingo(mutation);
          observer.observe(document, config);
        }
        if (mutation.target.className.includes('l_val') && regGold.test(feed)) {
          observer.disconnect();
          window.console.log('Try to smelt a brick');
          window.console.log(feed);
          smeltBrick();
          observer.observe(document, config);
        }
        if (mutation.target.className.includes('f_news') && regHealth.test(feed)) {
          observer.disconnect();
          window.console.log(feed);
          window.console.log('Try to heal self');
          healSelf();
          observer.observe(document, config);
        }
      } else {
        observer.disconnect();
        redirectToSuperhero();
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
