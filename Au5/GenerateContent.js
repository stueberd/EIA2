"use strict";
var CoronaHilfe;
(function (CoronaHilfe) {
    function generateContent(_data) {
        for (let category in _data) {
            let items = _data[category];
            let group = null;
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
            let fieldset = document.querySelector("fieldset#" + category);
            if (fieldset && group) {
                fieldset.appendChild(group);
            }
        }
    }
    L05_Homehelper.generateContent = generateContent;
    function createDataList(_items, _category) {
        console.log("Einkauf");
        let group = document.createElement("div");
        let select = document.createElement("select");
        for (let item of _items) {
            let option = document.createElement("option");
            option.setAttribute("price", item.price.toFixed(2));
            option.setAttribute("unit", item.unit);
            option.value = item.value;
            select.name = _category;
            option.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;
            group.appendChild(select);
            select.appendChild(option);
            option.appendChild(label);
        }
        return group;
    }
    function createDataListSupermarkt(_items, _category) {
        console.log("Supermarkt");
        let group = document.createElement("div");
        let select = document.createElement("select");
        for (let item of _items) {
            let option = document.createElement("option");
            option.setAttribute("price", item.price.toFixed(2));
            option.value = item.value;
            select.name = _category;
            option.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;
            group.appendChild(select);
            select.appendChild(option);
            option.appendChild(label);
        }
        return group;
    }
    function createMultiple(_items, _category) {
        console.log("Haushalt");
        let group = document.createElement("div");
        for (let item of _items) {
            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.setAttribute("price", item.price.toFixed(2));
            checkbox.value = item.value;
            // console.log("Hier:" + item.value);
            checkbox.name = _category;
            checkbox.id = item.name;
            console.log("checkbox:" + checkbox);
            let label = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;
            group.appendChild(checkbox);
            group.appendChild(label);
        }
        return group;
    }
    function createSingle(_items, _category) {
        console.log("Bank");
        let group = document.createElement("div");
        for (let item of _items) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.setAttribute("id", "radio");
            radio.value = item.value;
            radio.name = _category;
            let label = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;
            group.appendChild(radio);
            group.appendChild(label);
        }
        return group;
    }
    function createSingleCash(_items, _category) {
        console.log("Zahlung");
        let group = document.createElement("div");
        for (let item of _items) {
            let radio = document.createElement("input");
            radio.type = "radio";
            radio.setAttribute("price", item.price.toFixed(2));
            radio.value = item.value;
            radio.name = _category;
            radio.id = item.name;
            let label = document.createElement("label");
            label.textContent = item.value;
            label.htmlFor = item.value;
            group.appendChild(radio);
            group.appendChild(label);
        }
        return group;
    }
})(CoronaHilfe || (CoronaHilfe = {}));
//# sourceMappingURL=GenerateContent.js.map