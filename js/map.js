// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
//canvas.width = screen.availWidth-200;
//canvas.height = screen.availHeight-200;
canvas.width = 786;
canvas.height = 786;
var anchocuadro = 64;
var alfa = 0.0;

var ancho = anchocuadro;
// load images
var cargandoReady = false;
var cargando = new Image();
cargando.onload = function() {
	cargandoReady = true;
};

cargando.src = "images/cargando.png";

var negroReady = false;
var negro = new Image();
negro.onload = function() {
  negroReady = true;
};
negro.src = "images/negro.png";

var selectReady = false;
var select = new Image();
select.onload = function() {
  selectReady = true;
};
select.src = "images/select.png";

var doorReady = false;
var door = new Image();
door.onload = function() {
	doorReady = true;
};
door.src = "images/puerta.png";

var waveReady = false;
var wave = new Image();
wave.onload = function() {
  waveReady = true;
};
wave.src = "images/onda.png";

var doorvReady = false;
var doorv = new Image();
doorv.onload = function() {
	doorvReady = true;
};

doorv.src = "images/puertav.png";

var fuegoReady = false;
var fuego = new Image();
fuego.onload = function() {
	fuegoReady = true;
};
fuego.src = "images/fire.png";

var sueloReady = false;
var suelo = new Image();
suelo.onload = function() {
	sueloReady = true;
};
suelo.src = "images/suelo.png";

var bloodReady = false;
var blood = new Image();
blood.onload = function() {
	bloodReady = true;
};

blood.src = "images/blood.png";

var chapaReady = false;
var chapa = new Image();
chapa.onload = function() {
	chapaReady = true;
};

chapa.src = "images/chapa.png";

var botiquinReady = false;
var botiquin = new Image();
botiquin.onload = function() {
	botiquinReady = true;
};

botiquin.src = "images/botiquin.png";

var zergReady = false;
var zerg = new Image();
zerg.onload = function() {
	zergReady = true;
};
zerg.src = "images/zergling.png";



var zerg1Ready = false;
var zerg1 = new Image();
zerg1.onload = function() {
	zerg1Ready = true;
};
zerg1.src = "images/alien2.png";



var zergbReady = false;
var zergb = new Image();
zergb.onload = function() {
	zergbReady = true;
};
zergb.src = "images/agujero.png";

var balaReady = false;
var bala = new Image();
bala.onload = function() {
	balaReady = true;
};
bala.src = "images/bala.png";

var tanqReady = false;
var tanq = new Image();
tanq.onload = function() {
	tanqReady = true;
};
tanq.src = "images/tanque.png";

var marinezReady = false;
var marinez = new Image();
marinez.onload = function() {
	marinezReady = true;
};
marinez.src = "images/marinez.png";

var mapReady = false;
var map = new Image();
map.onload = function() {
	mapReady = true;
};
map.src = "images/map.png";

var piso0Ready = false;
var piso0 = new Image();
piso0.onload = function() {
	piso1Ready = true;
};
piso0.src = "images/piso0.png";

var piso1Ready = false;
var piso1 = new Image();
piso1.onload = function() {
	piso1Ready = true;
};
piso1.src = "images/pared.png";

var piso11Ready = false;
var piso11 = new Image();
piso11.onload = function() {
	piso11Ready = true;
};
piso11.src = "images/pisounder.png";

var piso13Ready = false;
var piso13 = new Image();
piso13.onload = function() {
	piso13Ready = true;
};
piso13.src = "images/pisosal.png";

var pisopasilloReady = false;
var pisopasillo = new Image();
pisopasillo.onload = function() {
	pisopasilloReady = true;
};
pisopasillo.src = "images/pisopasillo.png";

var pisopasillovReady = false;
var pisopasillov = new Image();
pisopasillov.onload = function() {
	pisopasillovReady = true;
};
pisopasillov.src = "images/pisopasillov.png";

var piso21Ready = false;
var piso21 = new Image();
piso21.onload = function() {
	piso21Ready = true;
};
piso21.src = "images/piso21.png";

var piso22Ready = false;
var piso22 = new Image();
piso22.onload = function() {
	piso22Ready = true;
};
piso22.src = "images/piso22.png";

var piso23Ready = false;
var piso23 = new Image();
piso23.onload = function() {
	piso23Ready = true;
};
piso23.src = "images/piso23.png";

var piso3Ready = false;
var piso3 = new Image();
piso3.onload = function() {
	piso3Ready = true;
};
piso3.src = "images/piso3.png";

var piso31Ready = false;
var piso31 = new Image();
piso31.onload = function() {
	piso31Ready = true;
};
piso31.src = "images/piso31.png";

var piso32Ready = false;
var piso32 = new Image();
piso32.onload = function() {
	piso32Ready = true;
};
piso32.src = "images/piso32.png";

var piso33Ready = false;
var piso33 = new Image();
piso33.onload = function() {
	piso33Ready = true;
};
piso33.src = "images/piso33.png";

var piso4Ready = false;
var piso4 = new Image();
piso4.onload = function() {
	piso4Ready = true;
};
piso4.src = "images/piso4.png";

var piso41Ready = false;
var piso41 = new Image();
piso41.onload = function() {
	piso41Ready = true;
};
piso41.src = "images/piso41.png";

var piso42Ready = false;
var piso42 = new Image();
piso42.onload = function() {
	piso42Ready = true;
};
piso42.src = "images/piso42.png";

var piso43Ready = false;
var piso43 = new Image();
piso43.onload = function() {
	piso43Ready = true;
};
piso43.src = "images/piso43.png";
var murosReady = false;
var muros = new Image();
muros.onload = function() {
	murosReady = true;
};
muros.src = "images/muros.png";
