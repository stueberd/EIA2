var EIA_Ball;
(function (EIA_Ball) {
    class Ball extends EIA_Ball.BaseObject {
        draw(_crc2) {
            _crc2.beginPath();
            _crc2.fillStyle = "white";
            _crc2.strokeStyle = "black";
            _crc2.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
            _crc2.fill();
            _crc2.stroke();
        }
        isOut() {
            let config = EIA_Ball.Config.getInstance();
            return this.position.x > EIA_Ball.Helper.canvasWidth() - config.margin //gibt zurück ob seine position rechtsausserhalb des Spielfelds liegt
                || this.position.x < config.margin //links aussen
                || this.position.y < config.margin //oben
                || this.position.y > EIA_Ball.Helper.canvasHeight() - config.margin; //unten
        } //sobald eine der positionen erreicht wurde ist im AUs true
        isGoal() {
            return this.isOut() && this.position.y >= EIA_Ball.Helper.canvasHeight() / 3 && this.position.y <= 2 * EIA_Ball.Helper.canvasHeight() / 3; //wenn ball im Aus auf der Position der Tore ist 
        }
        move(_msBF) {
            if (this.isGoal()) {
                let customEvent = new CustomEvent("ballGoal");
                window.dispatchEvent(customEvent);
            }
            else if (this.isOut()) {
                let customEvent = new CustomEvent("imAus");
                window.dispatchEvent(customEvent);
            }
            super.move(_msBF);
        }
    }
    EIA_Ball.Ball = Ball;
})(EIA_Ball || (EIA_Ball = {}));
//# sourceMappingURL=Ball.js.map