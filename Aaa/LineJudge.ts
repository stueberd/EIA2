namespace EIA_Ball {
    export class LineJudge extends BaseObject {
        public draw(_crc2: CanvasRenderingContext2D): void {
            _crc2.beginPath();
            _crc2.fillStyle = "yellow";
            _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _crc2.fill();
        }

        public override move(_msBF: number): void {         //alles gleich wie beim schiri nur in x richtung 
            if (Helper.ball != null) {
                if (Math.abs( Helper.ball.position.x - this.position.x) < 2) {
                    this.velocity = Vector.zero();
                } else if (Helper.ball.position.x > this.position.x) {
                    this.velocity = Vector.right();
                } else if (Helper.ball.position.x < this.position.x) {
                    this.velocity = Vector.left();
                } else {
                    this.velocity = Vector.zero();
                }
            } else {
                this.velocity = Vector.zero();
            }
            super.move(_msBF);
        }
    }
}