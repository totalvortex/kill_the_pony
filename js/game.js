// Create the canvas
var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = 768;
canvas.height = 768;

var anchocuadro=64;
var alfa=0.0;


var ancho=anchocuadro;
//load images
var cargandoReady = false;
var cargando = new Image();
cargando.onload = function () {
	cargandoReady = true;
};
cargando.src = "images/cargando.png";

var marineReady = false;
var marine = new Image();
marine.onload = function () {
	marineReady = true;
};
marine.src = "images/marines.png";

var marinezReady = false;
var marinez = new Image();
marinez.onload = function () {
	marinezReady = true;
};
marinez.src = "images/marinez.png";

var piso0Ready = false;
var piso0 = new Image();
piso0.onload = function () {
	piso1Ready = true;
};
piso0.src = "images/piso0.png";

var piso1Ready = false;
var piso1 = new Image();
piso1.onload = function () {
	piso1Ready = true;
};
piso1.src = "images/pared.png";

var piso11Ready = false;
var piso11 = new Image();
piso11.onload = function () {
	piso11Ready = true;
};
piso11.src = "images/pisounder.png";

var piso12Ready = false;
var piso12 = new Image();
piso12.onload = function () {
	piso12Ready = true;
};
piso12.src = "images/piso00.png";

var piso13Ready = false;
var piso13 = new Image();
piso13.onload = function () {
	piso13Ready = true;
};
piso13.src = "images/pisosal.png";


var pisopasilloReady = false;
var pisopasillo = new Image();
pisopasillo.onload = function () {
	pisopasilloReady = true;
};
pisopasillo.src = "images/pisopasillo.png";

var pisopasillovReady = false;
var pisopasillov = new Image();
pisopasillov.onload = function () {
	pisopasillovReady = true;
};
pisopasillov.src = "images/pisopasillov.png";


var piso21Ready = false;
var piso21 = new Image();
piso21.onload = function () {
	piso21Ready = true;
};
piso21.src = "images/piso21.png";

var piso22Ready = false;
var piso22 = new Image();
piso22.onload = function () {
	piso22Ready = true;
};
piso22.src = "images/piso22.png";

var piso23Ready = false;
var piso23 = new Image();
piso23.onload = function () {
	piso23Ready = true;
};
piso23.src = "images/piso23.png";

var piso3Ready = false;
var piso3 = new Image();
piso3.onload = function () {
	piso3Ready = true;
};
piso3.src = "images/piso3.png";

var piso31Ready = false;
var piso31 = new Image();
piso31.onload = function () {
	piso31Ready = true;
};
piso31.src = "images/piso31.png";

var piso32Ready = false;
var piso32 = new Image();
piso32.onload = function () {
	piso32Ready = true;
};
piso32.src = "images/piso32.png";

var piso33Ready = false;
var piso33 = new Image();
piso33.onload = function () {
	piso33Ready = true;
};
piso33.src = "images/piso33.png";

var piso4Ready = false;
var piso4 = new Image();
piso4.onload = function () {
	piso4Ready = true;
};
piso4.src = "images/piso4.png";

var piso41Ready = false;
var piso41 = new Image();
piso41.onload = function () {
	piso41Ready = true;
};
piso41.src = "images/piso41.png";

var piso42Ready = false;
var piso42 = new Image();
piso42.onload = function () {
	piso42Ready = true;
};
piso42.src = "images/piso42.png";

var piso43Ready = false;
var piso43 = new Image();
piso43.onload = function () {
	piso43Ready = true;
};
piso43.src = "images/piso43.png";
var murosReady = false;
var muros = new Image();
muros.onload = function () {
	murosReady = true;
};
muros.src = "images/muros.png";


var orcosprReady = false;
var orcospr = new Image();
orcospr.onload = function () {
	orcosprReady = true;
};
orcospr.src = "images/orcos32.png";

var bandidosprReady = false;
var bandidospr = new Image();
bandidospr.onload = function () {
	bandidosprReady = true;
};
bandidospr.src = "images/bandido.png";

var esqueletoReady = false;
var esqueletospr = new Image();
esqueletospr.onload = function () {
	esqueletoReady = true;
};
esqueletospr.src = "images/esqueleto.png";

var heroeReady = false;
var heroespr = new Image();
heroespr.onload = function () {
	heroeReady = true;
};
heroespr.src = "images/lothar.png";

var caballeroReady = false;
var caballerospr = new Image();
caballerospr.onload = function () {
	caballeroReady = true;
};
caballerospr.src = "images/caballero.png";

var cursorReady = false;
var cursor = new Image();
cursor.onload = function () {
	cursorReady = true;
};
cursor.src = "images/cursor.png";

var potroReady = false;
var potro = new Image();
potro.onload = function () {
	potroReady = true;
};
potro.src = "images/potro.png";

var escritorioReady = false;
var escritorio = new Image();
escritorio.onload = function () {
	escritorioReady = true;
};
escritorio.src = "images/escritorio.png";



var mapx=0;
var mapy=0;
var escala=1.0;
var pm=2; //pixels por movimiento
var mensaje = " ";
var fps = 0;

var click=false;
var keysDown = {};
var desplazamiento=ancho;
var camino = [];
var mmx=0,mmy=0;
var xmin,ymin,xmax,ymax;

var mx=0;
var my=0;
var cx=0;
var cy=0;
var hx=0;
var hy=0;

function getmp(canvas, evt) {
    
    return {
      x:  evt.clientX - 10,
      y:  evt.clientY - 10
    };
  }

addEventListener('mousemove', function(evt) {
    Dungeon.mpos = getmp(canvas, evt);
    
}, false);

addEventListener('click', function(evt) {
		Machango.disparando=true;
		//   mensaje="("+mx+","+my+")";
	   
	}, false);

addEventListener("keydown", function (e) {
	
	keysDown[e.keyCode] = true;
	}, false);

addEventListener("keyup", function (e) {
	delete keysDown[e.keyCode];
	
}, false);

function colmuro(f,x0,y0,rx,ry) {
	   var circleDistanceX = Math.abs(x0 - rx - f);
	   var circleDistanceY = Math.abs(y0 - ry - f);
	 
	   if (circleDistanceX > (f + Machango.radio)) { return false; }
	   if (circleDistanceY > (f + Machango.radio)) { return false; }
	 
	   if (circleDistanceX <= (f)) { return true; }
	   if (circleDistanceY <= (f)) { return true; }
	 
	   var cornerDistance_sq = Math.pow(circleDistanceX - f, 2) + Math.pow(circleDistanceY - f, 2);
	 
	   return (cornerDistance_sq <= (Math.pow(Machango.radio, 2)));
	}

function update (){
	var up,down,left,right;
	if (40 in keysDown) { // Player holding down
		if(Machango.casy > 0 && Machango.casy < Dungeon.ysize * ancho &&Dungeon.getCell(parseInt((Machango.casx)/ancho),parseInt((Machango.casy-10-pm-1)/ancho)+1)!=Dungeon.tileDirtWall){
			mensaje="("+parseInt(Machango.casx/ancho)+","+parseInt(Machango.casy/ancho)+"):"+Dungeon.getCell(parseInt(Machango.casx/(ancho)), parseInt(Machango.casy/(ancho)));
			
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
		if(Machango.casy > 0 && Machango.casy < Dungeon.ysize * ancho && Dungeon.getCell(parseInt((Machango.casx)/ancho),parseInt((Machango.casy-(pm+1))/ancho))!=Dungeon.tileDirtWall){
			//	if(colmuro(parseInt((Machango.casx+25)/ancho),parseInt((Machango.casy+25)/ancho)-pm,parseInt((Machango.casx+25)/ancho),parseInt((Machango.casy+25)/ancho))+1){
			
				mensaje="("+parseInt(Machango.casx/ancho)+","+parseInt(Machango.casy/ancho)+"):"+Dungeon.getCell(parseInt(Machango.casx/(ancho)), parseInt(Machango.casy/(ancho)));
			
				Machango.casy=Machango.casy-pm;
				ctx.translate(0,+mapy);
				mapy=Machango.casy-parseInt(canvas.height/2);//mapy-2;
				ctx.translate(0,-mapy);
			
		/*	}
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
		if(Machango.casx > 0 && Machango.casx < Dungeon.xsize * ancho && Dungeon.getCell(parseInt((Machango.casx-(pm+1))/ancho),parseInt((Machango.casy)/ancho))!=Dungeon.tileDirtWall){
		//	if(colmuro(parseInt((Machango.casx+25)/ancho)-pm,parseInt((Machango.casy+25)/ancho),parseInt((Machango.casx+25)/ancho)-1,parseInt((Machango.casy+25)/ancho))){
			
				mensaje="("+parseInt(Machango.casx/ancho)+","+parseInt(Machango.casy/ancho)+"):"+Dungeon.getCell(parseInt(Machango.casx/(ancho)), parseInt(Machango.casy/(ancho)));
			
			
			Machango.casx=Machango.casx-pm;
				ctx.translate(+mapx,0);
				mapx=Machango.casx-parseInt(canvas.width/2);//mapx-2;
				ctx.translate(-mapx,0);
			

				/*	}}
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
		if(Machango.casx > 0 && Machango.casx < Dungeon.xsize * ancho && Dungeon.getCell(parseInt((Machango.casx-16+(pm+1))/ancho)+1,parseInt((Machango.casy)/ancho))!=Dungeon.tileDirtWall){
			mensaje="("+parseInt(Machango.casx/ancho)+","+parseInt(Machango.casy/ancho)+"):"+Dungeon.getCell(parseInt(Machango.casx/(ancho)), parseInt(Machango.casy/(ancho)));
			
		
				Machango.casx=Machango.casx+pm;
				ctx.translate(+mapx,0);
				mapx=Machango.casx-parseInt(canvas.width/2);//mapx+2;
				ctx.translate(-mapx,0);
				

		/*	}
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
	Dungeon.ver(parseInt(Machango.casx/ancho),parseInt((Machango.casy)/ancho));//		mensaje="("+(parseInt(Machango.casx/(ancho*2))+25)+", "+(parseInt(Machango.casy/(ancho*2))+25)+"): "+Dungeon.getCell(parseInt(Machango.casx/(ancho*2))+25, parseInt(Machango.casy/(ancho*2))+25);
	
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
/*
if (97 in keysDown) { // Player holding "a"
	if(Machango.casx > 0 && Machango.casx < Dungeon.xsize * ancho){
		Machango.casx--;
	}
	mensaje="left"+"("+Machango.casx+", "+Machango.casy+")";
}
if (100 in keysDown) { // Player holding "d"
	if(Machango.casx > 0 && Machango.casx < Dungeon.xsize * ancho){
		Machango.casx++;
	}
	mensaje="right"+"("+Machango.casx+", "+Machango.casy+")";
}
if (119 in keysDown) { // Player holding "w"
	if(Machango.casy > 0 && Machango.casy < Dungeon.ysize * ancho){
		Machango.casy--;
	}
	mensaje="up"+"("+Machango.casx+", "+Machango.casy+")";
}
if (115 in keysDown) { // Player holding "s"
	if(Machango.casy > 0 && Machango.casy < Dungeon.ysize * ancho){
		Machango.casy++;
	}
	mensaje="down"+"("+Machango.casx+", "+Machango.casy+")";
}
if (32 in keysDown) { // Player holding space
}
*/
	/*
	if (40 in keysDown) { // Player holding up
		//	map.y -= hero.speed * modifier;
			//up=true;
		
			ctx.translate(0,+mapy);
			mapy=mapy+desplazamiento;
			ctx.translate(0,-mapy);
			mensaje="("+mapx+", "+mapy+")";
	        
		}
		if (38 in keysDown) { // Player holding down
		//	map.y += hero.speed * modifier;
			//down=true;
			ctx.translate(0,+mapy);
			mapy=mapy-desplazamiento;
			ctx.translate(0,-mapy);
			mensaje="("+mapx+", "+mapy+")";
		}
		if (37 in keysDown) { // Player holding left
		//	map.x -= hero.speed * modifier;
			//left=true;
			ctx.translate(mapx,0);
			mapx=mapx+desplazamiento;
			ctx.translate(-mapx,0);
			mensaje="("+mapx+", "+mapy+")";
		}
		if (39 in keysDown) { // Player holding right
		//	map.x += hero.speed * modifier;
			//right=true;
			ctx.translate(mapx,0);
			mapx=mapx-desplazamiento;
			ctx.translate(-mapx,0);
			mensaje="("+mapx+", "+mapy+")";
		}
	*/	
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
			//	 Dungeon.visible.push(true);
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
		
		
Machango.update();

}

function hazcamino(x0, y0, x1, y1){
	camino=[];
	   var dx = Math.abs(x1-x0);
	   var dy = Math.abs(y1-y0);
	   var sx = (x0 < x1) ? 1 : -1;
	   var sy = (y0 < y1) ? 1 : -1;
	   var err = dx-dy;
	   var pox=0;
	   var poy=0;
	   var e2 = 2*err;
	     if (e2 >-dy){  pox=sx;}
	     if (e2 < dx){  poy=sy;}
	  
	
	   //mensaje="Orcopos("+orcopos+"),("+pox+", "+poy+")";
	   while(true){
		 
		 camino.push([x0, y0,pox,poy]);
	     pox=poy=0;
	     
	     if ((x0==x1) && (y0==y1)) break;
	     var e2 = 2*err;
	     if (e2 >-dy){ err -= dy; x0  += sx; pox=sx;}
	     if (e2 < dx){ err += dx; y0  += sy; poy=sy;}
	     
	   }
	}

function dibujasuelo(){
	//ctx.translate(xmap,ymap);
	//Dungeon.ver(hx,hy);
	
	
	
	if(ymin<0) ymin=0;
	if(xmin<0) xmin=0;
	if(xmax>Dungeon.xsize) xmax=Dungeon.xsize;
	if(ymax>Dungeon.ysize) ymax=Dungeon.ysize;
	
	
	
	for(y=ymin;y<ymax+1;y++){
		  for(x=xmin;x<xmax+1;x++){
			 
				if(Dungeon.isv(x,y)){  
			  
			  var n =Dungeon.getCell(x,y);	
			//  if(n!=0) n=Dungeon.getRand(5,15);
			//  var t =tablero[x*tablerow+y][1];
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
			  	/*
			  		ctx.shadowColor = "rgba( 0, 0, 0, 1.0 )";
			  		ctx.shadowOffsetX = -2;
			  		ctx.shadowOffsetY = -2;
			  		ctx.shadowBlur = 8;*/
			  		ctx.drawImage(piso1,x*ancho,y*ancho);
			  	
			  		//ctx.fillStyle ="rgba(127, 250, 0,0.4)";
					//ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
				 
				//  ctx.drawImage(muros,24*ancho, ancho, ancho,ancho, x*ancho, y*ancho, ancho,ancho);
				  
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
	  			//	 ctx.fillStyle ="rgba(0, 0, 0,0.7)";
				//		ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
	  			  
	  			
				  break;
		     	}
				case 4:{//pasillov
					ctx.drawImage(pisopasillov,x*ancho,y*ancho);
					// ctx.fillStyle ="rgba(250, 0, 250,0.2)";
					// ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
		          
		         
				  break;
	         	}
				case 5:{ //pasilloh
					ctx.drawImage(pisopasillo,x*ancho,y*ancho);
					// ctx.fillStyle ="rgba(0, 0, 0,0.3)";
					// ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
					
				  
					
				  break;
			  	}
		  		case 6:{ 
				  ctx.drawImage(piso11,x*ancho,y*ancho);
				//ctx.fillStyle ="rgba(255, 250,250,0.8)";
				//ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
				  break;
			  	}
		  		case 7:{ //tuercas
	  			  ctx.drawImage(piso0,x*ancho,y*ancho);
	  		
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
				//	ctx.fillStyle ="rgba(0, 0, 250,0.4)";
				//	ctx.fillRect(x*ancho,y*ancho,ancho,ancho);
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

function dibujaobjetos(){

	Machango.render();
			 /*
			  if(hx!=0 && hy!=0){
				  
				  if(Machango.caballeromov){
					
					
					  if(Machango.contador%28==0){
						 // alert(caballeropaso);
						//  Dungeon.ver(camino[caballeropaso][0],camino[caballeropaso][1]);
						  Machango.contador=0;
						  Machango.caballeropaso++;
						  if(Machango.caballeropaso>=camino.length){
							  Machango.caballeropaso=0;
							  Machango.caballeromov=false;
							 // Dungeon.ver(camino[caballeropaso][0],camino[caballeropaso][1]);
							  hx=cx;
							  hy=cy;
							  camino=[];
							  return;
						  }
						  		             
					 	 	
						  if(Machango.caballeropaso<camino.length){
						  	ox=camino[Machango.caballeropaso][2];
						  	oy=camino[Machango.caballeropaso][3];
						  	
								 
					  	  }
						  switch(ox){
						  	case 1:
						  	{
						  		 switch(oy){
								  	case 1:
								  	{
								  		Machango.caballeropos=3;
									  break;
								  	}
								  	case 0:
								  	{
								  		Machango.caballeropos=2;
									  break;
								  	}
								  	case -1:
								  	{
								  		Machango.caballeropos=1;
									  break;
								  	}
								  	
								  }
								 
							  break;
						  	}
						  	case 0:
						  	{
						  		 switch(oy){
								  	case 1:
								  	{
								  		Machango.caballeropos=4;
									  break;
								  	}
								  									  	
								  	case -1:
								  	{
								  		Machango.caballeropos=0;
									  break;
								  	}
								  	
								  }
								 
							  break;
						  	}
						  	case -1:
						  	{
						  		 switch(oy){
								  	case 1:
								  	{
								  		Machango.caballeropos=5;
									  break;
								  	}
								  	case 0:
								  	{
								  		Machango.caballeropos=6;
									  break;
								  	}
								  	case -1:
								  	{
								  		Machango.caballeropos=7;
									  break;
								  	}
								  	
								  }
								 
							  break;
						  	}
						  	
						  }
						  
						//  ctx.save();
						//	 alfa=Machango.caballeropos*Math.PI/4;
						//	ctx.translate(hero.x-10+22,hero.y-10+22);
						//	ctx.rotate(alfa);
						//	ctx.drawImage(torreta,-22, -22);
						//	ctx.restore(); 
						  
						  
							 ctx.drawImage(Machango.machangoimg,(Machango.contador%27)*(ancho),
									 	0,
						                ancho-2,ancho,
						               ( camino[Machango.caballeropaso][0]-ox)*ancho+parseInt(Machango.contador*ox*2.3)+10,
						               ( camino[Machango.caballeropaso][1]-oy)*ancho+parseInt(Machango.contador*oy*2.3)-5,
						                ancho,ancho);
							 
							 
						
					 }
					 else{
						 
						 ctx.drawImage(Machango.machangoimg,(Machango.contador%27)*(ancho),
								 0,
					                ancho-2,ancho,
					               ( camino[Machango.caballeropaso][0]-ox)*ancho+parseInt(Machango.contador*ox*2.3)+10,
					               ( camino[Machango.caballeropaso][1]-oy)*ancho+parseInt(Machango.contador*oy*2.5)-5,
					                ancho,ancho);
						
					 }
					  Machango.contador++;
					 // alert(caballero%64);
					  
				  }else{
					//  ctx.save();
					//		 alfa=1*Math.PI/54;
					//		ctx.translate(1,1);
					//		ctx.rotate(alfa);
					 
					  ctx.drawImage(Machango.machangoimg,0,0,ancho-3,ancho,hx*ancho+10,hy*ancho-5,ancho,ancho);
					// ctx.restore(); 
					 
				  }
				  
			  }
			  */
		  
		
	
}

var fps = {
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
	
	//dibuja muros y objetos;
	dibujaobjetos();
	
	// Mensaje fps
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "26px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText("fps: (" + fps.getFPS() + ")",mapx+ 630,mapy+ 30);
	

	
	
	// Mensaje
	ctx.fillStyle = "rgb(250, 250, 250)";
	ctx.font = "26px Helvetica";
	ctx.textAlign = "left";
	ctx.textBaseline = "top";
	ctx.fillText(mensaje ,mapx+ 30,mapy+ 30);
	
	
}

function boton(){
	ws.send("hola");
}




var Machango = {
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
	radio: 20,
	cosa : 0,
	
	creamachango: function ( inx,  iny,  sprite, anchos) {
		
		this.machangoimg = sprite;
		this.casx = inx*ancho;
		this.casy = iny*ancho;
		this.contador = 0;
		this.contadorquieto = 0;
		this.alfa = 0;
		this.machangopaso = 0;
		this.mov=false;
		this.disparando=false;
		this.anchospr=anchos;
		this.pos= 0;
		this.giro=0;
		this.radio=20;
		this.rafaga=23;
		this.cosa=0;
	},

	update: function (){
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
		//calculo del angulo de la torreta
		//this.alfa=Math.atan2(Dungeon.mpos.x-canvas.height/2+10,Dungeon.mpos.y-canvas.width/2+10);
		//this.giro=16-parseInt((this.alfa*Math.PI*1.9));
		
		//mensaje="("+mmx+", "+mmy+")";
	//	this.pos=parseInt(alfa/34);
		
		
		
		
		
	},

	



	
	render: function(){
		if(!this.mov){	
			if(this.disparando){
				
				this.pos=3-this.contadorquieto%2;
				//if(this.contadorquieto+this.rafaga) this.disparando=false;
			}
			if(this.giro<0) this.giro=0;
			
			if(this.cosa<=14 && this.cosa>-1){
				//mensaje="sprite:"+this.cosa;
				if(this.cosa>=13) ctx.drawImage(marine,this.anchospr*12+1,1,this.anchospr-2,this.anchospr-2,this.casx,this.casy,this.anchospr,this.anchospr);
				else ctx.drawImage(marine,this.anchospr*(this.cosa)+1,1,this.anchospr-2,this.anchospr-2,this.casx,this.casy,this.anchospr,this.anchospr);

			}
			if(this.cosa<=26 && this.cosa>14){
				ctx.save();
				ctx.scale(-1.0,1.0);
				ctx.drawImage(marine,this.anchospr*(26-this.cosa)+1,1,this.anchospr-2,this.anchospr-2,-this.casx-this.anchospr,this.casy,this.anchospr,this.anchospr);
			
				ctx.restore();
				//mensaje="sprite:"+this.cosa;
			}
			/*
			if(this.giro<16){
				ctx.drawImage(this.machangoimg,16+ancho*this.giro,16+ancho*(this.pos),this.anchospr-16,this.anchospr-16,this.casx,this.casy,this.anchospr,this.anchospr);
				//mensaje="("+parseInt(this.casx/ancho)+", "+parseInt(this.casy/ancho)+")";
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
				//mensaje="("+parseInt((this.casx+25)/ancho)+", "+parseInt((this.casy+25)/ancho)+")";
			}
			*/
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
			//mensaje="("+parseInt((this.casx+25)/ancho)+", "+parseInt((this.casy+25)/ancho)+")";
			//mensaje= "mov: " + this.giro + ", pos:"+kk;
			this.disparando=false;
		}
	}
}
	

		



/////////////////asdf



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
			long_oldseed : 0,
			tileUnused : 0,
			tileDirtWall : 1,
			tileDoorclosed : 2,
			tileStoneWall : 3,
			tileCorridorh : 4,
			tileDirtFloor : 6,
			tileCorridorv : 5,
			tileDownStairs : 7,
			tileChest : 8,
			tiledooropen : 9,
			tileExit : 100,
			xexit : 0,
			yexit : 0,
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
	 Dungeon.dungeon_map = [];
	 Dungeon.visible = [];
	//for(x=0;x<Dungeon.xsize*Dungeon.ysize;x++){
	//	 Dungeon.visible.push(true);
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

/*	

	 //sprinkle out the bonusstuff (stairs, chests etc.) over the map
	  newx = 0;
	  newy = 0;
	  ways = 0; //from how many directions we can reach the random spot from
	  state = 0; //the state the loop is in, start with the stairs
	  
	 while (state != 10) {
	   for ( testing = 0; testing < 1000; testing++) {
	     newx = Dungeon.getRand(1, Dungeon.xsize-1);
	     newy = Dungeon.getRand(1, Dungeon.ysize-2); //cheap bugfix, pulls down newy to 0<y<24, from 0<y<25
	     //System.out.println("x: " + newx + "\ty: " + newy);
	     ways = 4; //the lower the better

	     //check if we can reach the spot
	     if (Dungeon.getCell(newx, newy+1) == Dungeon.tileDirtFloor || Dungeon.getCell(newx, newy) == Dungeon.tileCorridorv|| Dungeon.getCell(newx, newy) == Dungeon.tileCorridorh) {
	       //north
	       if (Dungeon.getCell(newx, newy+1) != Dungeon.tileDoorclosed)
	         ways--;
	     }

	     if (Dungeon.getCell(newx-1, newy) == Dungeon.tileDirtFloor || Dungeon.getCell(newx-1, newy) == Dungeon.tileCorridor) {
	       //east
	       if (Dungeon.getCell(newx-1, newy) != Dungeon.tileDoorclosed)
	         ways--;
	     }

	     if (Dungeon.getCell(newx, newy-1) == Dungeon.tileDirtFloor || Dungeon.getCell(newx, newy-1) == Dungeon.tileCorridor) {
	       //south
	       if (Dungeon.getCell(newx, newy-1) != Dungeon.tileDoorclosed)
	         ways--;
	     }

	     if (Dungeon.getCell(newx+1, newy) == Dungeon.tileDirtFloor || Dungeon.getCell(newx+1, newy) == Dungeon.tileCorridor) {
	       //west
	       if (Dungeon.getCell(newx+1, newy) != Dungeon.tileDoorclosed)
	         ways--;
	     }

	     if (state == 0) {
	       if (ways == 0) {
	         //we're in state 0, let's place a "upstairs" thing
	         Dungeon.setCell(newx, newy, Dungeon.tileUpStairs);
	         state = 1;
	         break;
	       }
	     }

	     else if (state == 1) {
	       if (ways == 0) {
	         //Dungeon.state 1, place a "downstairs"
	         Dungeon.setCell(newx, newy, Dungeon.tileDownStairs);
	         state = 10;
	         break;
	       }
	     }
	   }
	 }
*/
	
	},
	
	 setcriatura: function ( x,  y,  celltype) {
		 Dungeon.critaturas[x + Dungeon.xsize * y] = celltype;
	},

	getcriatura: function ( x,  y) {
	 return Dungeon.critaturas[x + Dungeon.xsize * y];
	},
	
	 setCell: function ( x,  y,  celltype) {
		 Dungeon.dungeon_map[x + Dungeon.xsize * y] = celltype;
	},

	getCell: function ( x,  y) {
	 return Dungeon.dungeon_map[x + Dungeon.xsize * y];
	},
	
	
	
	//visibilidad
	
	ver: function (x,y) {
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
	
	 setv: function ( x,  y) {
		 Dungeon.visible[x + Dungeon.xsize * y] = true;
	},

	unsetv: function ( x,  y) {
	 	 Dungeon.visible[x + Dungeon.xsize * y] = false;
	},
	
	isv: function ( x,  y) {
		 return Dungeon.visible[x + Dungeon.xsize * y];
	},
	
	
	
	
	getRand : function ( low,  high) {
		 
		        return ~~(Math.random() * (high - low)) + low;
		    },

	 makeCorridor:function ( x,  y,  lenght,  direction) {
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



	makeRoom:function( x,  y,  xlength,  ylength,  direction) {
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


	//The main game loop
	var main = function () {
		var now,delta;
		//while(conectado){
			now = Date.now();
			update();
			render();
			then = now;
			delta = now - then;
			setTimeout(main,1000/80-delta);
		//}
		//requestAnimationFrame(main);
			
	};
	

document.body.appendChild(canvas);
var w = window;
requestAnimationFrame = w.requestAnimationFrame || w.webkitRequestAnimationFrame || w.msRequestAnimationFrame || w.mozRequestAnimationFrame;
var now = Date.now();
// Let's play this game!
//reset();
var rooms=0;
var level=256;
ctx.fillStyle = "#222222";
ctx.fillRect(1,1,canvas.width-1,canvas.height-1);

//netinit();
while(Dungeon.nh<level ){
	
	ctx.drawImage(cargando,32, 32);
	
	rooms=Dungeon.createDungeon(64,64,level);
	alfa++;
}

//alert("Dungeon generado. Cuadros: "+Dungeon.dungeon_map.length)


mapx=parseInt((ancho*Dungeon.xsize)/2)-parseInt(canvas.width/2);
mapy=parseInt((ancho*Dungeon.ysize)/2)-parseInt(canvas.height/2);
Machango.creamachango(hx,hy,marinez,48);
ctx.translate(0,0);
mapx=Machango.casx-parseInt(canvas.width/2);//mapy+2;
mapy=Machango.casy-parseInt(canvas.height/2);//mapy+2;
ctx.translate(-mapx,-mapy);

then = now;
delta = now - then;
setTimeout(main,delta);


