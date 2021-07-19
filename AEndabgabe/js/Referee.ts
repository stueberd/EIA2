namespace Soccer {
    export class Referee extends Participant {
        public  color: string = "#F6A000";
        public  speed: number = 0.5;

        constructor(initX: number, initY: number, maxFieldWidth: number, maxFieldHeight: number) {
            super(initX, initY, maxFieldWidth, maxFieldHeight);
        }
    }
}
