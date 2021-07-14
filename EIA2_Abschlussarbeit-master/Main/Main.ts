namespace Feiawork {
  window.addEventListener("load", handleLoad);
  //let serverPage: string = "https://sarahabschlussarbeit.herokuapp.com/"; "http://localhost:5001/";
  let form: HTMLFormElement;
  let quantity: number;
  let color: string;
  let lifetime: number;
  let shape: string;
  let moveables: MoveableObject[] = [];
  let result: Rocket;
  export let crc2: CanvasRenderingContext2D;


  async function handleLoad(_event: Event): Promise<void> {   //Die Funktion wartet teilweise bis sie ihren wert hat oder so
    

    //let response: Response = await fetch(serverPage + "?" + "command=getTitels");
    //let listOfTitels: string = await response.text();
    //let titelList: Rocket[] = JSON.parse(listOfTitels);


    //generateContent(titelList);


    let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
    if (!canvas)
      return;
    crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

    //let saveBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#saveBtn");
    //let loadBtn: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button#loadBtn");
    let inputQuantity: HTMLButtonElement = <HTMLButtonElement>document.querySelector("input#quantity");
    form = <HTMLFormElement>document.querySelector("form#controlPanel");

    canvas.addEventListener("click", createObject);
    //saveBtn.addEventListener("click", sendDataToServer);
    //loadBtn.addEventListener("click", notifyUser);
    inputQuantity.addEventListener("change", startMeter);
    window.setInterval(update, 20);
  }




  function createObject(_event: MouseEvent): void {


    let mousePositionX: number = _event.clientX; //- crc2.canvas.offsetLeft;
    let mousepositionY: number = _event.clientY; //- crc2.canvas.offsetTop;
    let formData: FormData = new FormData(document.forms[0]);


    for (let entry of formData) {           //ändern weil zu fancy 

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


  function createUserRocket(_result: Rocket): void {

    let color: string = _result.particlecolor;
    let lifetime: number = _result.explosionSize;
    //let shape: string = _result.particleshape;
    let quantity: number = _result.quantity;
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


  function createParticle(_quantity: number, _mousePositionX: number, _mousePositionY: number, _color: string, _lifetime: number, _type: string): void {
//solange die Quantity nicht erreicht ist geht die untere for schleife durch
    let origin: Vector = new Vector(_mousePositionX, _mousePositionY);
    let color: string = _color;

    for (let i: number = 0; i < _quantity; i++) {
      let radian: number = (Math.PI * 2) / _quantity;
      let px: number = Math.cos(radian * i) * 110 * Math.random() * 2; //(2)power
      let py: number = Math.sin(radian * i) * 110 * Math.random() * 2; //(2)power
      let velocity: Vector = new Vector(px, py);
      let particle: MoveableObject = new Particle(origin, velocity, color, lifetime, shape);
      moveables.push(particle);

    }     //erstellt ein neues Particle Objekt, dass in den Moveble array gepushed wird
  }



  function update(): void {
    let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
    gradient.addColorStop(0, "black");
    gradient.addColorStop(0.6, "#0A122A");
    gradient.addColorStop(0.8, "#3B0B17");
    gradient.addColorStop(0.95, "#B43104");
    gradient.addColorStop(1,   "#fe9700");
    crc2.fillStyle = gradient;
    crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

    for (let moveable of moveables) {
      moveable.move(1 / 50);
      moveable.draw();
    }
    deleteExpandables();      
  }

  


  function deleteExpandables(): void {
    for (let index: number = moveables.length - 1; index >= 0; index--) {
      if (moveables[index].expendable) //im Array an stelle des gerade befindenden Index
        moveables.splice(index, 1);
    }   //geht moveble array durch und wenn ein objekt an der Stelle index ein Expandable ist wird es gelöscht 
  }
  
  /*function soundEffect(): void {
    let thetone: string = "explosionsound.wav";
    let sound: HTMLAudioElement = new Audio("assets/" + thetone);
    sound.play();
  }*/
  function startMeter(_event: Event): void {
    let target: HTMLInputElement = <HTMLInputElement>_event.target;
    let meter: HTMLMeterElement = <HTMLMeterElement>document.querySelector("meter");
    meter.value = parseFloat(target.value);
  }

  /*function notifyUser(_event: Event): void {
    alert("If you save this rocket, your current selection will be lost");
  }*/






























































}