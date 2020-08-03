var Zauberbild;
(function (Zauberbild) {
    // Kommentare zum Code, warum was......!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    document.addEventListener("DOMContentLoaded", init);
    document.addEventListener("mousedown", auswahlKreis);
    Zauberbild.serverAddress = "http://eia2-stueberd.herokuapp.com/";
    Zauberbild.kreisArray = [];
    Zauberbild.auswahlArray = [];
    let fps = 30;
    Zauberbild.bg = "white";
    let auswahl = false; // Boolean ist am Anfang auf false, später wird es geändert ????????????????????????????????????????
    //export let input: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");
    //let einkreis: Boolean = false;
    function init() {
        Zauberbild.canvas = document.getElementsByTagName("canvas")[0];
        Zauberbild.crc = Zauberbild.canvas.getContext("2d");
        // Es werden Buttons erstellt, mit denen man das Zauberbild bearbeiten kann. Auf jedem Button liegt ein Click-Event, das eine Funktion aufruft
        let klein = document.getElementById("Klein");
        klein.addEventListener("click", Klein);
        let mittel = document.getElementById("Mittel");
        mittel.addEventListener("click", Mittel);
        let gross = document.getElementById("Gross");
        gross.addEventListener("click", Gross);
        let night = document.getElementById("night");
        night.addEventListener("click", Night);
        let silver = document.getElementById("silver");
        silver.addEventListener("click", Silver);
        let lila = document.getElementById("gold");
        lila.addEventListener("click", Gold);
        let move = document.getElementById("move");
        move.addEventListener("click", zeichneKreis);
        let growth = document.getElementById("growth");
        growth.addEventListener("click", zeichneGrowth);
        let lauf2 = document.getElementById("lauf2");
        lauf2.addEventListener("click", zeichneTest);
        let snowing = document.getElementById("snowing");
        snowing.addEventListener("click", zeichneSnow);
        let save = document.getElementById("save");
        save.addEventListener("click", saveBg);
        let load = document.getElementById("load");
        load.addEventListener("click", loadpicture);
        update();
    }
    function update() {
        window.setTimeout(update, 1000 / fps);
        Zauberbild.crc.clearRect(0, 0, Zauberbild.canvas.width, Zauberbild.canvas.height);
        Zauberbild.crc.rect(0, 0, Zauberbild.canvas.width, Zauberbild.canvas.height);
        Zauberbild.crc.fillStyle = Zauberbild.bg;
        Zauberbild.crc.fill();
        // Die Arrays werden durchlaufen mit Hilfe von I und werden upgedated
        // Der obere loop geht so lang, i kleiner ist als kreisarray.lenght
        for (let i = 0; i < Zauberbild.kreisArray.length; i++) {
            Zauberbild.kreisArray[i].update(0, 0);
            // console.log("Hiiii");
        }
        for (let i = 0; i < Zauberbild.auswahlArray.length; i++) {
            Zauberbild.auswahlArray[i].update(0, 0);
        }
    }
    // Die Event-Listener auf den Buttons rufen die Funktion auf und es werden neue Superklassen und Subklassen erstellt
    function zeichneKreis() {
        let circle = new Zauberbild.Values(); // Superklasse
        Zauberbild.kreisArray.push(circle); // Alle Elemente des Zauberbildes werden nachdem sie erstellt wurden im Kreisarray abgespeichert
    }
    function zeichneGrowth() {
        let circleBubblegum = new Zauberbild.Bubblegum();
        Zauberbild.kreisArray.push(circleBubblegum); // er setzt das Values circlebumbblegum zu einem neuen Values vomm typ bubblegum und circlebubblegum wird in den kreisArray gepushed
    }
    function zeichneSnow() {
        let schnee = new Zauberbild.Snow();
        Zauberbild.kreisArray.push(schnee);
    }
    function zeichneTest() {
        let dreieck2 = new Zauberbild.FliegerKlasse();
        Zauberbild.kreisArray.push(dreieck2);
    }
    function auswahlKreis(_event) {
        auswahl = false;
        for (let i = 0; i < Zauberbild.kreisArray.length; i++) { // Das Array wird durchlaufen
            let x = _event.clientX; // Die x-Position, an der geklickt wird, wird in x gespeichert
            let y = _event.clientY;
            //console.log("Auswahl");
            if (Zauberbild.kreisArray[i].x < x + 5 && Zauberbild.kreisArray[i].x < x + 5 && Zauberbild.kreisArray[i].y < y + 5 && Zauberbild.kreisArray[i].y < y - 5 && x <= Zauberbild.canvas.width && y <= Zauberbild.canvas.height) {
                // Klick mit Kreis vergleichen
                // wenn Klick und Kreis übereinstimmen, kann dieser gelöscht, oder verschoben werden
                //auswahlarray komplett löschen:
                if (Zauberbild.auswahlArray.length >= 1) {
                    Zauberbild.kreisArray.push(Zauberbild.auswahlArray[0]);
                    Zauberbild.auswahlArray.splice(0, 1);
                }
                Zauberbild.ausgewaehltesElement = i; //Das Element, auf das geklickt wurde, wird in I abgespeichert       
                Zauberbild.auswahlArray.push(Zauberbild.kreisArray[i]); // I ist das augewählte Element
                Zauberbild.kreisArray.splice(i, 1); // Das ausgewählte Element wird ins Auswahlarray gepushed und aus dem Kreisarray gespliced
                // Sobald das Mouseevent ausgeführt wird und ein Element ausgewählt wurde, werden 2 Buttons erstellt
                let button = document.createElement("BUTTON"); // Create a <button> Values
                button.innerHTML = "Delete"; // Insert text
                let div = document.getElementById("butons");
                div.appendChild(button); // Button wird ans HTML gehängt
                button.addEventListener("click", deleteButton); // Eventlistener + Funktionsaufruf
                let buttonposition = document.createElement("BUTTON"); // Create a <button> Values
                buttonposition.innerHTML = "Position"; // Insert text
                let divposition = document.getElementById("butons");
                divposition.appendChild(buttonposition);
                //console.log("buttonposition");
                buttonposition.addEventListener("click", positionButtonKreis);
            }
        }
    }
    function deleteButton() {
        if (Zauberbild.auswahlArray.length > 1) {
            Zauberbild.kreisArray.push(Zauberbild.auswahlArray[0]);
            Zauberbild.auswahlArray.splice(0, 1);
        }
        Zauberbild.auswahlArray.splice(0, 1);
        //kreisArray.splice(ausgewaehltesElement, 1);
        //console.log("weg mit dir");
        document.getElementById("buttons").innerHTML = ""; // Alle Buttons verschwinden wieder, sobald ein Values gelöscht wurde
    }
    function positionButtonKreis() {
        auswahl = true;
    }
    function loadpicture() {
        Zauberbild.find(); // Find wird im Client aufgerufen und ausgeführt
    }
    function ladebild() {
        //console.log(globalArray);
        for (let i = 0; i < Zauberbild.kreisArray.length; i++) {
            Zauberbild.kreisArray.pop();
            Zauberbild.auswahlArray.pop();
        }
        // Bilder, die in der Datenbank gespeichert wurden, können wieder hergestellt werden. Die Parameter werden zuvor an die Datenbank übergeben und jetzt können die Eigenschaften der einzelnen Zauberbilder identifiziert werden
        // Zuweisung von Werten:
        let id = this.id; //Jedes der Elemente besitzt eine ID ?????????????????????????????????????????????????ß
        let xbild = Zauberbild.globalArray[id].x; // X-Position der einzelnden Elemente
        let ybild = Zauberbild.globalArray[id].y;
        let typebild = Zauberbild.globalArray[id].type; // Der Typ der Elemente, die in der Datenbank im Zauberbild gespeichert wurden
        let backgroundC = Zauberbild.globalArray[id].backgroundC; // Die gespeichert Hindergrundfarbe des Bildes
        let size = Zauberbild.globalArray[id].size; // Die gespeicherte Größe des Bildes
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
        Zauberbild.bg = backgroundC;
        //Wiederherstellung der einzelnden Elemente:
        for (let i = 0; i < typebild.length; i++) {
            let element = {
                x: xbild[i],
                y: ybild[i],
                type: typebild[i]
            };
            if (element.type == "Bubblegum") {
                console.log("moini");
                let kreis = new Zauberbild.Bubblegum();
                kreis.x = parseInt(element.x);
                kreis.y = parseInt(element.y);
                Zauberbild.kreisArray.push(kreis);
            }
            if (element.type == "FliegerKlasse") {
                console.log("moini");
                let dreieck2 = new Zauberbild.FliegerKlasse();
                dreieck2.x = parseInt(element.x);
                dreieck2.y = parseInt(element.y);
                Zauberbild.kreisArray.push(dreieck2);
            }
            if (element.type == "Values") {
                let kreis2 = new Zauberbild.Values();
                kreis2.x = parseInt(element.x);
                kreis2.y = parseInt(element.y);
                Zauberbild.kreisArray.push(kreis2);
            }
        }
        document.getElementById("buttons").innerHTML = ""; // ?????????????????????????????????? buttons werden nicht gelöscht????????????????????????????????????
    }
    Zauberbild.ladebild = ladebild;
    function saveBg() {
        //let background: string = bg;
        Zauberbild.insert();
    }
    // Die Buttons besitzen einen Event-Listener und rufen die Funktionen auf:
    function Klein() {
        Zauberbild.canvas.height = 400;
        Zauberbild.canvas.width = 400;
    }
    function Mittel() {
        Zauberbild.canvas.height = 500;
        Zauberbild.canvas.width = 500;
    }
    function Gross() {
        Zauberbild.canvas.height = 600;
        Zauberbild.canvas.width = 600;
    }
    function Silver() {
        Zauberbild.bg = "silver";
    }
    function Gold() {
        Zauberbild.bg = "palegoldenrod";
    }
    function Night() {
        Zauberbild.bg = "midnightblue";
    }
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=main.js.map