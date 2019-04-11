/* Aufgabe 2 - Mau-Mau
Name: Dimitrios Stüber
Matrikel: 257744
Datum: 07.04.2019
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert. */
var MauMau;
(function (MauMau) {
    let card = {
        Nummer: ["7", "8", "9", "10", "B", "D", "K", "A"],
        Zeichen: ["Karo", "Herz", "Kreuz", "Pik"]
    };
    let hand = [];
    document.addEventListener("DOMContentLoaded", function () {
        let eingabe = parseInt(prompt("Wie viele Karten willst du auf der Hand haben?", "4-8"));
        if (eingabe > 8)
            eingabe = 8;
        if (eingabe < 4)
            eingabe = 4;
        // Karten verteilen
        giveCard(eingabe);
        // Karten anzeigen
        anzeigen();
    });
    function giveCard(_eingabe) {
        for (let i = 0; i < _eingabe; i++) {
            let index = Math.floor(Math.random() * card.length);
            let card = card[index];
            hand.push(card);
            card.splice(index, 1);
        }
        console.table(hand);
    }
    function anzeigen() {
        for (let i = 0; i < hand.length; i++) {
            // Karte erstellen
            let card = document.createElement("div");
            card.innerText = hand[i].Zeichen + " " + hand[i].Nummer;
            card.setAttribute("class", "cards");
            // Karte dem DOM Tree hinzufügen
            document.getElementById("hand").appendChild(card);
        }
    }
    /* tslint:disable-next-line:variable-name
    let Deck: string[] = ["krz7", "krz8", "krz9", "krzb", "krzd", "krzk", "krz1", "krza", "pi7", "pi8", "pi9", "pib", "pid", "pik", "pi1", "pia", "her7", "her8", "her9", "herb", "herd", "herk", "her1", "hera", "kar7", "kar8", "kar9", "karb", "kard", "kark", "kar1", "kara"];


    // tslint:disable-next-line:typedef
    function randomCards(_numberOfCards: number, _HandkartenArray: string[]) {
        let cardsSelected: string[] = [];

    }
    document.addEventListener("DOMContentLoaded", init);
    function init(): void {
        let notify: string = prompt("How many cards would you like?");
        let numberOfCards: number = parseInt(notify);
        if (Number.isNaN(numberOfCards) || numberOfCards < 0 || numberOfCards > Deck.length) {
            init();
        }
        else {
            for (let i: number = 0; i < numberOfCards; i++) {
                addToHand();
            }
            displayCard();
        }

    }


    function init() {
        randomCards(0, Deck);
    }
    let zufallsNr: number = Math.random * Deck.length;
    i: number = 0;
    if i < Handkarten[];


    document.addEventListener("DOMContentLoaded", init);
}











interface Card {
    value: string;
    color: string;
}

let cards: Card[] = [
    { value: "7", color: "Karo" }, { value: "8", color: "Karo" }, { value: "9", color: "Karo" }, { value: "10", color: "Karo" }, { value: "Bube", color: "Karo" }, { value: "Dame", color: "Karo" }, { value: "Koenig", color: "Karo" }, { value: "As", color: "Karo" },
    { value: "7", color: "Pik" }, { value: "8", color: "Pik" }, { value: "9", color: "Pik" }, { value: "10", color: "Pik" }, { value: "Bube", color: "Pik" }, { value: "Dame", color: "Pik" }, { value: "Koenig", color: "Pik" }, { value: "As", color: "Pik" },
    { value: "7", color: "Kreuz" }, { value: "8", color: "Kreuz" }, { value: "9", color: "Kreuz" }, { value: "10", color: "Kreuz" }, { value: "Bube", color: "Kreuz" }, { value: "Dame", color: "Kreuz" }, { value: "Koenig", color: "Kreuz" }, { value: "As", color: "Kreuz" },
    { value: "7", color: "Herz" }, { value: "8", color: "Herz" }, { value: "9", color: "Herz" }, { value: "10", color: "Herz" }, { value: "Bube", color: "Herz" }, { value: "Dame", color: "Herz" }, { value: "Koenig", color: "Herz" }, { value: "As", color: "Herz" }
];
// console.table(cards);
let hand: Card[] = [];

document.addEventListener("DOMContentLoaded", function (): void {
    // Nutzereingabe Kartenanzahl
    let eingabe: number = parseInt(prompt("Wie viele Karten?", "4-9"));
    if (eingabe > 9)
        eingabe = 9;

    if (eingabe < 4)
        eingabe = 4;

    // Karten verteilen
    verteilen(eingabe);

    // Karten anzeigen
    anzeigen();

});

function verteilen(_eingabe: number): void {
    for (let i: number = 0; i < _eingabe; i++) {
        let index: number = Math.floor(Math.random() * cards.length);
        let card: Card = cards[index];
        hand.push(card);
        cards.splice(index, 1);
    }
    console.table(hand);
}

function anzeigen(): void {
    for (let i: number = 0; i < hand.length; i++) {
        // Karte erstellen
        let card: HTMLElement = document.createElement("div");
        card.innerText = hand[i].color + " " + hand[i].value;
        card.setAttribute("class", "cards");
        // Karte dem DOM Tree hinzufügen
        document.getElementById("hand").appendChild(card);
    }
} 
})(MauMau || (MauMau = {}));
/* tslint:disable-next-line:variable-name
let Deck: string[] = ["krz7", "krz8", "krz9", "krzb", "krzd", "krzk", "krz1", "krza", "pi7", "pi8", "pi9", "pib", "pid", "pik", "pi1", "pia", "her7", "her8", "her9", "herb", "herd", "herk", "her1", "hera", "kar7", "kar8", "kar9", "karb", "kard", "kark", "kar1", "kara"];


// tslint:disable-next-line:typedef
function randomCards(_numberOfCards: number, _HandkartenArray: string[]) {
    let cardsSelected: string[] = [];

}
document.addEventListener("DOMContentLoaded", init);
function init(): void {
    let notify: string = prompt("How many cards would you like?");
    let numberOfCards: number = parseInt(notify);
    if (Number.isNaN(numberOfCards) || numberOfCards < 0 || numberOfCards > Deck.length) {
        init();
    }
    else {
        for (let i: number = 0; i < numberOfCards; i++) {
            addToHand();
        }
        displayCard();
    }

}


function init() {
    randomCards(0, Deck);
}
let zufallsNr: number = Math.random * Deck.length;
i: number = 0;
if i < Handkarten[];


document.addEventListener("DOMContentLoaded", init);
}











interface Card {
value: string;
color: string;
}

let cards: Card[] = [
{ value: "7", color: "Karo" }, { value: "8", color: "Karo" }, { value: "9", color: "Karo" }, { value: "10", color: "Karo" }, { value: "Bube", color: "Karo" }, { value: "Dame", color: "Karo" }, { value: "Koenig", color: "Karo" }, { value: "As", color: "Karo" },
{ value: "7", color: "Pik" }, { value: "8", color: "Pik" }, { value: "9", color: "Pik" }, { value: "10", color: "Pik" }, { value: "Bube", color: "Pik" }, { value: "Dame", color: "Pik" }, { value: "Koenig", color: "Pik" }, { value: "As", color: "Pik" },
{ value: "7", color: "Kreuz" }, { value: "8", color: "Kreuz" }, { value: "9", color: "Kreuz" }, { value: "10", color: "Kreuz" }, { value: "Bube", color: "Kreuz" }, { value: "Dame", color: "Kreuz" }, { value: "Koenig", color: "Kreuz" }, { value: "As", color: "Kreuz" },
{ value: "7", color: "Herz" }, { value: "8", color: "Herz" }, { value: "9", color: "Herz" }, { value: "10", color: "Herz" }, { value: "Bube", color: "Herz" }, { value: "Dame", color: "Herz" }, { value: "Koenig", color: "Herz" }, { value: "As", color: "Herz" }
];
// console.table(cards);
let hand: Card[] = [];

document.addEventListener("DOMContentLoaded", function (): void {
// Nutzereingabe Kartenanzahl
let eingabe: number = parseInt(prompt("Wie viele Karten?", "4-9"));
if (eingabe > 9)
    eingabe = 9;

if (eingabe < 4)
    eingabe = 4;

// Karten verteilen
verteilen(eingabe);

// Karten anzeigen
anzeigen();

});

function verteilen(_eingabe: number): void {
for (let i: number = 0; i < _eingabe; i++) {
    let index: number = Math.floor(Math.random() * cards.length);
    let card: Card = cards[index];
    hand.push(card);
    cards.splice(index, 1);
}
console.table(hand);
}

function anzeigen(): void {
for (let i: number = 0; i < hand.length; i++) {
    // Karte erstellen
    let card: HTMLElement = document.createElement("div");
    card.innerText = hand[i].color + " " + hand[i].value;
    card.setAttribute("class", "cards");
    // Karte dem DOM Tree hinzufügen
    document.getElementById("hand").appendChild(card);
}
} 
//# sourceMappingURL=Aufgabe2.js.map