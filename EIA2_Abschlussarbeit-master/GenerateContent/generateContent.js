var Feiawork;
(function (Feiawork) {
    function generateContent(_titelList) {
        let group = null;
        let fieldset = document.querySelector("fieldset#fireworkTitel");
        group = createSelection(_titelList);
        if (fieldset && group) //wenn das Fieldset UND (&&) die Gruppe definiert ist, dann kannst du die group als Kind anhängen
            fieldset.appendChild(group);
    }
    Feiawork.generateContent = generateContent;
    function createSelection(_titelList) {
        // let group: HTMLDivElement = document.createElement("div");
        let selection = document.createElement("select");
        selection.name = "LoadedTitels";
        //selection.addEventListener("change", getDataFromServer); //wird in was anderes geändert was? kp
        //selection.id = "Test";
        for (let titel of _titelList) {
            let option = document.createElement("option");
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
})(Feiawork || (Feiawork = {}));
//# sourceMappingURL=generateContent.js.map