var EIA_Ball;
(function (EIA_Ball) {
    class LineJudge extends EIA_Ball.BaseObject {
        draw(_crc2) {
            _crc2.beginPath();
            _crc2.fillStyle = "yellow";
            _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _crc2.fill();
        }
        move(_msBF) {
            if (EIA_Ball.Helper.ball != null) {
                if (Math.abs(EIA_Ball.Helper.ball.position.x - this.position.x) < 2) {
                    this.velocity = EIA_Ball.Vector.zero();
                }
                else if (EIA_Ball.Helper.ball.position.x > this.position.x) {
                    this.velocity = EIA_Ball.Vector.right();
                }
                else if (EIA_Ball.Helper.ball.position.x < this.position.x) {
                    this.velocity = EIA_Ball.Vector.left();
                }
                else {
                    this.velocity = EIA_Ball.Vector.zero();
                }
            }
            else {
                this.velocity = EIA_Ball.Vector.zero();
            }
            super.move(_msBF);
        }
    }
    EIA_Ball.LineJudge = LineJudge;
})(EIA_Ball || (EIA_Ball = {}));
//# sourceMappingURL=LineJudge.js.map