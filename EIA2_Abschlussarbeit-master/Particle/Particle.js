var Feiawork;
(function (Feiawork) {
    class Particle extends Feiawork.MoveableObject {
        constructor(_position, _velocity, _color, _lifetime, _shape) {
            super(_position); //holt sich _position aus der Elternklasse
            this.color = _color; //die Farbe von dieser Klasseninstanz wird auf _color gesetzt
            this.velocity = _velocity.copy();
            this.lifetime = _lifetime;
            this.shape = _shape;
        }
        move(_timeslice) {
            super.move(_timeslice);
            this.velocity.y += Particle.gravity; //setzt die geschwindigkeit in y richtung auf die gravity des Particles
            this.lifetime -= _timeslice;
            if (this.lifetime < 0)
                this.expendable = true;
            // this.position.x += this.velocity.x;
            // this.position.y += this.velocity.y;
        }
        draw() {
            switch (this.shape) { //switch case löschen und nur dots nehmen reicht ja auch 
                case "dot":
                    Feiawork.crc2.save();
                    Feiawork.crc2.beginPath();
                    Feiawork.crc2.translate(this.position.x, this.position.y);
                    Feiawork.crc2.arc(0, 0, 4, 0, 2 * Math.PI);
                    Feiawork.crc2.closePath();
                    Feiawork.crc2.fillStyle = this.color;
                    Feiawork.crc2.fill();
                    Feiawork.crc2.restore();
                    break;
                case "sparks":
                    Feiawork.crc2.save();
                    Feiawork.crc2.beginPath();
                    Feiawork.crc2.translate(this.position.x, this.position.y);
                    Feiawork.crc2.scale(0.5, 0.5);
                    Feiawork.crc2.ellipse(10, 5, 5, 35, Math.PI / 15, 2, 2 * Math.PI);
                    //crc2.ellipse(-10, 5, 5, 25, Math.PI / -15, 2, 2 * Math.PI);
                    //crc2.ellipse(5, 5, 5, 44, Math.PI / 55, 2, 2 * Math.PI);
                    Feiawork.crc2.closePath();
                    Feiawork.crc2.fillStyle = this.color;
                    Feiawork.crc2.fill();
                    Feiawork.crc2.restore();
                    break;
                case "star":
                    Feiawork.crc2.save();
                    Feiawork.crc2.beginPath();
                    Feiawork.crc2.translate(this.position.x, this.position.y);
                    Feiawork.crc2.scale(0.2, 0.2);
                    Feiawork.crc2.moveTo(75, 30);
                    Feiawork.crc2.lineTo(90, 60);
                    Feiawork.crc2.lineTo(125, 75);
                    Feiawork.crc2.lineTo(95, 85);
                    Feiawork.crc2.lineTo(105, 130);
                    Feiawork.crc2.lineTo(75, 110);
                    Feiawork.crc2.lineTo(45, 130);
                    Feiawork.crc2.lineTo(55, 85);
                    Feiawork.crc2.lineTo(55, 85);
                    Feiawork.crc2.lineTo(20, 70);
                    Feiawork.crc2.lineTo(55, 60);
                    Feiawork.crc2.closePath();
                    Feiawork.crc2.fillStyle = this.color;
                    Feiawork.crc2.fill();
                    Feiawork.crc2.restore();
                    break;
                case "triangle":
                    Feiawork.crc2.save();
                    Feiawork.crc2.beginPath();
                    Feiawork.crc2.translate(this.position.x, this.position.y);
                    Feiawork.crc2.scale(0.2, 0.2);
                    Feiawork.crc2.moveTo(75, 30);
                    Feiawork.crc2.lineTo(95, 85);
                    Feiawork.crc2.lineTo(105, 130);
                    Feiawork.crc2.lineTo(45, 130);
                    Feiawork.crc2.lineTo(55, 85);
                    Feiawork.crc2.closePath();
                    Feiawork.crc2.fillStyle = this.color;
                    Feiawork.crc2.fill();
                    Feiawork.crc2.restore();
                    break;
            }
        }
    }
    Particle.gravity = 1;
    Feiawork.Particle = Particle;
})(Feiawork || (Feiawork = {}));
//# sourceMappingURL=Particle.js.map