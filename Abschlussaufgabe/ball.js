var Fußball;
(function (Fußball) {
    class Ball extends Fußball.Moveable {
        constructor(_position) {
            super(_position);
            let x = 450;
            let y = 300;
            let a = Math.random();
            let b = Math.random(); //Ball geht nach unten, da Math.random positiv ist
            this.position = new Vector(x, y);
            this.color = "white";
            if (_position)
                this.position = _position;
            else
                this.position = new Vector(x, y);
            this.velocity = new Vector(a, b);
        }
        move(_timeslice) {
            this.position.add(this.velocity);
            if (this.position.x + 10 > 900 || this.position.x - 5 < 0) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.position.y + 10 > 600 || this.position.y - 5 < 0) {
                this.velocity.y = -this.velocity.y;
            }
        }
        draw() {
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
            crc2.fillStyle = this.color;
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(this.position.x + 3, this.position.y + 2, 1.4, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(this.position.x - 3, this.position.y + 2, 1.4, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(this.position.x - 3, this.position.y - 2, 1.4, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
            crc2.beginPath();
            crc2.arc(this.position.x + 3, this.position.y - 2, 1.4, 0, 2 * Math.PI);
            crc2.fillStyle = "black";
            crc2.fill();
            crc2.closePath();
        }
    }
    Fußball.Ball = Ball;
})(Fußball || (Fußball = {}));
//# sourceMappingURL=ball.js.map