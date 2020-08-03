var Zauberbild;
(function (Zauberbild) {
    //let serverAddress: string = "http://localhost:8100/";
    let serverAddress = "https://stueberd.herokuapp.com/";
    function insert() {
        let query = "command=insert";
        query += "&bg=" + Zauberbild.bg;
        query += "&canvaswidth=" + Zauberbild.canvas.width;
        for (let i = 0; i < Zauberbild.kreisArray.length; i++) {
            let symbol = {
                type: Zauberbild.kreisArray[i].type,
                x: Zauberbild.kreisArray[i].x.toString(),
                y: Zauberbild.kreisArray[i].y.toString()
            };
            query += "&type=" + symbol.type + "&x=" + symbol.x + "&y=" + symbol.y;
        }
        console.log(query);
        sendRequest(query, handleInsertResponse);
    }
    Zauberbild.insert = insert;
    function sendRequest(_query, _callback) {
        let xhr = new XMLHttpRequest();
        xhr.open("GET", serverAddress + "?" + _query, true);
        xhr.addEventListener("readystatechange", _callback);
        xhr.send();
    }
    function handleInsertResponse(_event) {
        let xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            //console.log(xhr.response);
            alert(xhr.response);
        }
    }
    function find() {
        let query = "command=find";
        sendRequest(query, handleFindResponse);
    }
    Zauberbild.find = find;
    function handleFindResponse(_event) {
        let xhr = _event.target;
        if (xhr.readyState == XMLHttpRequest.DONE) {
            Zauberbild.globalArray = JSON.parse(xhr.response);
            for (let i = 0; i < Zauberbild.globalArray.length; i++) {
                let button = document.createElement("BUTTON");
                button.innerText = "Bild" + (i + 1);
                button.addEventListener("click", Zauberbild.ladebild);
                button.setAttribute("id", i.toString());
                document.getElementById("fertigebilder").appendChild(button);
            }
        }
    }
})(Zauberbild || (Zauberbild = {}));
//# sourceMappingURL=client.js.map