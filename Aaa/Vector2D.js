var EIA_Ball;
(function (EIA_Ball) {
    class Vector {
        constructor(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        copy() {
            return new Vector(this.x, this.y);
        }
        /**
         * Vektor Addition
         */
        add(_v) {
            return new Vector(this.x + _v.x, this.y + _v.y);
        }
        /**
         * Richtungsvektor aus 2 Vektoren erzeugen. Die 2 Vektoren stellen eigentlich Punkte dar. v = v2 - v1
         */
        static direction(_v1, _v2) {
            return new Vector(_v2.x - _v1.x, _v2.y - _v1.y);
        }
        /**
         * Betrag des Vektors
         */
        length() {
            return Math.sqrt(this.x * this.x + this.y * this.y);
        }
        /**
         * Distanz zwischen 2 Punkten
         */
        static distance(_v1, _v2) {
            return Vector.direction(_v1, _v2).length();
        }
        /**
         * Erzeugt einen Vektor aus den X und Y Coordinaten des MouseEvents
         */
        static fromMouseEvent(_event) {
            return new Vector(_event.offsetX, _event.offsetY);
        }
        /**
         * Vektor normieren. Normierter Vektor = Betrag = 1
         */
        normalize() {
            let length = this.length();
            return new Vector(this.x / length, this.y / length);
        }
        /**
         * Null Vektor
         */
        static zero() {
            return new Vector(0, 0);
        }
        /**
         * Zufalls-Vektor zwischen -1 und 1
         */
        static random() {
            return new Vector(Math.random() * 2 - 1, Math.random() * 2 - 1).normalize();
        }
        /**
         * (1, 0) Vektor
         */
        static right() {
            return new Vector(1, 0);
        }
        /**
         * (-1, 0) Vektor
         */
        static left() {
            return new Vector(-1, 0);
        }
    }
    EIA_Ball.Vector = Vector;
})(EIA_Ball || (EIA_Ball = {}));
//# sourceMappingURL=Vector2D.js.map