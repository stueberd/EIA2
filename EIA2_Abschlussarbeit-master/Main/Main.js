var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Feiawork;
(function (Feiawork) {
    window.addEventListener("load", handleLoad);
    //let serverPage: string = "https://sarahabschlussarbeit.herokuapp.com/"; "http://localhost:5001/";
    let form;
    let quantity;
    let color;
    let lifetime;
    let shape;
    let moveables = [];
    let result;
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            //let response: Response = await fetch(serverPage + "?" + "command=getTitels");
            //let listOfTitels: string = await response.text();
            //let titelList: Rocket[] = JSON.parse(listOfTitels);
            //generateContent(titelList);
            let canvas = document.querySelector("canvas");
            if (!canvas)
                return;
            Feiawork.crc2 = canvas.getContext("2d");
            //let saveBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#saveBtn");
            //let loadBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#loadBtn");
            let inputQuantity = document.querySelector("input#quantity");
            form = document.querySelector("form#controlPanel");
            canvas.addEventListener("click", createObject);
            //saveBtn.addEventListener("click", sendDataToServer);
            //loadBtn.addEventListener("click", notifyUser);
            inputQuantity.addEventListener("change", startMeter);
            window.setInterval(update, 20);
        });
    }
    function createObject(_event) {
        let mousePositionX = _event.clientX; //- crc2.canvas.offsetLeft;
        let mousepositionY = _event.clientY; //- crc2.canvas.offsetTop;
        let formData = new FormData(document.forms[0]);
        for (let entry of formData) { //ändern weil zu fancy 
            quantity = Number(formData.get("quantity"));
            lifetime = Number(formData.get("explosionSize"));
            color = String(formData.get("particlecolor"));
            switch (entry[1]) {
                case "dot":
                    shape = "dot";
                    break;
                case "sparks":
                    shape = "sparks";
                    break;
                case "triangle":
                    shape = "triangle";
                    break;
                case "star":
                    shape = "star";
                    break;
            }
        }
        createParticle(quantity, mousePositionX, mousepositionY, color, lifetime, shape);
    }
    /*export async function getDataFromServer(_event: Event): Promise<void> {
      console.log("Datein wurden geladen");
      let target: HTMLInputElement = <HTMLInputElement>_event.target;
      let userValue: string;
      userValue = target.value;
      let response: Response = await fetch(serverPage + "?" + "command=getAllDatas");
      let responseContent: string = await response.text();
      let allDatas: Rocket[] = JSON.parse(responseContent);
      result = <Rocket>allDatas.find(item => item.rocketTitel === userValue);
      console.log(result);
      createUserRocket(result);
  
    }*/
    function createUserRocket(_result) {
        let color = _result.particlecolor;
        let lifetime = _result.explosionSize;
        //let shape: string = _result.particleshape;
        let quantity = _result.quantity;
        console.log("Das ist deine Rakete=>", "Particleshape=", shape, "Particlecolor=", color, "ExplosionSize=", lifetime, "Particlequantity=", quantity);
        // erzeugt neuer Particle mit diesen Werten und pusht ihn in moveable Array
        // eine Funktion die z.B. auf MouseUp hört, erzeugt eine Explosion mit diesen Werten
    }
    /*async function sendDataToServer(_event: Event): Promise<void> {
      let controlPanelData: FormData = new FormData(form);
      let textArea: HTMLInputElement = <HTMLInputElement>document.querySelector("input#textarea");
      let rocketTitel: string;
      rocketTitel = textArea.value;
      let query: URLSearchParams = new URLSearchParams(<any>controlPanelData);
      query.append("rocketTitel", rocketTitel);
      let response: Response = await fetch(serverPage + "?" + query.toString());
      let responseText: string = await response.text();
      alert("Deine Daten wurden gespeichert");
      console.log("Daten geschickt: ", responseText);
      textArea.value = "";
  
    }*/
    function createParticle(_quantity, _mousePositionX, _mousePositionY, _color, _lifetime, _type) {
        //solange die Quantity nicht erreicht ist geht die untere for schleife durch
        let origin = new Feiawork.Vector(_mousePositionX, _mousePositionY);
        let color = _color;
        for (let i = 0; i < _quantity; i++) {
            let radian = (Math.PI * 2) / _quantity;
            let px = Math.cos(radian * i) * 110 * Math.random() * 2; //(2)power
            let py = Math.sin(radian * i) * 110 * Math.random() * 2; //(2)power
            let velocity = new Feiawork.Vector(px, py);
            let particle = new Feiawork.Particle(origin, velocity, color, lifetime, shape);
            moveables.push(particle);
        } //erstellt ein neues Particle Objekt, dass in den Moveble array gepushed wird
    }
    function update() {
        let gradient = Feiawork.crc2.createLinearGradient(0, 0, 0, Feiawork.crc2.canvas.height);
        gradient.addColorStop(0, "black");
        gradient.addColorStop(0.6, "#0A122A");
        gradient.addColorStop(0.8, "#3B0B17");
        gradient.addColorStop(0.95, "#B43104");
        gradient.addColorStop(1, "#fe9700");
        Feiawork.crc2.fillStyle = gradient;
        Feiawork.crc2.fillRect(0, 0, Feiawork.crc2.canvas.width, Feiawork.crc2.canvas.height);
        for (let moveable of moveables) {
            moveable.move(1 / 50);
            moveable.draw();
        }
        deleteExpandables();
    }
    function deleteExpandables() {
        for (let index = moveables.length - 1; index >= 0; index--) {
            if (moveables[index].expendable) //im Array an stelle des gerade befindenden Index
                moveables.splice(index, 1);
        } //geht moveble array durch und wenn ein objekt an der Stelle index ein Expandable ist wird es gelöscht 
    }
    /*function soundEffect(): void {
      let thetone: string = "explosionsound.wav";
      let sound: HTMLAudioElement = new Audio("assets/" + thetone);
      sound.play();
    }*/
    function startMeter(_event) {
        let target = _event.target;
        let meter = document.querySelector("meter");
        meter.value = parseFloat(target.value);
    }
    /*function notifyUser(_event: Event): void {
      alert("If you save this rocket, your current selection will be lost");
    }*/
})(Feiawork || (Feiawork = {}));
//# sourceMappingURL=Main.js.map