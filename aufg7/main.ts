namespace Fussball {

    window.addEventListener("load", handleLoad);
    let form: HTMLFormElement;
    
    
    
    
    //let moveables: MoveableObject[] = [];
    //let result: Rocket;
    export let crc2: CanvasRenderingContext2D;

    async function handleLoad(_event: Event): Promise<void> {   //Die Funktion wartet teilweise bis sie ihren wert hat oder so
    

        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
          return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        drawBall();

        function drawBall(_nBall: number): void {
          for (let i: number = 0; i < _nBall; i++) {
              let ball: Ball = new Ball();
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






}