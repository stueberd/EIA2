namespace L11_Virus {
    export class Antibody extends Moveable {
        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number, _position?: Vector) {
            super(_position);

            console.log("Antibody constructor");

            if (_position)
                this.position = _position.copy();
            else
                this.position = new Vector(0, 0);
            
            this.velocity = new Vector(0, 0);
            this.velocity.random(40, 100);

            this.size = _size;
        }

        draw(): void {
            crc2.save();
            crc2.translate(this.position.x, this.position.y);
            
            // Skalierung vertikal und horizontal
            crc2.scale(this.size, this.size);
            crc2.translate(-50, -50);

            crc2.beginPath();
            crc2.moveTo(75, 50);
            crc2.lineTo(100, 100);
            crc2.lineTo(100, 10);
            // crc2.closePath();

            // crc2.fill();
            crc2.restore();

            // Linienfarbe
            crc2.strokeStyle = "#FFFFFF";
            crc2.stroke();
        }
    }
}