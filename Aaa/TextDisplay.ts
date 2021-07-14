namespace EIA_Ball {
    export class TextDisplay extends BaseObject {
        public text: string;

        public draw(_crc2: CanvasRenderingContext2D): void {
            _crc2.strokeStyle = "black";
            _crc2.lineWidth = 1;
            _crc2.strokeText(this.text, this.position.x, this.position.y);
        }
    }
}