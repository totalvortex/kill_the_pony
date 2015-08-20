function Alien(x,y,r,sp,anc){
		this.casx=x*ancho+ancho/8+3;
		this.casy=y*ancho+ancho/8;
		this.radio=r;
		this.img=sp;
		this.anchospr=anc;
		this.contador=0;
		this.pos=0;
		this.giro=0;
		this.alfa=0;
		this.corriendo=0;
    this.animm=0;
		this.pm=1.5;
    this.vida=1;
    this.vidamax=1;
    this.barravida=ctx.createImageData(2,16);

    

	this.CRcol=function (cx,cy,cr,rx,ry,rw) {
   var circleDistanceX = Math.abs(cx - rx - rw/2);
   var circleDistanceY = Math.abs(cy - ry - rw/2);
 
   if (circleDistanceX > (rw/2 + cr)) { return false; }
   if (circleDistanceY > (rw/2 + cr)) { return false; }
 
   if (circleDistanceX <= (rw/2)) { return true; }
   if (circleDistanceY <= (rw/2)) { return true; }
 
   var cornerDistance_sq = Math.pow(circleDistanceX - rw/2, 2) + Math.pow(circleDistanceY - rw/2, 2);
 
   return (cornerDistance_sq <= (Math.pow(cr, 2)));
}

	this.CCcol=function(x1, y1, w1) { //colision del circulo x1,y1 con radio w1 con el x2,y2 con radio w2
  	  var xd = x1 - this.casx;
  	  var yd = y1 - this.casy;
  	  var wt = this.radio + w1;
  	  if(this.vida>0) return (xd * xd + yd * yd <= wt * wt);
	}

this.colisonconmuro=function(alfa){//dir: 0 arriba 1 derecha, 2 abajo, 3 izquierda:      /////pm puntos de movimiento (pixeles)
  alfa=alfa%Math.PI;
  
      if(Dungeon.getCell(parseInt((this.casx+16+this.radio*Math.sin(this.alfa))/ancho),parseInt((this.casy+16+this.radio*Math.cos(this.alfa))/ancho))>1
        && Dungeon.getCell(parseInt((this.casx+16+this.radio*Math.sin(this.alfa))/ancho),parseInt((this.casy+16+this.radio*Math.cos(this.alfa))/ancho))!=Dungeon.tileAlien) {
                   
           return  false;
         
         }
         else{
          return true;
         } 
 

  

}
this.colisonconmuroy=function(alfa){//dir: 0 arriba 1 derecha, 2 abajo, 3 izquierda:      /////pm puntos de movimiento (pixeles)
  alfa=alfa%Math.PI;
  
      if(Dungeon.getCell(parseInt((this.casx+16+this.radio*Math.sin(this.alfa))/ancho),parseInt((this.casy+16)/ancho))>1){
     
           return  false;
         
         }
         else{
          return true;
         } 
 

  

}
this.colisonconmurox=function(alfa){//dir: 0 arriba 1 derecha, 2 abajo, 3 izquierda:      /////pm puntos de movimiento (pixeles)
  alfa=alfa%Math.PI;
  
      if(Dungeon.getCell(parseInt((this.casx+16)/ancho),parseInt((this.casy+16+this.radio*Math.cos(this.alfa))/ancho))>1){
      
           return  false;
         
      }
      else{
          return true;
      } 
      
 

  

}
 this.colisionaconaliens=function(x,y,radio,dir,pm){ //dir: 0 arriba 1 derecha, 2 abajo, 3 izquierda:      /////pm puntos de movimiento (pixeles)
  var col=false;
  for(a=0;a<Dungeon.Aliens.length;a++){
 
      
        if(Dungeon.Aliens[a].CCcol(x,y,radio)) {
           col=true;
           break;
         }
       }

return col;

}




 this.update=function (x,y,radio,pm){
 	//this.hazcamino(this.casx,this.casy,x,y);
  if(this.vida>0){
	  this.alfa=Math.atan2(x-this.casx,y-this.casy);
      this.giro=16-parseInt((this.alfa*Math.PI*1.9));
      if(!this.CCcol(x,y,radio)){


        if(!this.colisonconmuro(alfa)){ //&& !this.colisionaconaliens(this.casx,this.casy,this.radio,this.alfa)){

         this.casx=this.casx+Math.sin(this.alfa)*this.pm;
    	   this.casy=this.casy+Math.cos(this.alfa)*this.pm;
        

    	   
        }else{
          if(!this.colisonconmuroy(alfa)) this.casx=this.casx+Math.sin(this.alfa)*this.pm;
          if(!this.colisonconmurox(alfa))this.casy=this.casy+Math.cos(this.alfa)*this.pm;
        }
        this.corriendo++;
     }
     else {
      corriendo=0;
      Machango.vida--;

    }

	//mensaje="Giro:" +this.giro + " Alfa:" + this.alfa;
	  this.contador++;
      if(this.contador>100){
        this.contador=0;
      }else{
        this.pos=parseInt(this.contador/10);
        if(this.pos>2) this.pos=1;
      }


      for (var i=0;i<this.barravida.data.length;i+=8) //borra la barra de vida
       {

          this.barravida.data[i+0]=250;
          this.barravida.data[i+1]=0;
          this.barravida.data[i+2]=0;
          this.barravida.data[i+3]=250;
          this.barravida.data[i+4]=250;
          this.barravida.data[i+5]=0;
          this.barravida.data[i+6]=0;
          this.barravida.data[i+7]=250;
    
       }
        aux=parseInt(this.vidamax/this.vida)*32-32;




      for (var i=0;i<=aux;i+=8)  //dibuja la barra de vida
       {

          this.barravida.data[i+0]=0;
          this.barravida.data[i+1]=0;
          this.barravida.data[i+2]=0;
          this.barravida.data[i+3]=250;
          this.barravida.data[i+4]=0;
          this.barravida.data[i+5]=0;
          this.barravida.data[i+6]=0;
          this.barravida.data[i+7]=250;
    
       }
    
}
else{
if(this.animm<8)this.animm++;
 }




}

this.scaleImageData=function (imageData, scale) {
    var scaled = ctx.createImageData(imageData.width * scale, imageData.height * scale);
    var subLine = ctx.createImageData(scale, 1).data
    for (var row = 0; row < imageData.height; row++) {
        for (var col = 0; col < imageData.width; col++) {
            var sourcePixel = imageData.data.subarray(
                (row * imageData.width + col) * 4,
                (row * imageData.width + col) * 4 + 4
            );
            for (var x = 0; x < scale; x++) subLine.set(sourcePixel, x*4)
            for (var y = 0; y < scale; y++) {
                var destRow = row * scale + y;
                var destCol = col * scale;
                scaled.data.set(subLine, (destRow * scaled.width + destCol) * 4)
            }
        }
    }

    return scaled;
}

this.render=function(){
if(this.vida>0){
	if(this.giro<0) this.giro=0;
	if(this.corriendo==0){
		
		if(this.giro<16){
			ctx.drawImage(this.img,20+ancho*this.giro,20+ancho*(this.pos),this.anchospr-20,this.anchospr-20,this.casx,this.casy,this.anchospr,this.anchospr);
		}else{
  	      if(this.giro>30) this.giro=30;
 	       this.giro++;

  	       ctx.save();
  	       ctx.scale(-1.0,1.0);
  	       ctx.drawImage(this.img,
            20+ancho*(33-this.giro),20+ancho*(this.pos),
            this.anchospr-20,this.anchospr-20,
            -this.casx-ancho/2-10,this.casy,
            this.anchospr,this.anchospr);

           ctx.restore();
           kk=33-this.giro;
        //mensaje="("+parseInt((this.casx+25)/ancho)+", "+parseInt((this.casy+25)/ancho)+")";
      }
    }else{
    	if(this.giro<16){
			ctx.drawImage(this.img,20+ancho*this.giro,20+ancho*(this.corriendo%8+4),this.anchospr-20,this.anchospr-20,this.casx,this.casy,this.anchospr,this.anchospr);
		}else{
  	      if(this.giro>30) this.giro=30;
 	       this.giro++;

  	       ctx.save();
  	       ctx.scale(-1.0,1.0);
  	       ctx.drawImage(this.img,
            20+ancho*(33-this.giro),20+ancho*(this.corriendo%8+4),
            this.anchospr-20,this.anchospr-20,
            -this.casx-ancho/2-10,this.casy,
            this.anchospr,this.anchospr);

           ctx.restore();
           kk=33-this.giro;
        //mensaje="("+parseInt((this.casx+25)/ancho)+", "+parseInt((this.casy+25)/ancho)+")";
      }
    }
    ctx.putImageData(this.barravida,32+this.casx-Machango.casx+canvas.width/2,this.casy-Machango.casy+canvas.height/2); //dibuja la barra de vida
   
     
	
}
else{
  ctx.drawImage(this.img,20+ancho*this.animm,20+ancho*(13),this.anchospr-20,this.anchospr-20,this.casx,this.casy,this.anchospr,this.anchospr);
}
}
}