function acc_prana () {
  var MutationObserver = window.MutationObserver || window.WebKitMutationObserver || window.MozMutationObserver
  
  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if mutation.target.className.includes('')
    });    
  });
  
  var target = document.querySelector('#diary');
  
  var config = { childList: true, subtree: true };
  
  observer.observe(target, config);
}  

function acc_prana () {
  jQuery('#diary').bind('DOMSubtreeModified', function(){
    if (jQuery("[title='Этот глас не представляет из себя ничего интересного и остроумного']").lenght > 0) {
      window.console.log(jQuery('.d_msg').text());
      jQuery("[title='Этот глас не представляет из себя ничего интересного и остроумного']").click();
    }
  });
}

var script = document.createElement('script');
script.appendChild(document.createTextNode('('+ acc_prana +')();'));
(document.body || document.head || document.documentElement).appendChild(script);
