namespace MauMau {
    document.addEventListener("DOMContentLoaded", maumau);

    interface Card {
        zahl: string;
        zeichen: string;
    }

    let allCards: Card[] = [
        { zahl: "7", zeichen: "Karo" }, { zahl: "8", zeichen: "Karo" }, { zahl: "9", zeichen: "Karo" }, { zahl: "10", zeichen: "Karo" }, { zahl: "Bube", zeichen: "Karo" }, { zahl: "Dame", zeichen: "Karo" }, { zahl: "Koenig", zeichen: "Karo" }, { zahl: "As", zeichen: "Karo" },
        { zahl: "7", zeichen: "Pik" }, { zahl: "8", zeichen: "Pik" }, { zahl: "9", zeichen: "Pik" }, { zahl: "10", zeichen: "Pik" }, { zahl: "Bube", zeichen: "Pik" }, { zahl: "Dame", zeichen: "Pik" }, { zahl: "Koenig", zeichen: "Pik" }, { zahl: "As", zeichen: "Pik" },
        { zahl: "7", zeichen: "Kreuz" }, { zahl: "8", zeichen: "Kreuz" }, { zahl: "9", zeichen: "Kreuz" }, { zahl: "10", zeichen: "Kreuz" }, { zahl: "Bube", zeichen: "Kreuz" }, { zahl: "Dame", zeichen: "Kreuz" }, { zahl: "Koenig", zeichen: "Kreuz" }, { zahl: "As", zeichen: "Kreuz" },
        { zahl: "7", zeichen: "Herz" }, { zahl: "8", zeichen: "Herz" }, { zahl: "9", zeichen: "Herz" }, { zahl: "10", zeichen: "Herz" }, { zahl: "Bube", zeichen: "Herz" }, { zahl: "Dame", zeichen: "Herz" }, { zahl: "Koenig", zeichen: "Herz" }, { zahl: "As", zeichen: "Herz" }
    ];
    let pileCards: Card[] = [];

    //Hauptfunktion
    function maumau(): void {
        document.getElementById("button").addEventListener("click", sortCards);
        document.getElementById("Nachzieh").addEventListener("click", addCard);
        document.addEventListener("keydown", addCardSpace);
        document.getElementById("Inhalt").addEventListener("click", removeCard);

        //Prompt
        let numberCards: number;
        let input: string = prompt("Mit wie vielen Karten willst du spielen? 4-10");
        numberCards = Number(input);

        //Karten ausgeben
        for (let i: number = 0; i < numberCards; i++) {
            let randomNumber: number = createRandomNumber(allCards.length);
            placeDiv(allCards[randomNumber].color, allCards[randomNumber].value, i);
            let card: Card = allCards.splice(randomNumber, 1)[0];
            handCards.push(card)
            continue;
        }
    }

    function createRandomNumber(x: number): number {
        return Math.floor(Math.random() * Math.floor(x))
    }


    function removeCard(_event: MouseEvent): void {
        let main: HTMLElement = document.getElementById("Inhalt");
        let domCard: HTMLElement = <HTMLElement>_event.target;
        if (domCard != main) {
            let index: number;
            let domAttribute: string = domCard.getAttribute("id");
            domAttribute = domAttribute.substr(4);
            index = parseInt(domAttribute);
            let karte: Card = handCards.splice(index, 1)[0];
            pileCards.push(karte);
            deleteCards();
            deletePile();
            for (let i: number = 0; i < handCards.length; i++) {
                placeDiv(handCards[i].color, handCards[i].value, i)
            }
            for (let i: number = 0; i < pileCards.length; i++) {
                placePile(pileCards[i].color, pileCards[i].value, i)
            }
        }
    }

    function deletePile(): void {
        let node: HTMLElement = document.getElementById("Ablagestapel");
        node.innerHTML = "Ablagestapel";
    }

    function placePile(_color: string, _value: string, _y: number): void {
        let div: HTMLDivElement = document.createElement("div");
        document.getElementById("Ablagestapel").appendChild(div);
        div.setAttribute("class", _color + ", pile");
        div.setAttribute("id", "card" + _y);
        document.getElementById("card" + _y).innerHTML += _color + _value;
    }

    //Sortieren
    function sortCards(): void {
        handCards.sort(compareCards);
        deleteCards();
        for (let i: number = 0; i < handCards.length; i++) {
            placeDiv(handCards[i].color, handCards[i].value, i)
        }
    }

    function compareCards(card1: Card, card2: Card) {
        let textA = card1.color.toUpperCase();
        let textB = card2.color.toUpperCase();
        return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    }

    //add Card
    function addCard(): void {
        deleteCards();
        for (let i: number = 0; i < 1; i++) {
            let randomNumber: number = createRandomNumber(allCards.length);
            let card: Card = allCards.splice(randomNumber, 1)[0];
            handCards.push(card)
        }
        for (let i: number = 0; i < handCards.length; i++) {
            console.log(handCards);
            placeDiv(handCards[i].color, handCards[i].value, i);
        }
    }

    //Leertaste addet Karte
    function addCardSpace(_event: KeyboardEvent): void {
        let keyCode: number = _event.keyCode;
        if (keyCode == 32) {
            addCard();
        }
    }

    //Delete Cards
    function deleteCards(): void {
        let node: HTMLElement = document.getElementById("Inhalt");
        node.innerHTML = "";
    }

    //Divs erstellen
    function placeDiv(_color: string, _value: string, _y: number): void {
        let div: HTMLDivElement = document.createElement("div");
        document.getElementById("Inhalt").appendChild(div);
        div.setAttribute("class", _color);
        div.setAttribute("id", "card" + _y);
        document.getElementById("card" + _y).innerHTML += _color + _value;
    }
}
