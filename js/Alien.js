function Alien(x, y, r, sp, vid,anc,pumo) {
	this.casx = x * ancho + 4;
	this.casy = y * ancho + 16;
	this.radio = r;
	this.img = sp;
	this.anchospr = anc;
	this.contador = 0;
	this.pos = 0;
	this.giro = 0;
	this.alfa = 0;
	this.corriendo = 0;
	this.animm = 0;
 	this.animmax = Dungeon.getRand(0,6); //animacion de la muerte
	this.pm = pumo;
	this.vida = vid;
	this.vidamax = vid;
	this.camino = [];
	this.barravida = ctx.createImageData(2, 16);
	this.targetx=Machango.casx;
	this.targety=Machango.casy;
	this.camino=[];
	this.camino=Dungeon.findPath([parseInt((this.casx)/ancho),parseInt((this.casy)/ancho)],[parseInt((this.targetx)/ancho),parseInt((this.targety)/ancho)]);
	this.conta2=0;
	this.selec=false;	
	this.ordenmov=false;
	this.targetradio=6;
	for (var i = 0; i < this.barravida.data.length; i += 8) // borra la
	// barra de
	// vida
	{

		this.barravida.data[i + 0] = 0;
		this.barravida.data[i + 1] = 250;
		this.barravida.data[i + 2] = 0;
		this.barravida.data[i + 3] = 250;

		this.barravida.data[i + 4] = 0;
		this.barravida.data[i + 5] = 250;
		this.barravida.data[i + 6] = 0;
		this.barravida.data[i + 7] = 250;

	}
	this.vidaant = vid;

	this.CRcol = function(cx, cy, cr, rx, ry, rw) {
		var circleDistanceX = Math.abs(cx - rx - rw / 2);
		var circleDistanceY = Math.abs(cy - ry - rw / 2);

		if (circleDistanceX > (rw / 2 + cr)) {
			return false;
		}
		if (circleDistanceY > (rw / 2 + cr)) {
			return false;
		}

		if (circleDistanceX <= (rw / 2)) {
			return true;
		}
		if (circleDistanceY <= (rw / 2)) {
			return true;
		}

		var cornerDistance_sq = Math.pow(circleDistanceX - rw / 2, 2)
				+ Math.pow(circleDistanceY - rw / 2, 2);

		return (cornerDistance_sq <= (Math.pow(cr, 2)));
	}
	this.CRcolxy = function( rx, ry, rwx, rwy) {
		var circleDistanceX = Math.abs(this.casx - rx - rwx / 2);
		var circleDistanceY = Math.abs(this.casy - ry - rwy / 2);

		if (circleDistanceX > (rwx / 2 + this.radio)) {
			return false;
		}
		if (circleDistanceY > (rwy / 2 + this.radio)) {
			return false;
		}

		if (circleDistanceX <= (rwx / 2)) {
			return true;
		}
		if (circleDistanceY <= (rwy / 2)) {
			return true;
		}

		var cornerDistance_sq = Math.pow(circleDistanceX - rwx / 2, 2)
				+ Math.pow(circleDistanceY - rwy / 2, 2);

		return (cornerDistance_sq <= (Math.pow(this.radio, 2)));
	}
	this.seleccionar = function()
	{
		this.selec=true;
	}
	this.deseleccionar = function()
	{
		this.selec=false;
	}
	this.ordena = function(tx,ty)
	{
		this.ordenmov=true;
		this.targetx=tx;
		this.targety=ty;
	}
	this.CCcol = function(x1, y1, w1) { // colision del circulo x1,y1 con radio
		// w1 con el x2,y2 con radio w2
		var xd = x1 - this.casx;
		var yd = y1 - this.casy;
		var wt = this.radio + this.vidamax + w1;
		if (this.vida > 0)
			return (xd * xd + yd * yd <= wt * wt);
	}

	this.colisonconmuro = function(alfa) {// dir: 0 ar&& Dungeon.getCell(xc,yc) != Dungeon.tileAlienriba 1 derecha, 2 abajo,
		// 3 izquierda: /////pm puntos de
		// movimiento (pixeles)
		alfa = alfa % Math.PI;
    var xc=parseInt(this.casx + 16 + (this.radio + this.vidamax) * Math.sin(this.alfa) / ancho);
    var yc=parseInt(this.casy + 16 + (this.radio + this.vidamax) * Math.cos(this.alfa) / ancho);
    

		if (Dungeon.getCell(xc,yc) >= 2 && Dungeon.getCell(xc,yc) != Dungeon.tileAlien) {

			return false;

		} else {
			return true;
		}

	}
	this.colisonconmuroy = function(alfa) {// dir: 0 arriba 1 derecha, 2 abajo,
		// 3 izquierda: /////pm puntos de
		// movimiento (pixeles)
		alfa = alfa % Math.PI;

		if (Dungeon.getCell(
				parseInt((this.casx + 16 + (this.radio + this.vidamax)
						* Math.sin(this.alfa))
						/ ancho), parseInt((this.casy + 16) / ancho)) > 1) {

			return false;

		} else {
			return true;
		}

	}
	this.colisonconmurox = function(alfa) {// dir: 0 arriba 1 derecha, 2 abajo,
		// 3 izquierda: /////pm puntos de
		// movimiento (pixeles)
		alfa = alfa % Math.PI;

		if (Dungeon.getCell(parseInt((this.casx + 16) / ancho),
				parseInt((this.casy + 16 + (this.radio + this.vidamax)
						* Math.cos(this.alfa)) / ancho)) > 1) {

			return false;

		} else {
			return true;
		}

	}
	this.colisionaconaliens = function(alfa) { // dir: 0 arriba
		// 1 derecha, 2
		// abajo, 3
		// izquierda:
		// /////pm
		// puntos de
		// movimiento
		// (pixeles)
		var col = false;
		for (a = 0; a < Dungeon.Aliens.length; a++) {

			if (Dungeon.Aliens[a].CCcol(x + Math.sin(this.alfa) * this.pm, y,
					this.radio + parseInt(this.vidamax / 2))
					&& x != this.casx && y != this.casy) {
				col = true;
				break;
			}
		}

		return col;

	}

	this.update = function() {
		// this.hazcamino(this.casx,this.casy,x,y);
		if(this.CCcol(this.targetx,this.targety,this.targetradio)){
			this.ordenmov=false;
		}
		if(!this.ordenmov){
			this.targetx=Machango.casx;
			this.targety=Machango.casy;
			this.targetradio=Machango.radio+3;
		}

		
		var fac = 1.4;
		if (this.vida > 0) {
      var colescudo=false;
      var colalien=false;
			this.alfa = Math.atan2(this.targetx - this.casx, this.targety - this.casy);
			this.giro = 10 - parseInt((this.alfa * Math.PI * fac));
/*
      for(z=0;z<8;z++){
        if(!this.colisionaconaliens(alfa)) break;
        else this.alfa+=Math.PI/4;
      }

*/




      
      if(Machango.escudo.length>0)
        if(this.CCcol(this.targetx-20, this.targety-25, Machango.escudo.radio+ancho)) colescudo=true;


			if (!this.CCcol(this.targetx, this.targety, this.targetradio) && !colescudo) {


			  if(hayvista(parseInt(this.casx/ancho),parseInt(this.casy/ancho),parseInt(this.targetx/ancho),parseInt(this.targety/ancho))){

				if (!this.colisonconmuro(alfa)) {

					this.casx = this.casx + Math.sin(this.alfa) * this.pm;
					this.casy = this.casy + Math.cos(this.alfa) * this.pm;

				} else {
					if (!this.colisonconmuroy(alfa))
						this.casx = this.casx + Math.sin(this.alfa) * this.pm;
					if (!this.colisonconmurox(alfa))
						this.casy = this.casy + Math.cos(this.alfa) * this.pm;
				}
				
			  }else{
			 	this.conta2++;
			 	if(this.conta2>=ancho*0.35){
			 			this.camino=[];
			  			this.camino=Dungeon.findPath([parseInt((this.casx +16 )/ancho),parseInt((this.casy +16)/ancho)],[parseInt((this.targetx)/ancho),parseInt((this.targety)/ancho)]);
			  			this.conta2=0;
			  	}
			 	
			 	
			 	
			  

			  if(this.camino.length>1 ){
			  		this.alfa = Math.atan2(this.camino[1][0] - this.camino[0][0], this.camino[1][1] - this.camino[0][1]);
			  	//	this.giro = 16 - parseInt((this.alfa * Math.PI * 1.1));
					this.giro = 10 - parseInt((this.alfa * Math.PI *fac));
					if(this.giro<0) this.giro=0;

			  	if (!this.colisonconmuro(alfa)) {

					this.casx = this.casx + Math.sin(this.alfa) * this.pm;
					this.casy = this.casy + Math.cos(this.alfa) * this.pm;

				} else {
					if (!this.colisonconmuroy(alfa)){
						this.casx = this.casx + Math.sin(this.alfa) * this.pm;
					}
					if (!this.colisonconmurox(alfa)){
						this.casy = this.casy + Math.cos(this.alfa) * this.pm;
					}
				}
			  		
			  }
			  	
			  	


			  }





				this.corriendo++;
				} else {
					corriendo = 0;
					Machango.vida--; // resta vida al machango

				}
			
			// mensaje="Giro:" +this.giro + " Alfa:" + this.alfa;
			this.contador++;
			if (this.contador > 100) {
				this.contador = 0;
			} else {
				this.pos = parseInt(this.contador / 10);
				if (this.pos > 2)
					this.pos = 1;
			}

			var rcolor = 250;
			var gcolor = 250;
			if (this.vida > 0 && this.vida < parseInt(this.vidamax / 2)) {
				rcolor = 250;
				gcolor = 0;
			} else {
				if (this.vida >= parseInt(this.vidamax / 2) && this.vida < 4) {
					rcolor = 255;
					gcolor = 133;
				}
			}

			if (this.vidaant != this.vida) {
				for (var i = 0; i < this.barravida.data.length; i += 8) // borra
				// la
				// barra de
				// vida
				{

					this.barravida.data[i + 0] = rcolor;
					this.barravida.data[i + 1] = gcolor;
					this.barravida.data[i + 2] = 0;
					this.barravida.data[i + 3] = 250;

					this.barravida.data[i + 4] = rcolor;
					this.barravida.data[i + 5] = gcolor;
					this.barravida.data[i + 6] = 0;
					this.barravida.data[i + 7] = 250;

				}
				aux = parseInt(this.vidamax / this.vida) * 32 - 32;

				for (var i = 0; i <= aux; i += 8) // dibuja la barra de vida
				{

					this.barravida.data[i + 0] = 0;
					this.barravida.data[i + 1] = 0;
					this.barravida.data[i + 2] = 0;
					this.barravida.data[i + 3] = 250;

					this.barravida.data[i + 4] = 0;
					this.barravida.data[i + 5] = 0;
					this.barravida.data[i + 6] = 0;
					this.barravida.data[i + 7] = 250;

				}
				this.vidaant = this.vida;

			} else {
			if(this.animm<this.animmax)
					this.animm++;
			
      }

		}
	}

 function hayvista(x0, y0, x1, y1){ //algoritmo que te crea una linea de puntos desde x0,y0 hasta x1,y1 y las guarda en camino
 // this.camino=[];
   var dx = Math.abs(x1-x0);
   var dy = Math.abs(y1-y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx-dy;
   var pox=0;
   var poy=0;
   var e2 = 2*err;
   if (e2 >-dy){ pox=sx;}
   if (e2 < dx){ poy=sy;}
  	var vista=true;
  
  //mensaje="Orcopos("+orcopos+"),("+pox+", "+poy+")";
  while(true){
  
  //this.camino.push([x0, y0,pox,poy]); pox=poy=0;
  
  if(Dungeon.getCell(x0,y0)<2){
  	vista=false;
  	break;
  } 

  if ((x0==x1) && (y0==y1)) break;
   var e2 = 2*err;
    if (e2 >-dy){
     err -= dy;
     x0 += sx;
   //  pox=sx;
 	}
 	if (e2 < dx){
 	  	err += dx;
 	  	y0 += sy;
 	  //	poy=sy;
  	}
   }
   return vista;
  }






	this.render = function() {
		if (this.vida > 0) {

			if (this.giro < 0)
				this.giro = 0;
			if (this.corriendo == 0) {

				if (this.giro < 10) {
					ctx.drawImage(this.img, 17 + ancho * this.giro, 15 + ancho
							* (this.pos), ancho - 20,
							ancho - 20, this.casx - this.vidamax,
							this.casy - this.vidamax, this.anchospr
									+ this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);
					if(this.selec)
					ctx.drawImage(this.img, 20 + ancho * 17, 20 + ancho
							* (12), ancho - 20,
							ancho - 20, this.casx - this.vidamax,
							this.casy - this.vidamax, this.anchospr
									+ this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);
				} else {
					if (this.giro > 19)
						this.giro = 19;
					//this.giro++;

					ctx.save();
					ctx.scale(-1.0, 1.0);
					ctx.drawImage(this.img, 12 + ancho * (19 - this.giro), 15
							+ ancho * (this.pos), ancho - 20,
							ancho - 20, -this.casx - this.vidamax
									- ancho / 2 - 10, this.casy - this.vidamax,
							this.anchospr + this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);
					if(this.selec)
					ctx.drawImage(this.img, 15 + ancho * (17), 20
							+ ancho * (12), ancho - 20,
							ancho - 20, -this.casx - this.vidamax
									- ancho / 2 - 10, this.casy - this.vidamax,
							this.anchospr + this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);

					ctx.restore();
					kk = 33 - this.giro;
					// mensaje="("+parseInt((this.casx+25)/ancho)+",
					// "+parseInt((this.casy+25)/ancho)+")";
				}
			} else {
				if (this.giro < 10) {
					ctx.drawImage(this.img, 17 + ancho * this.giro, 15 + ancho
							* (this.corriendo % 8 + 4), ancho - 20,
							ancho - 20, this.casx - this.vidamax,
							this.casy - this.vidamax, this.anchospr
									+ this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);
					if(this.selec)
					ctx.drawImage(this.img, 20 + ancho * 17, 20 + ancho
							* (12), ancho - 20,
							ancho - 20, this.casx - this.vidamax,
							this.casy - this.vidamax, this.anchospr
									+ this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);
				} else {
					if (this.giro > 19)
						this.giro = 19;
					//this.giro++;

					ctx.save();
					ctx.scale(-1.0, 1.0);
					ctx.drawImage(this.img, 12 + ancho * (19 - this.giro), 15
							+ ancho * (this.corriendo % 8 + 4),
							ancho - 20, ancho - 20, -this.casx
									- this.vidamax - ancho / 2 - 10, this.casy
									- this.vidamax, this.anchospr
									+ this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);
					if(this.selec)
					ctx.drawImage(this.img, 15 + ancho * (17), 20
							+ ancho * (12),
							ancho - 20, ancho - 20, -this.casx
									- this.vidamax - ancho / 2 - 10, this.casy
									- this.vidamax, this.anchospr
									+ this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);

					ctx.restore();
					kk = 33 - this.giro;
					// mensaje="("+parseInt((this.casx+25)/ancho)+",
					// "+parseInt((this.casy+25)/ancho)+")";
				}
			}
			ctx.putImageData(this.barravida, 32 + this.casx - this.targetx
					+ canvas.width / 2, this.casy - this.targety
					+ canvas.height / 2); // dibuja la barra de vida

		} else {

			var i = parseInt((this.contador % 16) / 4);
			var j = parseInt(this.contador / 4) % 4;

			ctx.drawImage(blood, ancho * i, ancho * j, ancho, ancho, this.casx
					- this.vidamax - 20, this.casy - this.vidamax - 10,
					ancho, ancho);
			if(this.selec)
			ctx.drawImage(this.img, 20 + ancho * this.animm, 20 + ancho * (12),
					ancho - 20, ancho - 20, this.casx
							- this.vidamax, this.casy - this.vidamax,
					this.anchospr + this.vidamax * 2, this.anchospr
							+ this.vidamax * 2);
		}
	}
}