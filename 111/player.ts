namespace Soccer {
    export class Player extends Moveable { 
        public colorTeamTwo: string;
        public colorTeamOne: string; 
        public position: Vector;
        public velocity: Vector;
        public precisionMax: string;
        public precisionMin: string;
        protected playerNumber: number;
        protected team: number;
        protected changeNumber: boolean;
        

        constructor(_position?: Vector, _velocity?: Vector, _colorTeamOne?: string, _colorTeamtwo?: string, _precision?: number, _playerNumber?: number, _team?: number) { 
            super(_position);
        }    
        
        public draw(): void {   
            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            crc2.fillStyle = this.colorTeamOne;
            crc2.fill();
            crc2.closePath();

            crc2.beginPath();
            crc2.arc(this.position.x, this.position.y, 10, 0, 2 * Math.PI);
            crc2.fillStyle = this.colorTeamTwo;
            crc2.fill();
            crc2.closePath();
        } 

       /*  public shoot(): void {
            console.log("shoot ball");
            let event: CustomEvent = new CustomEvent(PLAYER_EVENT.BALL_SHOOTS, {detail: {player: this}});
            crc2.canvas.dispatchEvent(event);
        }

        public change(): void {
            console.log("change player");
            super.change();
            let event: CustomEvent = new CustomEvent(PLAYER_EVENT.CHANGE_PLAYER, {detail: {player: this}});
            crc2.canvas.dispatchEvent(event);
        } */

    }
}

