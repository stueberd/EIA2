namespace Soccer {

    export abstract class Moveable {
        public expendable: boolean = false;
        public radius: number;
        protected color: string;
        protected velocity: Vector;
        protected position: Vector;
        
        constructor(_position?: Vector) { //brauchen wir hier auch _velocity??
            let a: number = - Math.random();
            let b: number = Math.random();
            this.velocity = new Vector(a, b);

            //feste position ohne Math.radnom, damit die nicht mehr am Rand kleben
            let x: number = 900 * Math.random();
            let y: number = 600 * Math.random();
            this.position = new Vector(x, y);
            this.radius = 30;
    } 

  /*   public change(): void {
        this.expendable = true;
    } */

    public move(_timeslice: number): void {
        this.position.add(this.velocity);

        if (this.position.x + 10 > 900 || this.position.x - 10 < 0) {
            this.velocity.x = -this.velocity.x;
        }
        if (this.position.y + 10 > 600 || this.position.y - 10 < 0) {
            this.velocity.y = -this.velocity.y;
        }
    }

    public draw(): void {
        //draw
    }
    }
    }