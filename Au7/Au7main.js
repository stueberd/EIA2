var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var L07_Homehelper;
(function (L07_Homehelper) {
    window.addEventListener("load", handleLoad);
    // let appurl: string = "https://eia2-stueberd.herokuapp.com/";
    let aufServer = "http://localhost8100";
    let form = document.querySelector("#orderForm");
    function handleLoad(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("Die Anwendung startet");
            let response = yield fetch("Data.json");
            let offer = yield response.text();
            let data = JSON.parse(offer);
            generateContent(data);
            let handleform = document.querySelector("#orderForm");
            handleform.addEventListener("change", handleChange);
            let slider = document.querySelector("#amount");
            slider.addEventListener("input", displayAmount);
            let submit = document.querySelector("button[type=button]");
            console.log(submit);
            submit.addEventListener("click", sendOrder);
            let reset = document.querySelector("button[type=reset]");
            reset.addEventListener("click", resetOrder);
        });
    }
    function sendOrder(_event) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("send order");
            let formData = new FormData(document.forms[0]);
            let query = new URLSearchParams(formData);
            console.log("Query:" + query);
            // await fetch("Haushaltshilfe_L06.html?" + query.toString());
            let response = yield fetch(appurl + "?" + query.toString());
            let ordercontent = yield response.text();
            alert("Order sent!");
            alert("Your order contains:" + ordercontent);
        });
    }
    function handleChange(_event) {
        displayOrder(_event);
    }
    function displayOrder(_event) {
        let formData = new FormData(document.forms[0]);
        let list = document.querySelector("#list");
        list.innerHTML = "";
        let totalprice = 0;
        for (let entry of formData) {
            console.log("Entry:" + entry);
            // debugger;
            let portion = Number(formData.get("Menge"));
            let item;
            let price;
            switch (entry[0]) {
                case "Einkauf":
                    if (portion > 0) {
                        item = document.querySelector("[value='" + entry[1] + "']");
                        price = Number(item.getAttribute("price"));
                        console.log("Item:" + item);
                        console.log("list:" + list);
                        list.innerHTML = "" + entry[1] + " " + price * portion + "€" + " ";
                        let unit = String(item.getAttribute("unit"));
                        console.log("unit:" + unit);
                        list.innerHTML += "" + unit + ":" + portion + " " + "bei";
                        console.log("price:" + price);
                        totalprice += price * portion;
                    }
                    break;
                case "Supermarkt":
                    if (portion > 0) {
                        list.innerHTML += " " + entry[1];
                    }
                    break;
                case "Haushalt":
                    item = document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    console.log("Price:" + price);
                    list.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " " + "<br>";
                    totalprice += price;
                    break;
                case "Bank":
                    item = document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    list.innerHTML += ":" + " " + entry[1] + " " + price + "€";
                    totalprice += price;
                    break;
                case "Amount":
                    let radio = document.querySelector("#radio");
                    if (radio.checked) {
                        list.innerHTML += " " + entry[1] + "€";
                    }
                    break;
                case "Zahlung":
                    item = document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    let payment = document.querySelector("#payment");
                    totalprice += price;
                    payment.innerHTML = "<br>" + "" + entry[1] + ":" + " " + totalprice.toFixed(2) + "€";
                    console.log("Preis:" + totalprice);
                    break;
            }
        }
    }
    function displayAmount(_event) {
        let value = _event.target.value;
        let text = document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";
    }
    function resetOrder(_event) {
        let list = document.querySelector("#list");
        list.innerHTML = "";
        let payment = document.querySelector("#payment");
        payment.innerHTML = "";
    }
})(L07_Homehelper || (L07_Homehelper = {}));
//# sourceMappingURL=Au7main.js.map