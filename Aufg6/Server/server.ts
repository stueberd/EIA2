import * as Http from "http"; //erstellen eines Http-Objekts, in Node 
namespace L05_Server {//namespace öffnen
    console.log("Starting server"); //'Start server' soll ausgegeben werden in der Console
    let port: number = Number(process.env.PORT); // Variable port ist ein string der in eine number umgewandelt wird, damit der Server weiß, auf welchen Listener er hören soll
    if (!port)//wenn port keine Nummer ist
    port = 8100; //dann überschreibe port auf 8100 (unser Pc)
    

    let server: Http.Server = Http.createServer(); //eine Variable mit dem Typen http-server wird erstellt und diese baut einen Server als http
    server.addListener("request", handleRequest); //auf der Variable server wird ein Listener erstellt  'handleRequest'-Funktion wird ausgeführt 
    server.addListener("listening", handleListen); //Event Listener namens "listening" auf den Server handleListen wird ausgeführt
    server.listen(port); //die Variable server soll auf die Variable port hören

    function handleListen(): void {//der Funktion wird nichts übergeben und sie gibt nichts zurück
        console.log("Listening"); //Listening wird auf der Console angezeigt
    }//die Funktion wird geschlossen

    function handleRequest(_request: Http.IncomingMessage, _response: Http.ServerResponse): void {//die Funktion empfängt zwei Parameter (request=Anfordern, response=Antwort) und gibt nichts zurück
        console.log("Nein Nein" + _request.url); //bei durchlaufen der Funktion wird I hear Voices in der Console angezeigt

        _response.setHeader("content-type", "text/html; charset=utf-8"); //ein header wird zu_response(response stream) hinzugefügt 
        _response.setHeader("Access-Control-Allow-Origin", "*"); //der server _request darf von anderen Quellen als der Hauptseite ausgeführt werden

        _response.write(_request.url); //die url wird in _respons durch _request geschrieben

        _response.end(); //signalisiert dem Server vollständing zu sein und schließt _response ab
    }//die Funktion wird geschlossen
}//namespace schließen
