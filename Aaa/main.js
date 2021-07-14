var EIA_Ball;
(function (EIA_Ball) {
    window.addEventListener("load", init);
    let crc2;
    let objects = [];
    let scoreDisplay;
    let statsDisplay;
    let teamWithBall;
    let playerWithBall;
    let selectedPlayer;
    let team0Score = 0;
    let team1Score = 0;
    let pauseLoop = false;
    let ballIsOut = false;
    let ballIsGoal = false;
    let precisionInput;
    let speedFactorInput;
    let team0Input;
    let team1Input;
    let team0ColorInput;
    let team1ColorInput;
    /**
     * Spielfeld und Eingabefelder initialisieren
     */
    function init(_event) {
        let canvas = EIA_Ball.Helper.canvas();
        crc2 = canvas.getContext("2d");
        precisionInput = document.getElementById("precision"); //holt sich das Element aus dem HTML Document 
        speedFactorInput = document.getElementById("speedFactor");
        team0Input = document.getElementById("team0");
        team1Input = document.getElementById("team1");
        team0ColorInput = document.getElementById("team0Color");
        team1ColorInput = document.getElementById("team1Color");
        let bg = new EIA_Ball.Background(); //new weil es neues Objekt ist (objektinstanz)
        objects.push(bg); // das pushed bg in das Objekt array rein 
        let config = EIA_Ball.Config.getInstance(); //Holt sich die Momentane Instanz von Config 
        for (let i = 0; i < config.playerCount; i++) { // geht so oft durch wiebiele spieler man eingestellt hat und erstellt diese Anzahl an Spielern pro Team
            createPlayer(1, i + 1);
            createPlayer(2, i + 1);
        }
        let width = EIA_Ball.Helper.canvasWidth();
        let height = EIA_Ball.Helper.canvasHeight();
        let referee = new Referee();
        referee.speed = 75;
        objects.push(referee);
        let upperLineJudge = new EIA_Ball.LineJudge();
        upperLineJudge.speed = 90;
        upperLineJudge.position.x = width / 2; //Startpunkt
        upperLineJudge.position.y = 10;
        objects.push(upperLineJudge);
        let lowerLineJudge = new EIA_Ball.LineJudge();
        lowerLineJudge.speed = 90;
        lowerLineJudge.position.x = width / 2;
        upperLineJudge.position.y = height;
        objects.push(lowerLineJudge);
        let ball = new EIA_Ball.Ball(); //neue Instanz vom Typ Ball wird erstellt 
        ball.position = new EIA_Ball.Vector(width / 2, height / 2);
        ball.speed = config.ballStartSpeed;
        ball.friction = config.ballFriction;
        ball.velocity = EIA_Ball.Vector.random();
        EIA_Ball.Helper.ball = ball; //was?
        objects.push(ball);
        scoreDisplay = new EIA_Ball.TextDisplay(); //ändern in Anzeige 
        scoreDisplay.position = new EIA_Ball.Vector(config.margin, 15);
        objects.push(scoreDisplay);
        statsDisplay = new EIA_Ball.TextDisplay();
        statsDisplay.position = new EIA_Ball.Vector(config.margin, height - 5);
        statsDisplay.text = "Kein Spieler ausgewählt";
        objects.push(statsDisplay);
        // Event das abgearbeitet wird, wenn ein Spieler Ballkontakt hat
        window.addEventListener("newBallContact", (_event) => {
            if (_event instanceof CustomEvent) {
                playerWithBall = _event.detail; //Daten von Spieler der Momentan den Ball hat
                teamWithBall = playerWithBall.team; //Team des Spielers der momentan den BAll hat
                updateScoreDisplay(); //Daten werden Aktuallisiert und angezeigt
                pauseLoop = true; //Variable pauseLoop wird auf true gesetzt
            }
        });
        // Event, wenn ein Ball ins Tor geht
        window.addEventListener("ballGoal", (_event) => {
            if (EIA_Ball.Helper.ball.position.x > EIA_Ball.Helper.canvasWidth() / 2) {
                team0Score += 1;
            }
            else {
                team1Score += 1;
            }
            updateScoreDisplay();
            ballIsGoal = true;
            pauseLoop = true;
        });
        window.addEventListener("imAus", (_event) => {
            if (_event instanceof CustomEvent) { //wenn man new macht hat man eine instance oder wenn man eine funktion paar mal aufruft 
                ballIsOut = true;
                pauseLoop = true;
            }
        });
        document.getElementById("saveSettingsButton") ? addEventListener("click", (_event) => {
            config.team0 = team0Input.value;
            config.team1 = team1Input.value;
            config.team0Color = team0ColorInput.value;
            config.team1Color = team1ColorInput.value;
            updateScoreDisplay();
            console.log("settings saved");
        }) : ;
        document.getElementById("savePlayerButton") ? addEventListener("click", (_event) => {
            if (selectedPlayer != null) { //schaut ob der angeklickte spieler exisiert 
                selectedPlayer.precision = precisionInput.valueAsNumber;
                selectedPlayer.speedFactor = speedFactorInput.valueAsNumber;
                console.log("player " + selectedPlayer.number + " saved");
            }
        }) : ;
        document.getElementById("restartBallButton") ? addEventListener("click", (_event) => {
            EIA_Ball.Helper.ball.position = new EIA_Ball.Vector(width / 2, height / 2); //Ball wird auf Ursprungsposition zurück geetzt auf den Mittelpunkt vom Feld weil er wegen der random richtung auch wieder ins aus geschossen werden könnte yeet
            ball.velocity = EIA_Ball.Vector.random(); //beschleunigung wird auf einen neuen zufälligen Wert gesetzt 
            playerWithBall = new EIA_Ball.Player(); //der Spieler der momentan hat ist ein neu erstellter Spieler
            ballIsOut = false; //imAus wird zurückgetzt
            pauseLoop = false; //Spiel wird nicht Pausiert
            selectedPlayer = new EIA_Ball.Player(); //der momentan ausgewählte Spieler ist ein neu erstellter Spieler
            teamWithBall = 0; // Kein Team hat den Ball 
        }) : ;
        document.getElementById("newGameButton") ? addEventListener("click", (_event) => {
            EIA_Ball.Helper.ball.position = new EIA_Ball.Vector(width / 2, height / 2);
            ball.velocity = EIA_Ball.Vector.random();
            playerWithBall = new EIA_Ball.Player();
            ballIsOut = false;
            pauseLoop = false;
            selectedPlayer = new EIA_Ball.Player();
            teamWithBall = 0;
            team0Score = 0; //Setzt Score zurück
            team1Score = 0;
            updateScoreDisplay(); //spieler sollen an Anfangsposition zurückgesetzt werden ODER wir sagen dass die seite neu lädt
        }) : ;
        document.getElementById("removePlayerButton") ? addEventListener("click", (_event) => {
            if (selectedPlayer != null) {
                let index = objects.indexOf(selectedPlayer);
                if (index > -1) {
                    objects.splice(index, 1); //sucht den spieler anhand seiner nummer im Objects Array und entfernt ihn vom Feld und Aus dem Array falls er existiert
                }
                selectedPlayer = new EIA_Ball.Player(); // warum kann man hier kein Null setzen? 
            }
        }) : ;
        //TeamNummern ändern in 0 und 1 vielleicht
        document.getElementById("addPlayerTeam0Button") ? addEventListener("click", (_event) => {
            createPlayer(1, Math.ceil(12 + Math.random() * 10)); //math.ceil weg 
        }) : ;
        document.getElementById("addPlayerTeam1Button") ? addEventListener("click", (_event) => {
            createPlayer(2, 12 + Math.random() * 10);
        }) : ;
        //diese Funktion geht jeden Spieler im Array durch um zu schauen welcher angeklickt wurde und stoppt das spiel nicht wenn einer angeklickt wird 
        EIA_Ball.Helper.canvas().addEventListener("click", (_event) => {
            let stop = false;
            objects.forEach(element => {
                if (element instanceof EIA_Ball.Player) { //falls dieses Elemnt das gefunden wurde eine instanz von Player ist 
                    let tempPlayer = element; //player vielleicht in tempPlayer umbennenen  Erstellt eine variable vom vom Typ Player das die gleichen daten wie das Player element besitzt
                    if (tempPlayer.isClickInRange(_event)) { //wenn man in den Radius klickt dann wird er nicht selcted ist dann wird stop auf true gesetzt 
                        console.log("Player " + tempPlayer.number + "clicked");
                        if (!tempPlayer.isSelected) {
                            stop = true;
                        }
                        tempPlayer.isSelected = true;
                        selectedPlayer = tempPlayer;
                        updateStatsDisplay(tempPlayer);
                        return;
                    }
                    tempPlayer.isSelected = false;
                }
            });
            if (stop) {
                return; //wenn dieses stop true ist beendet es die klickfunktion von oben
            }
            //Neue Funktion die sowohl bei button als auch tor/aus aufgerufen wird
            if (ballIsOut || ballIsGoal) { //wenn Ball im Aus oder im Tor ist 
                EIA_Ball.Helper.ball.position = new EIA_Ball.Vector(width / 2, height / 2); //wird der Ball wieder an den Mittelpunkt gesetzt 
                ball.velocity = EIA_Ball.Vector.random();
                playerWithBall = new EIA_Ball.Player();
                ballIsOut = false;
                ballIsGoal = false;
                pauseLoop = false;
                objects.forEach(element => {
                    if (element instanceof EIA_Ball.Player) {
                        let tempPlayer = element;
                        tempPlayer.hasBallContact = false;
                    }
                });
                return; //schmeist auch die Klickfunktion raus
            }
            if (pauseLoop && playerWithBall != null) { //wenn ein spieler den Ball hat und Pauseloop true ist 
                let mouseEvent = _event;
                let direction = EIA_Ball.Vector.direction(playerWithBall.position, EIA_Ball.Vector.fromMouseEvent(mouseEvent)).normalize(); //schaut wo die Maus hingeklickt hat und versucht in die richtung es gehen soll 
                let variance = 1 - playerWithBall.precision; //erstellt eine ungenauigkeit anhand der gewählten spieler precision
                direction = new EIA_Ball.Vector(direction.x + (variance * (Math.random() - 0.5)), direction.y + (variance * (Math.random() - 0.5))); //nimmt den alten direction Vector und rechnet dadie ungenauigkeit rauf
                console.log("kick ball in direction " + direction); //debug 
                EIA_Ball.Helper.ball.velocity = direction; //stellt beschleunigungshelper vom ball ein 
                EIA_Ball.Helper.ball.speed = config.ballKickSpeed; //stellt die geschwindigkeit vom ball ein
                pauseLoop = false; //spiel läuft weiter
                objects.forEach(element => {
                    if (element instanceof EIA_Ball.Player) {
                        let tempPlayer = element;
                        if (tempPlayer != playerWithBall) {
                            tempPlayer.hasBallContact = false; //spieler der Ball geschossen hat hat ihn jetzt nicht mehr lul
                        }
                    }
                });
            }
        });
        updateScoreDisplay();
        loop(); //alles wird wiederholt 
    }
    function updateScoreDisplay() {
        let config = EIA_Ball.Config.getInstance();
        let teamName = ""; //teamname raus 
        if (teamWithBall == 1) {
            teamName = "Team A";
        }
        else if (teamWithBall == 2) {
            teamName = "Team B";
        }
        scoreDisplay.text = "Ballbesitz: " + teamName + "   Tore " + config.team0 + ": " + team0Score + " " + config.team1 + ": " + team1Score;
    }
    function updateStatsDisplay(_player) {
        if (_player != null) { //falls der ausgewählte Spieler existiert
            //let config: Config = Config.getInstance();  //holt sich aus der Config Instanz die Daten 
            let team = "";
            if (_player.team == 1) {
                team = "Team A";
            }
            else if (_player.team == 2) {
                team = "Team B";
            }
            statsDisplay.text = "Spieler " + _player.number + " (" + team + ") Praezision: " + _player.precision.toFixed(2) + " Geschwindigkeit: " + _player.speedFactor.toFixed(2);
            precisionInput.value = _player.precision.toFixed(2);
            speedFactorInput.value = _player.speedFactor.toFixed(2); //ich muss das angegeben dass kopiert wurde 
        }
        else {
            statsDisplay.text = "";
            precisionInput.value = "";
            speedFactorInput.value = "";
        }
    }
    function createPlayer(_team, _number) {
        let config = EIA_Ball.Config.getInstance();
        let width = EIA_Ball.Helper.canvasWidth();
        let height = EIA_Ball.Helper.canvasHeight();
        let player = new EIA_Ball.Player(); //neuer Spieler wird erstellt
        player.speed = 100; //Geschwindigkeit wird festgelegt
        player.number = _number; //wird von gegebener Nummer festgelegt
        player.team = _team;
        player.actionRadius = config.actionRadius; //wird gegebenen Radius aus der Config geholt
        player.precision = Math.random(); //Genauigkeit wird zufällig generiert
        player.speedFactor = Math.random() + 0.5;
        let minDistanceField = false; //schaut ob der Abstand zum  Spielfeld ran gegeben ist 
        while (!minDistanceField) { //wiederholt solang bis Mindestabstand gegeben ist 
            minDistanceField = true; //solang nichts im Umkreis ist ist die Mindestdistanz 
            player.position.x = Math.random() * (width - config.margin * 4) + config.margin * 2; //Position der Spieler wird festgelegt
            player.position.y = Math.random() * (height - config.margin * 4) + config.margin * 2;
            objects.forEach(element => {
                if (element instanceof EIA_Ball.Player) { //schaut ob mindestabstand von anderen spielern einhält
                    if (EIA_Ball.Vector.distance(player.position, element.position) < config.minDistance) { //wenn die position vom spieler kleiner ist als der eingestellte min Abstand
                        minDistanceField = false; //dann ist Mindestabstand nicht gegeben und darum muss er nochmal anfangen zu schauen
                    }
                }
            });
        }
        player.startPosition = player.position.copy(); //nimmt Vector von der Spielerposition davor und setzt ihn auf die momentane Position 
        objects.push(player); //Spieler wird in Array reingepushed
    }
    function loop() {
        setTimeout(() => {
            crc2.clearRect(0, 0, EIA_Ball.Helper.canvasWidth(), EIA_Ball.Helper.canvasHeight());
            if (!pauseLoop) {
                objects.forEach((object) => {
                    object.move(EIA_Ball.Helper.msBetweenFrames);
                });
            }
            objects.forEach((object) => {
                object.draw(crc2);
            });
            loop();
        }, EIA_Ball.Helper.msBetweenFrames);
    }
})(EIA_Ball || (EIA_Ball = {}));
//# sourceMappingURL=main.js.map