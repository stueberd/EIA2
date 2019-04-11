/* Aufgabe 2 - Mau-Mau
Name: Dimitrios Stüber
Matrikel: 257744
Datum: 07.04.2019
Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert. */


namespace MauMau {
    interface Cards {
        

        Nummer: string[];
        Zeichen: string[];
    }
    let card: Cards = {
        Nummer: ["7", "8", "9", "10", "B", "D", "K", "A"],
        Zeichen: ["Karo", "Herz", "Kreuz", "Pik"]
    };
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
