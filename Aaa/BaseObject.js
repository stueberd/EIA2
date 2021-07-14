var EIA_Ball;
(function (EIA_Ball) {
    class BaseObject {
        constructor() {
            this.friction = 1;
            this.velocity = EIA_Ball.Vector.zero(); //wird bei konstruktion festgelegt 
            this.position = EIA_Ball.Vector.zero(); //same
        }
        attach() {
            var customEvent = new CustomEvent("attachObject", { detail: this });
            window.dispatchEvent(customEvent);
        }
        destory() {
            var customEvent = new CustomEvent("destroyObject", { detail: this });
            window.dispatchEvent(customEvent);
        }
        move(_msBF) {
            if (this.velocity.x != 0) { //wenn beshcleunigung in x richtung nicht null ist verschiebt in x richtung
                this.position.x = this.position.x + (this.velocity.x * this.speed * _msBF / 1000);
            }
            if (this.velocity.y != 0) { // und das selbe in y richtung
                this.position.y = this.position.y + (this.velocity.y * this.speed * _msBF / 1000);
            }
            this.speed *= this.friction; //Neue geschwindigkeit ist geschwindigkeit mal der reibung 
            if (this.speed <= 0.05) {
                this.speed = 0; //wenn geschwindigkeit kleiner oder gleich 0.05 ist wird sie auf null gesetzt
            }
        }
    }
    EIA_Ball.BaseObject = BaseObject;
})(EIA_Ball || (EIA_Ball = {}));
//# sourceMappingURL=BaseObject.js.map