window.addEventListener("load", function() {

    var mouse_wheel = function(event) {
        if (document.getElementById("boxes").doScroll)
            document.getElementById("boxes").doScroll(event.wheelDelta>0?"left":"right");
        else
            document.getElementById("boxes").scrollLeft -= event.wheelDelta;
        event.preventDefault();
        return false;
    }
    var mouse_right = function() {
        document.getElementById("boxes").scrollLeft -= -5;
    }
    var mouse_left = function() {
        document.getElementById("boxes").scrollLeft -= 5;
    }
    var mouse_interval;

    if (/Firefox/.test(navigator.userAgent)) 
    	document.getElementById("scrollbarmsg").textContent = "use arrows for more";
    document.getElementById("boxes").addEventListener("mousewheel", mouse_wheel);
    document.getElementById("scrollbar").addEventListener("mousewheel", mouse_wheel);

    document.getElementById("left").addEventListener("mouseover", function(){ mouse_interval = setInterval(mouse_left, 10); });
    document.getElementById("right").addEventListener("mouseover", function(){ mouse_interval = setInterval(mouse_right, 10); });
    document.getElementById("more").addEventListener("mouseover", function(){ mouse_interval = setInterval(mouse_right, 10); });
    document.getElementById("left").addEventListener("mouseout", function(){ clearInterval(mouse_interval); });
    document.getElementById("right").addEventListener("mouseout", function(){ clearInterval(mouse_interval); });
    document.getElementById("more").addEventListener("mouseout", function(){ clearInterval(mouse_interval); });
});