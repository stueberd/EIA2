namespace EIA_Ball {
    export class Vector {
        x: number;
        y: number;

        constructor(_x: number, _y: number) {
            this.x = _x;
            this.y = _y;
        }

        public copy(): Vector {
            return new Vector(this.x, this.y);
        }

        /**
         * Vektor Addition
         */
        public add(_v: Vector): Vector {
            return new Vector(this.x + _v.x, this.y + _v.y);
        }

        /**
         * Richtungsvektor aus 2 Vektoren erzeugen. Die 2 Vektoren stellen eigentlich Punkte dar. v = v2 - v1
         */
        public static direction(_v1: Vector, _v2: Vector): Vector {
            return new Vector(_v2.x - _v1.x, _v2.y - _v1.y);
        }

        /**
         * Betrag des Vektors
         */
        public length(): number {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }

        /**
         * Distanz zwischen 2 Punkten
         */
        public static distance(_v1: Vector, _v2: Vector): number {
            return Vector.direction(_v1, _v2).length();
        }

        /**
         * Erzeugt einen Vektor aus den X und Y Coordinaten des MouseEvents
         */
        public static fromMouseEvent(_event: MouseEvent): Vector {
            return new Vector(_event.offsetX, _event.offsetY);
        }

        /**
         * Vektor normieren. Normierter Vektor = Betrag = 1
         */
        public normalize(): Vector {
            let length: number = this.length();
            return new Vector(this.x / length, this.y / length);
        }

        /** 
         * Null Vektor
         */
        public static zero(): Vector {
            return new Vector(0, 0);
        }

        /** 
         * Zufalls-Vektor zwischen -1 und 1
         */
        public static random(): Vector {
            return new Vector(Math.random() *2 - 1, Math.random() *2 - 1).normalize();
        }

        /** 
         * (1, 0) Vektor
         */
         public static right(): Vector {
            return new Vector(1, 0);
        }

        /** 
         * (-1, 0) Vektor
         */
         public static left(): Vector {
            return new Vector(-1, 0);
        }
    }
}