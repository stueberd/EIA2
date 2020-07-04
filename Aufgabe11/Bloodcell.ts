namespace L11_Virus {
    export class Bloodcell extends Moveable {
        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number, _position?: Vector) {
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

        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            
            // Skalierung vertikal und horizontal
            crc2.scale(this.size, this.size);
            crc2.translate(-50, -50);

            // Ellipse
            crc2.beginPath();
            crc2.ellipse(this.position.x, this.position.y, 10, 5, Math.PI / 1, 0, 2 * Math.PI);
            crc2.closePath();
            crc2.stroke();

            crc2.fill();
            crc2.restore();

            // Farbe Zellen
            crc2.fillStyle = "hsla(360, 100%, 100%, 0.56)";
            crc2.fill();
            // Linienfarbe
            crc2.strokeStyle = "#FBAFAF";
            crc2.stroke();
        }
    }
}