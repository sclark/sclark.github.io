window.addEventListener('load', function() {
  var tabs = document.getElementsByClassName("tab");
  for (var i = 0; i < tabs.length; i++) {
    tabs[i].addEventListener('click', function(e) {

      /* open page if data-href specified */
      if (e.target.dataset.href) {
        window.open(e.target.dataset.href);
        return;
      }

      /* set tab active */
      var tabs = document.getElementsByClassName("tab");
      for (var i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" active", "");
      }
      e.target.className += " active";

      /* show type cards */
      var type = e.target.innerText.toLowerCase();
      var cards = document.getElementsByClassName("cards")[0].childNodes;
      for (var i = 0; i < cards.length; i++) {
        if (cards[i].nodeType === 1) //TODO Fix
          cards[i].style.display = cards[i].dataset.type === type ? "block" : "none";
      }

    });
  }

  document.getElementById("default").click();
});


/* .video background-image fix until attr(data-image url) is supported */
window.addEventListener('load', function() {
  var xs = document.getElementsByTagName('*');
  for (var i = 0; i < xs.length; i++) {
    if (xs[i].getAttribute('data-src') !== null) {
      var src = xs[i].getAttribute('data-src');
      xs[i].style.backgroundImage="url('"+src+"')";
    }
  }
});
