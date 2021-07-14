namespace Feiawork {

    export interface Rocket {
        rocketTitel: string;
        explosionSize: number;
        particlecolor: string;
        particleshape: string;          
        quantity: number;
    }

    export function generateContent(_titelList: Rocket[]): void {

        let group: HTMLElement | null = null;
        let fieldset: HTMLFieldSetElement | null = document.querySelector("fieldset#fireworkTitel");
        group = createSelection(_titelList);

        if (fieldset && group) //wenn das Fieldset UND (&&) die Gruppe definiert ist, dann kannst du die group als Kind anhängen
            fieldset.appendChild(group);
    }




    function createSelection(_titelList: Rocket[]): HTMLElement | null {//in createSelection umbenennen

        // let group: HTMLDivElement = document.createElement("div");
        let selection: HTMLSelectElement = document.createElement("select");
        selection.name = "LoadedTitels";
        //selection.addEventListener("change", getDataFromServer); //wird in was anderes geändert was? kp
        //selection.id = "Test";

        for (let titel of _titelList) {
            let option: HTMLOptionElement = document.createElement("option");

            option.setAttribute("name", titel.rocketTitel);

            option.value = option.textContent = titel.rocketTitel;

            selection.appendChild(option);

        }
        return selection;
    }



    // function handleChange(_event: Event): void {

    //     let target: HTMLInputElement = <HTMLInputElement>_event.target;
    //     let userValue: string;
    //     userValue = target.value;

    //     console.log(userValue);

    // }


















}















































