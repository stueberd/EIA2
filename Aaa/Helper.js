var EIA_Ball;
(function (EIA_Ball) {
    class Helper {
        static screenWidth() {
            return document.body.clientWidth;
        }
        //erstellt mir ein paar variablen damit ich die genauen Daten des Canvas besser aufrufen kann
        static screenHeight() {
            return document.body.clientHeight;
        }
        static canvas() {
            let canvas = document.getElementsByTagName("canvas")[0];
            canvas.width = Helper.screenWidth();
            canvas.height = Helper.screenHeight();
            return canvas;
        }
        static canvasWidth() {
            if (Helper.canvas() != null) {
                return Helper.canvas().width;
            }
            return 0;
        }
        static canvasHeight() {
            if (Helper.canvas() != null) {
                return Helper.canvas().height;
            }
            return 0;
        }
    }
    Helper.FPS = 30;
    Helper.msBetweenFrames = 1000 / Helper.FPS; //das ist dieses _msBF umbenannt in _msBF
    EIA_Ball.Helper = Helper;
})(EIA_Ball || (EIA_Ball = {}));
//# sourceMappingURL=Helper.js.map