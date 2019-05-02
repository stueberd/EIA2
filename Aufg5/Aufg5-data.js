var EisDealer;
(function (EisDealer) {
    /*
 Aufgabe: Aufgabe 5, Eis Dealer reloaded
 Name: Dimitrios Stüber
 Matrikel: 257744
 Datum: 27.04.2019
     
 Hiermit versichere ich, dass ich diesen Code selbst geschrieben habe. Er wurde nicht kopiert und auch nicht diktiert.
 */
    EisDealer.angebot = {
        "Behälter": [
            { bezeichnung: "Waffel", preis: 0, type: "radio", kategorie: "Behälter", min: 0, max: 0, step: 0 },
            { bezeichnung: "Becher", preis: 0, type: "radio", kategorie: "Behälter", min: 0, max: 0, step: 0 }
        ],
        "Eissorten": [
            { bezeichnung: "Schokolade", preis: 1, type: "number", kategorie: "Eissorten", min: 0, max: 10, step: 1 },
            { bezeichnung: "Vanille", preis: 1, type: "number", kategorie: "Eissorten", min: 0, max: 10, step: 1 },
            { bezeichnung: "Erdbeere", preis: 1, type: "number", kategorie: "Eissorten", min: 0, max: 10, step: 1 },
            { bezeichnung: "Himbeere", preis: 1, type: "number", kategorie: "Eissorten", min: 0, max: 10, step: 1 },
            { bezeichnung: "Oreo", preis: 1, type: "number", kategorie: "Eissorten", min: 0, max: 10, step: 1 },
            { bezeichnung: "Schlumpf", preis: 1, type: "number", kategorie: "Eissorten", min: 0, max: 10, step: 1 },
            { bezeichnung: "Yogurt", preis: 1, type: "number", kategorie: "Eissorten", min: 0, max: 10, step: 1 },
            { bezeichnung: "Walnuss", preis: 1, type: "number", kategorie: "Eissorten", min: 0, max: 10, step: 1 },
            { bezeichnung: "Mystery", preis: 1, type: "number", kategorie: "Eissorten", min: 0, max: 10, step: 1 }
        ],
        "Extras": [
            { bezeichnung: "Sahne", preis: 0.50, type: "checkbox", kategorie: "Topping", min: 0, max: 0, step: 0 },
            { bezeichnung: "Streusel", preis: 0.30, type: "checkbox", kategorie: "Topping", min: 0, max: 0, step: 0 },
            { bezeichnung: "Schockosoße", preis: 0.40, type: "checkbox", kategorie: "Topping", min: 0, max: 0, step: 0 },
            { bezeichnung: "Erdbeersoße", preis: 0.40, type: "checkbox", kategorie: "Topping", min: 0, max: 0, step: 0 },
            { bezeichnung: "Schokowaffel", preis: 0.50, type: "checkbox", kategorie: "Topping", min: 0, max: 0, step: 0 }
        ],
        "Lieferoption": [
            { bezeichnung: "Abholer", preis: 0.00, type: "radio", kategorie: "Lieferoption", min: 0, max: 0, step: 0 },
            { bezeichnung: "Lieferung", preis: 3.50, type: "radio", kategorie: "Lieferoption", min: 0, max: 0, step: 0 }
        ]
    };
})(EisDealer || (EisDealer = {}));
//# sourceMappingURL=Aufg5-data.js.map