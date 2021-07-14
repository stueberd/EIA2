namespace EIA_Ball {
    export class Ball extends BaseObject {
        public draw(_crc2: CanvasRenderingContext2D): void {
            _crc2.beginPath();
            _crc2.fillStyle = "white";
            _crc2.strokeStyle = "black";
            _crc2.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI, false);
            _crc2.fill();
            _crc2.stroke();
        }

        public isOut(): boolean {
            let config: Config = Config.getInstance();
            return this.position.x > Helper.canvasWidth() - config.margin //gibt zurück ob seine position rechtsausserhalb des Spielfelds liegt
            || this.position.x < config.margin                      //links aussen
            || this.position.y < config.margin                      //oben
            || this.position.y > Helper.canvasHeight() - config.margin; //unten
        }           //sobald eine der positionen erreicht wurde ist im AUs true

        public isGoal(): boolean {              //Position der Tore müssen angepasst werden wenn ich die Größe des Canvas ändere 
            return this.isOut() && this.position.y >= Helper.canvasHeight() / 3 && this.position.y <= 2 * Helper.canvasHeight() / 3; //wenn ball im Aus auf der Position der Tore ist 
        }

        public override move(_msBF: number): void {
            if (this.isGoal()) {
                let customEvent: CustomEvent = new CustomEvent("ballGoal");
                window.dispatchEvent(customEvent);
            } else if (this.isOut()) {
                let customEvent: CustomEvent = new CustomEvent("imAus");
                window.dispatchEvent(customEvent);
            }
            
            super.move(_msBF);
        }
    }
}