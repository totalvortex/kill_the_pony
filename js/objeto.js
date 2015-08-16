var Objeto = { //clase para los objetos del mapa
	casx : 0,
	casy : 0,
	radio : 0,
 	 img : new Image(),
 	 anchospr: 0,
 	 contador : 0,
 	 pos: 0,
 	 giro: 0,
 	 alfa: 0,
 	 corriendo : 0,
 	 camino : [],
	creaobjeto(x,y,r,sp,anc){
		this.casx=x*ancho+ancho/8+3;
		this.casy=y*ancho+ancho/8;
		this.radio=r;
		this.img=sp;
		this.anchospr=anc;
		this.contador=0;
		this.pos=0;
		this.giro=0;
		this.alfa=0;
		this.corriendo++;
		return this;
	},

	CCcol:function (x1, y1, w1, x2, y2, w2) { //colision del circulo x1,y1 con radio w1 con el x2,y2 con radio w2
  	  var xd = x1 - x2;
  	  var yd = y1 - y2;
  	  var wt = w2 + w1;
  	  return (xd * xd + yd * yd <= wt * wt);
	},

 update: function (x,y,radio){
 	//this.hazcamino(this.casx,this.casy,x,y);

	  this.alfa=Math.atan2(x-this.casx,y-this.casy);
      this.giro=16-parseInt((this.alfa*Math.PI*1.9));
      if(!this.CCcol(x,y,radio,this.casx,this.casy,this.radio)){
      	this.casx=this.casx+Math.sin(this.alfa)*1.8;
    	this.casy=this.casy+Math.cos(this.alfa)*1.8;
    	this.corriendo++;
     }
     else corriendo=0;

	//mensaje="Giro:" +this.giro + " Alfa:" + this.alfa;
	  this.contador++;
      if(this.contador>100){
        this.contador=0;
      }else{
        this.pos=parseInt(this.contador/10);
        if(this.pos>2) this.pos=1;
      }
    

 },

render:function (){

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



      //  ctx.drawImage(this.img,0,0,this.anchospr,this.anchospr,this.casx,this.casy,this.anchospr,this.anchospr);
        //ctx.drawImage(this.img,20,(this.pos*this.anchospr)+20,this.anchospr-20,this.anchospr-20,this.casx,this.casy,this.anchospr,this.anchospr);


	}
}