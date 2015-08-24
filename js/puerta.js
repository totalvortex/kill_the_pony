function puerta(x, y, hor) {
	this.casx = x * ancho;
	this.casy = y * ancho;
	this.posx = x;
	this.posy = y;
	this.contador = 0;
	this.anchospr = 64;
	this.hori = hor; //¿horizontal?
	this.open=true;
	
	this.update = function() {
		if(!this.open){
			if ( this.contador > 11 ) contador = 12;
			else this.contador=this.contador+4;
		}
	}
	this.render = function() {

		if(!this.open){
			if(this.hori){
				ctx.drawImage(door,  ancho * this.contador, 0,
					this.anchospr, this.anchospr,
					 this.casx, this.casy,
					  ancho, ancho);
			}
			else{
				ctx.drawImage(doorv,  0, ancho * this.contador,
					this.anchospr, this.anchospr,
					 this.casx, this.casy,
					  ancho, ancho);

			}
		}
		else{
			if(this.hori){
				ctx.drawImage(door,  0, 0,
					 this.anchospr, this.anchospr,
					 this.casx, this.casy,
					 ancho,	ancho);
			}else{
				ctx.drawImage(doorv,  0, ancho * this.contador,
					 this.anchospr, this.anchospr,
					 this.casx, this.casy,
					 ancho,	ancho);

			}
		}
	}

	this.abre = function(){
		this.open=false;
	}
	
}