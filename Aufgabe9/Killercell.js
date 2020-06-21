var L09_Virus;
(function (L09_Virus) {
    class Killercell {
        constructor(_size, _position) {
            console.log("Killercell constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new L09_Virus.Vector(0, 0);
            this.velocity = new L09_Virus.Vector(0, 0);
            this.velocity.random(50, 100);
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
            let radius = 15;
            let gradient = L09_Virus.crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FA8E04");
            gradient.addColorStop(1, "#FAFA04");
            L09_Virus.crc2.save();
            L09_Virus.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            L09_Virus.crc2.scale(this.size, this.size);
            L09_Virus.crc2.translate(-50, -50);
            L09_Virus.crc2.fillStyle = gradient;
            L09_Virus.crc2.beginPath();
            L09_Virus.crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            L09_Virus.crc2.closePath();
            L09_Virus.crc2.fill();
            L09_Virus.crc2.restore();
        }
        isHit(_virusposition) {
            let hitsize = 15 * this.size;
            let difference = new L09_Virus.Vector(_virusposition.x - this.position.x, _virusposition.y - this.position.y);
            // && = beide Werte müssen kleiner sein
            return (Math.abs(difference.x) < hitsize && Math.abs(difference.y) < hitsize);
        }
    }
    L09_Virus.Killercell = Killercell;
})(L09_Virus || (L09_Virus = {}));
//# sourceMappingURL=Killercell.js.map