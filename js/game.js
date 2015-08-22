var ancho = 64;
var mapx = 0;
var mapy = 0;
var escala = 1.0;
var pm = 2; // pixels por movimiento
var mensaje = " ";
var fps = 0;
var Cujo = null;
var gente = [];
var maxaliens = 64;

var click = false;
var keysDown = {};
var desplazamiento = ancho;
var camino = [];
var mmx = 0, mmy = 0;
var xmin, ymin, xmax, ymax;

var mx = 0;
var my = 0;
var cx = 0;
var cy = 0;
var hx = 0;
var hy = 0;
var rooms = 5;

var init = function() {
	ancho = 64;
	mapx = 0;
	mapy = 0;
	escala = 1.0;
	nivelinicial=32;
	pm = 2; // pixels por movimiento
	mensaje = " ";
	fps = 0;
	gente = [];
	maxaliens = 64;
	click = false;
	keysDown = {};
	desplazamiento = ancho;
	camino = [];
	mmx = 0, mmy = 0;
	xmin, ymin, xmax, ymax;

	mx = 0;
	my = 0;
	cx = 0;
	cy = 0;
	hx = 0;
	hy = 0;
	rooms = 3;

	ctx.fillStyle = "#222222";
	ctx.fillRect(1, 1, canvas.width - 1, canvas.height - 1);

	while (Dungeon.nh < rooms && !Dungeon.puerta) { // genera el dungeon hasta
		// que las habitaciones sea
		// mayor que level
		Dungeon.createDungeon(64, 64, nivelinicial);
	}

	mapx = parseInt((ancho * Dungeon.xsize) / 2) - parseInt(canvas.width / 2);
	mapy = parseInt((ancho * Dungeon.ysize) / 2) - parseInt(canvas.height / 2);
	Machango.creamachango(hx, hy, marinez, 48);

	Dungeon.iniciamapa(64, 64);
	Dungeon.setCell(Dungeon.exitx, Dungeon.exity, Dungeon.tileExit);
	ctx.translate(0, 0);
	mapx = Machango.casx - parseInt(canvas.width / 2);// mapy+2;
	mapy = Machango.casy - parseInt(canvas.height / 2);// mapy+2;
	ctx.translate(-mapx, -mapy);

	then = now;
	delta = now - then;
	setTimeout(main, delta);
};

// The main game loop
var main = function() {
	var now, delta;

	now = Date.now();
	update();
	render();
	then = now;
	delta = now - then;
	setTimeout(main, 1000 / 80 - delta);

};

document.body.appendChild(canvas);
var w = window;
requestAnimationFrame = w.requestAnimationFrame
		|| w.webkitRequestAnimationFrame || w.msRequestAnimationFrame
		|| w.mozRequestAnimationFrame;
var now = Date.now();
// Let's play this game!
init();
