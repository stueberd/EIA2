var L11_Virus;
(function (L11_Virus) {
    class Bloodcell extends L11_Virus.Moveable {
        constructor(_size, _position) {
            super(_position);
            console.log("Bloodcell constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.velocity.random(50, 100);
            this.size = _size;
        }
        draw() {
            L11_Virus.crc2.save();
            L11_Virus.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            L11_Virus.crc2.scale(this.size, this.size);
            L11_Virus.crc2.translate(-50, -50);
            // Ellipse
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.ellipse(this.position.x, this.position.y, 10, 5, Math.PI / 1, 0, 2 * Math.PI);
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.stroke();
            L11_Virus.crc2.fill();
            L11_Virus.crc2.restore();
            // Farbe Zellen
            L11_Virus.crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            L11_Virus.crc2.fill();
            // Linienfarbe
            L11_Virus.crc2.strokeStyle = "#FBAFAF";
            L11_Virus.crc2.stroke();
        }
    }
    L11_Virus.Bloodcell = Bloodcell;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Bloodcell.js.map