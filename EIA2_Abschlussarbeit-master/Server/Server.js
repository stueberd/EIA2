"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const Http = require("http");
const Url = require("url");
const Mongo = require("mongodb");
var Feiawork;
(function (Feiawork) {
    let fireworkCollection;
    let databaseUrl = "mongodb+srv://FrankeSa:Milou@sarahcluster-pelct.mongodb.net/Firework?retryWrites=true&w=majority"; // "mongodb://localhost:27017";
    let port = process.env.PORT;
    if (port == undefined)
        port = 5001;
    startServer(port);
    connectToDatabase(databaseUrl);
    function startServer(_port) {
        let server = Http.createServer();
        console.log("Server startet auf Port " + _port);
        server.listen(_port);
        server.addListener("request", handleRequest);
    }
    function connectToDatabase(_url) {
        return __awaiter(this, void 0, void 0, function* () {
            let options = { useNewUrlParser: true, useUnifiedTopology: true }; //mit diesen options eine Verbindung zur DB aufbauen
            let mongoClient = new Mongo.MongoClient(_url, options);
            yield mongoClient.connect();
            fireworkCollection = mongoClient.db("Firework").collection("Rockets");
            console.log("Database connection", fireworkCollection != undefined);
        });
    }
    function handleRequest(_request, _response) {
        console.log("handleRequest");
        _response.setHeader("content-type", "text/html; charset=utf-8");
        _response.setHeader("Access-Control-Allow-Origin", "*");
        if (_request.url) {
            let url = Url.parse(_request.url, true); // der Url.parser wandelt den UrlWithParsedQuery in ein anders Format um. Durch true wird daraus ein besser lesbares assoziatives Array. 
            let command = url.query["command"];
            console.log("Der URL", _request.url);
            if (command === "getTitels") {
                getTitels(_request, _response);
                console.log("Titel geholt");
                return;
            }
            if (command === "getAllDatas") {
                getAllDatas(_request, _response);
                console.log("Titeldaten geholt");
                return;
            }
            else {
                storeRocket(url.query, _response);
                console.log("Daten gespeichert");
            }
            return;
        }
        _response.end();
    }
    function getTitels(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = fireworkCollection.find({}, { projection: { _id: 0, rocketTitel: 1 } });
            let arrayResult = yield result.toArray();
            let listOfTitels = JSON.stringify(arrayResult);
            console.log(listOfTitels);
            _response.write(listOfTitels); //Übergabe der Daten an den client
            _response.end();
        });
    }
    function getAllDatas(_request, _response) {
        return __awaiter(this, void 0, void 0, function* () {
            let result = fireworkCollection.find();
            let arrayResult = yield result.toArray();
            let jsonResult = JSON.stringify(arrayResult);
            // console.log(jsonResult);
            _response.write(jsonResult); //Übergabe der Daten an den client
            _response.end();
        });
    }
    function storeRocket(_userRocket, _response) {
        fireworkCollection.insertOne(_userRocket);
        _response.end();
    }
    // async function getTitels(_request: Http.IncomingMessage, _response: Http.ServerResponse): Promise<void> {
    //     let result: Mongo.Cursor<any> = fireworkCollection.find({}, { projection: { _id: 0, rocketTitel: 1 } });
    //     let arrayResult: string[] = await result.toArray();
    //     let jsonResult: string = JSON.stringify(arrayResult);
    //     console.log(jsonResult);
    //     _response.write(jsonResult); //Übergabe der Daten an den client
    //     _response.end();
    // }
})(Feiawork = exports.Feiawork || (exports.Feiawork = {}));
//# sourceMappingURL=Server.js.map