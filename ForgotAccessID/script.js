setTimeout(function(){console.clear();}, 5000);


setInterval(function(){ console.clear();}, 18000);
document.addEventListener('contextmenu', event => event.preventDefault());
document.ondragstart = function() { return false; };