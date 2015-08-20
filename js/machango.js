
var Machango = { //clase para el personaje
  casx : 0,
  casy : 0,
  contador : 0,
  contadorquieto : 0,
  disparando : false,
  pos : 0,
  alfa : 0.0,
  giro : 0,
  machangopaso : 0,
  mov :false,
  machangoimgReady : false,
  machangoimg : new Image(),
  anchospr: ancho,
  rafaga: 23,
  radio: 16,
  cosa : 0,
  vida : 100,

  creamachango: function ( inx,  iny,  sprite, anchos) {

    this.machangoimg = sprite;
    this.casx = inx*ancho;
    this.casy = iny*ancho;
    this.anchospr=anchos;
  },

  update: function (){
    if(this.vida>0){
    if(!this.mov){
      this.contadorquieto++;
      if(this.contadorquieto>100){
        this.contadorquieto=0;
      }else{
        this.pos=parseInt(this.contadorquieto/10);
        if(this.pos>2) this.pos=1;
      }
      this.alfa=Math.atan2(Dungeon.mpos.x-canvas.height/2-8,Dungeon.mpos.y-canvas.width/2-8);
      this.giro=16-parseInt((this.alfa*Math.PI*1.9));
      this.cosa=13-parseInt((this.alfa*180/Math.PI)/13);
    }
    else {
      this.contadorquieto=0;
      this.contador++;
      if(this.contador>8){
        this.contador=0;
      }
    }
  }
  },

  render: function(){
    if(this.vida>0){
    if(!this.mov){
      if(this.disparando){

        this.pos=3-this.contadorquieto%2;
        }
        if(this.giro<0) this.giro=0;

        if(this.giro<16){
          ctx.drawImage(this.machangoimg,16+ancho*this.giro,16+ancho*(this.pos),this.anchospr-16,this.anchospr-16,this.casx,this.casy,this.anchospr,this.anchospr);
        }else{
          if(this.giro>30) this.giro=30;
          this.giro++;

          ctx.save();
          ctx.scale(-1.0,1.0);
          ctx.drawImage(this.machangoimg,
              16+ancho*(33-this.giro),16+ancho*(this.pos),
              this.anchospr-16,this.anchospr-16,
              -this.casx-ancho/2-10,this.casy,
              this.anchospr,this.anchospr);

          ctx.restore();
          kk=33-this.giro;
        }

      }
      else{
        if(this.pos<0){
          ctx.save();
          ctx.scale(-1.0,1.0);
          ctx.drawImage(this.machangoimg,16+ancho*(-this.pos),16+ancho*(this.contador+4),this.anchospr-16,this.anchospr-16,-ancho/2-8-this.casx,this.casy,this.anchospr,this.anchospr);
          ctx.restore();
        }
        else{


          ctx.drawImage(this.machangoimg,16+ancho*this.pos,16+ancho*(this.contador+4),this.anchospr-16,this.anchospr-16,this.casx,this.casy,this.anchospr,this.anchospr);
        }
        this.disparando=false;
      }
    }
    else{
    if (this.vida > -6){
      ctx.drawImage(this.machangoimg,16-ancho*this.vida,16+ancho*13,this.anchospr-16,this.anchospr-16,this.casx,this.casy,this.anchospr,this.anchospr);
    }
    else{
       ctx.drawImage(this.machangoimg,16+ancho*7,16+ancho*13,this.anchospr-16,this.anchospr-16,this.casx,this.casy,this.anchospr,this.anchospr);
     }
    }
  }
}