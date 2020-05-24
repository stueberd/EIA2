namespace CoronaHilfe1 {


    export interface Category {
        [key: string]: Product[];
    }

    export interface Product {
        category: string;
        bezeichnung: string;
        preis: number;
        type: string;
        min: number;
        max: number;
        step: number;
    }


    export let offer: Category
        = {
        "Service": [
            { bezeichnung: "Enkaufen", preis: 0, type: "radio", category: "Service", min: 0, max: 0, step: 0 },
            { bezeichnung: "Haushalt", preis: 0, type: "radio", category: "Service", min: 0, max: 0, step: 0 }
        ],
        "Products": [
            { bezeichnung: "6erEier", preis: 1, type: "number", category: "Products", min: 0, max: 10, step: 1 },
            { bezeichnung: "12erEier", preis: 2, type: "number", category: "Products", min: 0, max: 10, step: 1 },
            { bezeichnung: "Milch", preis: 1, type: "number", category: "Products", min: 0, max: 10, step: 1 },
            { bezeichnung: "Nudeln", preis: 1, type: "number", category: "Products", min: 0, max: 10, step: 1 },
            { bezeichnung: "Klopapier", preis: 1, type: "number", category: "Products", min: 0, max: 10, step: 1 },
            { bezeichnung: "Wasser", preis: 1, type: "number", category: "Products", min: 0, max: 10, step: 1 },
            { bezeichnung: "Yogurt", preis: 1, type: "number", category: "Products", min: 0, max: 10, step: 1 },
            { bezeichnung: "Brot", preis: 1, type: "number", category: "Products", min: 0, max: 10, step: 1 },
            { bezeichnung: "Mehl", preis: 1, type: "number", category: "Products", min: 0, max: 10, step: 1 }
        ],
        "ZahlungOptionen": [
            { bezeichnung: "Barzahlung", preis: 0, type: "checkbox", category: "ZahlungsOption", min: 0, max: 0, step: 0 },
            { bezeichnung: "Überweisung", preis: 0, type: "checkbox", category: "ZahlungsOption", min: 0, max: 0, step: 0 },
            { bezeichnung: "Paypal", preis: 0, type: "checkbox", category: "ZahlungsOption", min: 0, max: 0, step: 0 }
            
        ],
        "Lieferoption": [
            { bezeichnung: "Abholer", preis: 2.00, type: "radio", category: "Lieferoption", min: 0, max: 0, step: 0 },
            { bezeichnung: "Lieferung", preis: 3.50, type: "radio", category: "Lieferoption", min: 0, max: 0, step: 0 }
        ]
    };
}
