namespace CoronaHilfe {
    window.addEventListener("load", handleLoad);

    let form: HTMLFormElement = <HTMLFormElement>document.querySelector("#orderForm");

    async function handleLoad(_event: Event): Promise<void> {
        console.log("Die Anwendung startet");

        let response: Response = await fetch("Data.json");
        let offer: string = await response.text();
        let data: Data = JSON.parse(offer);

        generateContent(data);

        let handleform: HTMLInputElement = <HTMLInputElement>document.querySelector("#orderForm");
        handleform.addEventListener("change", handleChange);

        let slider: HTMLInputElement = <HTMLInputElement>document.querySelector("#amount");
        slider.addEventListener("input", displayAmount);

        let submit: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=button]");
        console.log(submit);
        submit.addEventListener("click", sendOrder);

        let reset: HTMLButtonElement = <HTMLButtonElement>document.querySelector("button[type=reset]");
        reset.addEventListener("click", resetOrder);
        
    }

    async function sendOrder(_event: Event): Promise<void> {
        console.log("send order");
        let formData: FormData = new FormData (document.forms[0]);
        // tslint:disable-next-line:no-any
        let query: URLSearchParams = new URLSearchParams(<any>formData);
        await fetch("Haushaltshilfe_L05.html?" + query.toString());
        alert("Order sent!");
    }

    function handleChange(_event: Event): void {
        displayOrder(_event);
    }

    function displayOrder(_event: Event): void {

        let formData: FormData = new FormData(document.forms[0]);
        let list: HTMLDivElement = <HTMLDivElement>document.querySelector("#list");

        list.innerHTML = "";
        let totalprice: number = 0;

        for (let entry of formData) {
            console.log("Entry:" + entry);
            // debugger;
            let portion: number = Number(formData.get("Menge"));
            let item: HTMLElement;
            let price: number;
            switch (entry[0]) {
                case "Einkauf":
                    if (portion > 0) {
                        item = <HTMLElement>document.querySelector("[value='" + entry[1] + "']");
                        price = Number(item.getAttribute("price"));
                        console.log("Item:" + item);
                        console.log("list:" + list);
                        list.innerHTML = "" + entry[1] + " " + price * portion + "€" + " ";
                        let unit: string = String(item.getAttribute("unit"));
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
                    item = <HTMLElement>document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    console.log("Price:" + price);
                    list.innerHTML += "<br>" + "" + entry[1] + " " + price + "€" + " " + "<br>";
                    totalprice += price;
                    break;
                case "Bank":
                    item = <HTMLElement>document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    list.innerHTML += ":" + " " + entry[1] + " " + price + "€";
                    totalprice += price;
                    break;  
                case "Amount":

                    let radio: HTMLInputElement = <HTMLInputElement>document.querySelector("#radio");
                        
                    if (radio.checked) {
                        list.innerHTML += " " + entry[1] + "€";
                    } 
                        
                    break;
                case "Zahlung":
                    item = <HTMLElement>document.querySelector("[value='" + entry[1] + "']");
                    price = Number(item.getAttribute("price"));
                    let payment: HTMLDivElement = <HTMLDivElement>document.querySelector("#payment");
                    totalprice += price;
                    payment.innerHTML = "<br>" + "" + entry[1] + ":" + " " + totalprice.toFixed(2) + "€";
                    console.log("Preis:" + totalprice);

                    break;
            } 
            
        }
    }

    function displayAmount(_event: Event): void {
        let value: string = (<HTMLInputElement>_event.target).value;
        let text: HTMLElement = <HTMLElement>document.querySelector("#text");
        text.innerHTML = "Gewünschter Betrag:" + value + "€";

    }

    function resetOrder(_event: Event): void {
        let list: HTMLDivElement = <HTMLDivElement>document.querySelector("#list");
        list.innerHTML = "";
        let payment: HTMLDivElement = <HTMLDivElement>document.querySelector("#payment");
        payment.innerHTML = "";

    }

}