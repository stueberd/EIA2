var Zauberbild;
(function (Zauberbild) {
    class Bubblegum extends Zauberbild.Values {
        constructor() {
            super();
            this.x = Math.random() * Zauberbild.canvas.width;
            this.y = Math.random() * Zauberbild.canvas.height;
            this.dx = Math.random() * 10;
            this.dy = Math.random() * 5;
            this.size = 10;
            this.r = Math.random() * 10;
            this.type = "Bubblegum";
        }
        draw() {
            let circle = new Path2D();
            circle.arc(this.x, this.y, this.r, 0, 360);
            Zauberbild.crc.fillStyle = "pink";
            Zauberbild.crc.fill(circle);
            Zauberbild.crc.stroke(circle);
            //console.log("rotation rot");
        }
        update(x, y) {
            this.move(x, y);
            this.draw();
            //console.log(this.x, this.y);
        }
        move(x, y) {
            this.r += Math.random() * 2;
            if (this.r >= 40) {
                this.r -= Math.random() * 2;
            }
            this.y += y;
            this.x += x;
        }
    }
    Zauberbild.Bubblegum = Bubblegum;
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=Bubblegum.js.map