var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var Fireworks;
(function (Fireworks) {
    window.addEventListener("load", handleLoad);
    // export let url: string = "https://fireworkendabgabe.herokuapp.com";
    Fireworks.buttonClicked = 0;
    let golden = 0.62;
    let moveables = [];
    function handleLoad(_event) {
        let canvas;
        canvas = document.querySelector("canvas");
        if (!canvas)
            return;
        Fireworks.crc2 = canvas.getContext("2d");
        let imgData;
        imgData = Fireworks.crc2.getImageData(0, 0, canvas.width, canvas.height); //implementierung meines Hintergrunds
        Fireworks.drawCanvas();
        document.querySelector("#displayButton").addEventListener("click", displayRocket);
        document.querySelector("#updateButton").addEventListener("click", updateRocket);
        document.querySelector("#resetButton").addEventListener("click", resetRocketlist);
        document.querySelector("#saveButton").addEventListener("click", saveRocket);
    }
    function displayRocket() {
        let formComponents = new FormData(document.forms[0]);
        let rocket = "Name of your rocket: " + formComponents.get("rocketName") + "<br>" + "Explosion: " + formComponents.get("ExplosionSize") + "<br>" + "Lifetime: " + formComponents.get("Lifetime") + "<br>" + "sec" + "<br>" + "Color: " + formComponents.get("Color") + "<br>" + "Amount of Particle: " + formComponents.get("Amount") + "<br>" + "stk." + "<br>" + "Type of Particle: " + formComponents.get("ParticleType") + "<br>" + "Size of Particle: " + formComponents.get("ParticleSize"); //Schlüssel und Wert jeweils in rocket speichern
        document.querySelector("div#rocketlist").innerHTML = rocket;
    }
    function updateRocket() {
        return __awaiter(this, void 0, void 0, function* () {
            let newData = new FormData(document.forms[0]);
            let query = new URLSearchParams(newData); //umformatieren um url mitgeben zu können
            let response = yield fetch(URL + "?" + "command=update&rocket=" + Fireworks.currentRocket + "&" + query.toString());
            let responseText = yield response.text();
            alert(responseText);
        });
    }
    function resetRocketlist() {
        document.forms[0].reset(); //Formular Daten zurücksetzen
        document.getElementById("rocketlist").innerHTML = ""; //Inhalt im div leeren
    }
    function saveRocket(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Save rocket");
            let form = new FormData(document.forms[0]); //Daten aus Form holen
            let query = new URLSearchParams(form);
            //let response: Response = await fetch(URL + "?" + query.toString());                      //Daten von Server holen und an url hängen + in string umwandeln für Lesbarkeit --> in response speichern
            //let responseText: string = await response.text();                                        //Daten in Textform in responseText speichern und ausgeben lassen
            //alert(responseText);
        });
    }
    function fillInputFields(rocket) {
        document.querySelector("input#rocketname").value = rocket["rocketName"];
        document.querySelector("input#explosion").value = rocket["explosion"];
        document.querySelector("input#lifetime").value = rocket["lifetime"];
        document.querySelector("select#color").value = rocket["color"];
        document.querySelector("input#amount").value = rocket["amount"];
        document.querySelector("input#ParticleSize").value = rocket["ParticleSize"];
    }
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=main.js.map