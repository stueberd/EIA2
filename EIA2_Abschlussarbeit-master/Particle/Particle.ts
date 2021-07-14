namespace Feiawork {
    export class Particle extends MoveableObject {
        private static gravity: number = 1;
        public position: Vector;
        public velocity: Vector;
        private shape: string; 
        private lifetime: number;
        private color: string;


        constructor(_position: Vector, _velocity: Vector, _color: string, _lifetime: number, _shape: string) {
            super(_position);  //holt sich _position aus der Elternklasse
            this.color = _color;        //die Farbe von dieser Klasseninstanz wird auf _color gesetzt
            this.velocity = _velocity.copy();
            this.lifetime = _lifetime;
            this.shape = _shape;
        }

        public move(_timeslice: number): void {             
            super.move(_timeslice);
            this.velocity.y += Particle.gravity;        //setzt die geschwindigkeit in y richtung auf die gravity des Particles
            this.lifetime -= _timeslice;
            if (this.lifetime < 0)
                this.expendable = true;

            // this.position.x += this.velocity.x;
            // this.position.y += this.velocity.y;

        }


        public draw(): void {
            switch (this.shape) {           //switch case löschen und nur dots nehmen reicht ja auch 
                case "dot":
                    crc2.save();
                    crc2.beginPath();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.arc(0, 0, 4, 0, 2 * Math.PI);
                    crc2.closePath();
                    crc2.fillStyle = this.color;
                    crc2.fill();
                    crc2.restore();
                    break;
                case "sparks":
                    crc2.save();
                    crc2.beginPath();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.scale(0.5, 0.5);
                    crc2.ellipse(10, 5, 5, 35, Math.PI / 15, 2, 2 * Math.PI);
                    //crc2.ellipse(-10, 5, 5, 25, Math.PI / -15, 2, 2 * Math.PI);
                    //crc2.ellipse(5, 5, 5, 44, Math.PI / 55, 2, 2 * Math.PI);
                    crc2.closePath();
                    crc2.fillStyle = this.color;
                    crc2.fill();
                    crc2.restore();
                    break;
                case "star":
                    crc2.save();
                    crc2.beginPath();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.scale(0.2, 0.2);
                    crc2.moveTo(75, 30);
                    crc2.lineTo(90, 60);
                    crc2.lineTo(125, 75);
                    crc2.lineTo(95, 85);
                    crc2.lineTo(105, 130);
                    crc2.lineTo(75, 110);
                    crc2.lineTo(45, 130);
                    crc2.lineTo(55, 85);
                    crc2.lineTo(55, 85);
                    crc2.lineTo(20, 70);
                    crc2.lineTo(55, 60);
                    crc2.closePath();
                    crc2.fillStyle = this.color;
                    crc2.fill();
                    crc2.restore();
                    break;
                    case "triangle":
                    crc2.save();
                    crc2.beginPath();
                    crc2.translate(this.position.x, this.position.y);
                    crc2.scale(0.2, 0.2);
                    crc2.moveTo(75, 30);
                   
                    crc2.lineTo(95, 85);
                    crc2.lineTo(105, 130);
                    
                    crc2.lineTo(45, 130);
                    crc2.lineTo(55, 85);
                   
                    crc2.closePath();
                    crc2.fillStyle = this.color;
                    crc2.fill();
                    crc2.restore();
                    break;
                
            }
        }
    }
}