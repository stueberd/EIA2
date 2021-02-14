namespace Fireworks {
    window.addEventListener("load", handleLoad);
   // export let url: string = "https://fireworkendabgabe.herokuapp.com";
    export let buttonClicked: number = 0;
    export let rockets: any;
    export let currentRocket: string;
    
    export let crc2: CanvasRenderingContext2D;
    let golden: number = 0.62;

    let moveables: Moveable[] = [];


    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null;

        canvas = <HTMLCanvasElement>document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
        let imgData: ImageData;
        imgData = crc2.getImageData(0, 0, canvas.width, canvas.height); //implementierung meines Hintergrunds

        drawCanvas();

        (<HTMLInputElement>document.querySelector("#displayButton")).addEventListener("click", displayRocket);
        (<HTMLInputElement>document.querySelector("#updateButton")).addEventListener("click", updateRocket);
        (<HTMLInputElement>document.querySelector("#resetButton")).addEventListener("click", resetRocketlist);
        (<HTMLInputElement>document.querySelector("#saveButton")).addEventListener("click", saveRocket);
        
        


    }


    

    function displayRocket(): void {
        let formComponents: FormData = new FormData(document.forms[0]);  
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("ExplosionSize") + "<br>" + "Lifetime: " + formComponents.get("Lifetime") + "<br>" + "sec" + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Amount of Particle: " + formComponents.get("Amount") +"<br>" + "stk." + "<br>" + "Type of Particle: " + formComponents.get("ParticleType") + "<br>" + "Size of Particle: " + formComponents.get("ParticleSize"); //Schlüssel und Wert jeweils in rocket speichern

        
     (<HTMLDivElement>document.querySelector("div#rocketlist")).innerHTML = rocket;  
    }

    async function updateRocket(): Promise<void> {
        let newData: FormData = new FormData(document.forms[0]);
        let query: URLSearchParams = new URLSearchParams(<any>newData);                         //umformatieren um url mitgeben zu können
        let response: Response = await fetch(URL + "?" + "command=update&rocket=" + currentRocket + "&" + query.toString());
        let responseText: string = await response.text();
        alert(responseText);
    }
    function resetRocketlist(): void {
        document.forms[0].reset();                                                              //Formular Daten zurücksetzen
        (<HTMLInputElement>document.getElementById("rocketlist")).innerHTML = "";                                    //Inhalt im div leeren
    }

    async function saveRocket(_event: Event): Promise<void> {
        console.log("Save rocket");
        let form: FormData = new FormData(document.forms[0]);                                    //Daten aus Form holen
        let query: URLSearchParams = new URLSearchParams(<any>form);
        //let response: Response = await fetch(URL + "?" + query.toString());                      //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
        //let responseText: string = await response.text();                                        //Daten in Textform in responseText speichern und ausgeben lassen

        //alert(responseText);
    }

    function fillInputFields(rocket: any): void {
        (<HTMLInputElement>document.querySelector("input#rocketname")).value = rocket["rocketName"];
        (<HTMLInputElement>document.querySelector("input#explosion")).value = rocket["explosion"];
        (<HTMLInputElement>document.querySelector("input#lifetime")).value = rocket["lifetime"];
        (<HTMLSelectElement>document.querySelector("select#color")).value = rocket["color"];
        (<HTMLInputElement>document.querySelector("input#amount")).value = rocket["amount"];
        (<HTMLInputElement>document.querySelector("input#ParticleSize")).value = rocket["ParticleSize"];

    }

     
    
    

    
}