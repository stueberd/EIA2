var EIA2_Ball;
(function (EIA2_Ball) {
    class Referee extends BaseObject {
        draw(_crc2) {
            _crc2.beginPath();
            _crc2.fillStyle = "black";
            _crc2.arc(this.position.x, this.position.y, 20, 0, 2 * Math.PI, false);
            _crc2.fill();
        }
        move(_msBF) {
            if (Vector.distance(Helper.ball.position, this.position) > 50) { //wenn die distanz vom schiri zum ball über 50 liegt
                this.velocity = Vector.direction(this.position, Helper.ball.position).normalize(); //nimmt es den unterschied zwischen ball und schiri und macht eine bescheunigung für den Schiri
            }
            else {
                this.velocity = Vector.zero(); //wenn abstand unter 50 ist bkeibt schiri stehen in der nähe des balls 
            }
            super.move(_msBF);
        }
    }
    EIA2_Ball.Referee = Referee;
})(EIA2_Ball || (EIA2_Ball = {}));
//# sourceMappingURL=Referee.js.map