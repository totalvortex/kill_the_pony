function Bala(x,y,ra,sprt,avance,angulo){
	this.casx=x*ancho;
	this.casy=y*ancho;
	this.contador=0;
	this.img=sprt;
	this.anchospr=64;
	this.av=avance;
	this.alfa=angulo;
	this.radio=ra;
	this.activo=true;

this.update=function (){
    if(this.activo){
	this.contador++;
	 var col=false;
     for(a=0;a<Dungeon.Aliens.length;a++){
 
      
        if(Dungeon.Aliens[a].CCcol(this.casx,this.casy,this.radio) && Dungeon.Aliens[a].colisonconmuro(alfa)) {
            this.casx=this.casx+Math.sin(this.alfa)*this.av;
   			this.casy=this.casy+Math.cos(this.alfa)*this.av;
            break;
         }
         else{
         	this.activo=false;
         	break;
         }
       }
   }
},


this.render=function(){
	if(this.activo){
		ctx.drawImage(this.img,0,0,this.anchospr,this.anchospr,this.casx,this.casy,this.radio+avance,this.radio+avance);
	}
}

	
}