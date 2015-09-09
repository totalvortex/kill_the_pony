var panel = { // clase para el personaje
	casx : 0,
	casy : 0,
	img : null,
	items : [],
	imgchapa : null,
	nombre : "Player",

	creapanel : function(sprite, reverse) {

		this.img = sprite;
		this.casx = Machango.casx - parseInt(canvas.width / 2);
		this.casy = Machango.casy - parseInt(canvas.height / 2);
		this.imgchapa = chapa;
		this.vida = ctx.createImageData(10, 90);
	},

	update : function() {
		this.casx = Machango.casx - parseInt(canvas.width / 2);
		this.casy = Machango.casy - parseInt(canvas.height / 2);

		for (i = 0; i < this.vida.length; i += 4) {
			this.barravida.data[i + 0] = 250;
			this.barravida.data[i + 1] = 0;
			this.barravida.data[i + 2] = 0;
			this.barravida.data[i + 3] = 250;
		}

	},

	render : function() {
		ctx.drawImage(chapa, 0, 0, chapa.width, chapa.height, this.casx + 19,
				this.casy + canvas.height - chapa.height - 120, chapa.width,
				chapa.height);
		ctx.save();
		ctx.scale(-1.0, 1.0);

	//	ctx.putImageData(this.vida, this.casx + 19, this.casy + canvas.height
	//			- chapa.height - 100);

		ctx.drawImage(this.img, 0, 0, this.img.width, this.img.height,
				-this.casx - this.img.width, this.casy + canvas.height
						- this.img.height, this.img.width, this.img.height);
		ctx.restore();
		ctx.fillStyle = "rgb(250, 250, 250)";
		ctx.font = "14px Helvetica";
		ctx.textAlign = "left";
		ctx.textBaseline = "top";
		ctx.fillText(this.nombre, this.casx + 40, this.casy + canvas.height
				- chapa.height - 103);

	}
}