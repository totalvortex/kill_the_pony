function Escudo(x, y, sprt, rad) {
    this.casx = x;
    this.casy = y;
    this.contador = 0;
    this.img = sprt;
    this.radio = rad;
    this.activo = true;
    this.creciendo = false;

    this.update = function() {
        this.casx = Machango.casx;
        this.casy = Machango.casy;
        if (this.activo) {
            if (this.contador < 128 && this.creciendo) {
                this.contador = this.contador + 2;

            } else {
                this.contador = 0;
                this.creciendo = false;
            }
            var valor = 0.9;
            for (a = 0; a < Dungeon.Aliens.length; a++) {
                if (Dungeon.Aliens[a].CCcol(this.casx, this.casy, parseInt(this.contador * valor) + this.radio)) {
                    Dungeon.Aliens[a].vida--;
                }
            }
        }
    }

    this.render = function() {
        //alert("render");
        if (this.activo)
            ctx.drawImage(wave, this.casx - this.contador - this.radio + 8,
                this.casy - this.radio + 8 - this.contador, ancho + this.radio + this.contador * 2, ancho + this.contador * 2 + this.radio);
    }

    this.activar = function() {
        this.activo = !this.activo;
    }

    this.bomba = function() {
        this.creciendo = true;
    }


}