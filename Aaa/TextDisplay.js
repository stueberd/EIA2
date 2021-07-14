var EIA_Ball;
(function (EIA_Ball) {
    class TextDisplay extends EIA_Ball.BaseObject {
        draw(_crc2) {
            _crc2.strokeStyle = "black";
            _crc2.lineWidth = 1;
            _crc2.strokeText(this.text, this.position.x, this.position.y);
        }
    }
    EIA_Ball.TextDisplay = TextDisplay;
})(EIA_Ball || (EIA_Ball = {}));
//# sourceMappingURL=TextDisplay.js.map