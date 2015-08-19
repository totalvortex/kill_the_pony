
	document.body.appendChild(canvas);
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	var now = Date.now();
// Let's play this game!
init();
