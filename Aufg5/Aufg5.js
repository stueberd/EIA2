var EisDealer;
(function (EisDealer) {
    /*
Aufgabe: Aufgabe 5, Eis Dealer reloaded
Name: Dimitrios Stüber
Matrikel: 2257744
Datum: 27.04.2019
    
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
*/
    window.addEventListener("load", init);
    function init() {
        writeHTML(EisDealer.angebot);
        let fieldsets = document.getElementsByTagName("fieldset");
        for (let i = 0; i < fieldsets.length; i++) {
            let fieldset = fieldsets[i];
            fieldset.addEventListener("change", aenderung);
            document.getElementById("kontrolle").addEventListener("click", kontrolle);
        }
    }
    function writeHTML(_Angebot) {
        for (let key in _Angebot) {
            let kategorie = _Angebot[key];
            let div = document.createElement("div");
            div.innerHTML = `<p>${key}</p>
            <ul id="${key.substring(0, 3)}"></ul>`;
            document.getElementById("bestellung").appendChild(div);
            let box = document.createElement("fieldset");
            let builder = `<legend>${key}</legend><br>`;
            for (let b = 0; b < kategorie.length; b++) {
                builder += `<input type="${kategorie[b].type}" name="${kategorie[b].kategorie}" id="${kategorie[b].bezeichnung}" preis="${kategorie[b].preis}" min="${kategorie[b].min}" max="${kategorie[b].max}" step="${kategorie[b].step}" value="0">
                    <label for="${kategorie[b].bezeichnung}">${kategorie[b].bezeichnung} ${kategorie[b].preis.toFixed(2)} €</label>
                    <br>`;
            }
            box.setAttribute("id", key);
            box.innerHTML = builder;
            document.getElementById("angebot").appendChild(box);
        }
    }
    let input = document.getElementsByTagName("input");
    function aenderung(_event) {
        let input = document.getElementsByTagName("input");
        let num = 0;
        document.getElementById("Eis").innerHTML = "";
        document.getElementById("Beh").innerHTML = "";
        document.getElementById("Top").innerHTML = "";
        document.getElementById("Lie").innerHTML = "";
        for (let w = 0; w < input.length; w++) {
            if (input[w].name != "") {
                if (input[w].name == "Behälter" && input[w].checked == true) {
                    let ziel = document.createElement("li");
                    ziel.innerHTML = `${input[w].id}`;
                    document.getElementById("Beh").appendChild(ziel);
                }
                if (input[w].name == "Eissorten") {
                    let ziel = document.createElement("li");
                    if (input[w].value != "0") {
                        ziel.innerHTML = `${input[w].value}x ${input[w].id} ${Number(Number(input[w].value) * Number(input[w].getAttribute("preis"))).toFixed(2)} €`;
                        num += Number(input[w].value) * Number(input[w].getAttribute("preis"));
                        document.getElementById("Eis").appendChild(ziel);
                    }
                }
                if (input[w].name == "Topping" && input[w].checked == true) {
                    let ziel = document.createElement("li");
                    ziel.innerHTML = `${input[w].id} ${Number(input[w].getAttribute("preis")).toFixed(2)} €`;
                    num += Number(input[w].getAttribute("preis"));
                    document.getElementById("Top").appendChild(ziel);
                }
                if (input[w].name == "Lieferoption" && input[w].checked == true) {
                    let ziel = document.createElement("li");
                    ziel.innerHTML = `${input[w].id} ${Number(input[w].getAttribute("preis")).toFixed(2)} €`;
                    num += Number(input[w].getAttribute("preis"));
                    document.getElementById("Lie").appendChild(ziel);
                }
            }
        }
        document.getElementById("preis").innerHTML = String(num.toFixed(2));
    }
    function kontrolle(_event) {
        let fehler = "";
        let eisChecked = 1;
        let behaelterCheck = 1;
        let optionChecked = 1;
        let adressChecked = 1;
        for (let d = 0; d < 6; d++) {
            if (input[d].name == "Postleitzahl ") {
                if (Number(input[d].value) < 10000 || Number(input[d].value) > 99999) {
                    adressChecked = 0;
                }
            }
            if (input[d].value == "") {
                adressChecked = 0;
            }
        }
        for (let z = 0; z < input.length; z++) {
            if (input[z].name == "Behälter" && input[z].checked == true) {
                behaelterCheck = 1;
            }
            if (input[z].name == "Eissorten" && Number(input[z].value) > 0) {
                eisChecked = 1;
            }
            if (input[z].name == "Lieferoption" && input[z].checked == true) {
                optionChecked = 1;
            }
        }
        if (adressChecked == 0) {
            fehler += "Adress Angaben" + String.fromCharCode(13);
        }
        if (eisChecked == 0) {
            fehler += "Eissorten" + String.fromCharCode(13);
        }
        if (behaelterCheck == 0) {
            fehler += "Behälter" + String.fromCharCode(13);
        }
        if (optionChecked == 0) {
            fehler += "Lieferoption" + String.fromCharCode(13);
        }
        if (fehler != "") {
            alert("Bitte überprüfe deine Eingaben es fehlen: " + String.fromCharCode(13) + fehler);
        }
        else {
            alert("Deine Bestellung wurde entgegengenommen. Vielen Dank");
        }
    }
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Aufg5.js.map