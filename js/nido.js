function Nido(x,y,sprt,freq){

	this.casx=x*ancho;
	this.casy=y*ancho;
	this.contador=0;
	this.img=sprt;
	this.anchospr=anchocuadro;
	this.freq=freq;

this.update=function (){
	this.contador++;
	if(this.contador%this.freq==this.freq-1){
		this.reproducir();
	}
}
this.render=function(){
	ctx.drawImage(this.img,0,0,this.anchospr,this.anchospr,this.casx,this.casy,this.anchospr,this.anchospr);
}

	this.reproducir=function (){
		if(Dungeon.Aliens.length>maxaliens) Dungeon.Aliens.pop();
		Dungeon.Aliens.push(new Alien(parseInt(this.casx/this.anchospr), parseInt(this.casy/this.anchospr),15, zerg,ancho));
	}
}