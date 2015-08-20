function Bala(x,y,ra,sprt,avance,angulo){
	this.casx=x+(3+avance*Math.sin(angulo));
	this.casy=y+(3+avance*Math.cos(angulo));
	this.contador=0;
	this.img=sprt;
	this.anchospr=64;
	this.av=avance;
	this.alfa=angulo;
	this.radio=ra;
	this.activo=true;




this.colisionconmuro=function(alfa){//dir: 0 arriba 1 derecha, 2 abajo, 3 izquierda:      /////pm puntos de movimiento (pixeles)
  alfa=alfa%Math.PI;
  
      if(Dungeon.getCell(parseInt((this.casx+this.av+this.radio*Math.sin(this.alfa))/ancho),parseInt((this.casy+this.av+this.radio*Math.cos(this.alfa))/ancho))>1){
       // && Dungeon.getCell(parseInt((this.casx+this.av+this.radio*Math.sin(this.alfa))/ancho),parseInt((this.casy+this.av+this.radio*Math.cos(this.alfa))/ancho))!=Dungeon.tileAlien) {
                   
           return  false;
         
         }
         else{
          return true;
         } 
 

  

}


this.update=function (){
    if(this.activo){
	this.contador++;
	 var col=false;
         
       if(!this.colisionconmuro(alfa)) {
            this.casx=this.casx+Math.sin(this.alfa)*this.av;
   			this.casy=this.casy+Math.cos(this.alfa)*this.av;
   		
       }else{
       	this.activo=false;
       }
      // }
     //  }
   }
}


this.render=function(){
	if(this.activo){
		//alert("render");
		ctx.drawImage(this.img,0,0,this.anchospr,this.anchospr,this.casx,this.casy,this.radio,this.radio);
	}
}

	
}