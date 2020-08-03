namespace Zauberbild {

    // Kommentare zum Code, warum was......!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!


    document.addEventListener("DOMContentLoaded", init);
    document.addEventListener("mousedown", auswahlKreis);


    export let crc: CanvasRenderingContext2D;
    export let canvas: HTMLCanvasElement;
    export let ausgewaehltesElement: number;
    export let color: string;
    export let serverAddress: string = "http://eia2-stueberd.herokuapp.com/";
    export let kreisArray: Values[] = [];
    export let auswahlArray: Values[] = [];
    let fps: number = 30;

    export let bg: string = "white";
    let auswahl: Boolean = false; // Boolean ist am Anfang auf false, später wird es geändert ????????????????????????????????????????
    //export let input: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");


    //let einkreis: Boolean = false;

    function init(): void {

        canvas = document.getElementsByTagName("canvas")[0];
        crc = canvas.getContext("2d");


        // Es werden Buttons erstellt, mit denen man das Zauberbild bearbeiten kann. Auf jedem Button liegt ein Click-Event, das eine Funktion aufruft

        let klein: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Klein");
        klein.addEventListener("click", Klein);
        let mittel: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Mittel");
        mittel.addEventListener("click", Mittel);
        let gross: HTMLButtonElement = <HTMLButtonElement>document.getElementById("Gross");
        gross.addEventListener("click", Gross);

        let night: HTMLButtonElement = <HTMLButtonElement>document.getElementById("night");
        night.addEventListener("click", Night);
        let silver: HTMLButtonElement = <HTMLButtonElement>document.getElementById("silver");
        silver.addEventListener("click", Silver);
        let lila: HTMLButtonElement = <HTMLButtonElement>document.getElementById("gold");
        lila.addEventListener("click", Gold);

        let move: HTMLButtonElement = <HTMLButtonElement>document.getElementById("move");
        move.addEventListener("click", zeichneKreis);

        let growth: HTMLButtonElement = <HTMLButtonElement>document.getElementById("growth");
        growth.addEventListener("click", zeichneGrowth);

        let lauf2: HTMLButtonElement = <HTMLButtonElement>document.getElementById("lauf2");
        lauf2.addEventListener("click", zeichneTest);

        let snowing: HTMLButtonElement = <HTMLButtonElement>document.getElementById("snowing");
        snowing.addEventListener("click", zeichneSnow);


        let save: HTMLButtonElement = <HTMLButtonElement>document.getElementById("save");
        save.addEventListener("click", saveBg);

        let load: HTMLButtonElement = <HTMLButtonElement>document.getElementById("load");
        load.addEventListener("click", loadpicture);

        update();

    }



    function update(): void {                           //updated den eiteninhalt dass es aussieht es sei Animiert in dem Timeout Intervall von 1000 / fps
        window.setTimeout(update, 1000 / fps);
        crc.clearRect(0, 0, canvas.width, canvas.height);


        crc.rect(0, 0, canvas.width, canvas.height);
        crc.fillStyle = bg;
        crc.fill();


        // Die Arrays werden durchlaufen mit Hilfe von I und werden upgedated
                                                                    // Der obere loop geht so lang, i kleiner ist als kreisarray.lenght
        for (let i: number = 0; i < kreisArray.length; i++) {
            kreisArray[i].update(0, 0);
            // console.log("Hiiii");
        }


        for (let i: number = 0; i < auswahlArray.length; i++) {
            auswahlArray[i].update(0, 0);

        }
    }

    // Die Event-Listener auf den Buttons rufen die Funktion auf und es werden neue Superklassen und Subklassen erstellt

    function zeichneKreis(): void {
        let circle: Values = new Values(); // Superklasse
        kreisArray.push(circle);    // Alle Elemente des Zauberbildes werden nachdem sie erstellt wurden im Kreisarray abgespeichert
    }

  


    function zeichneGrowth(): void {

        let circleBubblegum: Bubblegum = new Bubblegum();
        kreisArray.push(circleBubblegum);                   // er setzt das Values circlebumbblegum zu einem neuen Values vomm typ bubblegum und circlebubblegum wird in den kreisArray gepushed
    }

    function zeichneSnow(): void {
        let schnee: Snow = new Snow();
        kreisArray.push(schnee);
    }
    function zeichneTest(): void {
        let dreieck2: FliegerKlasse = new FliegerKlasse();
        kreisArray.push(dreieck2);
    }
  

    function auswahlKreis(_event: MouseEvent): void { // Beim Klick auf den Canvas wird die Funktion aufgerufen

        auswahl = false;


        for (let i: number = 0; i < kreisArray.length; i++) { // Das Array wird durchlaufen

            let x: number = _event.clientX;  // Die x-Position, an der geklickt wird, wird in x gespeichert
            let y: number = _event.clientY;
            //console.log("Auswahl");

            if (kreisArray[i].x < x + 5 && kreisArray[i].x < x + 5 && kreisArray[i].y < y + 5 && kreisArray[i].y < y - 5 && x <= canvas.width && y <= canvas.height) {
                // Klick mit Kreis vergleichen
                // wenn Klick und Kreis übereinstimmen, kann dieser gelöscht, oder verschoben werden


                //auswahlarray komplett löschen:
                if (auswahlArray.length >= 1) {
                    kreisArray.push(auswahlArray[0]);
                    auswahlArray.splice(0, 1);
                }
                ausgewaehltesElement = i; //Das Element, auf das geklickt wurde, wird in I abgespeichert       
                auswahlArray.push(kreisArray[i]); // I ist das augewählte Element
                kreisArray.splice(i, 1); // Das ausgewählte Element wird ins Auswahlarray gepushed und aus dem Kreisarray gespliced

                // Sobald das Mouseevent ausgeführt wird und ein Element ausgewählt wurde, werden 2 Buttons erstellt


                let button: HTMLButtonElement = <HTMLButtonElement>document.createElement("BUTTON");   // Create a <button> Values
                button.innerHTML = "Delete";   // Insert text
                let div: HTMLDivElement = <HTMLDivElement>document.getElementById("butons");
                div.appendChild(button); // Button wird ans HTML gehängt
                button.addEventListener("click", deleteButton); // Eventlistener + Funktionsaufruf

                let buttonposition: HTMLButtonElement = <HTMLButtonElement>document.createElement("BUTTON");   // Create a <button> Values
                buttonposition.innerHTML = "Position";   // Insert text
                let divposition: HTMLDivElement = <HTMLDivElement>document.getElementById("butons");
                divposition.appendChild(buttonposition);
                //console.log("buttonposition");
                buttonposition.addEventListener("click", positionButtonKreis);


            }

        }
    }
    function deleteButton(): void { // Bei Klick auf "Delete" wird die Funktion aufgerufen
        if (auswahlArray.length > 1) {
            kreisArray.push(auswahlArray[0]);
            auswahlArray.splice(0, 1);
        }

        auswahlArray.splice(0, 1);
        //kreisArray.splice(ausgewaehltesElement, 1);
        //console.log("weg mit dir");

        document.getElementById("buttons").innerHTML = ""; // Alle Buttons verschwinden wieder, sobald ein Values gelöscht wurde
    }


    function positionButtonKreis(): void { // Bei Klick auf "Position" wird die Function aufgerufen

        auswahl = true;



    }






    function loadpicture(): void {
        find(); // Find wird im Client aufgerufen und ausgeführt
    }

    export function ladebild(): void {
        //console.log(globalArray);
        for (let i: number = 0; i < kreisArray.length; i++) {
            kreisArray.pop();
            auswahlArray.pop();
        }

        // Bilder, die in der Datenbank gespeichert wurden, können wieder hergestellt werden. Die Parameter werden zuvor an die Datenbank übergeben und jetzt können die Eigenschaften der einzelnen Zauberbilder identifiziert werden
        // Zuweisung von Werten:

        let id: number = this.id; //Jedes der Elemente besitzt eine ID ?????????????????????????????????????????????????ß
        let xbild: string = globalArray[id].x; // X-Position der einzelnden Elemente
        let ybild: string = globalArray[id].y;
        let typebild: string = globalArray[id].type; // Der Typ der Elemente, die in der Datenbank im Zauberbild gespeichert wurden
        let backgroundC: string = globalArray[id].backgroundC; // Die gespeichert Hindergrundfarbe des Bildes
        let size: string = globalArray[id].size; // Die gespeicherte Größe des Bildes

        //Wiederherstellung der gespeicherten Canvas-Größe:
        if (size == "400") {
            Klein();
        }
        if (size == "500") {
            Mittel();
        }
        if (size == "600") {
            Gross();
        }

        // Wiederherstellung der Hindergrund-Farbe:
        bg = backgroundC;

        //Wiederherstellung der einzelnden Elemente:

        for (let i: number = 0; i < typebild.length; i++) {
            let element: Symbole = { // Neue Elemente werden "angelegt" -> bzw wieder hergestellt, die x und y Position & der Type wurden in der Datenbank abgespeichert 
                x: xbild[i],  // ????????????????????????????????????????????????????????????????????????
                y: ybild[i],
                type: typebild[i]
            };

        
            if (element.type == "Bubblegum") {
                console.log("moini");
                let kreis: Bubblegum = new Bubblegum();
                kreis.x = parseInt(element.x);
                kreis.y = parseInt(element.y);
                kreisArray.push(kreis);
            }

            if (element.type == "FliegerKlasse") {
                console.log("moini");
                let dreieck2: FliegerKlasse = new FliegerKlasse();
                dreieck2.x = parseInt(element.x);
                dreieck2.y = parseInt(element.y);
                kreisArray.push(dreieck2);
            }
            if (element.type == "Values") {
                let kreis2: Values = new Values();
                kreis2.x = parseInt(element.x);
                kreis2.y = parseInt(element.y);
                kreisArray.push(kreis2);
            } 
        }
        document.getElementById("buttons").innerHTML = ""; // ?????????????????????????????????? buttons werden nicht gelöscht????????????????????????????????????


    }


    function saveBg(): void {
        //let background: string = bg;
        insert();
    }


    // Die Buttons besitzen einen Event-Listener und rufen die Funktionen auf:

    function Klein(): void {
        canvas.height = 400;
        canvas.width = 400;

    }

    function Mittel(): void {
        canvas.height = 500;
        canvas.width = 500;
    }

    function Gross(): void {
        canvas.height = 600;
        canvas.width = 600;
    }

    function Silver(): void {
        bg = "silver";


    }

    function Gold(): void {
        bg = "palegoldenrod";

    }

    function Night(): void {
        bg = "midnightblue";
    }




}
