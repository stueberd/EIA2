namespace EIA_Ball {
    export abstract class BaseObject {  //Man kan keine instanz von abstracten klassen haben googlen was ne instanz ist lul

        speed: number;
        friction: number = 1;
        velocity: Vector;
        position: Vector;

        constructor() {
            this.velocity = Vector.zero(); //wird bei konstruktion festgelegt 
            this.position = Vector.zero(); //same
        }

        public attach(): void {
            var customEvent: CustomEvent = new CustomEvent("attachObject", { detail: this });
            window.dispatchEvent(customEvent);
        }

        public destory(): void {
            var customEvent: CustomEvent = new CustomEvent("destroyObject", { detail: this });
            window.dispatchEvent(customEvent);
        }

        public move(_msBF: number): void {  //verschiebt die posion von dem was grade aufgerufen wird zb Ball
            if (this.velocity.x != 0) {     //wenn beshcleunigung in x richtung nicht null ist verschiebt in x richtung
                this.position.x = this.position.x + (this.velocity.x * this.speed * _msBF / 1000);
            }

            if (this.velocity.y != 0) {     // und das selbe in y richtung
                this.position.y = this.position.y + (this.velocity.y * this.speed * _msBF / 1000);
            }

            this.speed *= this.friction; //Neue geschwindigkeit ist geschwindigkeit mal der reibung 

            if (this.speed <= 0.05) {
                this.speed = 0;         //wenn geschwindigkeit kleiner oder gleich 0.05 ist wird sie auf null gesetzt
            }
        }

        public abstract draw(_crc2: CanvasRenderingContext2D): void; //ruft die draw funktion für das canvas auf 
    }
}