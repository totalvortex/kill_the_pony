
var ancho=64;
var mapx=0;
var mapy=0;
var escala=1.0;
var pm=2; //pixels por movimiento
var mensaje = " ";
var fps = 0;
var Cujo = null;
var gente = [];

var click=false;
var keysDown = {};
var desplazamiento=ancho;
var camino = [];
var mmx=0,mmy=0;
var xmin,ymin,xmax,ymax;

var mx=0;
var my=0;
var cx=0;
var cy=0;
var hx=0;
var hy=0;




	//The main game loop
	var main = function () {
		var now,delta;
		//while(conectado){
			now = Date.now();
			update();
			render();
			then = now;
			delta = now - then;
			setTimeout(main,1000/80-delta);
		//}
		//requestAnimationFrame(main);

	};


	document.body.appendChild(canvas);
	var w = window;
	requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
	var now = Date.now();
// Let's play this game!
//reset();
var rooms=0;
var level=512;
ctx.fillStyle = "#222222";
ctx.fillRect(1,1,canvas.width-1,canvas.height-1);

//netinit();

while(Dungeon.nh<level ){ //genera el dungeon hasta que las habitaciones sea mayor que level
	

	ctx.drawImage(cargando,32, 32);

	rooms=Dungeon.createDungeon(64,64,level);
	alfa++;
}

//alert("Dungeon generado. Cuadros: "+Dungeon.dungeon_map.length)


mapx=parseInt((ancho*Dungeon.xsize)/2)-parseInt(canvas.width/2);
mapy=parseInt((ancho*Dungeon.ysize)/2)-parseInt(canvas.height/2);
Machango.creamachango(hx,hy,marinez,48);
//Cujo=new Alien(hx-1,hy,15, zerg,ancho);
//Objeto2=new Objeto(hx,hy-1,15, zerg,ancho);

//Dungeon.Aliens.push(new Alien(hx-3,hy,15, zerg,ancho));
//Dungeon.Aliens.push(new Alien(hx-2,hy,15, zerg,ancho));



ctx.translate(0,0);
mapx=Machango.casx-parseInt(canvas.width/2);//mapy+2;
mapy=Machango.casy-parseInt(canvas.height/2);//mapy+2;
ctx.translate(-mapx,-mapy);

then = now;
delta = now - then;
setTimeout(main,delta);
