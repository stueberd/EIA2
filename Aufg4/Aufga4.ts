namespace EisdDealer {

    window.addEventListener("load", init);
    document.getElementById("orderDone").addEventListener("click", orderComplete);
}

function init(_event: Event): void {
    console.log(init);

    let fieldsets: HTMLCollectionOf<HTMLFieldSetElement> = document.getElementsByTagName("fieldset");

    for (let i: number = 0; i < fieldsets.length; i++) {
        let fieldset: HTMLFieldSetElement = fieldsets[i];
        fieldset.addEventListener("change", orderContent);
        fieldset.addEventListener("change", orderPrice);
        console.log(fieldset);
    }
}

function orderPrice(_event: Event): void {
    let orderSum: number = 0;
    let orderPrice: number = 0;
    let orderSelections: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");
    for (let i: number = 0; i < orderSelections.length; i++) {
        if (orderSelections[i].checked == true || orderSelections[i].name == "Schokolade" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Vanille" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Erdbeere" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Zitrone" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Joghurt" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Haselnuss" && Number(orderSelections[i].value) > 0) {
            orderPrice = Number(orderSelections[i].value);
            orderSum += orderPrice;
            console.log(orderSum);
        }
    }
    document.getElementById("orderPrice").innerHTML = `Bestellzusammenfassung:  ${orderSum} €`;
}

function orderContent(_event: Event): void { /* Optionbereich des Dropdowns bisher nicht ansprechbar*/
    let orderSelections: HTMLCollectionOf<HTMLInputElement> = document.getElementsByTagName("input");
    document.getElementById("iceSelections").innerHTML = "Sorten: ";
    document.getElementById("toppingSelections").innerHTML = "Extras: ";
    document.getElementById("containerSelections").innerHTML = "Behälter: ";
    document.getElementById("shippingSelections").innerHTML = "Versandart: ";
    for (let i: number = 0; i < orderSelections.length; i++) {
        if (orderSelections[i].checked == true) {
            if (orderSelections[i].name == "toppingSelect1"
                || orderSelections[i].name == "toppingSelect2"
                || orderSelections[i].name == "toppingSelect3") {
                let target = document.createElement("ul");
                target.innerHTML = `${orderSelections[i].alt}, `;
                document.getElementById("toppingSelections").appendChild(target);
            } else if (orderSelections[i].name == "container") {
                let target = document.createElement("ul");
                target.innerHTML = `${orderSelections[i].alt}`;
                document.getElementById("containerSelections").appendChild(target);
            } else if (orderSelections[i].name == "shipping") {
                let target = document.createElement("ul");
                target.innerHTML = `${orderSelections[i].alt}`;
                document.getElementById("shippingSelections").appendChild(target);
            }
        }
        if (orderSelections[i].name == "Schokolade" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Vanille" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Erdbeere" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Zitrone" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Joghurt" && Number(orderSelections[i].value) > 0
            || orderSelections[i].name == "Haselnuss" && Number(orderSelections[i].value) > 0) {

            let target = document.createElement("li");
            target.innerHTML = `${orderSelections[i].value} Kugel (n) ${orderSelections[i].name}, `;
            document.getElementById("iceSelections").appendChild(target);
        }
    }
}

function orderComplete(): void {
    let deliveryStatus: number = 0;

    let delivery1: HTMLInputElement = <HTMLInputElement>document.getElementById("normalShipping");
    let delivery2: HTMLInputElement = <HTMLInputElement>document.getElementById("expressShipping");
    let location: HTMLInputElement = <HTMLInputElement>document.getElementById("location");
    let street: HTMLInputElement = <HTMLInputElement>document.getElementById("street");
    let forename: HTMLInputElement = <HTMLInputElement>document.getElementById("forename");
    let surename: HTMLInputElement = <HTMLInputElement>document.getElementById("surename");


    if (delivery1.checked == true || delivery2.checked == true) {
        deliveryStatus = 1;
    }
    if (location.value == ""
        || street.value == ""
        || forename.value == ""
        || surename.value == ""
        || deliveryStatus == 0) {
        alert("Füllen Sie bitte alle Felder aus !");
    }
}