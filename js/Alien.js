function Alien(x, y, r, sp, vid, anc) {
	this.casx = x * ancho + 14;
	this.casy = y * ancho + 24;
	this.radio = r;
	this.img = sp;
	this.anchospr = anc;
	this.contador = 0;
	this.pos = 0;
	this.giro = 0;
	this.alfa = 0;
	this.corriendo = 0;
	this.animm = 0;
 	this.animmax = Dungeon.getRand(0,6); //animacion de la muerte
	this.pm = 1.5;
	this.vida = vid;
	this.vidamax = vid;
	this.camino = [];
	this.barravida = ctx.createImageData(2, 16);
	for (var i = 0; i < this.barravida.data.length; i += 8) // borra la
	// barra de
	// vida
	{

		this.barravida.data[i + 0] = 0;
		this.barravida.data[i + 1] = 250;
		this.barravida.data[i + 2] = 0;
		this.barravida.data[i + 3] = 250;

		this.barravida.data[i + 4] = 0;
		this.barravida.data[i + 5] = 250;
		this.barravida.data[i + 6] = 0;
		this.barravida.data[i + 7] = 250;

	}
	this.vidaant = vid;

	this.CRcol = function(cx, cy, cr, rx, ry, rw) {
		var circleDistanceX = Math.abs(cx - rx - rw / 2);
		var circleDistanceY = Math.abs(cy - ry - rw / 2);

		if (circleDistanceX > (rw / 2 + cr)) {
			return false;
		}
		if (circleDistanceY > (rw / 2 + cr)) {
			return false;
		}

		if (circleDistanceX <= (rw / 2)) {
			return true;
		}
		if (circleDistanceY <= (rw / 2)) {
			return true;
		}

		var cornerDistance_sq = Math.pow(circleDistanceX - rw / 2, 2)
				+ Math.pow(circleDistanceY - rw / 2, 2);

		return (cornerDistance_sq <= (Math.pow(cr, 2)));
	}

	this.CCcol = function(x1, y1, w1) { // colision del circulo x1,y1 con radio
		// w1 con el x2,y2 con radio w2
		var xd = x1 - this.casx;
		var yd = y1 - this.casy;
		var wt = this.radio + this.vidamax + w1;
		if (this.vida > 0)
			return (xd * xd + yd * yd <= wt * wt);
	}

	this.colisonconmuro = function(alfa) {// dir: 0 ar&& Dungeon.getCell(xc,yc) != Dungeon.tileAlienriba 1 derecha, 2 abajo,
		// 3 izquierda: /////pm puntos de
		// movimiento (pixeles)
		alfa = alfa % Math.PI;
    var xc=parseInt(this.casx + 16 + (this.radio + this.vidamax) * Math.sin(this.alfa) / ancho);
    var yc=parseInt(this.casy + 16 + (this.radio + this.vidamax) * Math.cos(this.alfa) / ancho);
    

		if (Dungeon.getCell(xc,yc) >= 2 && Dungeon.getCell(xc,yc) != Dungeon.tileAlien) {

			return false;

		} else {
			return true;
		}

	}
	this.colisonconmuroy = function(alfa) {// dir: 0 arriba 1 derecha, 2 abajo,
		// 3 izquierda: /////pm puntos de
		// movimiento (pixeles)
		alfa = alfa % Math.PI;

		if (Dungeon.getCell(
				parseInt((this.casx + 16 + (this.radio + this.vidamax)
						* Math.sin(this.alfa))
						/ ancho), parseInt((this.casy + 16) / ancho)) > 1) {

			return false;

		} else {
			return true;
		}

	}
	this.colisonconmurox = function(alfa) {// dir: 0 arriba 1 derecha, 2 abajo,
		// 3 izquierda: /////pm puntos de
		// movimiento (pixeles)
		alfa = alfa % Math.PI;

		if (Dungeon.getCell(parseInt((this.casx + 16) / ancho),
				parseInt((this.casy + 16 + (this.radio + this.vidamax)
						* Math.cos(this.alfa)) / ancho)) > 1) {

			return false;

		} else {
			return true;
		}

	}
	this.colisionaconaliens = function(alfa) { // dir: 0 arriba
		// 1 derecha, 2
		// abajo, 3
		// izquierda:
		// /////pm
		// puntos de
		// movimiento
		// (pixeles)
		var col = false;
		for (a = 0; a < Dungeon.Aliens.length; a++) {

			if (Dungeon.Aliens[a].CCcol(x + Math.sin(this.alfa) * this.pm, y,
					this.radio + parseInt(this.vidamax / 2))
					&& x != this.casx && y != this.casy) {
				col = true;
				break;
			}
		}

		return col;

	}

	this.update = function(x, y, radio, pm) {
		// this.hazcamino(this.casx,this.casy,x,y);
		if (this.vida > 0) {
      var colescudo=false;
      var colalien=false;
			this.alfa = Math.atan2(x - this.casx, y - this.casy);
			this.giro = 16 - parseInt((this.alfa * Math.PI * 1.9));

/*
      for(z=0;z<8;z++){
        if(!this.colisionaconaliens(alfa)) break;
        else this.alfa+=Math.PI/4;
      }

*/




      
      if(Machango.escudo.length>0)
        if(this.CCcol(x-20, y-25, Machango.escudo.radio+ancho)) colescudo=true;


			if (!this.CCcol(x, y, radio) && !colescudo) {


			  if(hayvista(parseInt(this.casx/ancho),parseInt(this.casy/ancho),parseInt(Machango.casx/ancho),parseInt(Machango.casy/ancho))){

				if (!this.colisonconmuro(alfa)) {

					this.casx = this.casx + Math.sin(this.alfa) * this.pm;
					this.casy = this.casy + Math.cos(this.alfa) * this.pm;

				} else {
					if (!this.colisonconmuroy(alfa))
						this.casx = this.casx + Math.sin(this.alfa) * this.pm;
					if (!this.colisonconmurox(alfa))
						this.casy = this.casy + Math.cos(this.alfa) * this.pm;
				}
			  }else{

			  	
			  		this.camino=[];
			  		this.camino=this.findPath([parseInt((this.casx-14)/ancho),parseInt((this.casy-16)/ancho)],[parseInt(Machango.casx/ancho),parseInt(Machango.casy/ancho)]);
			  

			  if(this.camino.length>1){
			  		this.alfa = Math.atan2(this.camino[1][0]  - this.camino[0][0], this.camino[1][1] - this.camino[0][1]);
			  		this.giro = 16 - parseInt((this.alfa * Math.PI * 1.9));

			  	if (!this.colisonconmuro(alfa)) {

					this.casx = this.casx + Math.sin(this.alfa) * this.pm;
					this.casy = this.casy + Math.cos(this.alfa) * this.pm;

				} else {
					if (!this.colisonconmuroy(alfa))
						this.casx = this.casx + Math.sin(this.alfa) * this.pm;
					if (!this.colisonconmurox(alfa))
						this.casy = this.casy + Math.cos(this.alfa) * this.pm;
				}
			  		
			  }
			  	
			  	


			  }





				this.corriendo++;
				} else {
					corriendo = 0;
					Machango.vida--; // resta vida al machango

				}
			
			// mensaje="Giro:" +this.giro + " Alfa:" + this.alfa;
			this.contador++;
			if (this.contador > 100) {
				this.contador = 0;
			} else {
				this.pos = parseInt(this.contador / 10);
				if (this.pos > 2)
					this.pos = 1;
			}

			var rcolor = 250;
			var gcolor = 250;
			if (this.vida > 0 && this.vida < parseInt(this.vidamax / 2)) {
				rcolor = 250;
				gcolor = 0;
			} else {
				if (this.vida >= parseInt(this.vidamax / 2) && this.vida < 4) {
					rcolor = 255;
					gcolor = 133;
				}
			}

			if (this.vidaant != this.vida) {
				for (var i = 0; i < this.barravida.data.length; i += 8) // borra
				// la
				// barra de
				// vida
				{

					this.barravida.data[i + 0] = rcolor;
					this.barravida.data[i + 1] = gcolor;
					this.barravida.data[i + 2] = 0;
					this.barravida.data[i + 3] = 250;

					this.barravida.data[i + 4] = rcolor;
					this.barravida.data[i + 5] = gcolor;
					this.barravida.data[i + 6] = 0;
					this.barravida.data[i + 7] = 250;

				}
				aux = parseInt(this.vidamax / this.vida) * 32 - 32;

				for (var i = 0; i <= aux; i += 8) // dibuja la barra de vida
				{

					this.barravida.data[i + 0] = 0;
					this.barravida.data[i + 1] = 0;
					this.barravida.data[i + 2] = 0;
					this.barravida.data[i + 3] = 250;

					this.barravida.data[i + 4] = 0;
					this.barravida.data[i + 5] = 0;
					this.barravida.data[i + 6] = 0;
					this.barravida.data[i + 7] = 250;

				}
				this.vidaant = this.vida;

			} else {
			if(this.animm<this.animmax)
					this.animm++;
			
      }

		}
	}

 function hayvista(x0, y0, x1, y1){ //algoritmo que te crea una linea de puntos desde x0,y0 hasta x1,y1 y las guarda en camino
 // this.camino=[];
   var dx = Math.abs(x1-x0);
   var dy = Math.abs(y1-y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx-dy;
   var pox=0;
   var poy=0;
   var e2 = 2*err;
   if (e2 >-dy){ pox=sx;}
   if (e2 < dx){ poy=sy;}
  	var vista=true;
  
  //mensaje="Orcopos("+orcopos+"),("+pox+", "+poy+")";
  while(true){
  
  //this.camino.push([x0, y0,pox,poy]); pox=poy=0;
  
  if(Dungeon.getCell(x0,y0)<2){
  	vista=false;
  	break;
  } 

  if ((x0==x1) && (y0==y1)) break;
   var e2 = 2*err;
    if (e2 >-dy){
     err -= dy;
     x0 += sx;
   //  pox=sx;
 	}
 	if (e2 < dx){
 	  	err += dx;
 	  	y0 += sy;
 	  //	poy=sy;
  	}
   }
   return vista;
  }
 

this.findPath = function(pathStart, pathEnd)
{
  // shortcuts for speed
  var abs = Math.abs;
  var max = Math.max;
  var pow = Math.pow;
  var sqrt = Math.sqrt;

  // the world data are integers:
  // anything higher than this number is considered blocked
  // this is handy is you use numbered sprites, more than one
  // of which is walkable road, grass, mud, etc
  var maxWalkableTileNum = 0;

  // keep track of the world dimensions
    // Note that this A-star implementation expects the world array to be square: 
  // it must have equal height and width. If your game world is rectangular, 
  // just fill the array with dummy values to pad the empty space.
  var worldWidth = Dungeon.xsize;
  var worldHeight = Dungeon.ysize;
  var worldSize = worldWidth * worldHeight;

  // which heuristic should we use?
  // default: no diagonals (Manhattan)
  //var distanceFunction = ManhattanDistance;
  //var findNeighbours = function(){}; // empty

  

  // alternate heuristics, depending on your game:

  // diagonals allowed but no sqeezing through cracks:
  //var distanceFunction = DiagonalDistance;
  //var findNeighbours = DiagonalNeighbours;

  // diagonals and squeezing through cracks allowed:
  //var distanceFunction = DiagonalDistance;
  //var findNeighbours = DiagonalNeighboursFree;

  // euclidean but no squeezing through cracks:
 // var distanceFunction = EuclideanDistance;
 // var findNeighbours = DiagonalNeighbours;

  // euclidean and squeezing through cracks allowed:
  var distanceFunction = EuclideanDistance;
  var findNeighbours = DiagonalNeighboursFree;

  

  // distanceFunction functions
  // these return how far away a point is to another

  function ManhattanDistance(Point, Goal)
  { // linear movement - no diagonals - just cardinal directions (NSEW)
    return abs(Point.x - Goal.x) + abs(Point.y - Goal.y);
  }

  function DiagonalDistance(Point, Goal)
  { // diagonal movement - assumes diag dist is 1, same as cardinals
    return max(abs(Point.x - Goal.x), abs(Point.y - Goal.y));
  }

  function EuclideanDistance(Point, Goal)
  { // diagonals are considered a little farther than cardinal directions
    // diagonal movement using Euclide (AC = sqrt(AB^2 + BC^2))
    // where AB = x2 - x1 and BC = y2 - y1 and AC will be [x3, y3]
    return sqrt(pow(Point.x - Goal.x, 2) + pow(Point.y - Goal.y, 2));
  }

  // Neighbours functions, used by findNeighbours function
  // to locate adjacent available cells that aren't blocked

  // Returns every available North, South, East or West
  // cell that is empty. No diagonals,
  // unless distanceFunction function is not Manhattan
  function Neighbours(x, y)
  {
    var N = y - 1,
    S = y + 1,
    E = x + 1,
    W = x - 1,
    myN = N > -1 && canWalkHere(x, N),
    myS = S < worldHeight && canWalkHere(x, S),
    myE = E < worldWidth && canWalkHere(E, y),
    myW = W > -1 && canWalkHere(W, y),
    result = [];
    if(myN)
    result.push({x:x, y:N});
    if(myE)
    result.push({x:E, y:y});
    if(myS)
    result.push({x:x, y:S});
    if(myW)
    result.push({x:W, y:y});
    findNeighbours(myN, myS, myE, myW, N, S, E, W, result);
    return result;
  }

  // returns every available North East, South East,
  // South West or North West cell - no squeezing through
  // "cracks" between two diagonals
  function DiagonalNeighbours(myN, myS, myE, myW, N, S, E, W, result)
  {
    if(myN)
    {
      if(myE && canWalkHere(E, N))
      result.push({x:E, y:N});
      if(myW && canWalkHere(W, N))
      result.push({x:W, y:N});
    }
    if(myS)
    {
      if(myE && canWalkHere(E, S))
      result.push({x:E, y:S});
      if(myW && canWalkHere(W, S))
      result.push({x:W, y:S});
    }
  }

  // returns every available North East, South East,
  // South West or North West cell including the times that
  // you would be squeezing through a "crack"
  function DiagonalNeighboursFree(myN, myS, myE, myW, N, S, E, W, result)
  {
    myN = N > -1;
    myS = S < worldHeight;
    myE = E < worldWidth;
    myW = W > -1;
    if(myE)
    {
      if(myN && canWalkHere(E, N))
      result.push({x:E, y:N});
      if(myS && canWalkHere(E, S))
      result.push({x:E, y:S});
    }
    if(myW)
    {
      if(myN && canWalkHere(W, N))
      result.push({x:W, y:N});
      if(myS && canWalkHere(W, S))
      result.push({x:W, y:S});
    }
  }

  // returns boolean value (world cell is available and open)
  function canWalkHere(x, y)
  {
    return (Dungeon.getCell(x,y) > 1);
  };

  // Node function, returns a new object with Node properties
  // Used in the calculatePath function to store route costs, etc.
  function Node(Parent, Point)
  {
    var newNode = {
      // pointer to another Node object
      Parent:Parent,
      // array index of this Node in the world linear array
      value:Point.x + (Point.y * worldWidth),
      // the location coordinates of this Node
      x:Point.x,
      y:Point.y,
      // the heuristic estimated cost
      // of an entire path using this node
      f:0,
      // the distanceFunction cost to get
      // from the starting point to this node
      g:0
    };

    return newNode;
  }

  // Path function, executes AStar algorithm operations
  function calculatePath()
  {
    // create Nodes from the Start and End x,y coordinates
    var mypathStart = Node(null, {x:pathStart[0], y:pathStart[1]});
    var mypathEnd = Node(null, {x:pathEnd[0], y:pathEnd[1]});
    // create an array that will contain all world cells
    var AStar = new Array(worldSize);
    // list of currently open Nodes
    var Open = [mypathStart];
    // list of closed Nodes
    var Closed = [];
    // list of the final output array
    var result = [];
    // reference to a Node (that is nearby)
    var myNeighbours;
    // reference to a Node (that we are considering now)
    var myNode;
    // reference to a Node (that starts a path in question)
    var myPath;
    // temp integer variables used in the calculations
    var length, max, min, i, j;
    // iterate through the open list until none are left
    while(length = Open.length)
    {
      max = worldSize;
      min = -1;
      for(i = 0; i < length; i++)
      {
        if(Open[i].f < max)
        {
          max = Open[i].f;
          min = i;
        }
      }
      // grab the next node and remove it from Open array
      myNode = Open.splice(min, 1)[0];
      // is it the destination node?
      if(myNode.value === mypathEnd.value)
      {
        myPath = Closed[Closed.push(myNode) - 1];
        do
        {
          result.push([myPath.x, myPath.y]);
        }
        while (myPath = myPath.Parent);
        // clear the working arrays
        AStar = Closed = Open = [];
        // we want to return start to finish
        result.reverse();
      }
      else // not the destination
      {
        // find which nearby nodes are walkable
        myNeighbours = Neighbours(myNode.x, myNode.y);
        // test each one that hasn't been tried already
        for(i = 0, j = myNeighbours.length; i < j; i++)
        {
          myPath = Node(myNode, myNeighbours[i]);
          if (!AStar[myPath.value])
          {
            // estimated cost of this particular route so far
            myPath.g = myNode.g + distanceFunction(myNeighbours[i], myNode);
            // estimated cost of entire guessed route to the destination
            myPath.f = myPath.g + distanceFunction(myNeighbours[i], mypathEnd);
            // remember this new path for testing above
            Open.push(myPath);
            // mark this node in the world graph as visited
            AStar[myPath.value] = true;
          }
        }
        // remember this route as having no more untested options
        Closed.push(myNode);
      }
    } // keep iterating until the Open list is empty
    return result;
  }

  // actually calculate the a-star path!
  // this returns an array of coordinates
  // that is empty if no path is possible
  return calculatePath();

} // end of findPath() function






	this.render = function() {
		if (this.vida > 0) {

			if (this.giro < 0)
				this.giro = 0;
			if (this.corriendo == 0) {

				if (this.giro < 16) {
					ctx.drawImage(this.img, 20 + ancho * this.giro, 20 + ancho
							* (this.pos), this.anchospr - 20,
							this.anchospr - 20, this.casx - this.vidamax,
							this.casy - this.vidamax, this.anchospr
									+ this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);
				} else {
					if (this.giro > 30)
						this.giro = 30;
					this.giro++;

					ctx.save();
					ctx.scale(-1.0, 1.0);
					ctx.drawImage(this.img, 20 + ancho * (33 - this.giro), 20
							+ ancho * (this.pos), this.anchospr - 20,
							this.anchospr - 20, -this.casx - this.vidamax
									- ancho / 2 - 10, this.casy - this.vidamax,
							this.anchospr + this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);

					ctx.restore();
					kk = 33 - this.giro;
					// mensaje="("+parseInt((this.casx+25)/ancho)+",
					// "+parseInt((this.casy+25)/ancho)+")";
				}
			} else {
				if (this.giro < 16) {
					ctx.drawImage(this.img, 20 + ancho * this.giro, 20 + ancho
							* (this.corriendo % 8 + 4), this.anchospr - 20,
							this.anchospr - 20, this.casx - this.vidamax,
							this.casy - this.vidamax, this.anchospr
									+ this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);
				} else {
					if (this.giro > 30)
						this.giro = 30;
					this.giro++;

					ctx.save();
					ctx.scale(-1.0, 1.0);
					ctx.drawImage(this.img, 20 + ancho * (33 - this.giro), 20
							+ ancho * (this.corriendo % 8 + 4),
							this.anchospr - 20, this.anchospr - 20, -this.casx
									- this.vidamax - ancho / 2 - 10, this.casy
									- this.vidamax, this.anchospr
									+ this.vidamax * 2, this.anchospr
									+ this.vidamax * 2);

					ctx.restore();
					kk = 33 - this.giro;
					// mensaje="("+parseInt((this.casx+25)/ancho)+",
					// "+parseInt((this.casy+25)/ancho)+")";
				}
			}
			ctx.putImageData(this.barravida, 32 + this.casx - Machango.casx
					+ canvas.width / 2, this.casy - Machango.casy
					+ canvas.height / 2); // dibuja la barra de vida

		} else {

			var i = parseInt((this.contador % 16) / 4);
			var j = parseInt(this.contador / 4) % 4;

			ctx.drawImage(blood, ancho * i, ancho * j, ancho, ancho, this.casx
					- this.vidamax - 20, this.casy - this.vidamax - 10,
					this.anchospr, this.anchospr);

			ctx.drawImage(this.img, 20 + ancho * this.animm, 20 + ancho * (17),
					this.anchospr - 20, this.anchospr - 20, this.casx
							- this.vidamax, this.casy - this.vidamax,
					this.anchospr + this.vidamax * 2, this.anchospr
							+ this.vidamax * 2);
		}
	}
}