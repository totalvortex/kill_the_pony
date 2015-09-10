var ancho = 64;
var mapx = 0;
var mapy = 0;
var escala = 1.0;

var mensaje = " ";
var fps = 0;
var Cujo = null;
var gente = [];

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

var rx = -1;
var ry = -1;
var rectangulo=false;

var init = function() {
	ancho = 64;
	mapx = 0;
	mapy = 0;
	escala = 1.0;

	nivelinicial = 5;
	pm = 5; // pixels por movimiento

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
	/*while (Dungeon.nh < rooms && !Dungeon.puerta) { // genera el dungeon hasta
		// que las habitaciones sea
		// mayor que level
		Dungeon.createDungeon(64, 64, nivelinicial);
	}*/






	Dungeon.creaarena(65,65, 15, true);


	for(x=hy-7;x<hy-3;x++){
		Dungeon.setCell(hx-5,x,1);
		Dungeon.setCell(hx+5,x,1);

	}

	for(x=hx-5;x<hx+3;x++){
		Dungeon.setCell(x,hy-3,1);
	}

	for(x=hx-4;x<hx+5;x++){
		for(y=hy-7;y<hy-3;y++){
			Dungeon.Aliens.push(new Alien(x ,y , 6, ork, Dungeon.getRand(2, 4), ancho/1.3 ,2.8));
		}	
	}
	if (Dungeon.Aliens.length > 0) {
			for (a = 0; a < Dungeon.Aliens.length; a++) {
				Dungeon.Aliens[a].rabioso=false;
			}
	}
			






	mapx = parseInt((ancho * Dungeon.xsize) / 2) - parseInt(canvas.width / 2);
	mapy = parseInt((ancho * Dungeon.ysize) / 2) - parseInt(canvas.height / 2);
	Dungeon.iniciamapa(65, 65);
	Machango.creamachango(hx, hy, ork, ancho/0.9);
	panel.creapanel(map, true);
	
	Dungeon.setCell(Dungeon.exitx, Dungeon.exity, Dungeon.tileExit);
	ctx.translate(0, 0);
	mapx = Machango.casx - parseInt(canvas.width / 2);// mapy+2;
	mapy = Machango.casy - parseInt(canvas.height / 2);// mapy+2;
	ctx.translate(-mapx, -mapy);

	//this.Machango.escudo[0].activar();

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
	setTimeout(main, 1000 / 90 - delta);

};

document.body.appendChild(canvas);
var w = window;
requestAnimationFrame = w.requestAnimationFrame
		|| w.webkitRequestAnimationFrame || w.msRequestAnimationFrame
		|| w.mozRequestAnimationFrame;
var now = Date.now();
// Let's play this game!
init();
