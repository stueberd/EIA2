namespace CoronaHilfe {
    export interface Item {
        name: string;
        value: string;
        price: number;
        unit: string;
    }

    export interface Data {
        [category: string]: Item[];
    }
    
    export function generateContent(_data: Data): void {

        for (let category in _data) {
            let items: Item[] = _data[category];

            let group: HTMLElement | null = null;
            console.log("Kategorie:" + items);
            switch (category) {
                case "Einkauf":
                    group = createDataList(items, category);
                    break;
                case "Supermarkt":
                    group = createDataListSupermarkt(items, category);
                    break;
                case "Haushalt":
                    group = createMultiple(items, category);
                    break;
                case "Bank":
                    group = createSingle(items, category);
                    break;
                case "Zahlung":
                    group = createSingleCash(items, category);
                    break;
                default:
                    break;
            }

            let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#" + category);
            if (fieldset && group) {
                fieldset.appendChild(group);
            }
        }
    }
    
    function createDataList(_items: Item[], _category: string): HTMLElement | null {
        console.log("Einkauf");
        let group: HTMLDivElement = document.createElement("div");
        let select: HTMLSelectElement = document.createElement("select");
        
        for (let item of _items) {
            
            let option: HTMLOptionElement = document.createElement("option"); 
            option.setAttribute("price", item.price.toFixed(2));
            option.setAttribute("unit", item.unit);
            option.value = item.value; 
            select.name = _category; 
            option.id = item.name;
         
            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;
            group.appendChild(select);
            select.appendChild(option);
            option.appendChild(label);
        }
        return group;
    }

    function createDataListSupermarkt(_items: Item[], _category: string): HTMLElement | null {
        console.log("Supermarkt");
        let group: HTMLDivElement = document.createElement("div");
        let select: HTMLSelectElement = document.createElement("select");
        for (let item of _items) {
            let option: HTMLOptionElement = document.createElement("option"); 
            option.setAttribute("price", item.price.toFixed(2));
            option.value = item.value; 
            select.name = _category; 
            option.id = item.name;
         
            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;
            group.appendChild(select);
            select.appendChild(option);
            option.appendChild(label);
        }
        return group;
    }

    function createMultiple(_items: Item[], _category: string): HTMLElement | null {
        console.log("Haushalt");
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let checkbox: HTMLInputElement = <HTMLInputElement>document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.value; 
            // console.log("Hier:" + item.value);
            checkbox.name = _category; 
            checkbox.id = item.name;

            console.log("checkbox:" + checkbox);

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;

            group.appendChild(checkbox);
            group.appendChild(label);
        }
        return group;
    }

    function createSingle(_items: Item[], _category: string): HTMLElement | null {
        console.log("Bank");
        let group: HTMLDivElement = document.createElement("div");
        for (let item of _items) {
            let radio: HTMLInputElement = <HTMLInputElement>document.createElement("input"); 
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.setAttribute("id", "radio");
            radio.value = item.value; 
            radio.name = _category; 
            
         
            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;
            
            group.appendChild(radio);
            group.appendChild(label);
        }
        return group;
    }

    function createSingleCash(_items: Item[], _category: string): HTMLElement | null {
        console.log("Zahlung");
        let group: HTMLDivElement = document.createElement("div");

        for (let item of _items) {
            
            let radio: HTMLInputElement = <HTMLInputElement>document.createElement("input"); 
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.value = item.value;
            radio.name = _category; 
            radio.id = item.name;

            let label: HTMLLabelElement = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;
            
            group.appendChild(radio);
            group.appendChild(label);
        }
        return group;
    }

}