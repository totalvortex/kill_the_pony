function Escudo(x, y, sprt, rad) {
	this.casx = x;
	this.casy = y;
	this.contador = 0;
	this.img = sprt;
	this.radio = rad;
	

	this.update = function() {
		this.casx=Machango.casx;
		this.casy=Machango.casy;
		for(a=0;a< Dungeon.Aliens.length; a++){
				if(Dungeon.Aliens[a].CCcol(this.casx,this.casy+3,this.radio+25)){
					Dungeon.Aliens[a].vida--;
				}
		}
	}

	this.render = function() {
 		//alert("render");
		ctx.drawImage(wave, this.casx-20,
				this.casy-15, ancho+this.radio, ancho+this.radio);
	}

	
}