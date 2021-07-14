var Feiawork;
(function (Feiawork) {
    class MoveableObject {
        constructor(_position) {
            this.expendable = false;
            if (_position) //wenn die position existiert wird sie auf den Vektor von Feuerwerk gesetzt
                this.position = _position.copy();
            else
                this.position = new Feiawork.Vector(0, 0); //ansonsten auf einen Vektor mit den Werten 0,0
            this.velocity = new Feiawork.Vector(0, 0); //setzt die geschwindigkeit auf 0,0
        }
        move(_timeslice) {
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
        }
    }
    Feiawork.MoveableObject = MoveableObject;
})(Feiawork || (Feiawork = {}));
//# sourceMappingURL=MoveableObject.js.map