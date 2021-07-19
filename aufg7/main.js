var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Fussball;
(function (Fussball) {
    window.addEventListener("load", handleLoad);
    let form;
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            let canvas = document.querySelector("canvas");
            if (!canvas)
                return;
            Fussball.crc2 = canvas.getContext("2d");
            drawBall();
            function drawBall(_nBall) {
                for (let i = 0; i < _nBall; i++) {
                    let ball = new Ball();
                    moveables.push(ball);
                }
                //let saveBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#saveBtn");
                //let loadBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#loadBtn");
                /*let inputQuantity: HTMLButtonElement = <HTMLButtonElement>document.querySelector("input#quantity");
                form = <HTMLFormElement>document.querySelector("form#controlPanel");*/
                /* canvas.addEventListener("click", createObject);
                 //saveBtn.addEventListener("click", sendDataToServer);
                 //loadBtn.addEventListener("click", notifyUser);
                 inputQuantity.addEventListener("change", startMeter);
                 window.setInterval(update, 20);*/
            }
            /*function createObject(_event: MouseEvent): void {
          
          
              let mousePositionX: number = _event.clientX; //- crc2.canvas.offsetLeft;
              let mousepositionY: number = _event.clientY; //- crc2.canvas.offsetTop;
              let formData: FormData = new FormData(document.forms[0]);*/
        });
    }
})(Fussball || (Fussball = {}));
//# sourceMappingURL=main.js.map