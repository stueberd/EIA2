namespace Soccer {
    export class Player extends Participant {
        public team: Team;
        public precision: number;
        public speed: number;
        public backNumber: number;

        constructor(
            initX: number,
            initY: number,
            team: Team,
            speed: number,
            precision: number,
            backNumber: number,
            maxFieldWidth: number,
            maxFieldHeight: number
        ) {
            super(initX, initY, maxFieldWidth, maxFieldHeight);
            this.team = team;
            this.precision = precision;
            this.speed = speed;
            this.backNumber = backNumber;
        }
    }
}
