var IceIceBaby;
(function (IceIceBaby) {
    window.addEventListener("load", init);
    document.addEventListener("load", init);
    document.getElementById("orderDone").addEventListener("click", orderComplete);
})(IceIceBaby || (IceIceBaby = {}));
function init(_event) {
    console.log(init);
    let fieldsets = document.getElementsByTagName("fieldset");
    for (let i = 0; i < fieldsets.length; i++) {
        let fieldset = fieldsets[i];
        fieldset.addEventListener("change", orderContent);
        console.log(fieldset);
    }
}
function orderContent(_event) {
    let orderSum = 0;
    let orderSelections = document.getElementsByTagName("input");
    document.getElementById("iceSelections").innerHTML = "Sorten: ";
    document.getElementById("toppingSelections").innerHTML = "Extras: ";
    document.getElementById("containerSelections").innerHTML = "Behälter: ";
    document.getElementById("orderPrice").innerHTML = "Preis: ";
    for (let i = 0; i < orderSelections.length; i++) {
        if (orderSelections[i].checked == true) {
            console.log(orderSum);
            if (orderSelections[i].name == "toppingSelect1" || orderSelections[i].name == "toppingSelect2" || orderSelections[i].name == "toppingSelect3") {
                let target = document.createElement("li");
                target.innerHTML = `${orderSelections[i].alt}, `;
                document.getElementById("toppingSelections").appendChild(target);
            }
            else if (orderSelections[i].name == "container") {
                let target = document.createElement("li");
                target.innerHTML = `${orderSelections[i].alt}`;
                document.getElementById("containerSelections").appendChild(target);
            }
        }
        if (orderSelections[i].name == "Schokolade" || orderSelections[i].name == "Vanille" || orderSelections[i].name == "Erdbeere" || orderSelections[i].name == "Zitrone" || orderSelections[i].name == "Joghurt" || orderSelections[i].name == "Haselnuss" || orderSelections[i].name == "Oreo" || orderSelections[i].name == "HSchlumpf" || orderSelections[i].name == "Mystery" || orderSelections[i].name == "Apfel") {
            console.log(orderSum);
            let target = document.createElement("li");
            target.innerHTML = `${orderSelections[i].value}, `;
            document.getElementById("iceSelections").appendChild(target);
        }
        document.getElementById("orderPrice").innerHTML = `Bestellzusammenfassung:   ${orderSum} €`;
    }
}
function orderComplete() {
    let deliveryStatus = 0;
    let location = document.getElementById("location");
    let street = document.getElementById("street");
    let forename = document.getElementById("forename");
    let surename = document.getElementById("surename");
    if (location.value == "" || street.value == "" || forename.value == "" || surename.value == "" || deliveryStatus == 0) {
        alert("Füllen Sie bitte alle Felder aus !");
    }
}
//# sourceMappingURL=Aufg4.js.map