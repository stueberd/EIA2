var Soccer;
(function (Soccer) {
    class Linesman extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            let x = 900 * Math.random();
            let y = 590;
            let a = -0.5;
            let b = 0;
            this.position = new Soccer.Vector(x, y);
            //this.position = _position;
            this.color = "yellow";
            if (_position)
                this.position = _position;
            else
                this.position = new Soccer.Vector(x, y);
            this.velocity = new Soccer.Vector(a, b);
        }
        move(_timeslice) {
            this.position.add(this.velocity);
            //mit Kollision
            if (this.position.x + 10 > 900 || this.position.x - 10 < 0) {
                this.velocity.x = -this.velocity.x;
            }
        }
        draw() {
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            Soccer.crc2.fillStyle = this.color;
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
        }
    }
    Soccer.Linesman = Linesman;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=linesman.js.map