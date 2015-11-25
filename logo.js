function sclark() {
	var style = document.createElement("style");
	document.head.appendChild(style);
	var sheet = style.sheet;
	sheet.insertRule("#sclark { \
					  position: absolute; \
					  top: 1em; \
					  right: 1em; \
					  z-index: 999; \
					  content: url('http://sclark.io/media/logo.png'); \
					  width: 45px; \
					  height: 45px; \
					  border-radius: 50%; \
					  border-style: none; \
					  transition: border-radius 0.2s ease-in-out; \
					  animation: 5s spin infinite linear; \
					}", 0);
	sheet.insertRule("#sclark:hover { \
					  border-radius: 10%; \
					  animation: 0; \
					}", 0);

	sheet.insertRule("@keyframes spin { \
					  90% { transform: rotate(0deg); } \
					  100% { transform: rotate(-360deg); } \
					}", 0);


	var logo = document.createElement("a");
	logo.setAttribute("id", "sclark");
	logo.setAttribute("target", "_blank");
	logo.setAttribute("href", "http://sclark.io");
	document.body.appendChild(logo)
}

window.addEventListener('load', sclark, false);
