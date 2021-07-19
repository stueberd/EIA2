namespace Soccer {
    export class SideReferee extends Participant {
        public color: string = "#F6A000";
        public speed: number = 2;

        constructor(initX: number, initY: number, maxFieldWidth: number, maxFieldHeight: number) {
            super(initX, initY, maxFieldWidth, maxFieldHeight);
        }
    }
}
