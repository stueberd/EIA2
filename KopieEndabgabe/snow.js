var Zauberbild;
(function (Zauberbild) {
    class Snow extends Zauberbild.Values {
        constructor() {
            super();
            this.x = Math.random() * Zauberbild.canvas.width;
            this.y = Math.random() * Zauberbild.canvas.height;
            this.dx = Math.random() * 20;
            this.dy = Math.random() * 10;
            this.size = Math.random() * 10;
            this.r = Math.random() * 20;
            this.type = "Snow";
        }
        draw() {
            let flocke = new Path2D();
            flocke.arc(this.x, this.y, this.size, 0, 360);
            Zauberbild.crc.fillStyle = "white";
            Zauberbild.crc.fill(flocke);
            Zauberbild.crc.stroke(flocke);
        }
        update(x, y) {
            this.move(x, y);
            this.draw();
            console.log(this.x, this.y);
        }
        move(x, y) {
            this.y += this.dy;
            this.y += y;
            this.x += x;
            this.y += this.dx;
            console.log("drawtest");
            if (this.x > Zauberbild.canvas.width || this.x < 0 || this.y > Zauberbild.canvas.height || this.y < 0) {
                this.x = 0;
                this.y = Zauberbild.canvas.height * Math.random();
            }
        }
    }
    Zauberbild.Snow = Snow;
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=snow.js.map