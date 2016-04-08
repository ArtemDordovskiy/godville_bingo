var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    console.log(mutation.type);
  });    
});

var target = document.querySelector('#diary');

var config = { attributes: true, childList: true, characterData: true, subtree: true };

observer.observe(target, config);
