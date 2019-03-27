var aufgabe00;
(function (aufgabe00) {
    function main() {
        let i = prompt("Wat? wer bisch du denn?");
        let node = document.getElementById("eingabe");
        node.innerHTML += "Tach,";
        node.innerHTML += i;
        console.log("Tach, ", i);
    }
    document.addEventListener("DOMContentLoaded", main);
})(aufgabe00 || (aufgabe00 = {}));
//# sourceMappingURL=Aufgabe00.js.map