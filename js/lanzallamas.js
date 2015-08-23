function llama(x, y, sprt, avance, distanciamax, angulo) {

	this.casx = x + (-32 + 16 * Math.sin(angulo));
	this.casxinit = this.casx;

	this.casy = y + (-24 + 16 * Math.cos(angulo));
	this.casyinit = this.casy;
	this.radio = 6;
	this.contador = 0;
	this.img = sprt;
	this.anchospr = 64;
	this.dmax = distanciamax;
	this.av = avance;
	this.alfa = angulo;
	this.activo = true;
	this.spx = 0; // pos x en el sprite
	this.spy = 0; // pos y en el sprite

	this.colisionconmuro = function(alfa) {// dir: 0 arriba 1 derecha, 2 abajo,
											// 3 izquierda: /////pm puntos de
											// movimiento (pixeles)
		alfa = alfa % Math.PI;

	
		if (Dungeon.getCell(parseInt((this.casx + 16 + this.radio * Math.sin(this.alfa)) / ancho),
				            parseInt((this.casy + 8 + this.radio	* Math.cos(this.alfa)) / ancho)) > 1) {

			return false;

		} else {

			return true;

		}

	}

	this.update = function() {
		if (this.activo) {

			var col = false;
			this.radio++;
			if (this.radio > 24)
				this.radio = 24;
			if (!this.colisionconmuro(alfa)) {
				this.casx = this.casx + Math.sin(this.alfa) * this.av;
				this.casy = this.casy + Math.cos(this.alfa) * this.av;
				this.spx++;
				if (this.spx > 4) {
					this.spx = 0;
					this.spy++;

					if (this.spy > 4) {
						this.psy = 3;
						this.activo = false;
					}
				}

			} else {
				this.activo = false;
			}

		}
	}

	this.render = function() {
		if (this.activo) {
			ctx.drawImage(this.img, this.spx * ancho, this.spy * ancho,
					this.anchospr, this.anchospr, this.casx, this.casy, ancho,
					ancho);
		}
	}

}