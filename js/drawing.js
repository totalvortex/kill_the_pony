
function getmp(canvas, evt) {

  return {
    x:  evt.clientX - 10,
    y:  evt.clientY - 10
  };
}

addEventListener('mousemove', function(evt) { //funcion para los eventos de mover ratón
    Dungeon.mpos = getmp(canvas, evt);

}, false);

addEventListener('click', function(evt) { //funcion para los eventos click del ratón
    Machango.disparando=!Machango.disparando;
    var p=getmp(canvas,evt);
    if(Dungeon.Aliens.length>0)
    for(a=0;a<Dungeon.Aliens.length;a++){
      if(Dungeon.Aliens[a].CCcol((p.x-24+Machango.casx-canvas.width/2),(p.y-24+Machango.casy-canvas.height/2),3)) {
        Dungeon.Aliens[a].vida--;
      //  mensaje="("+Dungeon.Aliens[a].casx+","+Dungeon.Aliens[a].casy+"), click en ("+(p.x-24+Machango.casx-canvas.width/2)+","+(p.y-24+Machango.casy-canvas.height/2)+")";
        break;
        }
      //  mensaje = "";
    }


  }, false);

addEventListener("keydown", function (e) { //funcion que mete en keysDown[] las teclas pulsadas en el frame

  keysDown[e.keyCode] = true;
  }, false);

addEventListener("keyup", function (e) {
  delete keysDown[e.keyCode];

}, false);

function colmuro(f,x0,y0,rx,ry) { //colisiones de un cuadrado situado en x0,y0 de ancho f con un circulo rx,ry con radio Machango.sprite
  var circleDistanceX = Math.abs(x0 - rx - f);
  var circleDistanceY = Math.abs(y0 - ry - f);

  if (circleDistanceX > (f + Machango.radio)) { return false; }
  if (circleDistanceY > (f + Machango.radio)) { return false; }

  if (circleDistanceX <= (f)) { return true; }
  if (circleDistanceY <= (f)) { return true; }

  var cornerDistance_sq = Math.pow(circleDistanceX - f, 2) + Math.pow(circleDistanceY - f, 2);

  return (cornerDistance_sq <= (Math.pow(Machango.radio, 2)));
}

function update () //actualiza las variables antes del render
{
  var up,down,left,right;
  if (40 in keysDown) { // Player holding down
    if(Machango.casy > 0 && Machango.casy < Dungeon.ysize * ancho &&Dungeon.getCell(parseInt((Machango.casx)/ancho),parseInt((Machango.casy-10-pm-1)/ancho)+1)!=Dungeon.tileDirtWall
     // && !Cujo.CCcol(Machango.casx,Machango.casy+pm,Machango.radio,Cujo.casx,Cujo.casy,Cujo.radio)){
      && !colisionaconaliens(Machango.casx,Machango.casy,Machango.radio,2,pm)){
      mensaje="Nivel: " +Dungeon.level+"("+parseInt(Machango.casx/ancho)+","+parseInt(Machango.casy/ancho)+"):"+Dungeon.getCell(parseInt(Machango.casx/(ancho)), parseInt(Machango.casy/(ancho)));

      Machango.casy=Machango.casy+pm;
      ctx.translate(0,+mapy);
        mapy=Machango.casy-parseInt(canvas.height/2);//mapy+2;
        ctx.translate(0,-mapy);



        up=true;
      }
      else{
        up=false;
      }

    }
  if (38 in keysDown) { // Player holding up
    if(Machango.casy > 0 && Machango.casy < Dungeon.ysize * ancho && Dungeon.getCell(parseInt((Machango.casx)/ancho),parseInt((Machango.casy-(pm+1))/ancho))!=Dungeon.tileDirtWall
        //    && !Cujo.CCcol(Machango.casx,Machango.casy-pm,Machango.radio,Cujo.casx,Cujo.casy,Cujo.radio)){
    && !colisionaconaliens(Machango.casx,Machango.casy,Machango.radio,0,pm)){
      //  if(colmuro(parseInt((Machango.casx+25)/ancho),parseInt((Machango.casy+25)/ancho)-pm,parseInt((Machango.casx+25)/ancho),parseInt((Machango.casy+25)/ancho))+1){

        mensaje="Nivel: " +Dungeon.level+"("+parseInt(Machango.casx/ancho)+","+parseInt(Machango.casy/ancho)+"):"+Dungeon.getCell(parseInt(Machango.casx/(ancho)), parseInt(Machango.casy/(ancho)));

        Machango.casy=Machango.casy-pm;
        ctx.translate(0,+mapy);
        mapy=Machango.casy-parseInt(canvas.height/2);//mapy-2;
        ctx.translate(0,-mapy);

    /*  }
      else{
        //alert("col");
      }*/
      down=true;

    }
    else{
      down=false;
    }

  }
  if (37 in keysDown) { // Player holding left
    if(Machango.casx > 0 && Machango.casx < Dungeon.xsize * ancho && Dungeon.getCell(parseInt((Machango.casx-(pm+1))/ancho),parseInt((Machango.casy)/ancho))!=Dungeon.tileDirtWall
           // && !Cujo.CCcol(Machango.casx-pm,Machango.casy,Machango.radio,Cujo.casx,Cujo.casy,Cujo.radio)){
    && !colisionaconaliens(Machango.casx,Machango.casy,Machango.radio,1,pm)){
    //  if(colmuro(parseInt((Machango.casx+25)/ancho)-pm,parseInt((Machango.casy+25)/ancho),parseInt((Machango.casx+25)/ancho)-1,parseInt((Machango.casy+25)/ancho))){

      mensaje="Nivel: " +Dungeon.level+"("+parseInt(Machango.casx/ancho)+","+parseInt(Machango.casy/ancho)+"):"+Dungeon.getCell(parseInt(Machango.casx/(ancho)), parseInt(Machango.casy/(ancho)));


      Machango.casx=Machango.casx-pm;
      ctx.translate(+mapx,0);
        mapx=Machango.casx-parseInt(canvas.width/2);//mapx-2;
        ctx.translate(-mapx,0);


        /*  }}
      else{
        //alert("col");
      }*/
      left=true;

    }
    else{
      left=false;
    }

  }
  if (39 in keysDown) { // Player holding right
    if(Machango.casx > 0 && Machango.casx < Dungeon.xsize * ancho && Dungeon.getCell(parseInt((Machango.casx-16+(pm+1))/ancho)+1,parseInt((Machango.casy)/ancho))!=Dungeon.tileDirtWall
      // && !Cujo.CCcol(Machango.casx+pm,Machango.casy,Machango.radio,Cujo.casx,Cujo.casy,Cujo.radio)){
      && !colisionaconaliens(Machango.casx,Machango.casy,Machango.radio,3,pm)){
      mensaje="Nivel: " +Dungeon.level+"("+parseInt(Machango.casx/ancho)+","+parseInt(Machango.casy/ancho)+"):"+Dungeon.getCell(parseInt(Machango.casx/(ancho)), parseInt(Machango.casy/(ancho)));


      Machango.casx=Machango.casx+pm;
      ctx.translate(+mapx,0);
        mapx=Machango.casx-parseInt(canvas.width/2);//mapx+2;
        ctx.translate(-mapx,0);


    /*  }
      else{
        //alert("col");
      }*/
      right=true;
    }
    else{
      right=false;
    }

  }
  Machango.mov=(up||down||left||right);
  Dungeon.ver(parseInt(Machango.casx/ancho),parseInt((Machango.casy)/ancho));//   mensaje="("+(parseInt(Machango.casx/(ancho*2))+25)+", "+(parseInt(Machango.casy/(ancho*2))+25)+"): "+Dungeon.getCell(parseInt(Machango.casx/(ancho*2))+25, parseInt(Machango.casy/(ancho*2))+25);

  //posicion del tanque segun movimiento
  if(up && !left && !right) Machango.pos=16;
  if(up && right) Machango.pos=12;
  if(right && !up && !down) Machango.pos=8;
  if(right && down) Machango.pos=4;
  if(down && !left && !right)  Machango.pos=0;
  if(down && left)  Machango.pos=-4;
  if(left && !up && !down)  Machango.pos=-8;
  if(up && left) Machango.pos=-12;



  xmin=parseInt(Machango.casx/ancho)-parseInt((canvas.width/2)/ancho);
  xmax=parseInt(Machango.casx/ancho)+parseInt((canvas.width/2)/ancho);
  ymin=parseInt(Machango.casy/ancho)-parseInt((canvas.height/2)/ancho);
  ymax=parseInt(Machango.casy/ancho)+parseInt((canvas.height/2)/ancho);

  if (48 in keysDown) { // Player holding 0
    escala = 1.0;
    ctx.translate(-mapx,-mapy);
    mapx=parseInt((ancho*Dungeon.xsize)/2)-parseInt(canvas.width/2);
    mapy=parseInt((ancho*Dungeon.ysize)/2)-parseInt(canvas.height/2);
    ctx.translate(mapx,mapy);
    ctx.scale(1.0,1.0);
    ancho=anchocuadro;
    //Dungeon.visible = [];
    //for(x=0;x<Dungeon.xsize*Dungeon.ysize;x++){
    //   Dungeon.visible.push(true);
    // }
    //mapx=0;
    //mapy=0;
    //alert("borrada de 0");
  }


  if (49 in keysDown) { // Player holding 1
    if(escala>0) escala=1.0;
    escala -= 0.1;
    ctx.scale(escala,escala);
    ancho-= 0.1;

  }
  if (50 in keysDown) { // Player holding 2
    if(escala<0) escala=1.0;
    escala += 0.1;
    ctx.scale(escala,escala);
    ancho+= 0.1;
  }
  //mensaje="("+mapx+", "+mapy+")";

  if (86 in keysDown) { // Player holding "v"
    for(x=0;x<Dungeon.xsize;x++){
      for(y=0;y<Dungeon.ysize;y++)
        Dungeon.setv(x , y);
    }
  }
  if (87 in keysDown) { // Player holding "w"
    this.reboot();


  }
if(Dungeon.spawner.length>0)
  for(a=0;a<Dungeon.spawner.length;a++){
    Dungeon.spawner[a].update();
   }

  Machango.update();
   if(Dungeon.Aliens.length>0)
    for(a=0;a<Dungeon.Aliens.length;a++){

   Dungeon.Aliens[a].update(Machango.casx,Machango.casy,Machango.radio,pm);
   }





   //salida
  if(Dungeon.getCell(parseInt((Machango.casx+16)/ancho),parseInt((Machango.casy+16)/ancho))==Dungeon.tileExit){
    this.reboot();

  }
}

function reboot(){
  delta=3000;

      Dungeon.borrar();
     ctx.translate(mapx,mapy);
     var lev=Dungeon.level+4;
   while(Dungeon.nh<lev && !Dungeon.puerta){ //genera el dungeon hasta que las habitaciones sea mayor que level
    rooms=Dungeon.createDungeon(64,64,lev);
  }
      rooms=Dungeon.createDungeon(64,64,Dungeon.level);
    mensaje ="LEVEL "+ Dungeon.level;
      Dungeon.iniciamapa(64,64);

      Machango.creamachango(hx,hy,marinez,48);

      Dungeon.setCell(Dungeon.exitx,Dungeon.exity,Dungeon.tileExit);

      mapx=Machango.casx-parseInt(canvas.width/2);//mapy+2;
      mapy=Machango.casy-parseInt(canvas.height/2);//mapy+2;
      ctx.translate(-mapx,-mapy);
}




function colisionaconaliens(x,y,radio,dir,pm){ //dir: 0 arriba 1 derecha, 2 abajo, 3 izquierda:      /////pm puntos de movimiento (pixeles)
  var col=false;
  for(a=0;a<Dungeon.Aliens.length;a++){
    switch(dir){
      case 0:
      {
        if(Dungeon.Aliens[a].CCcol(Machango.casx,Machango.casy-pm,Machango.radio)) {
           col=true;
           break;
         }

      }
      case 1:
      {
        if(Dungeon.Aliens[a].CCcol(Machango.casx+pm,Machango.casy,Machango.radio)) {
           col=true;
           break;
         }

      }
      case 2:
      {
        if(Dungeon.Aliens[a].CCcol(Machango.casx,Machango.casy+pm,Machango.radio)) {
           col=true;
           break;
         }

      }
      case 3:
      {
        if(Dungeon.Aliens[a].CCcol(Machango.casx-pm,Machango.casy,Machango.radio)) {
           col=true;
           break;
         }

      }
      default:
      {
        if(Dungeon.Aliens[a].CCcol(Machango.casx,Machango.casy,Machango.radio+pm)) {
           col=true;
           break;
         }

      }
    }

  }

return col;

}


function dibujasuelo() //dibuja el suelo
{
  if(ymin<0) ymin=0;
  if(xmin<0) xmin=0;
  if(xmax>Dungeon.xsize) xmax=Dungeon.xsize;
  if(ymax>Dungeon.ysize) ymax=Dungeon.ysize;



  for(y=ymin;y<ymax+1;y++){
    for(x=xmin;x<xmax+1;x++){

      if(Dungeon.isv(x,y)){
        var n =Dungeon.getCell(x,y);

      if(n>12 && n<99){
        ctx.drawImage(piso0,x*ancho,y*ancho);
      }
      else  switch (n){
        case 0:{
          ctx.fillStyle ="#090909";
          ctx.fillRect(x*ancho,y*ancho,ancho,ancho);

          break;
        }

        case 1:{
            ctx.drawImage(piso1,x*ancho,y*ancho);
        break;
      }
      case 2:{
        ctx.drawImage(piso12,x*ancho,y*ancho);
        ctx.fillStyle ="rgba(90, 30, 0,0.4)";
        ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
        break;
      }
      case 3:{
        ctx.drawImage(piso11,x*ancho,y*ancho);
        break;
      }
        case 4:{//pasillov
          ctx.drawImage(pisopasillov,x*ancho,y*ancho);
          break;
        }
        case 5:{ //pasilloh
          ctx.drawImage(pisopasillo,x*ancho,y*ancho);
          break;
        }
        case 6:{
          ctx.drawImage(piso11,x*ancho,y*ancho);
        break;
      }
          case 7:{ //spawners

            ctx.drawImage(zergb,x*ancho,y*ancho);

            break;
          }
          case 8:{
            ctx.drawImage(piso0,x*ancho,y*ancho);

            break;
          }
          case 9:{
            ctx.drawImage(piso0,x*ancho,y*ancho);

            break;
          }
          case 10:{
            ctx.drawImage(piso0,x*ancho,y*ancho);

            break;
          }
          case 11:{
            ctx.drawImage(piso0,x*ancho,y*ancho);

            break;
          }
          case 12:{
            ctx.drawImage(piso0,x*ancho,y*ancho);

            break;
          }
          case 13:{
            ctx.drawImage(piso4,x*ancho,y*ancho);
            break;
          }
          case 14:{
            ctx.drawImage(piso41,x*ancho,y*ancho);

            break;
          }
          case 15:{
            ctx.drawImage(piso42,x*ancho,y*ancho);

            break;
          }
          case 16:{
            ctx.drawImage(piso43,x*ancho,y*ancho);

            break;
          }
          case 99:{
            ctx.drawImage(piso13,x*ancho,y*ancho);
        //  ctx.fillStyle ="rgba(0, 0, 250,0.4)";
        //  ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
        break;
      }
      case 100:{
        ctx.drawImage(piso13,x*ancho,y*ancho);
        ctx.fillStyle ="rgba(255, 133, 0,0.9)";
        ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
        break;
      }
      default:{
       // ctx.fillStyle ="#0000ff";
       // ctx.fillRect(x*ancho,y*ancho,ancho,ancho);

       break;
      }
    }

    if(click){
      ctx.drawImage(cursor,mx*ancho,my*ancho,ancho,ancho);
    }



    if(x==exitx && y==exity){
      ctx.fillStyle ="rgba(255, 0, 0,0.7)";
      ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
    }
  }else{
    ctx.fillStyle ="#000000";
    ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
  }
}
}

}

function dibujaCujos(){
if(Dungeon.spawner.length>0)
  for(a=0;a<Dungeon.spawner.length;a++){
    Dungeon.spawner[a].render();
   }
 //Spawner.render();
  if(Dungeon.Aliens.length>0)
  for(a=0;a<Dungeon.Aliens.length;a++){
    Dungeon.Aliens[a].render();
   }





}

var fps = { //calcula los fps
        startTime : 0,
        frameNumber : 0,
        getFPS : function(){
          this.frameNumber++;
          var d = new Date().getTime(),
          currentTime = ( d - this.startTime ) / 1000,
          result = Math.floor( ( this.frameNumber / currentTime ) );

          if( currentTime > 1 ){
            this.startTime = new Date().getTime();
            this.frameNumber = 0;
          }
          return result;

        }
      };






//Draw everything
function render() {
  fps.frameNumber++;
  var bandera=true;



  //var tabf[tablerow][tableroh][2];
  ctx.fillStyle = "#000000";
  ctx.strokeStyle = "#000000";
  ctx.lineWidth = 8;
  ctx.lineCap = "round";
  ctx.rect(1,1,canvas.width-1,canvas.height-1);
    //ctx.translate(mapx,mapy);
    ctx.stroke();



  //dibuja el piso
  dibujasuelo();


  //dibuja Aliens;
  dibujaCujos();
//dibuja mapa
  Dungeon.dibujamapa(10+Machango.casx-canvas.width/2,10+Machango.casy-canvas.height/2);

 //dibuja al personaje
  Machango.render();



  //Dungeon.dibujamapa(Machango.casx,Machango.casy);
  // Mensaje fps
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "26px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  //ctx.fillText("fps: (" + fps.getFPS() + ")",mapx+ 630,mapy+ 30);




  // Mensaje
  ctx.fillStyle = "rgb(250, 250, 250)";
  ctx.font = "26px Helvetica";
  ctx.textAlign = "left";
  ctx.textBaseline = "top";
  ctx.fillText(mensaje ,mapx+ 30,mapy+ 30);


}



