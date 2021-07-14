var Soccer;
(function (Soccer) {
    class Vector {
        constructor(_x, _y) {
            this.set(_x, _y);
        }
        /*
                public static getDifference(_v0: Vector, _v1: Vector): Vector {
                    return new Vector(_v0.x - _v1.x, _v0.y - _v1.y);
                }
        
                public get length(): number {
                    return Math.hypot(this.x, this.y);
                } */
        set(_x, _y) {
            this.x = _x;
            this.y = _y;
        }
        scale(_factor) {
            this.x *= _factor;
            this.y *= _factor;
        }
        add(_addend) {
            this.x += _addend.x;
            this.y += _addend.y;
        }
    }
    Soccer.Vector = Vector;
})(Soccer || (Soccer = {}));
//# sourceMappingURL=Vector.js.map