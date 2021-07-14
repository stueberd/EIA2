var Soccer;
(function (Soccer) {
    class Ball extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            let x = 450;
            let y = 300;
            let a = Math.random();
            let b = Math.random(); //Ball geht nach unten, da Math.random positiv ist
            this.position = new Soccer.Vector(x, y);
            this.color = "white";
            if (_position)
                this.position = _position;
            else
                this.position = new Soccer.Vector(x, y);
            this.velocity = new Soccer.Vector(a, b);
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
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, 5, 0, 2 * Math.PI);
            Soccer.crc2.fillStyle = this.color;
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x + 3, this.position.y + 2, 1.4, 0, 2 * Math.PI);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x - 3, this.position.y + 2, 1.4, 0, 2 * Math.PI);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x - 3, this.position.y - 2, 1.4, 0, 2 * Math.PI);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x, this.position.y, 2, 0, 2 * Math.PI);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
            Soccer.crc2.beginPath();
            Soccer.crc2.arc(this.position.x + 3, this.position.y - 2, 1.4, 0, 2 * Math.PI);
            Soccer.crc2.fillStyle = "black";
            Soccer.crc2.fill();
            Soccer.crc2.closePath();
        }
    }
    Soccer.Ball = Ball;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=Ball.js.map