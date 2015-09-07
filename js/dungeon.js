var Dungeon = {
	level : 0,
	xsize : 0,
	ysize : 0,
	hx : 0,
	hy : 0,
	objects : 0,
	chanceRoom : 55,
	chanceCorridor : 85,
	dungeon_map : [],
	doors : [],
	visible : [],
	Aliens : [],
	spawner : [],
	items : [],
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
	puerta : false,
	nh : 0, // numero de habitaciones
	mpos : {
		"x" : 0,
		"y" : 0
	},

	createDungeon : function(inx, iny, inobj) {

		/** **************************************************************************** */
		// Here's the one generating the whole map
		if (inobj < 1)
			Dungeon.level = 3;
		else
			Dungeon.level = inobj;

		// Adjust the size of the map if it's too small
		if (inx < 3)
			Dungeon.xsize = 3;
		else
			Dungeon.xsize = inx;

		if (iny < 3)
			Dungeon.ysize = 3;
		else
			Dungeon.ysize = iny;

		// System.out.println(msgXSize + xsize);
		// System.out.println(msgYSize + ysize);
		// System.out.println(msgMaxObjects + objects);

		// redefine the map var, so it's adjusted to our new map size
		this.dungeon_map = [];
		this.visible = [];
		this.mapa = [];
		this.Aliens = [];
		this.items = [];
		this.spawner = [];
		this.doors = [];
		// for(x=0;x<Dungeon.xsize*Dungeon.ysize;x++){
		// Dungeon.visible.push(true);
		// }

		// start with making the "standard stuff" on the map
		for (y = 0; y < Dungeon.ysize; y++) {
			for (x = 0; x < Dungeon.xsize; x++) {
				// ie, making the borders of unwalkable walls
				if (y == 0)
					Dungeon.setCell(x, y, 1);
				else if (y == Dungeon.ysize - 1)
					Dungeon.setCell(x, y, 1);
				else if (x == 0)
					Dungeon.setCell(x, y, 1);
				else if (x == Dungeon.xsize - 1)
					Dungeon.setCell(x, y, 1);

				// and fill the rest with dirt
				else
					Dungeon.setCell(x, y, 0);
			}
		}

		if (!Dungeon.makeRoom(parseInt(Dungeon.xsize / 2),
				parseInt(Dungeon.ysize / 2), 10, 8, Dungeon.getRand(0, 3))) {
			alert("habitacion central no creada");
		}

		if (exitx !== 0 || exity !== 0) {
			Dungeon.setCell(exitx, exity, 99);
			hx = exitx;
			hy = exity;

		}
		// alert(Dungeon.dugeon_map.lenght+"TOTAL:"+Dungeon.xsize*Dungeon.ysize);

		// keep count of the number of "objects" we've made
		currentFeatures = 1; // +1 for the first room we just made

		// then we start the main loop

		for (countingTries = 0; countingTries < 2000; countingTries++) {

			// check if we've reached our quota
			if (currentFeatures == Dungeon.level) {
				break;
			}

			// start with a random wall
			newx = 0;
			xmod = 0;
			newy = 0;
			ymod = 0;
			validTile = -1;

			// 1000 chances to find a suitable object (room or corridor)..
			// (yea, i know it's kinda ugly with a for-loop... -_-')

			for (testing = 0; testing < 2000; testing++) {
				newx = Dungeon.getRand(1, Dungeon.xsize - 1);
				newy = Dungeon.getRand(1, Dungeon.ysize - 1);
				validTile = -1;

				// System.out.println("tempx: " + newx + "\ttempy: " + newy);

				if (Dungeon.getCell(newx, newy) == Dungeon.tileDirtWall
						|| Dungeon.getCell(newx, newy) == Dungeon.tileCorridorv
						|| Dungeon.getCell(newx, newy) == Dungeon.tileCorridorh) {
					// check if we can reach the place
					if (Dungeon.getCell(newx, newy + 1) == Dungeon.tileDirtFloor
							|| Dungeon.getCell(newx, newy) == Dungeon.tileCorridorv
							|| Dungeon.getCell(newx, newy) == Dungeon.tileCorridorh) {
						validTile = 0; //
						xmod = 0;
						ymod = -1;
					} else if (Dungeon.getCell(newx - 1, newy) == Dungeon.tileDirtFloor
							|| Dungeon.getCell(newx - 1, newy) == Dungeon.tileCorridorv
							|| Dungeon.getCell(newx - 1, newy) == Dungeon.tileCorridorh) {
						validTile = 1; //
						xmod = +1;
						ymod = 0;
					}

					else if (Dungeon.getCell(newx, newy - 1) == Dungeon.tileDirtFloor
							|| Dungeon.getCell(newx, newy - 1) == Dungeon.tileCorridorv
							|| Dungeon.getCell(newx, newy - 1) == Dungeon.tileCorridorh) {
						validTile = 2; //
						xmod = 0;
						ymod = +1;
					}

					else if (Dungeon.getCell(newx + 1, newy) == Dungeon.tileDirtFloor
							|| Dungeon.getCell(newx + 1, newy) == Dungeon.tileCorridorv
							|| Dungeon.getCell(newx + 1, newy) == Dungeon.tileCorridorh) {
						validTile = 3; //
						xmod = -1;
						ymod = 0;
					}

					// check that we haven't got another door nearby, so we
					// won't get alot of openings besides each other

					if (validTile > -1) {
						if (Dungeon.getCell(newx, newy + 1) == Dungeon.tileDoorclosed) // north
							validTile = -1;
						else if (Dungeon.getCell(newx - 1, newy) == Dungeon.tileDoorclosed)// east
							validTile = -1;
						else if (Dungeon.getCell(newx, newy - 1) == Dungeon.tileDoorclosed)// south
							validTile = -1;
						else if (Dungeon.getCell(newx + 1, newy) == Dungeon.tileDoorclosed)// west
							validTile = -1;
					}

					// if we can, jump out of the loop and continue with the
					// rest
					if (validTile > -1)
						break;
				}
			}

			if (validTile > -1) {

				// choose what to build now at our newly found place, and at
				// what direction
				feature = Dungeon.getRand(0, 100);

				if (feature <= Dungeon.chanceRoom) { // a new room
					var w = Dungeon.getRand(6, 14);
					if (Dungeon.makeRoom((newx + xmod), (newy + ymod), w,
							w - 2, validTile)) {
						currentFeatures++; // add to our quota

						// then we mark the wall opening with a door
						Dungeon.setCell(newx, newy, Dungeon.tileDoorclosed);

						// clean up infront of the door so we can reach it
						Dungeon.setCell((newx + xmod), (newy + ymod),
								Dungeon.tileDirtFloor);

					}
				}

				else if (feature >= Dungeon.chanceRoom) { // new corridor
					if (Dungeon.makeCorridor((newx + xmod), (newy + ymod), 6,
							validTile)) {
						// same thing here, add to the quota and a door
						currentFeatures++;
						Dungeon.setCell(newx, newy, Dungeon.tileDoorclosed);
						this.exitx = newx;
						this.exity = newy;
					}
				}
			}
		}
	},


	creaarena : function(ix,iy){
		if (ix < 3)
			Dungeon.xsize = 3;
		else
			Dungeon.xsize = parseInt(ix-1);

		if (iy < 3)
			Dungeon.ysize = 3;
		else
			Dungeon.ysize = parseInt(iy-1);

		this.dungeon_map = [];
		this.visible = [];
		this.mapa = [];
		this.Aliens = [];
		this.items = [];
		this.spawner = [];
		this.doors = [];
		// for(x=0;x<Dungeon.xsize*Dungeon.ysize;x++){
		// Dungeon.visible.push(true);
		// }
		
		exitx=3;
		exity=3;

		espacio=parseInt(0);


		// start with making the "standard stuff" on the map
		for (y = espacio; y <= Dungeon.ysize-espacio; y++) {
			for (x = espacio; x <= Dungeon.xsize-espacio; x++) {
				// ie, making the borders of unwalkable walls
				if ((y == espacio || y==Dungeon.xsize - espacio) ||
					(x == espacio || x==Dungeon.ysize - espacio))
					Dungeon.setCell(x, y, 1);
				else
					Dungeon.setCell(x, y, Dungeon.getRand(5,15));
			}
		}
		
		hx=parseInt(Dungeon.xsize - espacio - 2);
		hy=parseInt(Dungeon.ysize - espacio - 2);
		xexit=ix/3;
		yexit=iy/3;
		Dungeon.setCell(parseInt(ix/3), parseInt(iy/3), 99);
		//Dungeon.setv(parseInt(ix/2), parseInt(iy/2));
	},


	borrar : function() {

		for (i = 0; i < this.dungeon_map.length; i++)
			this.dungeon_map.pop();
		this.dungeon_map = [];
		for (i = 0; i < this.visible.length; i++)
			this.visible[i] = false;
		this.visible = [];
		for (i = 0; i < this.Aliens.length; i++)
			this.Aliens.pop();
		this.Aliens = [];
		for (i = 0; i < this.spawner.length; i++)
			this.spawner.pop();
		this.spawner = [];

		for (i = 0; i < this.mapa.data.length; i++)
			this.mapa.data[i] = 0;
		this.mapa.data = [];
		this.puerta = false;
	},

	setcriatura : function(x, y, celltype) { // pone una celda del tablero de
		// un tipo
		Dungeon.critaturas[x + Dungeon.xsize * y] = celltype;
	},

	getcriatura : function(x, y) { // obtiene el valor de una celda del tablero
		return Dungeon.critaturas[x + Dungeon.xsize * y];
	},

	setCell : function(x, y, celltype) {// pone una celda del tablero de un tipo
		// (repe)
		Dungeon.dungeon_map[x + Dungeon.xsize * y] = celltype;

		if (celltype == Dungeon.tileDoorclosed) {
			if (Dungeon.dungeon_map[x + Dungeon.xsize * (y + 1)] == Dungeon.tileDirtWall
					&& Dungeon.dungeon_map[x + Dungeon.xsize * (y - 1)] == Dungeon.tileDirtWall)
				Dungeon.doors.push(new puerta(x, y, true));
			else
				Dungeon.doors.push(new puerta(x, y, false));

		}

	},

	getCell : function(x, y) {// obtiene el valor de una celda del tablero
		return Dungeon.dungeon_map[x + Dungeon.xsize * y];
	},

	// visibilidad

	ver : function(x, y) { // hace visible una casilla y las adyacentes por
		// flood (funcion recursiva, aveces peta por
		// recursividad masiva)
		Dungeon.setv(x, y);
		if ((x > 0 && x < Dungeon.xsize)
				&& Dungeon.dungeon_map[(x) + Dungeon.xsize * (y)] >= 4
				&& Dungeon.dungeon_map[(x) + Dungeon.xsize * (y)] < 16
				&& !Dungeon.visible[(x) + Dungeon.xsize * (y)]) {
			Dungeon.setv(x, y);
			if (Dungeon.dungeon_map[(x) + Dungeon.xsize * (y)] == Dungeon.tileDoorclosed) {
				this.puerta = true;

			}
			/*
			 * for(a=0;a<Dungeon.doors.length;a++){
			 * if(this.doors[a].casx==x*ancho && this.doors[a].casy==y*ancho){
			 * this.doors[a].abrir(); } }
			 */
		}
		if ((x > 0 && x < Dungeon.xsize)
				&& Dungeon.dungeon_map[(x + 1) + Dungeon.xsize * (y)] >= 4
				&& Dungeon.dungeon_map[(x + 1) + Dungeon.xsize * (y)] < 16
				&& !Dungeon.visible[(x + 1) + Dungeon.xsize * (y)]) {
			Dungeon.ver(x + 1, y);
		} else {
			Dungeon.setv(x + 1, y);
		}

		if ((x > 0 && x < Dungeon.xsize)
				&& Dungeon.dungeon_map[(x - 1) + Dungeon.xsize * (y)] >= 4
				&& Dungeon.dungeon_map[(x - 1) + Dungeon.xsize * (y)] < 16
				&& !Dungeon.visible[(x - 1) + Dungeon.xsize * (y)]) {
			Dungeon.ver(x - 1, y);
		} else {
			Dungeon.setv(x - 1, y);
		}
		if ((y > 0 && y < Dungeon.ysize)
				&& Dungeon.dungeon_map[(x) + Dungeon.xsize * (y + 1)] >= 4
				&& Dungeon.dungeon_map[(x) + Dungeon.xsize * (y + 1)] < 16
				&& !Dungeon.visible[(x) + Dungeon.xsize * (y + 1)]) {
			Dungeon.ver(x, y + 1);
		} else {
			Dungeon.setv(x, y + 1);
		}
		if ((y > 0 && y < Dungeon.ysize)
				&& Dungeon.dungeon_map[(x) + Dungeon.xsize * (y - 1)] >= 4
				&& Dungeon.dungeon_map[(x) + Dungeon.xsize * (y - 1)] < 16
				&& !Dungeon.visible[(x) + Dungeon.xsize * (y - 1)]) {
			Dungeon.ver(x, y - 1);
		} else {
			Dungeon.setv(x, y - 1);
		}

		// diagonales
		if ((y > 0 && y < Dungeon.ysize) && (x > 0 && x < Dungeon.xsize)
				&& Dungeon.dungeon_map[(x + 1) + Dungeon.xsize * (y + 1)] >= 4
				&& Dungeon.dungeon_map[(x + 1) + Dungeon.xsize * (y + 1)] < 16
				&& !Dungeon.visible[(x + 1) + Dungeon.xsize * (y + 1)]) {
			Dungeon.ver(x + 1, y + 1);
		} else {
			Dungeon.setv(x + 1, y + 1);
		}
		if ((y > 0 && y < Dungeon.ysize) && (x > 0 && x < Dungeon.xsize)
				&& Dungeon.dungeon_map[(x + 1) + Dungeon.xsize * (y - 1)] >= 4
				&& Dungeon.dungeon_map[(x + 1) + Dungeon.xsize * (y - 1)] < 16
				&& !Dungeon.visible[(x + 1) + Dungeon.xsize * (y - 1)]) {
			Dungeon.ver(x + 1, y - 1);
		} else {
			Dungeon.setv(x + 1, y - 1);
		}
		if ((y > 0 && y < Dungeon.ysize) && (x > 0 && x < Dungeon.xsize)
				&& Dungeon.dungeon_map[(x - 1) + Dungeon.xsize * (y + 1)] >= 4
				&& Dungeon.dungeon_map[(x - 1) + Dungeon.xsize * (y + 1)] < 16
				&& !Dungeon.visible[(x - 1) + Dungeon.xsize * (y + 1)]) {
			Dungeon.ver(x - 1, y + 1);
		} else {
			Dungeon.setv(x - 1, y + 1);
		}
		if ((y > 0 && y < Dungeon.ysize) && (x > 0 && x < Dungeon.xsize)
				&& Dungeon.dungeon_map[(x - 1) + Dungeon.xsize * (y - 1)] >= 4
				&& Dungeon.dungeon_map[(x - 1) + Dungeon.xsize * (y - 1)] < 16
				&& !Dungeon.visible[(x - 1) + Dungeon.xsize * (y - 1)]) {
			Dungeon.ver(x - 1, y - 1);
		} else {
			Dungeon.setv(x - 1, y - 1);
		}
	},


	setv : function(x, y) { // hace una celda visible
		if (Dungeon.dungeon_map[x + Dungeon.xsize * y] == Dungeon.tileAlien
				&& !Dungeon.isv(x, y))
			Dungeon.spawner.push(new Nido(x, y, zergb, this.getRand(48, 64)));
		if (Dungeon.dungeon_map[x + Dungeon.xsize * y] == Dungeon.tileChest
				&& !Dungeon.isv(x, y))
			Dungeon.items.push(new item(x, y, 1, botiquin));

		Dungeon.visible[x + Dungeon.xsize * y] = true;


		for (a = 0; a < Dungeon.Aliens.length; a++) { //muestra en el mapa los aliens

			if (Dungeon.Aliens[a].vida>0){
				var indice = parseInt(Dungeon.Aliens[a].casx/ancho) + ancho * parseInt(Dungeon.Aliens[a].casy/ancho);
				if(Dungeon.dungeon_map[indice]>1){
					o = (indice);
					i = o * 4;
					this.mapa.data[i + 0] = 0;
					this.mapa.data[i + 1] = 200;
					this.mapa.data[i + 2] = 0;
					this.mapa.data[i + 3] = 250;
				}
			}
			
		}

		o = (x + 64 * y);
		i = o * 4;
		switch (Dungeon.dungeon_map[o]) {
		case Dungeon.tileUnused: {

			this.mapa.data[i + 0] = 16;
			this.mapa.data[i + 1] = 16;
			this.mapa.data[i + 2] = 16;
			this.mapa.data[i + 3] = 250;
			break;
		}
		case Dungeon.tileDirtWall: {

			this.mapa.data[i + 0] = 250;
			this.mapa.data[i + 1] = 0;
			this.mapa.data[i + 2] = 0;
			this.mapa.data[i + 3] = 250;
			break;
		}
		case Dungeon.tileDoorclosed: {
			this.mapa.data[i + 0] = 190;
			this.mapa.data[i + 1] = 130;
			this.mapa.data[i + 2] = 0;
			this.mapa.data[i + 3] = 250;
			break;
		}

		case Dungeon.tileAlien: {
			this.mapa.data[i + 0] = 120;
			this.mapa.data[i + 1] = 120;
			this.mapa.data[i + 2] = 250;
			this.mapa.data[i + 3] = 250;
			// alert("exit");
			break;
		}

		case Dungeon.tileExit: {
			this.mapa.data[i + 0] = 0;
			this.mapa.data[i + 1] = 0;
			this.mapa.data[i + 2] = 255;
			this.mapa.data[i + 3] = 250;
			// alert("exit");
			break;
		}
		default: {
			this.mapa.data[i + 0] = 200;
			this.mapa.data[i + 1] = 200;
			this.mapa.data[i + 2] = 200;
			this.mapa.data[i + 3] = 250;
			break;
		}
		}


	},

	unsetv : function(x, y) { // oscurece una celda
		Dungeon.visible[x + Dungeon.xsize * y] = false;
	},

	isv : function(x, y) { // devuelve la visibilidad de una celda
		return Dungeon.visible[x + Dungeon.xsize * y];
	},

	iniciamapa : function(mx, my) {
		this.mapa = ctx.createImageData(64, 64);
		for (var i = 0; i < this.mapa.data.length; i += 4) {
			if ((i) % (mx * 4) == 0 || (i) % (mx * 4) == mx * 4 - 4
					|| (i < my * 4) || i > mx * my * 4 - mx * 4) {
				this.mapa.data[i + 0] = 250;
				this.mapa.data[i + 1] = 0;
				this.mapa.data[i + 2] = 0;
				this.mapa.data[i + 3] = 250;
			} else {
				this.mapa.data[i + 0] = 0;
				this.mapa.data[i + 1] = 0;
				this.mapa.data[i + 2] = 0;
				this.mapa.data[i + 3] = 250;
			}
		}

	},

	scaleImageData : function(imageData, scale) {
		var scaled = ctx.createImageData(imageData.width * scale,
				imageData.height * scale);
		var subLine = ctx.createImageData(scale, 1).data
		for (var row = 0; row < imageData.height; row++) {
			for (var col = 0; col < imageData.width; col++) {
				var sourcePixel = imageData.data.subarray((row
						* imageData.width + col) * 4,
						(row * imageData.width + col) * 4 + 4);
				for (var x = 0; x < scale; x++)
					subLine.set(sourcePixel, x * 4)
				for (var y = 0; y < scale; y++) {
					var destRow = row * scale + y;
					var destCol = col * scale;
					scaled.data.set(subLine,
							(destRow * scaled.width + destCol) * 4)
				}
			}
		}

		return scaled;
	},

	dibujamapa : function(x, y) {

		ctx.putImageData(this.scaleImageData(this.mapa, 3.0),
				canvas.width - 200, canvas.height - 200);

	},

	getRand : function(low, high) { // obtiene un nº aleatorio de low a high

		return ~~(Math.random() * (high - low)) + low;
	},

	makeCorridor : function(x, y, lenght, direction) { // crea un pasillo
		/** **************************************************************************** */
		// define the dimensions of the corridor (er.. only the width and
		// height..)
		len = Dungeon.getRand(2, lenght);
		floor = Dungeon.getRand(5, 15);
		dir = 0;
		if (direction > 0 && direction < 4)
			dir = direction;

		xtemp = 0;
		ytemp = 0;

		// reject corridors that are out of bounds
		if (x < 0 || x > Dungeon.xsize)
			return false;
		if (y < 0 || y > Dungeon.ysize)
			return false;

		switch (dir) {

		case 0: // north
			xtemp = x;

			// make sure it's not out of the boundaries
			for (ytemp = y; ytemp > (y - len); ytemp--) {
				if (ytemp < 0 || ytemp > Dungeon.ysize)
					return false; // oh boho, it was!
				if (Dungeon.getCell(xtemp, ytemp) !== Dungeon.tileUnused)
					return false;
			}

			// if we're still here, let's start building
			for (ytemp = y; ytemp > (y - len) - 1; ytemp--) {
				if (ytemp == (y - len)) {
					if (Dungeon.getCell(xtemp - 1, ytemp) == 0)
						Dungeon.setCell(xtemp - 1, ytemp, Dungeon.tileDirtWall);
					if (Dungeon.getCell(xtemp, ytemp) == 0)
						Dungeon.setCell(xtemp, ytemp, Dungeon.tileDirtWall);
					if (Dungeon.getCell(xtemp + 1, ytemp) == 0)
						Dungeon.setCell(xtemp + 1, ytemp, Dungeon.tileDirtWall);

				} else {

					if (Dungeon.getCell(xtemp - 1, ytemp) == 0)
						Dungeon.setCell(xtemp - 1, ytemp, Dungeon.tileDirtWall);
					Dungeon.setCell(xtemp, ytemp, Dungeon.tileCorridorh);
					if (Dungeon.getCell(xtemp + 1, ytemp) == 0)
						Dungeon.setCell(xtemp + 1, ytemp, Dungeon.tileDirtWall);
				}
			}
			break;

		case 1: // east
			ytemp = y;

			for (xtemp = x; xtemp < (x + len); xtemp++) {
				if (xtemp < 0 || xtemp > Dungeon.xsize)
					return false;
				if (Dungeon.getCell(xtemp, ytemp) !== Dungeon.tileUnused)
					return false;
			}

			for (xtemp = x; xtemp < (x + len) + 1; xtemp++) {
				if (xtemp == x + len) {
					if (Dungeon.getCell(xtemp, ytemp - 1) == 0)
						Dungeon.setCell(xtemp, ytemp - 1, Dungeon.tileDirtWall);
					if (Dungeon.getCell(xtemp, ytemp) == 0)
						Dungeon.setCell(xtemp, ytemp, Dungeon.tileDirtWall);
					if (Dungeon.getCell(xtemp, ytemp + 1) == 0)
						Dungeon.setCell(xtemp, ytemp + 1, Dungeon.tileDirtWall);
				} else {
					if (Dungeon.getCell(xtemp, ytemp - 1) == 0)
						Dungeon.setCell(xtemp, ytemp - 1, Dungeon.tileDirtWall);
					Dungeon.setCell(xtemp, ytemp, Dungeon.tileCorridorv);
					if (Dungeon.getCell(xtemp, ytemp + 1) == 0)
						Dungeon.setCell(xtemp, ytemp + 1, Dungeon.tileDirtWall);
				}
			}
			break;

		case 2: // south
			xtemp = x;

			for (ytemp = y; ytemp < (y + len); ytemp++) {
				if (ytemp < 0 || ytemp > Dungeon.ysize)
					return false;
				if (Dungeon.getCell(xtemp, ytemp) !== Dungeon.tileUnused)
					return false;
			}

			for (ytemp = y; ytemp < (y + len) + 1; ytemp++) {
				if (ytemp == (y + len)) {
					if (Dungeon.getCell(xtemp - 1, ytemp) == 0)
						Dungeon.setCell(xtemp - 1, ytemp, Dungeon.tileDirtWall);
					if (Dungeon.getCell(xtemp, ytemp) == 0)
						Dungeon.setCell(xtemp, ytemp, Dungeon.tileDirtWall);
					if (Dungeon.getCell(xtemp + 1, ytemp) == 0)
						Dungeon.setCell(xtemp + 1, ytemp, Dungeon.tileDirtWall);

				} else {

					if (Dungeon.getCell(xtemp - 1, ytemp) == 0)
						Dungeon.setCell(xtemp - 1, ytemp, Dungeon.tileDirtWall);
					Dungeon.setCell(xtemp, ytemp, Dungeon.tileCorridorh);
					if (Dungeon.getCell(xtemp + 1, ytemp) == 0)
						Dungeon.setCell(xtemp + 1, ytemp, Dungeon.tileDirtWall);
				}
			}
			break;

		case 3: // west
			ytemp = y;

			for (xtemp = x; xtemp > (x - len); xtemp--) {
				if (xtemp < 0 || xtemp > Dungeon.xsize)
					return false;
				if (Dungeon.getCell(xtemp, ytemp) !== Dungeon.tileUnused)
					return false;
			}

			for (xtemp = x; xtemp > (x - len) - 1; xtemp--) {
				if (xtemp == x - len) {
					if (Dungeon.getCell(xtemp, ytemp - 1) == 0)
						Dungeon.setCell(xtemp, ytemp - 1, Dungeon.tileDirtWall);
					if (Dungeon.getCell(xtemp, ytemp) == 0)
						Dungeon.setCell(xtemp, ytemp, Dungeon.tileDirtWall);
					if (Dungeon.getCell(xtemp, ytemp + 1) == 0)
						Dungeon.setCell(xtemp, ytemp + 1, Dungeon.tileDirtWall);
				} else {
					if (Dungeon.getCell(xtemp, ytemp - 1) == 0)
						Dungeon.setCell(xtemp, ytemp - 1, Dungeon.tileDirtWall);
					Dungeon.setCell(xtemp, ytemp, Dungeon.tileCorridorv);
					if (Dungeon.getCell(xtemp, ytemp + 1) == 0)
						Dungeon.setCell(xtemp, ytemp + 1, Dungeon.tileDirtWall);
				}
			}
			break;
		}

		// woot, we're still here! let's tell the other guys we're done!!
		return true;
	},

	makeRoom : function(x, y, xlength, ylength, direction) { // crea una
		// habitacion
		/** **************************************************************************** */

		// define the dimensions of the room, it should be at least 4x4 tiles
		// (2x2 for walking on, the rest is walls)
		xlen = Dungeon.getRand(5, xlength);
		ylen = Dungeon.getRand(5, ylength);

		// the tile type it's going to be filled with
		floor = Dungeon.getRand(5, 9);
		wall = Dungeon.tileDirtWall; // jordv????gg

		// choose the way it's pointing at
		dir = 0;
		if (direction > 0 && direction < 4)
			dir = direction;

		switch (dir) {

		case 0: // north

			// Check if there's enough space left for it
			for (ytemp = y; ytemp > (y - ylen); ytemp--) {
				if (ytemp < 0 || ytemp > Dungeon.ysize)
					return false;
				for (xtemp = x - parseInt(xlen / 2); xtemp < x
						+ parseInt((xlen + 1) / 2); xtemp++) {
					if (xtemp < 0 || xtemp > Dungeon.xsize)
						return false;
					if (Dungeon.getCell(xtemp, ytemp) !== Dungeon.tileUnused)
						return false; // no space left...

				}
			}

			// we're still here, build
			for (ytemp = y; ytemp > (y - ylen); ytemp--) {
				for (xtemp = x - parseInt(xlen / 2); xtemp < x
						+ parseInt((xlen + 1) / 2); xtemp++) {
					// start with the walls
					if (xtemp == x - parseInt(xlen / 2))
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (xtemp == x + parseInt((xlen - 1) / 2))
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (ytemp == y)
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (ytemp == (y - ylen + 1))
						Dungeon.setCell(xtemp, ytemp, wall);
					// and then fill with the floor
					else {
						Dungeon.setCell(xtemp, ytemp, Dungeon.getRand(5, 15));
						exitx = xtemp;
						exity = ytemp;
					}
				}
			}

			break;

		case 1: // east

			for (ytemp = y - parseInt(ylen / 2); ytemp < (y + parseInt(ylen + 1) / 2); ytemp++) {
				if (ytemp < 0 || ytemp > Dungeon.ysize)
					return false;
				for (xtemp = x; xtemp < (x + xlen); xtemp++) {
					if (xtemp < 0 || xtemp > Dungeon.xsize)
						return false;
					if (Dungeon.getCell(xtemp, ytemp) !== Dungeon.tileUnused)
						return false;
				}
			}

			for (ytemp = y - parseInt(ylen / 2); ytemp < (y + parseInt(ylen + 1) / 2); ytemp++) {
				for (xtemp = x; xtemp < (x + xlen); xtemp++) {
					if (xtemp == x)
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (xtemp == (x + xlen - 1))
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (ytemp == y - parseInt(ylen / 2))
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (ytemp == y + parseInt((ylen - 1) / 2))
						Dungeon.setCell(xtemp, ytemp, wall);
					else {
						Dungeon.setCell(xtemp, ytemp, Dungeon.getRand(5, 15));
						exitx = xtemp;
						exity = ytemp;
					}
				}
			}

			break;

		case 2: // south

			for (ytemp = y; ytemp < (y + ylen); ytemp++) {
				if (ytemp < 0 || ytemp > Dungeon.ysize)
					return false;
				for (xtemp = x - parseInt(xlen / 2); xtemp < x
						+ parseInt((xlen + 1) / 2); xtemp++) {
					if (xtemp < 0 || xtemp > Dungeon.xsize)
						return false;
					if (Dungeon.getCell(xtemp, ytemp) !== Dungeon.tileUnused)
						return false;
				}
			}

			for (ytemp = y; ytemp < (y + ylen); ytemp++) {
				for (xtemp = x - parseInt(xlen / 2); xtemp < x
						+ parseInt((xlen + 1) / 2); xtemp++) {
					if (xtemp == x - parseInt(xlen / 2))
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (xtemp == x + parseInt((xlen - 1) / 2))
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (ytemp == y)
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (ytemp == (y + ylen) - 1)
						Dungeon.setCell(xtemp, ytemp, wall);
					else {
						Dungeon.setCell(xtemp, ytemp, Dungeon.getRand(5, 15));
						exitx = xtemp - 1;
						exity = ytemp - 1;
					}
				}
			}

			break;

		case 3: // west

			for (ytemp = y - parseInt(ylen / 2); ytemp < y
					+ parseInt((ylen + 1) / 2); ytemp++) {
				if (ytemp < 0 || ytemp > Dungeon.ysize)
					return false;
				for (xtemp = x; xtemp > (x - xlen); xtemp--) {
					if (xtemp < 0 || xtemp > Dungeon.xsize)
						return false;
					if (Dungeon.getCell(xtemp, ytemp) !== Dungeon.tileUnused)
						return false;
				}
			}

			for (ytemp = y - parseInt(ylen / 2); ytemp < y
					+ parseInt((ylen + 1) / 2); ytemp++) {
				for (xtemp = x; xtemp > (x - xlen); xtemp--) {
					if (xtemp == x)
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (xtemp == (x - xlen + 1))
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (ytemp == y - parseInt(ylen / 2))
						Dungeon.setCell(xtemp, ytemp, wall);
					else if (ytemp == y + parseInt((ylen - 1) / 2))
						Dungeon.setCell(xtemp, ytemp, wall);
					else {
						Dungeon.setCell(xtemp, ytemp, Dungeon.getRand(5, 15));
						exitx = xtemp;
						exity = ytemp;
					}
				}
			}

			break;
		}

		// yay, all done
		Dungeon.nh++;
		return true;
	},

	showDungeon : function() {
		/** **************************************************************************** */
		// used to print the map on the screen
		dungeonMap = "";
		for (y = 0; y < Dungeon.ysize; y++) {
			for (x = 0; x < Dungeon.xsize; x++) {
				switch (Dungeon.getCell(x, y)) {
				case 0:
					dungeonMap += "m";
					break;
				case 1:
					dungeonMap += "+";
					break;
				case 2:
					dungeonMap += "_";
					break;
				case 3:
					dungeonMap += "O";
					break;
				case 4:
					dungeonMap += "#";
					break;
				case 5:
					dungeonMap += "D";
					break;
				case 6:
					dungeonMap += "<";
					break;
				case 7:
					dungeonMap += ">";
					break;
				case 8:
					dungeonMap += "*";
					break;
				}
			}
			dungeonMap += "\n";
		}
		return dungeonMap;

	},

	findPath : function(pathStart, pathEnd){
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
 // var distanceFunction = ManhattanDistance;
  //var findNeighbours = function(){}; // empty

  

  // alternate heuristics, depending on your game:

  // diagonals allowed but no sqeezing through cracks:
  //var distanceFunction = DiagonalDistance;
  //var findNeighbours = DiagonalNeighbours;

  // diagonals and squeezing through cracks allowed:
  //var distanceFunction = DiagonalDistance;
  //var findNeighbours = DiagonalNeighboursFree;

  // euclidean but no squeezing through cracks:
  var distanceFunction = EuclideanDistance;
  var findNeighbours = DiagonalNeighbours;

  // euclidean and squeezing through cracks allowed:
  //var distanceFunction = EuclideanDistance;
  //var findNeighbours = DiagonalNeighboursFree;

  

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
    return (Dungeon.getCell(x,y) > 1 );
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





}