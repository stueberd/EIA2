namespace Feiawork {
    export abstract class MoveableObject {
        public position: Vector;
        public velocity: Vector;
        public expendable: boolean = false;


        constructor(_position?: Vector) {

            if (_position)                          //wenn die position existiert wird sie auf den Vektor von Feuerwerk gesetzt
                this.position = _position.copy();
            else
                this.position = new Vector(0, 0);      //ansonsten auf einen Vektor mit den Werten 0,0

            this.velocity = new Vector(0, 0);           //setzt die geschwindigkeit auf 0,0

        }

        public move(_timeslice: number): void {         //es nimmt den Vektor und skaliert in zur neuen position?

            let offset: Vector = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
        }

        public abstract draw(): void;   //methode kann nicht aufgerufen werden aber existiert 

    }















}