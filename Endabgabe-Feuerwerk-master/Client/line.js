var Feuerwerk;
(function (Feuerwerk) {
    console.log("line");
    class Line extends Particle {
        constructor(_position, _velocity) {
            super();
            this.position.x = _position.x;
            this.position.y = _position.y;
            this.velocity = _velocity;
        }
        draw(_color) {
            crc2.beginPath();
            crc2.fillStyle = _color;
            crc2.lineTo(this.position.x, this.position.y);
            crc2.fill();
        }
    }
    Feuerwerk.Line = Line;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=line.js.map