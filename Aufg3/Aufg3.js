var MauMau;
(function (MauMau) {
    document.addEventListener("DOMContentLoaded", maumau);
    let allCards = [
        { zahl: "7", zeichen: "Karo" }, { zahl: "8", zeichen: "Karo" }, { zahl: "9", zeichen: "Karo" }, { zahl: "10", zeichen: "Karo" }, { zahl: "Bube", zeichen: "Karo" }, { zahl: "Dame", zeichen: "Karo" }, { zahl: "Koenig", zeichen: "Karo" }, { zahl: "As", zeichen: "Karo" },
        { zahl: "7", zeichen: "Pik" }, { zahl: "8", zeichen: "Pik" }, { zahl: "9", zeichen: "Pik" }, { zahl: "10", zeichen: "Pik" }, { zahl: "Bube", zeichen: "Pik" }, { zahl: "Dame", zeichen: "Pik" }, { zahl: "Koenig", zeichen: "Pik" }, { zahl: "As", zeichen: "Pik" },
        { zahl: "7", zeichen: "Kreuz" }, { zahl: "8", zeichen: "Kreuz" }, { zahl: "9", zeichen: "Kreuz" }, { zahl: "10", zeichen: "Kreuz" }, { zahl: "Bube", zeichen: "Kreuz" }, { zahl: "Dame", zeichen: "Kreuz" }, { zahl: "Koenig", zeichen: "Kreuz" }, { zahl: "As", zeichen: "Kreuz" },
        { zahl: "7", zeichen: "Herz" }, { zahl: "8", zeichen: "Herz" }, { zahl: "9", zeichen: "Herz" }, { zahl: "10", zeichen: "Herz" }, { zahl: "Bube", zeichen: "Herz" }, { zahl: "Dame", zeichen: "Herz" }, { zahl: "Koenig", zeichen: "Herz" }, { zahl: "As", zeichen: "Herz" }
    ];
    let pileCards = [];
    //Hauptfunktion
    function maumau() {
        document.getElementById("button").addEventListener("click", sortCards);
        document.getElementById("Nachzieh").addEventListener("click", addCard);
        document.addEventListener("keydown", addCardSpace);
        document.getElementById("Inhalt").addEventListener("click", removeCard);
        //Prompt
        let numberCards;
        let input = prompt("Mit wie vielen Karten willst du spielen? 4-10");
        numberCards = Number(input);
        //Karten ausgeben
        for (let i = 0; i < numberCards; i++) {
            let randomNumber = createRandomNumber(allCards.length);
            placeDiv(allCards[randomNumber].color, allCards[randomNumber].value, i);
            let card = allCards.splice(randomNumber, 1)[0];
            handCards.push(card);
            continue;
        }
    }
    function createRandomNumber(x) {
        return Math.floor(Math.random() * Math.floor(x));
    }
    function removeCard(_event) {
        let main = document.getElementById("Inhalt");
        let domCard = _event.target;
        if (domCard != main) {
            let index;
            let domAttribute = domCard.getAttribute("id");
            domAttribute = domAttribute.substr(4);
            index = parseInt(domAttribute);
            let karte = handCards.splice(index, 1)[0];
            pileCards.push(karte);
            deleteCards();
            deletePile();
            for (let i = 0; i < handCards.length; i++) {
                placeDiv(handCards[i].color, handCards[i].value, i);
            }
            for (let i = 0; i < pileCards.length; i++) {
                placePile(pileCards[i].color, pileCards[i].value, i);
            }
        }
    }
    function deletePile() {
        let node = document.getElementById("Ablagestapel");
        node.innerHTML = "Ablagestapel";
    }
    function placePile(_color, _value, _y) {
        let div = document.createElement("div");
        document.getElementById("Ablagestapel").appendChild(div);
        div.setAttribute("class", _color + ", pile");
        div.setAttribute("id", "card" + _y);
        document.getElementById("card" + _y).innerHTML += _color + _value;
    }
    //Sortieren
    function sortCards() {
        handCards.sort(compareCards);
        deleteCards();
        for (let i = 0; i < handCards.length; i++) {
            placeDiv(handCards[i].color, handCards[i].value, i);
        }
    }
    function compareCards(card1, card2) {
        let textA = card1.color.toUpperCase();
        let textB = card2.color.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }
    //add Card
    function addCard() {
        deleteCards();
        for (let i = 0; i < 1; i++) {
            let randomNumber = createRandomNumber(allCards.length);
            let card = allCards.splice(randomNumber, 1)[0];
            handCards.push(card);
        }
        for (let i = 0; i < handCards.length; i++) {
            console.log(handCards);
            placeDiv(handCards[i].color, handCards[i].value, i);
        }
    }
    //Leertaste addet Karte
    function addCardSpace(_event) {
        let keyCode = _event.keyCode;
        if (keyCode == 32) {
            addCard();
        }
    }
    //Delete Cards
    function deleteCards() {
        let node = document.getElementById("Inhalt");
        node.innerHTML = "";
    }
    //Divs erstellen
    function placeDiv(_color, _value, _y) {
        let div = document.createElement("div");
        document.getElementById("Inhalt").appendChild(div);
        div.setAttribute("class", _color);
        div.setAttribute("id", "card" + _y);
        document.getElementById("card" + _y).innerHTML += _color + _value;
    }
})(MauMau || (MauMau = {}));
//# sourceMappingURL=Aufg3.js.map