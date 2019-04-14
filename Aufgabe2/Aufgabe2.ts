/* Aufgabe 2 - Mau-Mau
Name: Dimitrios Stüber
Matrikel: 257744
Datum: 07.04.2019
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert. */


namespace MauMau {
    interface Cards {
        length: number;



        zahl: string;
        zeichen: string;
    }

    let cards: Cards[] = [
        { zahl: "7", zeichen: "Karo" }, { zahl: "8", zeichen: "Karo" }, { zahl: "9", zeichen: "Karo" }, { zahl: "10", zeichen: "Karo" }, { zahl: "Bube", zeichen: "Karo" }, { zahl: "Dame", zeichen: "Karo" }, { zahl: "Koenig", zeichen: "Karo" }, { zahl: "As", zeichen: "Karo" },
        { zahl: "7", zeichen: "Pik" }, { zahl: "8", zeichen: "Pik" }, { zahl: "9", zeichen: "Pik" }, { zahl: "10", zeichen: "Pik" }, { zahl: "Bube", zeichen: "Pik" }, { zahl: "Dame", zeichen: "Pik" }, { zahl: "Koenig", zeichen: "Pik" }, { zahl: "As", zeichen: "Pik" },
        { zahl: "7", zeichen: "Kreuz" }, { zahl: "8", zeichen: "Kreuz" }, { zahl: "9", zeichen: "Kreuz" }, { zahl: "10", zeichen: "Kreuz" }, { zahl: "Bube", zeichen: "Kreuz" }, { zahl: "Dame", zeichen: "Kreuz" }, { zahl: "Koenig", zeichen: "Kreuz" }, { zahl: "As", zeichen: "Kreuz" },
        { zahl: "7", zeichen: "Herz" }, { zahl: "8", zeichen: "Herz" }, { zahl: "9", zeichen: "Herz" }, { zahl: "10", zeichen: "Herz" }, { zahl: "Bube", zeichen: "Herz" }, { zahl: "Dame", zeichen: "Herz" }, { zahl: "Koenig", zeichen: "Herz" }, { zahl: "As", zeichen: "Herz" }
    ];
    let hand: Cards[] = [];

    document.addEventListener("DOMContentLoaded", function (): void {

        let eingabe: number = parseInt(prompt("Wie viele Karten willst du auf der Hand haben?", "4-8"));
        if (eingabe > 8)
            eingabe = 8;

        if (eingabe < 4)
            eingabe = 4;
        // Karten verteilen
        giveCard(eingabe);

        // Karten anzeigen
        anzeigen();

    });
    function maumau() :void {
        document.getElementById("button").addEventListener("click", sortCards);
        document.getElementById("Nachzieh").addEventListener("click", addCard);
        document.addEventListener("keydown", addCardSpace);
        document.getElementById("Inhalt").addEventListener("click", removeCard);


    function giveCard(_eingabe: number): void {
        for (let i: number = 0; i < _eingabe; i++) {
            let index: number = Math.floor(Math.random() * card.length);
            let card: Cards = card[index];
            hand.push(card);
            card.splice(index, 1);
        }
        console.table(hand);
    }

    function anzeigen(): void {
        for (let i: number = 0; i < hand.length; i++) {
            // Karte erstellen
            let card: HTMLElement = document.createElement("div");
            card.innerText = hand[i].Zeichen + " " + hand[i].Nummer;
            card.setAttribute("class", "cards");
            // Karte dem DOM Tree hinzufügen
            document.getElementById("hand").appendChild(card);
        }
    }
