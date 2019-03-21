namespace aufgabe00 {

    function main(): void {

        var i: string = prompt("Wat? wer bisch du denn?");
        var node: HTMLElement = document.getElementById("eingabe");
        node.innerHTML += "Tach,";
        node.innerHTML += i;
        console.log("Tach, ", i);
    }
    document.addEventListener("DOMContentLoaded", main);
}