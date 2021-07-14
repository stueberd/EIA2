namespace Soccer {
    export class Referee extends Moveable { 
        protected color: string;
        protected position: Vector;
        protected velocity: Vector;

        constructor(_position?: Vector) {
            super(_position);
            this.color = "#ff748c";
           /*  let x: number = 900 * Math.random();
            let y: number = 400 * Math.random();
            let a: number = Math.random();
            let b: number = Math.random();
            this.position = new Vector(x, y);
            if (_position) 
            this.position = _position;
            else
            this.position = new Vector(x, y);
            this.velocity = new Vector(a, b); */
    }
    public move(_timeslice: number): void {
        this.position.add(this.velocity);

        //mit Kollision
        if (this.position.x + 10 > 900 || this.position.x - 10 < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y + 10 > 600 || this.position.y - 10 < 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

    public draw(): void {   
        crc2.beginPath();
        crc2.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
        crc2.fillStyle = this.color;
        crc2.fill();
        crc2.closePath();
        } 
    }
}
