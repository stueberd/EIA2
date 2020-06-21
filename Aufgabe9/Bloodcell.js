var L09_Virus;
(function (L09_Virus) {
    class Bloodcell {
        constructor(_size, _position) {
            console.log("Bloodcell constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L09_Virus.Vector(0, 0);
            this.velocity = new L09_Virus.Vector(0, 0);
            this.velocity.random(100, 200);
            this.size = _size;
        }
        move(_timeslice) {
            let offset = new L09_Virus.Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.add(offset);
            if (this.position.y < 0)
                this.position.y = L09_Virus.crc2.canvas.height;
            if (this.position.x > L09_Virus.crc2.canvas.width)
                this.position.y = L09_Virus.crc2.canvas.width;
            if (this.position.y > L09_Virus.crc2.canvas.height)
                this.position.y = L09_Virus.crc2.canvas.height;
        }
        draw() {
            L09_Virus.crc2.save();
            L09_Virus.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            L09_Virus.crc2.scale(this.size, this.size);
            L09_Virus.crc2.translate(-50, -50);
            // Ellipse
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.ellipse(this.position.x, this.position.y, 10, 5, Math.PI / 1, 0, 2 * Math.PI);
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.stroke();
            L09_Virus.crc2.fill();
            L09_Virus.crc2.restore();
            // Farbe Zellen
            L09_Virus.crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            L09_Virus.crc2.fill();
            // Linienfarbe
            L09_Virus.crc2.strokeStyle = "#FBAFAF";
            L09_Virus.crc2.stroke();
        }
    }
    L09_Virus.Bloodcell = Bloodcell;
})(L09_Virus || (L09_Virus = {}));
//# sourceMappingURL=Bloodcell.js.map