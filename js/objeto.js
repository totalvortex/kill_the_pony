var Objeto = { //clase para los objetos del mapa
	casx : 0,
	casy : 0,
	radio : 0,
 	 img : new Image(),
 	 anchospr: 0,
 	 contador : 0,
 	 pos: 0,
	creaobjeto(x,y,r,sp,anc){
		this.casx=x*ancho+ancho/8+3;
		this.casy=y*ancho+ancho/8;
		this.radio=r;
		this.img=sp;
		this.anchospr=anc;
		this.contador=0;
		this.pos=0;
		return this;
	},

	CCcol:function (x1, y1, w1, x2, y2, w2) { //colision del circulo x1,y1 con radio w1 con el x2,y2 con radio w2
  	  var xd = x1 - x2;
  	  var yd = y1 - y2;
  	  var wt = w2 + w1;
  	  return (xd * xd + yd * yd <= wt * wt);
	},

 update: function (){
	this.contador++;
      if(this.contador>100){
        this.contador=0;
      }else{
        this.pos=parseInt(this.contador/10);
        if(this.pos>2) this.pos=1;
      }
 },



	render:function (){

      //  ctx.drawImage(this.img,0,0,this.anchospr,this.anchospr,this.casx,this.casy,this.anchospr,this.anchospr);
        ctx.drawImage(this.img,20,(this.pos*this.anchospr)+20,this.anchospr-20,this.anchospr-20,this.casx,this.casy,this.anchospr,this.anchospr);


	}
}