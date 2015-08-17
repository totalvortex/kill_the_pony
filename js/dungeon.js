
var Dungeon = {
  xsize : 0,
  ysize : 0,
  hx : 0,
  hy : 0,
  objects : 0,
  chanceRoom : 55,
  chanceCorridor : 85,
  dungeon_map : [],
  visible : [],
  Aliens : [],
  long_oldseed : 0,
  tileUnused : 0,
  tileDirtWall : 1,
  tileDoorclosed : 2,
  tileStoneWall : 3,
  tileCorridorh : 4,
  tileDirtFloor : 6,
  tileCorridorv : 5,
  tileAlien : 7,
  tileChest : 8,
  tiledooropen : 9,
  tileExit : 100,
  xexit : 0,
  yexit : 0,
  mapa : null,
      nh : 0,  //numero de habitaciones
      mpos : {"x":0, "y":0},
  //misc. messages to print
  msgXSize : "X size of dungeon: \t",
  msgYSize : "Y size of dungeon: \t",
  msgMaxObjects : "max # of objects: \t",
  msgNumObjects : "# of objects made: \t",
  msgHelp : "",
  msgDetailedHelp : "",


  createDungeon: function ( inx,  iny,  inobj) {

    /*******************************************************************************/
   // Here's the one generating the whole map
   if (inobj < 1) Dungeon.objects = 10;
   else Dungeon.objects = inobj;

   // Adjust the size of the map if it's too small
   if (inx < 3) Dungeon.xsize = 3;
   else Dungeon.xsize = inx;

   if (iny < 3) Dungeon.ysize = 3;
   else Dungeon.ysize = iny;

  // System.out.println(msgXSize + xsize);
  // System.out.println(msgYSize + ysize);
  // System.out.println(msgMaxObjects + objects);

   //redefine the map var, so it's adjusted to our new map size
   this.dungeon_map = [];
   this.visible = [];
   this.mapa=[];
  //for(x=0;x<Dungeon.xsize*Dungeon.ysize;x++){
  //   Dungeon.visible.push(true);
  // }
   
   
   //start with making the "standard stuff" on the map
   for ( y = 0; y < Dungeon.ysize; y++) {
    for ( x = 0; x < Dungeon.xsize; x++) {
       //ie, making the borders of unwalkable walls
       if (y == 0) Dungeon.setCell(x, y, 1);
       else if (y == Dungeon.ysize-1) Dungeon.setCell(x, y, 1);
       else if (x == 0) Dungeon.setCell(x, y, 1);
       else if (x == Dungeon.xsize-1) Dungeon.setCell(x, y, 1);

       //and fill the rest with dirt
       else Dungeon.setCell(x, y, 0);
     }
   }

   if(!Dungeon.makeRoom(parseInt(Dungeon.xsize/2), parseInt(Dungeon.ysize/2),10,8,Dungeon.getRand(0,3))){
    alert("habitacion central no creada");
   }

   if(exitx!=0 || exity!=0){
    Dungeon.setCell(exitx,exity,99);
    hx=exitx;
    hy=exity;

   }
   // alert(Dungeon.dugeon_map.lenght+"TOTAL:"+Dungeon.xsize*Dungeon.ysize);



   //keep count of the number of "objects" we've made
    currentFeatures = 1; //+1 for the first room we just made

   //then we start the main loop

   for (countingTries = 0; countingTries < 2000; countingTries++) {

     //check if we've reached our quota
     if (currentFeatures == Dungeon.objects) {
      break;
     }

     //start with a random wall
     newx = 0;
     xmod = 0;
     newy = 0;
     ymod = 0;
     validTile = -1;

     //1000 chances to find a suitable object (room or corridor)..
     //(yea, i know it's kinda ugly with a for-loop... -_-')

     for ( testing = 0; testing < 2000; testing++) {
      newx = Dungeon.getRand(1, Dungeon.xsize-1);
      newy = Dungeon.getRand(1, Dungeon.ysize-1);
      validTile = -1;

       //System.out.println("tempx: " + newx + "\ttempy: " + newy);

       if (Dungeon.getCell(newx, newy) == Dungeon.tileDirtWall || Dungeon.getCell(newx, newy) == Dungeon.tileCorridorv|| Dungeon.getCell(newx, newy) == Dungeon.tileCorridorh) {
         //check if we can reach the place
         if (Dungeon.getCell(newx, newy+1) == Dungeon.tileDirtFloor || Dungeon.getCell(newx, newy) == Dungeon.tileCorridorv|| Dungeon.getCell(newx, newy) == Dungeon.tileCorridorh) {
           validTile = 0; //
           xmod = 0;
           ymod = -1;
         }
         else if (Dungeon.getCell(newx-1, newy) == Dungeon.tileDirtFloor || Dungeon.getCell(newx-1, newy) == Dungeon.tileCorridorv || Dungeon.getCell(newx-1, newy) == Dungeon.tileCorridorh) {
           validTile = 1; //
           xmod = +1;
           ymod = 0;
         }

         else if (Dungeon.getCell(newx, newy-1) == Dungeon.tileDirtFloor || Dungeon.getCell(newx, newy-1) == Dungeon.tileCorridorv|| Dungeon.getCell(newx, newy-1) == Dungeon.tileCorridorh) {
           validTile = 2; //
           xmod = 0;
           ymod = +1;
         }

         else if (Dungeon.getCell(newx+1, newy) == Dungeon.tileDirtFloor || Dungeon.getCell(newx+1, newy) == Dungeon.tileCorridorv|| Dungeon.getCell(newx+1, newy) == Dungeon.tileCorridorh) {
           validTile = 3; //
           xmod = -1;
           ymod = 0;
         }

         //check that we haven't got another door nearby, so we won't get alot of openings besides each other

         if (validTile > -1) {
           if (Dungeon.getCell(newx, newy+1) == Dungeon.tileDoorclosed) //north
            validTile = -1;
           else if (Dungeon.getCell(newx-1, newy) == Dungeon.tileDoorclosed)//east
            validTile = -1;
           else if (Dungeon.getCell(newx, newy-1) == Dungeon.tileDoorclosed)//south
            validTile = -1;
           else if (Dungeon.getCell(newx+1, newy) == Dungeon.tileDoorclosed)//west
            validTile = -1;
         }

         //if we can, jump out of the loop and continue with the rest
         if (validTile > -1) break;
       }
     }

     if (validTile > -1) {

       //choose what to build now at our newly found place, and at what direction
       feature = Dungeon.getRand(0, 100);

       if (feature <= Dungeon.chanceRoom) { //a new room
        if (Dungeon.makeRoom((newx+xmod), (newy+ymod),  10,8, validTile)) {
           currentFeatures++; //add to our quota

           //then we mark the wall opening with a door
           Dungeon.setCell(newx, newy, Dungeon.tileDoorclosed);

           //clean up infront of the door so we can reach it
           Dungeon.setCell((newx+xmod), (newy+ymod), Dungeon.tileDirtFloor);

         }
       }

       else if (feature >= Dungeon.chanceRoom) { //new corridor
        if (Dungeon.makeCorridor((newx+xmod), (newy+ymod), 6, validTile)) {
           //same thing here, add to the quota and a door
           currentFeatures++;
           Dungeon.setCell(newx, newy, Dungeon.tileDoorclosed);
         //  exitx=newx;
         //  exity=newy;
       }
     }
   }
  }



  },

   setcriatura: function ( x,  y,  celltype) { //pone una celda del tablero de un tipo
     Dungeon.critaturas[x + Dungeon.xsize * y] = celltype;
  },

  getcriatura: function ( x,  y) { //obtiene el valor de una celda del tablero
   return Dungeon.critaturas[x + Dungeon.xsize * y];
  },

   setCell: function ( x,  y,  celltype) {//pone una celda del tablero de un tipo (repe)
     Dungeon.dungeon_map[x + Dungeon.xsize * y] = celltype;

    // if(celltype==7)  Dungeon.Aliens.push(new Alien((x,y,15, zerg,ancho)));
  },

  getCell: function ( x,  y) {//obtiene el valor de una celda del tablero
   return Dungeon.dungeon_map[x + Dungeon.xsize * y];
  },



  //visibilidad

  ver: function (x,y) { //hace visible una casilla y las adyacentes por flood (funcion recursiva, aveces peta por recursividad masiva)
    if((x > 0 && x < Dungeon.xsize) && Dungeon.dungeon_map[(x) + Dungeon.xsize * (y)]>=4 && Dungeon.dungeon_map[(x) + Dungeon.xsize * (y)]<16 && !Dungeon.visible[(x) + Dungeon.xsize * (y)]){
      Dungeon.setv(x,y);
    }
    if((x > 0 && x < Dungeon.xsize) && Dungeon.dungeon_map[(x+1) + Dungeon.xsize * (y)]>=4 && Dungeon.dungeon_map[(x+1) + Dungeon.xsize * (y)]<16 && !Dungeon.visible[(x+1) + Dungeon.xsize * (y)]){
      Dungeon.ver(x+1,y);
    }else{
      Dungeon.setv(x+1,y);
    }

    if((x > 0 && x < Dungeon.xsize) && Dungeon.dungeon_map[(x-1) + Dungeon.xsize * (y)]>=4 && Dungeon.dungeon_map[(x-1) + Dungeon.xsize * (y)]<16 && !Dungeon.visible[(x-1) + Dungeon.xsize * (y)]){
      Dungeon.ver(x-1,y);
    }else{
      Dungeon.setv(x-1,y);
    }
    if((y > 0 && y < Dungeon.ysize) && Dungeon.dungeon_map[(x) + Dungeon.xsize * (y+1)]>=4 && Dungeon.dungeon_map[(x) + Dungeon.xsize * (y+1)]<16 && !Dungeon.visible[(x) + Dungeon.xsize * (y+1)]){
      Dungeon.ver(x,y+1);
    }else{
      Dungeon.setv(x,y+1);
    }
    if((y > 0 && y < Dungeon.ysize) && Dungeon.dungeon_map[(x) + Dungeon.xsize * (y-1)]>=4 && Dungeon.dungeon_map[(x) + Dungeon.xsize * (y-1)]<16 && !Dungeon.visible[(x) + Dungeon.xsize * (y-1)]){
      Dungeon.ver(x,y-1);
    }else{
      Dungeon.setv(x,y-1);
    }

    //diagonales
    if((y > 0 && y < Dungeon.ysize) && (x > 0 && x < Dungeon.xsize) && Dungeon.dungeon_map[(x+1) + Dungeon.xsize * (y+1)]>=4 && Dungeon.dungeon_map[(x+1) + Dungeon.xsize * (y+1)]<16 && !Dungeon.visible[(x+1) + Dungeon.xsize * (y+1)]){
      Dungeon.ver(x+1,y+1);
    }else{
      Dungeon.setv(x+1,y+1);
    }
    if((y > 0 && y < Dungeon.ysize) && (x > 0 && x < Dungeon.xsize) && Dungeon.dungeon_map[(x+1) + Dungeon.xsize * (y-1)]>=4 && Dungeon.dungeon_map[(x+1) + Dungeon.xsize * (y-1)]<16 && !Dungeon.visible[(x+1) + Dungeon.xsize * (y-1)]){
      Dungeon.ver(x+1,y-1);
    }else{
      Dungeon.setv(x+1,y-1);
    }
    if((y > 0 && y < Dungeon.ysize) && (x > 0 && x < Dungeon.xsize) && Dungeon.dungeon_map[(x-1) + Dungeon.xsize * (y+1)]>=4 && Dungeon.dungeon_map[(x-1) + Dungeon.xsize * (y+1)]<16 && !Dungeon.visible[(x-1) + Dungeon.xsize * (y+1)]){
      Dungeon.ver(x-1,y+1);
    }else{
      Dungeon.setv(x-1,y+1);
    }
    if((y > 0 && y < Dungeon.ysize) && (x > 0 && x < Dungeon.xsize) && Dungeon.dungeon_map[(x-1) + Dungeon.xsize * (y-1)]>=4 && Dungeon.dungeon_map[(x-1) + Dungeon.xsize * (y-1)]<16 && !Dungeon.visible[(x-1) + Dungeon.xsize * (y-1)]){
      Dungeon.ver(x-1,y-1);
    }else{
      Dungeon.setv(x-1,y-1);
    }
  },

  setv: function ( x,  y) { //hace una celda visible
    if(Dungeon.dungeon_map[x + Dungeon.xsize * y]==Dungeon.tileAlien && !Dungeon.isv(x,y)) Dungeon.Aliens.push(new Alien(x,y,15, zerg,ancho));
    Dungeon.visible[x + Dungeon.xsize * y] = true;
    o=(x + 64 * y);
    i=o*4;
    switch(Dungeon.dungeon_map[o]){
      case Dungeon.tileUnused:
        {

          this.mapa.data[i+0]=16;
          this.mapa.data[i+1]=16;
          this.mapa.data[i+2]=16;
          this.mapa.data[i+3]=250;
          break; 
        }
        case Dungeon.tileDirtWall:
        {
         
          this.mapa.data[i+0]=250;
          this.mapa.data[i+1]=0;
          this.mapa.data[i+2]=0;
          this.mapa.data[i+3]=250;
          break; 
        }
        case Dungeon.tiledooropen:
        {
         this.mapa.data[i+0]=190;
         this.mapa.data[i+1]=130;
         this.mapa.data[i+2]=0;
         this.mapa.data[i+3]=250;
          break; 
        }
        default:
        {
         this.mapa.data[i+0]=200;
         this.mapa.data[i+1]=200;
         this.mapa.data[i+2]=200;
         this.mapa.data[i+3]=250;
          break; 
        }
    }
      
    
  },

  unsetv: function ( x,  y) { //oscurece una celda
    Dungeon.visible[x + Dungeon.xsize * y] = false;
  },

  isv: function ( x,  y) { //devuelve la visibilidad de una celda
    return Dungeon.visible[x + Dungeon.xsize * y];
  },

  iniciamapa : function (mx,my) {
 this.mapa=ctx.createImageData(64,64);
  for (var i=0;i<this.mapa.data.length;i+=4)
   {
    if((i)%(mx*4)==0 || (i)%(mx*4)==mx*4-4 || (i<my*4) || i>mx*my*4-mx*4){
          this.mapa.data[i+0]=250;
          this.mapa.data[i+1]=0;
          this.mapa.data[i+2]=0;
          this.mapa.data[i+3]=250;
    }else{
          this.mapa.data[i+0]=0;
          this.mapa.data[i+1]=0;
          this.mapa.data[i+2]=0;
          this.mapa.data[i+3]=250;
    }
   }
    //alert("inicia mapa"+this.mapa.data.length);
  },


scaleImageData:function (imageData, scale) {
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
},



  dibujamapa: function (x,y) {
//alert("inicia mapa"+this.mapa.data[0]);

ctx.putImageData(this.scaleImageData(this.mapa,3.0),canvas.width-200,canvas.height-200);

//ctx.fillStyle ="rgba(0, 0, 0,250)";
//ctx.arc(canvas.width-138+parseInt(Machango.casx/ancho),canvas.height-138+parseInt(Machango.casy/ancho),3,2,Math.PI);


 //   ctx.putImageData(this.mapa,x,y);
 //   ctx.stroke()
  /*
    var a=4;
    for(i=0;i<64;i++){
       for(j=0;j<64;j++){
          if(Dungeon.isv(i,j)){
            if(Dungeon.getCell(i,j)==Dungeon.tileUnused){
             ctx.fillStyle ="rgba(0, 0, 0,0.3)";
             ctx.fillRect(x+i*a,y+j*a,a,a);
            }
          if(Dungeon.getCell(i,j)==Dungeon.tileDirtWall){
             ctx.fillStyle ="rgba(250, 250, 0,0.3)";
             ctx.fillRect(x+i*a,y+j*a,a,a);
          }
          if(Dungeon.getCell(i,j)==Dungeon.tiledooropen){
             ctx.fillStyle ="rgba(190, 130, 0,0.3)";
             ctx.fillRect(x+i*a,y+j*a,a,a);
          }
          if(Dungeon.getCell(i,j)>2){
            ctx.fillStyle ="rgba(255, 255, 255,0.3)";
            ctx.fillRect(x+i*a,y+j*a,a,a);
         }
       }else{
          ctx.fillStyle ="rgba(0, 0, 0,0.3)";
          ctx.fillRect(x+i*a,y+j*a,a,a);
       }
     } 
    }*/
  },


  getRand : function ( low,  high) { //obtiene un nº aleatorio de low a high

    return ~~(Math.random() * (high - low)) + low;
  },

  makeCorridor:function ( x,  y,  lenght,  direction) { //crea un pasillo
    /*******************************************************************************/
   //define the dimensions of the corridor (er.. only the width and height..)
   len = Dungeon.getRand(2, lenght);
   floor = Dungeon.getRand(5,15);
   dir = 0;
   if (direction > 0 && direction < 4) dir = direction;

   xtemp = 0;
   ytemp = 0;

   // reject corridors that are out of bounds
   if (x < 0 || x > Dungeon.xsize) return false;
   if (y < 0 || y > Dungeon.ysize) return false;

   switch(dir) {

     case 0: //north
     xtemp = x;

       // make sure it's not out of the boundaries
       for (ytemp = y; ytemp > (y-len); ytemp--) {
         if (ytemp < 0 || ytemp > Dungeon.ysize) return false; //oh boho, it was!
         if (Dungeon.getCell(xtemp, ytemp) != Dungeon.tileUnused) return false;
       }

       //if we're still here, let's start building
       for (ytemp = y; ytemp > (y-len)-1; ytemp--) {
        if(ytemp==(y-len)){
          if(Dungeon.getCell(xtemp-1, ytemp) ==0) Dungeon.setCell(xtemp-1, ytemp,  Dungeon.tileDirtWall);
          if(Dungeon.getCell(xtemp, ytemp) ==0) Dungeon.setCell(xtemp, ytemp,  Dungeon.tileDirtWall);
          if(Dungeon.getCell(xtemp+1, ytemp) ==0) Dungeon.setCell(xtemp+1, ytemp,  Dungeon.tileDirtWall);

        }else{


          if(Dungeon.getCell(xtemp-1, ytemp) ==0) Dungeon.setCell(xtemp-1, ytemp,  Dungeon.tileDirtWall);
          Dungeon.setCell(xtemp, ytemp,  Dungeon.tileCorridorh);
          if(Dungeon.getCell(xtemp+1, ytemp) ==0) Dungeon.setCell(xtemp+1, ytemp,  Dungeon.tileDirtWall);
        }
       }
       break;

     case 1: //east
     ytemp = y;

     for (xtemp = x; xtemp < (x+len); xtemp++) {
      if (xtemp < 0 || xtemp > Dungeon.xsize) return false;
      if (Dungeon.getCell(xtemp, ytemp) != Dungeon.tileUnused) return false;
     }

     for (xtemp = x; xtemp < (x+len)+1; xtemp++) {
      if(xtemp==x+len){
        if(Dungeon.getCell(xtemp, ytemp-1) ==0) Dungeon.setCell(xtemp, ytemp-1,  Dungeon.tileDirtWall);
        if(Dungeon.getCell(xtemp, ytemp) ==0) Dungeon.setCell(xtemp, ytemp,  Dungeon.tileDirtWall);
        if(Dungeon.getCell(xtemp, ytemp+1) ==0) Dungeon.setCell(xtemp, ytemp+1,  Dungeon.tileDirtWall);
      }else{
        if(Dungeon.getCell(xtemp, ytemp-1) ==0) Dungeon.setCell(xtemp, ytemp-1,  Dungeon.tileDirtWall);
        Dungeon.setCell(xtemp, ytemp, Dungeon.tileCorridorv);
        if(Dungeon.getCell(xtemp, ytemp+1) ==0) Dungeon.setCell(xtemp, ytemp+1,  Dungeon.tileDirtWall);
      }
     }
     break;

     case 2: // south
     xtemp = x;

     for (ytemp = y; ytemp < (y+len); ytemp++) {
      if (ytemp < 0 || ytemp > Dungeon.ysize) return false;
      if (Dungeon.getCell(xtemp, ytemp) != Dungeon.tileUnused) return false;
     }

     for (ytemp = y; ytemp < (y+len)+1; ytemp++) {
      if(ytemp==(y+len)){
        if(Dungeon.getCell(xtemp-1, ytemp) ==0) Dungeon.setCell(xtemp-1, ytemp,  Dungeon.tileDirtWall);
        if(Dungeon.getCell(xtemp, ytemp) ==0) Dungeon.setCell(xtemp, ytemp,  Dungeon.tileDirtWall);
        if(Dungeon.getCell(xtemp+1, ytemp) ==0) Dungeon.setCell(xtemp+1, ytemp,  Dungeon.tileDirtWall);

      }else{

        if(Dungeon.getCell(xtemp-1, ytemp) ==0) Dungeon.setCell(xtemp-1, ytemp,  Dungeon.tileDirtWall);
        Dungeon.setCell(xtemp, ytemp, Dungeon.tileCorridorh);
        if(Dungeon.getCell(xtemp+1, ytemp) ==0) Dungeon.setCell(xtemp+1, ytemp,  Dungeon.tileDirtWall);
      }
     }
     break;

     case 3: // west
     ytemp = y;

     for (xtemp = x; xtemp > (x-len); xtemp--) {
      if (xtemp < 0 || xtemp > Dungeon.xsize) return false;
      if (Dungeon.getCell(xtemp, ytemp) != Dungeon.tileUnused) return false;
     }

     for (xtemp = x; xtemp > (x-len)-1; xtemp--) {
      if(xtemp==x-len){
        if(Dungeon.getCell(xtemp, ytemp-1) ==0) Dungeon.setCell(xtemp, ytemp-1,  Dungeon.tileDirtWall);
        if(Dungeon.getCell(xtemp, ytemp) ==0) Dungeon.setCell(xtemp, ytemp,  Dungeon.tileDirtWall);
        if(Dungeon.getCell(xtemp, ytemp+1) ==0) Dungeon.setCell(xtemp, ytemp+1,  Dungeon.tileDirtWall);
      }else{
        if(Dungeon.getCell(xtemp, ytemp-1) ==0) Dungeon.setCell(xtemp, ytemp-1, Dungeon.tileDirtWall);
        Dungeon.setCell(xtemp, ytemp, Dungeon.tileCorridorv);
        if(Dungeon.getCell(xtemp, ytemp+1) ==0) Dungeon.setCell(xtemp, ytemp+1,Dungeon.tileDirtWall);
      }
     }
     break;
   }

   //woot, we're still here! let's tell the other guys we're done!!
   return true;
  },



  makeRoom:function( x,  y,  xlength,  ylength,  direction) { //crea una habitacion
    /*******************************************************************************/

   //define the dimensions of the room, it should be at least 4x4 tiles (2x2 for walking on, the rest is walls)
   xlen = Dungeon.getRand(5, xlength);
   ylen = Dungeon.getRand(5, ylength);

   //the tile type it's going to be filled with
   floor = Dungeon.getRand(5,15);
    wall = Dungeon.tileDirtWall; //jordv????gg

   //choose the way it's pointing at
   dir = 0;
   if (direction > 0 && direction < 4) dir = direction;

   switch(dir) {

     case 0: // north

       //Check if there's enough space left for it
       for ( ytemp = y; ytemp > (y-ylen); ytemp--) {
        if (ytemp < 0 || ytemp > Dungeon.ysize) return false;
        for ( xtemp = x-parseInt(xlen/2); xtemp < x+parseInt((xlen+1)/2); xtemp++) {
          if (xtemp < 0 || xtemp > Dungeon.xsize) return false;
           if (Dungeon.getCell(xtemp, ytemp) != Dungeon.tileUnused) return false; //no space left...

         }
       }

       //we're still here, build
       for ( ytemp = y; ytemp > (y-ylen); ytemp--) {
        for ( xtemp = x-parseInt(xlen/2); xtemp < x+parseInt((xlen+1)/2); xtemp++) {
           //start with the walls
           if (xtemp == x-parseInt(xlen/2)) Dungeon.setCell(xtemp, ytemp, wall);
           else if (xtemp == x+parseInt((xlen-1)/2)) Dungeon.setCell(xtemp, ytemp, wall);
           else if (ytemp == y) Dungeon.setCell(xtemp, ytemp, wall);
           else if (ytemp == (y-ylen+1)) Dungeon.setCell(xtemp, ytemp, wall);
           //and then fill with the floor
           else {
            Dungeon.setCell(xtemp, ytemp, Dungeon.getRand(5,15));
            exitx=xtemp;
            exity=ytemp;
           }
         }
       }

       break;

     case 1: // east

     for ( ytemp = y-parseInt(ylen/2); ytemp < (y+parseInt(ylen+1)/2); ytemp++) {
      if (ytemp < 0 || ytemp > Dungeon.ysize) return false;
      for ( xtemp = x; xtemp < (x+xlen); xtemp++) {
        if (xtemp < 0 || xtemp > Dungeon.xsize) return false;
        if (Dungeon.getCell(xtemp, ytemp) != Dungeon.tileUnused) return false;
      }
     }

     for ( ytemp = y-parseInt(ylen/2); ytemp < (y+parseInt(ylen+1)/2); ytemp++) {
      for ( xtemp = x; xtemp < (x+xlen); xtemp++) {
        if (xtemp == x) Dungeon.setCell(xtemp, ytemp, wall);
        else if (xtemp == (x+xlen-1)) Dungeon.setCell(xtemp, ytemp, wall);
        else if (ytemp == y-parseInt(ylen/2)) Dungeon.setCell(xtemp, ytemp, wall);
        else if (ytemp == y+parseInt((ylen-1)/2)) Dungeon.setCell(xtemp, ytemp, wall);
        else {
          Dungeon.setCell(xtemp, ytemp, Dungeon.getRand(5,15));
          exitx=xtemp;
          exity=ytemp;
        }
      }
     }

     break;

     case 2: // south

     for ( ytemp = y; ytemp < (y+ylen); ytemp++) {
      if (ytemp < 0 || ytemp > Dungeon.ysize) return false;
      for (xtemp = x-parseInt(xlen/2); xtemp < x+parseInt((xlen+1)/2); xtemp++) {
        if (xtemp < 0 || xtemp > Dungeon.xsize) return false;
        if (Dungeon.getCell(xtemp, ytemp) != Dungeon.tileUnused) return false;
      }
     }

     for ( ytemp = y; ytemp < (y+ylen); ytemp++) {
      for (xtemp = x-parseInt(xlen/2); xtemp < x+parseInt((xlen+1)/2); xtemp++) {
        if (xtemp == x-parseInt(xlen/2)) Dungeon.setCell(xtemp, ytemp, wall);
        else if (xtemp == x+parseInt((xlen-1)/2)) Dungeon.setCell(xtemp, ytemp, wall);
        else if (ytemp == y) Dungeon.setCell(xtemp, ytemp, wall);
        else if (ytemp == (y+ylen)-1) Dungeon.setCell(xtemp, ytemp, wall);
        else {
          Dungeon.setCell(xtemp, ytemp, Dungeon.getRand(5,15));
          exitx=xtemp-1;
          exity=ytemp-1;
        }
      }
     }

     break;

     case 3: // west

     for ( ytemp = y-parseInt(ylen/2); ytemp < y+parseInt((ylen+1)/2); ytemp++) {
      if (ytemp < 0 || ytemp > Dungeon.ysize) return false;
      for ( xtemp = x; xtemp > (x-xlen); xtemp--) {
        if (xtemp < 0 || xtemp > Dungeon.xsize) return false;
        if (Dungeon.getCell(xtemp, ytemp) != Dungeon.tileUnused) return false;
      }
     }

     for ( ytemp = y-parseInt(ylen/2); ytemp < y+parseInt((ylen+1)/2); ytemp++) {
      for ( xtemp = x; xtemp > (x-xlen); xtemp--) {
        if (xtemp == x) Dungeon.setCell(xtemp, ytemp, wall);
        else if (xtemp == (x-xlen+1)) Dungeon.setCell(xtemp, ytemp, wall);
        else if (ytemp == y-parseInt(ylen/2)) Dungeon.setCell(xtemp, ytemp, wall);
        else if (ytemp == y+parseInt((ylen-1)/2)) Dungeon.setCell(xtemp, ytemp, wall);
        else {
          Dungeon.setCell(xtemp, ytemp, Dungeon.getRand(5,15));
          exitx=xtemp;
          exity=ytemp;
        }
      }
     }

     break;
   }

   //yay, all done
   Dungeon.nh++;
   return true;
  },

  showDungeon:function () {
    /*******************************************************************************/
   //used to print the map on the screen
   dungeonMap = "";
   for ( y = 0; y < Dungeon.ysize; y++) {
    for ( x = 0; x < Dungeon.xsize; x++) {
      switch(Dungeon.getCell(x, y)) {
        case 0: dungeonMap += "m"; break;
        case 1: dungeonMap += "+"; break;
        case 2: dungeonMap += "_"; break;
        case 3: dungeonMap += "O"; break;
        case 4: dungeonMap += "#"; break;
        case 5: dungeonMap += "D"; break;
        case 6: dungeonMap += "<"; break;
        case 7: dungeonMap += ">"; break;
        case 8: dungeonMap += "*"; break;
      }
    }
    dungeonMap += "\n";
   }
   return dungeonMap;
  }


}