namespace EIA_Ball {
    export class Helper {

        public static FPS: number = 30;
        public static msBetweenFrames: number = 1000 / Helper.FPS; //das ist dieses _msBF umbenannt in _msBF
        public static ball: BaseObject;

        public static screenWidth(): number {
            return document.body.clientWidth;
        }
                                                        //erstellt mir ein paar variablen damit ich die genauen Daten des Canvas besser aufrufen kann
        public static screenHeight(): number {
            return document.body.clientHeight;
        }

        public static canvas(): HTMLCanvasElement {
            let canvas: HTMLCanvasElement = document.getElementsByTagName("canvas")[0];
            canvas.width = Helper.screenWidth();
            canvas.height = Helper.screenHeight();
            return canvas;
        }

        public static canvasWidth(): number {
            if (Helper.canvas() != null) {
                return Helper.canvas().width;
            }
            return 0;
        }

        public static canvasHeight(): number {
            if (Helper.canvas() != null) {
                return Helper.canvas().height;
            }
            return 0;
        }
    }
}