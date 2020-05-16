namespace CoronaHilfe1 {

    window.addEventListener("load", init);

    function init(): void {
        writeHTML(CoronaHilfe.offer);
        let fieldsets: HTMLCollectionOf<HTMLFieldSetElement> = document.getElementsByTagName("fieldset");

        for (let i: number = 0; i < fieldsets.length; i++) {
            let fieldset: HTMLFieldSetElement = fieldsets[i];
            fieldset.addEventListener("change", aenderung);
            document.getElementById("kontrolle").addEventListener("click", kontrolle);
        }
    }

    function writeHTML(_Offer: CoronaHilfe.Category): void {
        for (let key in _Offer) {
            let category: CoronaHilfe.Product[] = _Offer[key];
            let div: HTMLElement = document.createElement("div");
            div.innerHTML = `<p>${key}</p>
            <ul id="${key.substring(0, 3)}"></ul>`;
            document.getElementById("bestellung").appendChild(div);
            let box: HTMLElement = document.createElement("fieldset");

            let builder: string = `<legend>${key}</legend><br>`;
            for (let b: number = 0; b < category.length; b++) {
                builder += `<input type="${category[b].type}" name="${category[b].category}" id="${category[b].bezeichnung}" preis="${category[b].preis}" min="${category[b].min}" max="${category[b].max}" step="${category[b].step}" value="0">
                    <label for="${category[b].bezeichnung}">${category[b].bezeichnung} ${category[b].preis.toFixed(2)} €</label>
                    <br>`;
            }
            box.setAttribute("id", key);
            box.innerHTML = builder;
            document.getElementById("offer").appendChild(box);
        }

    }

    let input: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");
    function aenderung(_event: Event): void {
        let input: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");
        let num: number = 0;

        document.getElementById("Pro").innerHTML = "";
        document.getElementById("Ser").innerHTML = "";
        document.getElementById("ZO").innerHTML = "";
        document.getElementById("Lie").innerHTML = "";
        
        for (let w: number = 0; w < input.length; w++) {
            
            if (input[w].name != "") {
                if (input[w].name == "Service" && input[w].checked == true) {
                    let ziel: HTMLElement = document.createElement("li");
                    ziel.innerHTML = `${input[w].id}`;
                    document.getElementById("Ser").appendChild(ziel);
                }
                if (input[w].name == "Products") {
                    let ziel: HTMLElement = document.createElement("li");

                    if (input[w].value != "0") {
                        ziel.innerHTML = `${input[w].value}x ${input[w].id} ${Number(Number(input[w].value) * Number(input[w].getAttribute("preis"))).toFixed(2)} €`;
                        num += Number(input[w].value) * Number(input[w].getAttribute("preis"));
                        document.getElementById("Pro").appendChild(ziel);
                    }
                }
                if (input[w].name == "ZahlungsOption" && input[w].checked == true) {
                    let ziel: HTMLElement = document.createElement("li");
                    ziel.innerHTML = `${input[w].id} ${Number(input[w].getAttribute("preis")).toFixed(2)} €`;
                    num += Number(input[w].getAttribute("preis"));
                    document.getElementById("ZO").appendChild(ziel);
                }
                if (input[w].name == "Lieferoption" && input[w].checked == true) {
                    let ziel: HTMLElement = document.createElement("li");
                    ziel.innerHTML = `${input[w].id} ${Number(input[w].getAttribute("preis")).toFixed(2)} €`;
                    num += Number(input[w].getAttribute("preis"));
                    document.getElementById("Lie").appendChild(ziel);
                }
            }
        }
        document.getElementById("preis").innerHTML = String(num.toFixed(2));
    }
    function kontrolle(_event: Event): void {
        let fehler: string = "";
        let proChecked: number = 1;
        let serviceCheck: number = 1;
        let optionChecked: number = 1;
        let adressChecked: number = 1;

        for (let d: number = 0; d < 6; d++) {
            if (input[d].name == "Postleitzahl ") {
                if (Number(input[d].value) < 10000 || Number(input[d].value) > 99999) {
                    adressChecked = 0;
                }
            }
            if (input[d].value == "") {
                adressChecked = 0;
            }
        }
        for (let z: number = 0; z < input.length; z++) {
            if (input[z].name == "Service" && input[z].checked == true) {
                serviceCheck = 1;
            }
            if (input[z].name == "Products" && Number(input[z].value) > 0) {
                proChecked = 1;
            }
            if (input[z].name == "Lieferoption" && input[z].checked == true) {
                optionChecked = 1;
            }
        }
        if (adressChecked == 0) {
            fehler += "Adress Angaben" + String.fromCharCode(13);
        }
        if (proChecked == 0) {
            fehler += "Products" + String.fromCharCode(13);
        }
        if (serviceCheck == 0) {
            fehler += "Service" + String.fromCharCode(13);
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


}