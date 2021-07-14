var Feuerwerk;
(function (Feuerwerk) {
    console.log("Rectangle");
    class Rectangle extends Particle {
        constructor(_positon, _velocity) {
            super();
            this.position = new Vector(0, 0);
            this.position.x = _positon.x;
            this.position.y = _positon.y;
            this.velocity = _velocity;
        }
        draw(_color, _particleRadius) {
            crc2.beginPath();
            crc2.fillStyle = _color;
            crc2.fillRect(this.position.x, this.position.y, _particleRadius, _particleRadius);
            crc2.fill();
        }
    }
    Feuerwerk.Rectangle = Rectangle;
})(Feuerwerk || (Feuerwerk = {}));
//# sourceMappingURL=rectangle.js.map