var Objeto = { //clase para los objetos del mapa
	casx : 0,
	casy : 0,
	radio : 0,
	 imgready : false,
 	 img : new Image(),
 	 anchospr: 0,
	creaobjeto(x,y,r,sp,anc){
		this.casx=x*ancho;
		this.casy=y*ancho;
		this.radio=r;
		this.img=sp;
		this.anchospr=anc;
		return this;
	},

	CCcol:function (x1, y1, w1, x2, y2, w2) { //colision del circulo x1,y1 con radio w1 con el x2,y2 con radio w2
  	  var xd = x1 - x2;
  	  var yd = y1 - y2;
  	  var wt = w2 + w1;
  	  return (xd * xd + yd * yd <= wt * wt);
	},

	render:function (){

        ctx.drawImage(this.img,this.casx,this.casy,this.anchospr,this.anchospr);

	}
}