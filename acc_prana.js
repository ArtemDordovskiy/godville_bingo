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
