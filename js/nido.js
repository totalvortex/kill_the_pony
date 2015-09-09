function Nido(x, y, sprt, freq) {
	this.casx = x * ancho;
	this.casy = y * ancho;
	this.contador = 0;
	this.img = sprt;
	this.anchospr = 64;
	this.freq = freq;

	this.update = function() {
		this.contador++;
		if (this.contador % this.freq == this.freq - 1) {
			this.reproducir();
		}
	}
	this.render = function() {


		ctx.drawImage(this.img, 0, 0, ancho, ancho, this.casx,
				this.casy, ancho, ancho);
	}

	this.reproducir = function() {
		if(!this.colisionaconaliens())
		//	if(Dungeon.Aliens.length%2==1) Dungeon.Aliens.push(new Alien(parseInt((this.casx) / ancho) , parseInt((this.casy)/ ancho), 6, zerg, Dungeon.getRand(2, 6), ancho,1.5));
		//	else
		 Dungeon.Aliens.push(new Alien(parseInt((this.casx) / ancho) , parseInt((this.casy)/ ancho), 6, zerg1, Dungeon.getRand(2, 4), ancho,2.8));
	}

this.CCcol = function(x1, y1, w1) { // colision del circulo x1,y1 con radio
		// w1 con el x2,y2 con radio w2
		var xd = x1 - this.casx;
		var yd = y1 - this.casy;
		var wt = this.radio + this.vidamax + w1;
		if (this.vida > 0)
			return (xd * xd + yd * yd <= wt * wt);
	}

this.colisionaconaliens = function() { // dir: 0 arriba
		// 1 derecha, 2
		// abajo, 3
		// izquierda:
		// /////pm
		// puntos de
		// movimiento
		// (pixeles)
		var col = false;
		for (a = 0; a < Dungeon.Aliens.length; a++) {

			if (Dungeon.Aliens[a].CCcol(x , y, 10))
					 {
				col = true;
				break;
			}
		}

		return col;

	}



}