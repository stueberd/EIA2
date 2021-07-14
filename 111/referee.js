var Soccer;
(function (Soccer) {
    class Referee extends Soccer.Moveable {
        constructor(_position) {
            super(_position);
            this.color = "#ff748c";
            /*  let x: number = 900 * Math.random();
             let y: number = 400 * Math.random();
             let a: number = Math.random();
             let b: number = Math.random();
             this.position = new Vector(x, y);
             if (_position)
             this.position = _position;
             else
             this.position = new Vector(x, y);
             this.velocity = new Vector(a, b); */
        }
        move(_timeslice) {
            this.position.add(this.velocity);
            //mit Kollision
            if (this.position.x + 10 > 900 || this.position.x - 10 < 0) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.position.y + 10 > 600 || this.position.y - 10 < 0) {
                this.velocity.y = -this.velocity.y;
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
    Soccer.Referee = Referee;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=referee.js.map