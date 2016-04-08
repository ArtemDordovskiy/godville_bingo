function acc_prana () {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.target.className.includes('d_content')) {
        var minusLink = mutation.target.querySelector('a.vote_link[title="Этот глас не представляет из себя ничего интересного и остроумного"]');
        minusLink.click();  
      }
    });    
  });
  
  var target = document.querySelector('#diary');
  
  var config = { childList: true, subtree: true };
  
  observer.observe(target, config);
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ acc_prana +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
