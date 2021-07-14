namespace EIA_Ball {
    export class Player extends BaseObject {
        public number: number;
        public precision: number;
        public speedFactor: number;
        public team: number;
        public startPosition: Vector;
        public actionRadius: number;
        public hasBallContact: boolean;
        public isSelected: boolean;

        public isBallInActionRadius(): boolean {
            return Helper.ball != null && Vector.distance(Helper.ball.position, this.startPosition) < this.actionRadius; //vergleicht position von spieler und Ball und gibt an ob Ball inherhalb des Aktionsradius ist 
        }   

        public getColor(): string {
            let config: Config = Config.getInstance();
            if (this.team == 1) {
                return config.team0Color;
            }
            return config.team1Color;
        }

        public draw(_crc2: CanvasRenderingContext2D): void {           //Malt den Aktionsradius vom Spieler
            if (this.isBallInActionRadius()) {
                _crc2.setLineDash([5, 10]);
                _crc2.beginPath();
                _crc2.strokeStyle = "lightgray";
                _crc2.lineWidth = 2;
                _crc2.arc(this.startPosition.x, this.startPosition.y, this.actionRadius, 0, 2 * Math.PI, false);
                _crc2.stroke();

               /* _crc2.beginPath();
                _crc2.setLineDash([2, 2]);
                _crc2.strokeStyle = "white";
                _crc2.lineWidth = 2;
                _crc2.moveTo(this.position.x, this.position.y);
                _crc2.lineTo(Helper.ball.position.x, Helper.ball.position.y);
                _crc2.stroke();*/
            }

            _crc2.setLineDash([]);
            _crc2.beginPath();
            _crc2.fillStyle = this.getColor();
            _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _crc2.fill();

            if (this.isSelected) {
                _crc2.beginPath();
                _crc2.strokeStyle = "white";
                _crc2.lineWidth = 2;
                _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
                _crc2.stroke();
            }

            _crc2.strokeStyle = "white";
            _crc2.lineWidth = 1;
            _crc2.strokeText("" + this.number, this.position.x - 3, this.position.y + 2);
            console.log(Helper.ball.position);
        }

        public override move(_msBF: number): void {
            if (this.isBallInActionRadius() && !this.hasBallContact) {      //wenn Ball im Aktionsradius ist und kein Balkontakt hergestellt wurde
                if (Vector.distance(Helper.ball.position, this.position) > 5 ) { //wenn die distanz von Ball position und psiler position kleiner als 5 ist 
                    this.velocity = Vector.direction(this.position, Helper.ball.position).normalize(); //veräntert sich die Spieler geschwindigkeit je näher er am Ball ist 
                } else {
                    this.velocity = Vector.zero();    //ansonsten bleibt er auf Position stehen 

                    if (!this.hasBallContact) {              //müüsen wir nochmal anschauen und vielleicht auch rausmachen 
                        let customEvent: CustomEvent = new CustomEvent("newBallContact", { detail: this });
                        window.dispatchEvent(customEvent);
    
                        this.hasBallContact = true;
                        console.log("player " + this.number + " has new ball contact");
                    }
                }
            } else if (Vector.distance(this.startPosition, this.position) > 5) {
                this.velocity = Vector.direction(this.position, this.startPosition).normalize();
            } else {
                this.velocity = Vector.zero();
            }
            super.move(_msBF); //führt die Move funktion aus 
        }

        public isClickInRange(_mouseEvent: MouseEvent): boolean {       // wenn Spieler in Click
            return Vector.distance(this.position, Vector.fromMouseEvent(_mouseEvent)) <= 20; //schaut ob wenn man mit der maus um den spieler draufklickst oder in dem radius um ihn das dieser angeklickt werden kann
        }
    }
}