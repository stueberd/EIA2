var Zauberbild;
(function (Zauberbild) {
    class FliegerKlasse extends Zauberbild.Values {
        constructor() {
            super();
            this.x = Math.random() * Zauberbild.canvas.width;
            this.y = Math.random() * Zauberbild.canvas.height;
            this.dx = Math.random() * 3;
            this.dy = Math.random() * 2;
            this.size = 10;
            //this.r = Math.random() * 10 + 10;
            this.type = "FliegerKlasse";
        }
        draw() {
            let flieger = new Path2D();
            flieger.moveTo(this.x, this.y);
            flieger.lineTo(this.x + 40, this.y);
            flieger.lineTo(this.x + 20, this.y + 40);
            flieger.lineTo(this.x + 20, this.y + 20);
            Zauberbild.crc.fillStyle = "black";
            Zauberbild.crc.fill(flieger);
            Zauberbild.crc.stroke(flieger);
        }
        update(x, y) {
            this.move(x, y);
            this.draw();
            console.log(this.x, this.y);
        }
        move(x, y) {
            this.x += this.dx;
            this.y += y;
            this.x += x;
            this.y += this.dy;
            console.log("flieger funktioniert");
            if (this.x > Zauberbild.canvas.width || this.x < 0 || this.y > Zauberbild.canvas.height || this.y < 0) {
                this.x = 0;
                this.y = Zauberbild.canvas.height * Math.random();
            }
        }
    }
    Zauberbild.FliegerKlasse = FliegerKlasse;
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=FliegerKlasse.js.map