function getmp(canvas, evt) {

	return {
		x : evt.clientX - 10,
		y : evt.clientY - 10
	};
}

addEventListener('mousemove', function(evt) { // funcion para los eventos de
	// mover ratón
	Dungeon.mpos = getmp(canvas, evt);

}, false);

addEventListener('mousedown', function(evt) { // funcion para los eventos
												// click
	// del ratón
	Machango.disparando = !Machango.disparando;
	var p = getmp(canvas, evt);

	// disipara una bala

}, false);

addEventListener("keydown", function(e) { // funcion que mete en keysDown[]
	// las teclas pulsadas en el frame

	keysDown[e.keyCode] = true;
}, false);

addEventListener("keyup", function(e) {
	delete keysDown[e.keyCode];

}, false);

function colmuro(f, x0, y0, rx, ry) { // colisiones de un cuadrado situado en
	// x0,y0 de ancho f con un circulo rx,ry
	// con radio Machango.sprite
	var circleDistanceX = Math.abs(x0 - rx - f);
	var circleDistanceY = Math.abs(y0 - ry - f);

	if (circleDistanceX > (f + Machango.radio)) {
		return false;
	}
	if (circleDistanceY > (f + Machango.radio)) {
		return false;
	}

	if (circleDistanceX <= (f)) {
		return true;
	}
	if (circleDistanceY <= (f)) {
		return true;
	}

	var cornerDistance_sq = Math.pow(circleDistanceX - f, 2)
			+ Math.pow(circleDistanceY - f, 2);

	return (cornerDistance_sq <= (Math.pow(Machango.radio, 2)));
}

function update() // actualiza las variables antes del render
{
	var up, down, left, right;
	if (40 in keysDown) { // Player holding down
		if (Machango.casy > 0
				&& Machango.casy < Dungeon.ysize * ancho
				&& Dungeon.getCell(parseInt((Machango.casx) / ancho),
						parseInt((Machango.casy - 10 - pm - 1) / ancho) + 1) != Dungeon.tileDirtWall
				&& !colisionaconaliens(Machango.casx, Machango.casy,
						Machango.radio, 2, pm)) {
			mensaje = "Nivel: "
					+ Dungeon.level
					+ "("
					+ parseInt(Machango.casx / ancho)
					+ ","
					+ parseInt(Machango.casy / ancho)
					+ "):"
					+ Dungeon.getCell(parseInt(Machango.casx / (ancho)),
							parseInt(Machango.casy / (ancho)));

			Machango.casy = Machango.casy + pm;
			ctx.translate(0, +mapy);
			mapy = Machango.casy - parseInt(canvas.height / 2);// mapy+2;
			ctx.translate(0, -mapy);

			up = true;
		} else {
			up = false;
		}

	}
	if (38 in keysDown) { // Player holding up
		if (Machango.casy > 0
				&& Machango.casy < Dungeon.ysize * ancho
				&& Dungeon.getCell(parseInt((Machango.casx) / ancho),
						parseInt((Machango.casy - (pm + 1)) / ancho)) != Dungeon.tileDirtWall
				// &&
				// !Cujo.CCcol(Machango.casx,Machango.casy-pm,Machango.radio,Cujo.casx,Cujo.casy,Cujo.radio)){
				&& !colisionaconaliens(Machango.casx, Machango.casy,
						Machango.radio, 0, pm)) {
			// if(colmuro(parseInt((Machango.casx+25)/ancho),parseInt((Machango.casy+25)/ancho)-pm,parseInt((Machango.casx+25)/ancho),parseInt((Machango.casy+25)/ancho))+1){

			mensaje = "Nivel: "
					+ Dungeon.level
					+ "("
					+ parseInt(Machango.casx / ancho)
					+ ","
					+ parseInt(Machango.casy / ancho)
					+ "):"
					+ Dungeon.getCell(parseInt(Machango.casx / (ancho)),
							parseInt(Machango.casy / (ancho)));

			Machango.casy = Machango.casy - pm;
			ctx.translate(0, +mapy);
			mapy = Machango.casy - parseInt(canvas.height / 2);// mapy-2;
			ctx.translate(0, -mapy);

			/*
			 * } else{ //alert("col"); }
			 */
			down = true;

		} else {
			down = false;
		}

	}
	if (37 in keysDown) { // Player holding left
		if (Machango.casx > 0
				&& Machango.casx < Dungeon.xsize * ancho
				&& Dungeon.getCell(
						parseInt((Machango.casx - (pm + 1)) / ancho),
						parseInt((Machango.casy) / ancho)) != Dungeon.tileDirtWall
				// &&
				// !Cujo.CCcol(Machango.casx-pm,Machango.casy,Machango.radio,Cujo.casx,Cujo.casy,Cujo.radio)){
				&& !colisionaconaliens(Machango.casx, Machango.casy,
						Machango.radio, 1, pm)) {
			// if(colmuro(parseInt((Machango.casx+25)/ancho)-pm,parseInt((Machango.casy+25)/ancho),parseInt((Machango.casx+25)/ancho)-1,parseInt((Machango.casy+25)/ancho))){

			mensaje = "Nivel: "
					+ Dungeon.level
					+ "("
					+ parseInt(Machango.casx / ancho)
					+ ","
					+ parseInt(Machango.casy / ancho)
					+ "):"
					+ Dungeon.getCell(parseInt(Machango.casx / (ancho)),
							parseInt(Machango.casy / (ancho)));

			Machango.casx = Machango.casx - pm;
			ctx.translate(+mapx, 0);
			mapx = Machango.casx - parseInt(canvas.width / 2);// mapx-2;
			ctx.translate(-mapx, 0);

			/*
			 * }} else{ //alert("col"); }
			 */
			left = true;

		} else {
			left = false;
		}

	}
	if (39 in keysDown) { // Player holding right
		if (Machango.casx > 0
				&& Machango.casx < Dungeon.xsize * ancho
				&& Dungeon.getCell(parseInt((Machango.casx - 16 + (pm + 1))
						/ ancho) + 1, parseInt((Machango.casy) / ancho)) != Dungeon.tileDirtWall
				// &&
				// !Cujo.CCcol(Machango.casx+pm,Machango.casy,Machango.radio,Cujo.casx,Cujo.casy,Cujo.radio)){
				&& !colisionaconaliens(Machango.casx, Machango.casy,
						Machango.radio, 3, pm)) {
			mensaje = "Nivel: "
					+ Dungeon.level
					+ "("
					+ parseInt(Machango.casx / ancho)
					+ ","
					+ parseInt(Machango.casy / ancho)
					+ "):"
					+ Dungeon.getCell(parseInt(Machango.casx / (ancho)),
							parseInt(Machango.casy / (ancho)));

			Machango.casx = Machango.casx + pm;
			ctx.translate(+mapx, 0);
			mapx = Machango.casx - parseInt(canvas.width / 2);// mapx+2;
			ctx.translate(-mapx, 0);

			/*
			 * } else{ //alert("col"); }
			 */
			right = true;
		} else {
			right = false;
		}

	}
	Machango.mov = (up || down || left || right);
	Dungeon.ver(parseInt(Machango.casx / ancho), parseInt((Machango.casy)
			/ ancho));// mensaje="("+(parseInt(Machango.casx/(ancho*2))+25)+",
	// "+(parseInt(Machango.casy/(ancho*2))+25)+"):
	// "+Dungeon.getCell(parseInt(Machango.casx/(ancho*2))+25,
	// parseInt(Machango.casy/(ancho*2))+25);

	// posicion del tanque segun movimiento
	if (up && !left && !right)
		Machango.pos = 16;
	if (up && right)
		Machango.pos = 12;
	if (right && !up && !down)
		Machango.pos = 8;
	if (right && down)
		Machango.pos = 4;
	if (down && !left && !right)
		Machango.pos = 0;
	if (down && left)
		Machango.pos = -4;
	if (left && !up && !down)
		Machango.pos = -8;
	if (up && left)
		Machango.pos = -12;

	xmin = parseInt(Machango.casx / ancho)
			- parseInt((canvas.width / 2) / ancho);
	xmax = parseInt(Machango.casx / ancho)
			+ parseInt((canvas.width / 2) / ancho);
	ymin = parseInt(Machango.casy / ancho)
			- parseInt((canvas.height / 2) / ancho);
	ymax = parseInt(Machango.casy / ancho)
			+ parseInt((canvas.height / 2) / ancho);

	if (48 in keysDown) { // Player holding 0
		escala = 1.0;
		ctx.translate(-mapx, -mapy);
		mapx = parseInt((ancho * Dungeon.xsize) / 2)
				- parseInt(canvas.width / 2);
		mapy = parseInt((ancho * Dungeon.ysize) / 2)
				- parseInt(canvas.height / 2);
		ctx.translate(mapx, mapy);
		ctx.scale(1.0, 1.0);
		ancho = anchocuadro;
		// Dungeon.visible = [];
		// for(x=0;x<Dungeon.xsize*Dungeon.ysize;x++){
		// Dungeon.visible.push(true);
		// }
		// mapx=0;
		// mapy=0;
		// alert("borrada de 0");
	}

	if (49 in keysDown) { // Player holding 1
		if (escala > 0)
			escala = 1.0;
		escala -= 0.1;
		ctx.scale(escala, escala);
		ancho -= 0.1;

	}
	if (50 in keysDown) { // Player holding 2
		if (escala < 0)
			escala = 1.0;
		escala += 0.1;
		ctx.scale(escala, escala);
		ancho += 0.1;
	}
	// mensaje="("+mapx+", "+mapy+")";

	if (86 in keysDown) { // Player holding "v"
		for (x = 0; x < Dungeon.xsize; x++) {
			for (y = 0; y < Dungeon.ysize; y++)
				Dungeon.setv(x, y);
		}
	}
	if (87 in keysDown) { // Player holding "w"
		this.reboot();

	}
	if (Dungeon.spawner.length > 0)
		for (a = 0; a < Dungeon.spawner.length; a++) {
			Dungeon.spawner[a].update();
		}

	Machango.update();

	if (Dungeon.Aliens.length > 0) {
		for (a = 0; a < Dungeon.Aliens.length; a++) {

			Dungeon.Aliens[a].update(Machango.casx, Machango.casy,
					Machango.radio, pm);
		}

		// colisiones de balas con aliens

		for (a = 0; a < Dungeon.Aliens.length; a++) {
			for (b = 0; b < Machango.balas.length; b++) {
				if (Machango.balas[b].activo) {
					if (Dungeon.Aliens[a].CCcol((Machango.balas[b].casx),
							(Machango.balas[b].casy - 8),
							Machango.balas[b].radio + 3)) {
						Dungeon.Aliens[a].vida--;
						Machango.balas[b].activo = false;
					}
				}
			}

    }
		
	}
	if (Dungeon.items.length > 0) {
		for (i = 0; i < Dungeon.items.length; i++) {
			if (Dungeon.items[i].CCcol(Machango.casx, Machango.casy,
					Machango.radio)) {
				Dungeon.items[i].activo = false;
				Machango.vida += 25;
			}
		}
	}
	// lanzallamas
	if (Machango.disparando) {
		if (Machango.balas.length < Machango.maxbalas) {
			angulo = Math.atan2(Dungeon.mpos.x - canvas.height / 2 - 16,
					Dungeon.mpos.y - canvas.width / 2 - 8);
			if (Machango.balas.length < Machango.maxbalas)
				// Machango.balas.push(new Bala(Machango.casx + 20,
				// Machango.casy + 20, 8, bala, 5, angulo));
				Machango.balas.push(new llama(Machango.casx + 20,
						Machango.casy + 20, fuego, 8, 256, angulo));
			else {

				Machango.balas.pop();
				// Machango.balas.push(new Bala(Machango.casx + 20,
				// Machango.casy + 20, 8, bala, 5, angulo));
				Machango.balas.push(new llama(Machango.casx + 20,
						Machango.casy + 20, fuego, 12, 256, angulo));
				// x,y,sprt,avance,distanciamax,angulo
			}

		}
	}

  panel.update();




	// salida
	if (Dungeon.getCell(parseInt((Machango.casx + 16) / ancho),
			parseInt((Machango.casy + 16) / ancho)) == Dungeon.tileExit) {
		this.reboot();

	}
}

function reboot() {
	delta = 3000;

	Dungeon.borrar();
	ctx.translate(mapx, mapy);
	 Dungeon.level++;
	while (Dungeon.nh < Dungeon.level && !Dungeon.puerta) { // genera el dungeon hasta
		// que las habitaciones sea
		// mayor que level
		rooms = Dungeon.createDungeon(64, 64, Dungeon.level);
	}
	rooms = Dungeon.createDungeon(64, 64, Dungeon.level);
	mensaje = "LEVEL: " + Dungeon.level;
	Dungeon.iniciamapa(64, 64);

	Machango.creamachango(hx, hy, marinez, 48);

	Dungeon.setCell(Dungeon.exitx, Dungeon.exity, Dungeon.tileExit);

	mapx = Machango.casx - parseInt(canvas.width / 2);// mapy+2;
	mapy = Machango.casy - parseInt(canvas.height / 2);// mapy+2;
	ctx.translate(-mapx, -mapy);
}

function colisionaconaliens(x, y, radio, dir, pm) { // dir: 0 arriba 1 derecha,
	// 2 abajo, 3 izquierda:
	// /////pm puntos de
	// movimiento (pixeles)
	var col = false;
	for (a = 0; a < Dungeon.Aliens.length; a++) {
		switch (dir) {
		case 0: {
			if (Dungeon.Aliens[a].CCcol(x, y - pm, radio)) {
				col = true;
				break;
			}

		}
		case 1: {
			if (Dungeon.Aliens[a].CCcol(x + pm, y, radio)) {
				col = true;
				break;
			}

		}
		case 2: {
			if (Dungeon.Aliens[a].CCcol(x, y + pm, radio)) {
				col = true;
				break;
			}

		}
		case 3: {
			if (Dungeon.Aliens[a].CCcol(x - pm, y, radio)) {
				col = true;
				break;
			}

		}
		default: {
			if (Dungeon.Aliens[a].CCcol(x, y, radio + pm)) {
				col = true;
				break;
			}

		}
		}

	}

	return col;

}

/*
 * function hazcamino(x0, y0, x1, y1){ //algoritmo que te crea una linea de
 * puntos desde x0,y0 hasta x1,y1 y las guarda en camino camino=[]; var dx =
 * Math.abs(x1-x0); var dy = Math.abs(y1-y0); var sx = (x0 < x1) ? 1 : -1; var
 * sy = (y0 < y1) ? 1 : -1; var err = dx-dy; var pox=0; var poy=0; var e2 =
 * 2*err; if (e2 >-dy){ pox=sx;} if (e2 < dx){ poy=sy;}
 * 
 * 
 * //mensaje="Orcopos("+orcopos+"),("+pox+", "+poy+")"; while(true){
 * 
 * camino.push([x0, y0,pox,poy]); pox=poy=0;
 * 
 * if ((x0==x1) && (y0==y1)) break; var e2 = 2*err; if (e2 >-dy){ err -= dy; x0 +=
 * sx; pox=sx;} if (e2 < dx){ err += dx; y0 += sy; poy=sy;} } }
 */
function dibujasuelo() // dibuja el suelo
{
	// ctx.translate(xmap,ymap);
	// Dungeon.ver(hx,hy);

	if (ymin < 0)
		ymin = 0;
	if (xmin < 0)
		xmin = 0;
	if (xmax > Dungeon.xsize)
		xmax = Dungeon.xsize;
	if (ymax > Dungeon.ysize)
		ymax = Dungeon.ysize;

	for (y = ymin; y < ymax + 1; y++) {
		for (x = xmin; x < xmax + 1; x++) {

			if (Dungeon.isv(x, y)) {

				var n = Dungeon.getCell(x, y);
				// if(n!=0) n=Dungeon.getRand(5,15);
				// var t =tablero[x*tablerow+y][1];
				if (n > 12 && n < 99) {
					ctx.drawImage(piso0, x * ancho, y * ancho);
				} else
					switch (n) {
					case 0: {
						ctx.fillStyle = "#090909";
						ctx.fillRect(x * ancho, y * ancho, ancho, ancho);

						break;
					}

					case 1: {
						/*
						 * ctx.shadowColor = "rgba( 0, 0, 0, 1.0 )";
						 * ctx.shadowOffsetX = -2; ctx.shadowOffsetY = -2;
						 * ctx.shadowBlur = 8;
						 */
						ctx.drawImage(piso1, x * ancho, y * ancho);

						// ctx.fillStyle ="rgba(127, 250, 0,0.4)";
						// ctx.fillRect(x*ancho,y*ancho,ancho,ancho);

						// ctx.drawImage(muros,24*ancho, ancho, ancho,ancho,
						// x*ancho, y*ancho, ancho,ancho);

						break;
					}
					case 2: {
						ctx.drawImage(piso12, x * ancho, y * ancho);
						ctx.fillStyle = "rgba(90, 30, 0,0.4)";
						ctx.fillRect(x * ancho, y * ancho, ancho, ancho);
						break;
					}
					case 3: {
						ctx.drawImage(piso11, x * ancho, y * ancho);
						// ctx.fillStyle ="rgba(0, 0, 0,0.7)";
						// ctx.fillRect(x*ancho,y*ancho,ancho,ancho);

						break;
					}
					case 4: {// pasillov
						ctx.drawImage(pisopasillov, x * ancho, y * ancho);
						// ctx.fillStyle ="rgba(250, 0, 250,0.2)";
						// ctx.fillRect(x*ancho,y*ancho,ancho,ancho);

						break;
					}
					case 5: { // pasilloh
						ctx.drawImage(pisopasillo, x * ancho, y * ancho);
						// ctx.fillStyle ="rgba(0, 0, 0,0.3)";
						// ctx.fillRect(x*ancho,y*ancho,ancho,ancho);

						break;
					}
					case 6: {
						ctx.drawImage(piso11, x * ancho, y * ancho);
						// ctx.fillStyle ="rgba(255, 250,250,0.8)";
						// ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
						break;
					}
					case 7: { // spawners

						ctx.drawImage(zergb, x * ancho, y * ancho);

						break;
					}
					case 8: {
						ctx.fillStyle = "rgba(255, 255, 0,0.7)";
						ctx.fillRect(x * ancho, y * ancho, ancho, ancho);
						ctx.drawImage(piso0, x * ancho, y * ancho);

						break;
					}
					case 9: {
						ctx.drawImage(piso0, x * ancho, y * ancho);

						break;
					}
					case 10: {
						ctx.drawImage(piso0, x * ancho, y * ancho);

						break;
					}
					case 11: {
						ctx.drawImage(piso0, x * ancho, y * ancho);

						break;
					}
					case 12: {
						ctx.drawImage(piso0, x * ancho, y * ancho);

						break;
					}
					case 13: {
						ctx.drawImage(piso4, x * ancho, y * ancho);
						break;
					}
					case 14: {
						ctx.drawImage(piso41, x * ancho, y * ancho);

						break;
					}
					case 15: {
						ctx.drawImage(piso42, x * ancho, y * ancho);

						break;
					}
					case 16: {
						ctx.drawImage(piso43, x * ancho, y * ancho);

						break;
					}
					case 99: {
						ctx.drawImage(piso13, x * ancho, y * ancho);
						// ctx.fillStyle ="rgba(0, 0, 250,0.4)";
						// ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
						break;
					}
					case 100: {
						ctx.drawImage(piso13, x * ancho, y * ancho);
						ctx.fillStyle = "rgba(255, 133, 0,0.9)";
						ctx.fillRect(x * ancho, y * ancho, ancho, ancho);
						break;
					}
					default: {
						// ctx.fillStyle ="#0000ff";
						// ctx.fillRect(x*ancho,y*ancho,ancho,ancho);

						break;
					}
					}

				if (click) {
					ctx.drawImage(cursor, mx * ancho, my * ancho, ancho, ancho);
				}

				if (x == exitx && y == exity) {
					ctx.fillStyle = "rgba(255, 0, 0,0.7)";
					ctx.fillRect(x * ancho, y * ancho, ancho, ancho);
				}
			} else {
				ctx.fillStyle = "#000000";
				ctx.fillRect(x * ancho, y * ancho, ancho, ancho);
			}
		}
	}

}

function dibujaobj() {

	if (Dungeon.items.length > 0) // dibuja items
		for (a = 0; a < Dungeon.items.length; a++) {
			Dungeon.items[a].render();
		}

	if (Dungeon.spawner.length > 0)
		for (a = 0; a < Dungeon.spawner.length; a++) {
			Dungeon.spawner[a].render();
		}
	// Spawner.render();
	if (Dungeon.Aliens.length > 0)
		for (a = 0; a < Dungeon.Aliens.length; a++) {
			Dungeon.Aliens[a].render();
		}

	if (Machango.balas.length > 0)
		for (a = 0; a < Machango.balas.length; a++) {
			Machango.balas[a].render();
		}
}

var fps = { // calcula los fps
	startTime : 0,
	frameNumber : 0,
	getFPS : function() {
		this.frameNumber++;
		var d = new Date().getTime(), currentTime = (d - this.startTime) / 1000, result = Math
				.floor((this.frameNumber / currentTime));

		if (currentTime > 1) {
			this.startTime = new Date().getTime();
			this.frameNumber = 0;
		}
		return result;

	}
};

// Draw everything
function render() {
	fps.frameNumber++;
	var bandera = true;

	// var tabf[tablerow][tableroh][2];
	ctx.fillStyle = "#000000";
	ctx.strokeStyle = "#000000";
	ctx.lineWidth = 8;
	ctx.lineCap = "round";
	ctx.rect(1, 1, canvas.width - 1, canvas.height - 1);
	// ctx.translate(mapx,mapy);
	ctx.stroke();

	// dibuja el piso
	dibujasuelo();

	// dibuja Aliens;
	dibujaobj();
	// dibuja mapa
	ctx.drawImage(map, Machango.casx + canvas.width / 2 - 208, Machango.casy
			+ canvas.height / 2 - 230, 243, 178);
	Dungeon.dibujamapa(10 + Machango.casx - canvas.width / 2, 10
			+ Machango.casy - canvas.height / 2);
  
  //dibuja el panel de vida
  panel.render();

	// dibuja al personaje
	Machango.render();

	// Dungeon.dibujamapa(Machango.casx,Machango.casy);
	// Mensaje fps
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "26px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	// ctx.fillText("fps: (" + fps.getFPS() + ")",mapx+ 630,mapy+ 30);

	// Mensaje
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "26px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(mensaje, mapx + 30, mapy + 30);

}
