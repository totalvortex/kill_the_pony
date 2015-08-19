

var anchocuadro=64;
var mapx=0;
var mapy=0;
var escala=1.0;
var pm=2; //pixels por movimiento
var mensaje = " ";
var fps = 0;
var Cujo = null;
var gente = [];
var maxaliens = 64;
var click=false;
var keysDown = {};
var xmin,ymin,xmax,ymax;
var mx=0;
var my=0;
var cx=0;
var cy=0;
var hx=0;
var hy=0;
var rooms=5;

// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 768;
canvas.height = 768;
var alfa=0.0;


var ancho=anchocuadro;

//The main game loop
var main = function () {
  var now,delta;
    now = Date.now();
    update();
    render();
    then = now;
    delta = now - then;
    setTimeout(main,1000/80-delta);
};

var init = function() {

  ctx.fillStyle = "#222222";
  ctx.fillRect(1,1,canvas.width-1,canvas.height-1);
  ctx.style = "position:absolute; margin-left: auto; margin-right: auto;";


  while(Dungeon.nh<rooms && !Dungeon.puerta){
  //genera el dungeon hasta que las habitaciones sea mayor que level
    Dungeon.createDungeon(anchocuadro,anchocuadro,3);
  }




  mapx=parseInt((ancho*Dungeon.xsize)/2)-parseInt(canvas.width/2);
  mapy=parseInt((ancho*Dungeon.ysize)/2)-parseInt(canvas.height/2);
  Machango.creamachango(hx,hy,marinez,48);



Dungeon.iniciamapa(anchocuadro,anchocuadro);
Dungeon.setCell(Dungeon.exitx,Dungeon.exity,Dungeon.tileExit);
ctx.translate(0,0);
mapx=Machango.casx-parseInt(canvas.width/2);//mapy+2;
mapy=Machango.casy-parseInt(canvas.height/2);//mapy+2;
ctx.translate(-mapx,-mapy);

then = now;
delta = now - then;
setTimeout(main,delta);
};
