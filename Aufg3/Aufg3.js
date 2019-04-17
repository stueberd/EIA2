var MauMau;
(function (MauMau) {
    document.addEventListener("DOMContentLoaded", maumau);
    let allCards = [
        { zahl: "7", zeichen: "Karo" }, { zahl: "8", zeichen: "Karo" }, { zahl: "9", zeichen: "Karo" }, { zahl: "10", zeichen: "Karo" }, { zahl: "Bube", zeichen: "Karo" }, { zahl: "Dame", zeichen: "Karo" }, { zahl: "Koenig", zeichen: "Karo" }, { zahl: "As", zeichen: "Karo" },
        { zahl: "7", zeichen: "Pik" }, { zahl: "8", zeichen: "Pik" }, { zahl: "9", zeichen: "Pik" }, { zahl: "10", zeichen: "Pik" }, { zahl: "Bube", zeichen: "Pik" }, { zahl: "Dame", zeichen: "Pik" }, { zahl: "Koenig", zeichen: "Pik" }, { zahl: "As", zeichen: "Pik" },
        { zahl: "7", zeichen: "Kreuz" }, { zahl: "8", zeichen: "Kreuz" }, { zahl: "9", zeichen: "Kreuz" }, { zahl: "10", zeichen: "Kreuz" }, { zahl: "Bube", zeichen: "Kreuz" }, { zahl: "Dame", zeichen: "Kreuz" }, { zahl: "Koenig", zeichen: "Kreuz" }, { zahl: "As", zeichen: "Kreuz" },
        { zahl: "7", zeichen: "Herz" }, { zahl: "8", zeichen: "Herz" }, { zahl: "9", zeichen: "Herz" }, { zahl: "10", zeichen: "Herz" }, { zahl: "Bube", zeichen: "Herz" }, { zahl: "Dame", zeichen: "Herz" }, { zahl: "Koenig", zeichen: "Herz" }, { zahl: "As", zeichen: "Herz" }
    ];
    let handCards = [];
    let pileCards = [];
    //Main
    function maumau() {
        document.getElementById("button").addEventListener("click", sortCards);
        document.getElementById("Nachzieh").addEventListener("click", addCard);
        document.addEventListener("keydown", addCardSpace);
        document.getElementById("Inhalt").addEventListener("click", removeCard);
        //Prompt
        let numberCards;
        let input = prompt("Mit wie vielen Karten willst du spielen? 4-8");
        numberCards = Number(input);
        //Karten ausgeben
        for (let i = 0; i < numberCards; i++) {
            let randomNumber = createRandomNumber(allCards.length);
            placeDiv(allCards[randomNumber].zeichen, allCards[randomNumber].zahl, i);
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
            if (domAttribute.substr(domAttribute.length - 2).charAt(0) == "1"
                || domAttribute.substr(domAttribute.length - 2).charAt(0) == "2"
                || domAttribute.substr(domAttribute.length - 2).charAt(0) == "3") {
                domAttribute = domAttribute.substr(domAttribute.length - 2);
            }
            else {
                domAttribute = domAttribute.substr(domAttribute.length - 1);
            }
            index = parseInt(domAttribute);
            let karte = handCards.splice(index, 1)[0];
            pileCards.push(karte);
            deleteCards();
            for (let i = 0; i < handCards.length; i++) {
                placeDiv(handCards[i].zeichen, handCards[i].zahl, i);
            }
            placePile(pileCards[pileCards.length - 1].zeichen, pileCards[pileCards.length - 1].zahl, pileCards.length - 1);
            console.log(pileCards);
        }
    }
    function deletePile() {
        let node = document.getElementById("Ablage");
        node.innerHTML = "Ablage";
    }
    function placePile(_zeichen, _zahl, _y) {
        let div = document.createElement("div");
        deletePile();
        document.getElementById("Ablage").appendChild(div);
        div.setAttribute("class", _zeichen + " " + ", pile");
        div.setAttribute("id", "card" + _zeichen + _zahl + _y);
        document.getElementById("card" + _zeichen + _zahl + _y).innerHTML += _zeichen + " " + _zahl;
    }
    //Sortieren
    function sortCards() {
        handCards.sort(compareCards);
        deleteCards();
        for (let i = 0; i < handCards.length; i++) {
            placeDiv(handCards[i].zeichen, handCards[i].zahl, i);
        }
    }
    function compareCards(card1, card2) {
        let textA = card1.zeichen.toUpperCase();
        let textB = card2.zeichen.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }
    //Karte hinzufügen
    function addCard() {
        deleteCards();
        for (let i = 0; i < 1; i++) {
            let randomNumber = createRandomNumber(allCards.length);
            let card = allCards.splice(randomNumber, 1)[0];
            handCards.push(card);
        }
        for (let i = 0; i < handCards.length; i++) {
            console.log(handCards);
            placeDiv(handCards[i].zeichen, handCards[i].zahl, i);
        }
    }
    //Leertaste
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
    //Divs
    function placeDiv(_zeichen, _zahl, _y) {
        let div = document.createElement("div");
        document.getElementById("Inhalt").appendChild(div);
        div.setAttribute("class", _zeichen);
        div.setAttribute("id", "card" + _y);
        document.getElementById("card" + _y).innerHTML += _zeichen + _zahl;
    }
})(MauMau || (MauMau = {}));
//# sourceMappingURL=Aufg3.js.map