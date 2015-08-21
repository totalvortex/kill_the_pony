function item(x,y,ti,sprt){
  
	this.casx=x*ancho+ancho/4;
	this.casy=y*ancho+ancho/4;
	this.tipo=ti; //tipo
	this.img=sprt;
  this.radio=ancho/2;
  this.activo=true;
 
	
	this.CCcol = function(x1, y1, w1) { // colision del circulo x1,y1 con radio
                    // w1 con el x2,y2 con radio w2
    var xd = x1 - this.casx;
    var yd = y1 - this.casy;
    var wt = this.radio + w1;
    return (xd * xd + yd * yd <= wt * wt);
  }

this.update=function (){
    
}


this.render=function(){
  if(this.activo)
		ctx.drawImage(this.img,0,0,this.img.width,this.img.height,this.casx,this.casy,ancho/2,ancho/2);
	
}

	
}