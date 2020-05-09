var CoronaHilfe;
(function (CoronaHilfe) {

    window.addEventListener("load", init);
    function init() {
        let fieldsets = document.getElementsByTagName("fieldset");
        for (let i = 0; i < fieldsets.length; i++) {
            let fieldset = fieldsets[i];
            fieldset.addEventListener("change", aenderung);
            document.getElementById("kontrolle").addEventListener("click", kontrolle);
        }
    }
    let input = document.getElementsByTagName("input");
    function aenderung(_event) {
        let num = 0;
        document.getElementById("EK").innerHTML = "";
        document.getElementById("HA").innerHTML = "";
        document.getElementById("ZO").innerHTML = "";
        for (let w = 0; w < input.length - 1; w++) {
            if (input[w].checked == true) {
                let preis = Number(input[w].value);
                num += preis;
                document.getElementById("preis").innerHTML = String(num.toFixed(2));
                if (input[w].name == "Einkaufen") {
                    let ziel = document.createElement("li");
                    ziel.innerHTML = `${input[w].id}`;
                    document.getElementById("EK").appendChild(ziel);
                }
                if (input[w].name == "Hausarbeit") {
                    let ziel = document.createElement("li");
                    ziel.innerHTML = `${input[w].id} ${input[w].value} €`;
                    document.getElementById("HA").appendChild(ziel);
                }
                if (input[w].name == "Zahlungsoption") {
                    let ziel = document.createElement("li");
                    ziel.innerHTML = `${input[w].id} ${input[w].value} €`;
                    document.getElementById("ZO").appendChild(ziel);
                }
            }
        }
    }
    function kontrolle(_event) {
        let fehler = "";
        let eisChecked = 0;
        let adressChecked = 1;
        if (input[0].checked == false && input[1].checked == false) {
            fehler += "Behaelter " + String.fromCharCode(13);
        }
        for (let r = 2; r < 11; r++) {
            if (input[r].checked == true) {
                eisChecked = 1;
            }
        }
        if (input[17].checked == false && input[18].checked == false) {
            fehler += "LZahlungsoption " + String.fromCharCode(13);
        }
        for (let d = 19; d < 25; d++) {
            if (input[d].value == "") {
                adressChecked = 0;
            }
        }
        if (adressChecked == 0) {
            fehler += "Adress Angaben" + String.fromCharCode(13);
        }
        if (fehler != "") {
            alert("Es fehlen folgende Angaben: " + String.fromCharCode(13) + fehler);
        }
        else {
            alert("Vielen Dank, deine Bestellung wird bearbeitet.");
        }
    }
})(CoronaHilfe || (CoronaHilfe = {}));
//# sourceMappingURL=Aufga4.js.map