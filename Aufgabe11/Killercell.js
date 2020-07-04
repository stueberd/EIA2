var L11_Virus;
(function (L11_Virus) {
    class Killercell extends L11_Virus.Moveable {
        constructor(_size, _position) {
            super(_position);
            this.infected = false;
            console.log("Killercell constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
            this.velocity.random(50, 100);
            this.size = _size;
        }
        static getDifference(_v0, _v1) {
            let vector = new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
            return vector;
        }
        draw() {
            if (this.contact == true) {
                this.KillercellInfected();
            }
            else {
                this.drawKillercell();
            }
        }
        drawKillercell() {
            let radius = 20;
            let gradient = L11_Virus.crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FA8E04");
            gradient.addColorStop(1, "#FAFA04");
            L11_Virus.crc2.save();
            L11_Virus.crc2.translate(this.position.x, this.position.y);
            // Skalierung vertikal und horizontal
            L11_Virus.crc2.scale(this.size, this.size);
            L11_Virus.crc2.translate(-50, -50);
            L11_Virus.crc2.fillStyle = gradient;
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.fill();
            L11_Virus.crc2.restore();
        }
        KillercellInfected() {
            console.log("Infected");
            let radius = 20;
            let gradient = L11_Virus.crc2.createRadialGradient(0, 0, radius, 0, 0, 0);
            gradient.addColorStop(0, "#FE5252");
            gradient.addColorStop(1, "#BD0101");
            L11_Virus.crc2.save();
            L11_Virus.crc2.translate(this.position.x, this.position.y);
            L11_Virus.crc2.scale(this.size, this.size);
            L11_Virus.crc2.translate(-50, -50);
            L11_Virus.crc2.fillStyle = gradient;
            L11_Virus.crc2.beginPath();
            L11_Virus.crc2.arc(0, 0, radius, 0, 2 * Math.PI);
            L11_Virus.crc2.closePath();
            L11_Virus.crc2.fill();
            L11_Virus.crc2.restore();
        }
    }
    L11_Virus.Killercell = Killercell;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Killercell.js.map