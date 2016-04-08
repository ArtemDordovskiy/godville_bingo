var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation);
  });    
});

var target = document.querySelector('#diary');

var config = { subtree: true };

observer.observe(target, config);
