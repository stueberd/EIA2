namespace L09_Virus {
    export class Bloodcell {
        position: Vector;
        velocity: Vector;
        size: number;

        constructor(_size: number, _position?: Vector) {
            console.log("Bloodcell constructor");
            if (_position)
                this.position = _position;
            else
                this.position = new Vector(0, 0);
            
            this.velocity = new Vector(0, 0);
            this.velocity.random(100, 200);

            this.size = _size;
        }

        move(_timeslice: number): void {
            let offset: Vector = new Vector(this.velocity.x, this.velocity.y);
            offset.scale(_timeslice);
            this.position.add(offset);

            if (this.position.x < 0)
                this.position.add(offset);
            if (this.position.y < 0)
                this.position.y = crc2.canvas.height;
            if (this.position.x > crc2.canvas.width)
                this.position.y = crc2.canvas.width;
            if (this.position.y > crc2.canvas.height)
                this.position.y = crc2.canvas.height;
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