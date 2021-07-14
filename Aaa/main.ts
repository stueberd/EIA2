namespace EIA_Ball {
    window.addEventListener("load", init);

    let crc2: CanvasRenderingContext2D;
    let objects: BaseObject[] = [];
    let scoreDisplay: TextDisplay;
    let statsDisplay: TextDisplay;
    let teamWithBall: number;
    let playerWithBall: Player;
    let selectedPlayer: Player;
    let team0Score: number = 0;
    let team1Score: number = 0;
    let pauseLoop: boolean = false;
    let ballIsOut: boolean = false;
    let ballIsGoal: boolean = false;
    let precisionInput: HTMLInputElement;
    let speedFactorInput: HTMLInputElement;
    let team0Input: HTMLInputElement;
    let team1Input: HTMLInputElement;
    let team0ColorInput: HTMLInputElement;
    let team1ColorInput: HTMLInputElement;

    /**
     * Spielfeld und Eingabefelder initialisieren
     */
    function init(_event: Event): void {
        let canvas: HTMLCanvasElement = Helper.canvas();
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");

        precisionInput = <HTMLInputElement>document.getElementById("precision"); //holt sich das Element aus dem HTML Document 
        speedFactorInput = <HTMLInputElement>document.getElementById("speedFactor");
        team0Input = <HTMLInputElement>document.getElementById("team0");
        team1Input = <HTMLInputElement>document.getElementById("team1");
        team0ColorInput = <HTMLInputElement>document.getElementById("team0Color");
        team1ColorInput = <HTMLInputElement>document.getElementById("team1Color");

        let bg: Background = new Background();      //new weil es neues Objekt ist (objektinstanz)
        objects.push(bg);               // das pushed bg in das Objekt array rein 

        let config: Config = Config.getInstance();              //Holt sich die Momentane Instanz von Config 
        for (let i: number = 0; i < config.playerCount; i++) {  // geht so oft durch wiebiele spieler man eingestellt hat und erstellt diese Anzahl an Spielern pro Team
            createPlayer(1,  i + 1);
            createPlayer(2, i + 1);
        }

        let width: number = Helper.canvasWidth();
        let height: number = Helper.canvasHeight();
        let referee: Referee = new Referee();
        referee.speed = 75; 
        objects.push(referee);

        let upperLineJudge: LineJudge = new LineJudge();
        upperLineJudge.speed = 90;
        upperLineJudge.position.x = width / 2;      //Startpunkt
        upperLineJudge.position.y = 10;
        objects.push(upperLineJudge);

        let lowerLineJudge: LineJudge = new LineJudge();
        lowerLineJudge.speed = 90;                          
        lowerLineJudge.position.x = width / 2;
        upperLineJudge.position.y = height;
        objects.push(lowerLineJudge);

        let ball: Ball = new Ball();        //neue Instanz vom Typ Ball wird erstellt 
        ball.position = new Vector(width / 2, height / 2);
        ball.speed = config.ballStartSpeed;
        ball.friction = config.ballFriction;
        ball.velocity = Vector.random();
        Helper.ball = ball;                 //was?
        objects.push(ball);

        scoreDisplay = new TextDisplay();   //ändern in Anzeige 
        scoreDisplay.position = new Vector(config.margin, 15);
        objects.push(scoreDisplay);

        statsDisplay = new TextDisplay();
        statsDisplay.position = new Vector(config.margin, height - 5);
        statsDisplay.text = "Kein Spieler ausgewählt";
        objects.push(statsDisplay);

        // Event das abgearbeitet wird, wenn ein Spieler Ballkontakt hat
        window.addEventListener("newBallContact", (_event: Event) => {          //ändern in _event
            if (_event instanceof CustomEvent) {
                playerWithBall = _event.detail;                                 //Daten von Spieler der Momentan den Ball hat
                teamWithBall = playerWithBall.team;                             //Team des Spielers der momentan den BAll hat
                updateScoreDisplay();                                           //Daten werden Aktuallisiert und angezeigt
                pauseLoop = true;                                               //Variable pauseLoop wird auf true gesetzt
            }
        });

        // Event, wenn ein Ball ins Tor geht
        window.addEventListener("ballGoal", (_event: Event) => {
            if (Helper.ball.position.x > Helper.canvasWidth() / 2) {
                team0Score += 1;
            } else {
                team1Score += 1;
            }

            updateScoreDisplay();
            ballIsGoal = true;
            pauseLoop = true;
        });

        window.addEventListener("imAus", (_event: Event) => {             //ändern in imAus
            if (_event instanceof CustomEvent) {                //wenn man new macht hat man eine instance oder wenn man eine funktion paar mal aufruft 
                ballIsOut = true;
                pauseLoop = true;
            }
        });

        document.getElementById("saveSettingsButton") ? addEventListener("click", (_event: Event) => {       //? weil es ohne nicht funktioniert da typescript meckert falls ein Element noch nicht existiert
            config.team0 = team0Input.value;
            config.team1 = team1Input.value;
            config.team0Color = team0ColorInput.value;
            config.team1Color = team1ColorInput.value;
            updateScoreDisplay();
            console.log("settings saved");
        }); 

        document.getElementById("savePlayerButton") ? addEventListener("click", (_event: Event) => {     //speichert die Daten von dem Spieler zu selectedplayer.pressision 
            if (selectedPlayer != null) {                                    //schaut ob der angeklickte spieler exisiert 
                selectedPlayer.precision = precisionInput.valueAsNumber;
                selectedPlayer.speedFactor = speedFactorInput.valueAsNumber;
                console.log("player " + selectedPlayer.number + " saved");
            }
        });

        document.getElementById("restartBallButton") ? addEventListener("click", (_event: Event) => {    
            Helper.ball.position = new Vector(width / 2, height / 2);         //Ball wird auf Ursprungsposition zurück geetzt auf den Mittelpunkt vom Feld weil er wegen der random richtung auch wieder ins aus geschossen werden könnte yeet
            ball.velocity = Vector.random();          //beschleunigung wird auf einen neuen zufälligen Wert gesetzt 
            playerWithBall = new Player();              //der Spieler der momentan hat ist ein neu erstellter Spieler
            ballIsOut = false;                          //imAus wird zurückgetzt
            pauseLoop = false;                          //Spiel wird nicht Pausiert
            selectedPlayer = new Player();              //der momentan ausgewählte Spieler ist ein neu erstellter Spieler
            teamWithBall = 0;                           // Kein Team hat den Ball 
                                    
        });

        document.getElementById("newGameButton") ? addEventListener("click", (_event: Event) => {
            Helper.ball.position = new Vector(width / 2, height / 2);
            ball.velocity = Vector.random();
            playerWithBall = new Player();
            ballIsOut = false;
            pauseLoop = false; 
            selectedPlayer = new Player();
            teamWithBall = 0;
            team0Score = 0;                 //Setzt Score zurück
            team1Score = 0;
            updateScoreDisplay();           //spieler sollen an Anfangsposition zurückgesetzt werden ODER wir sagen dass die seite neu lädt
        });

        document.getElementById("removePlayerButton") ? addEventListener("click", (_event: Event) => {
            if (selectedPlayer != null) {
                let index: number = objects.indexOf(selectedPlayer);
                if (index > -1) {
                    objects.splice(index, 1);           //sucht den spieler anhand seiner nummer im Objects Array und entfernt ihn vom Feld und Aus dem Array falls er existiert
                }
                selectedPlayer = new Player(); // warum kann man hier kein Null setzen? 
            }
        });
                //TeamNummern ändern in 0 und 1 vielleicht
        document.getElementById("addPlayerTeam0Button") ? addEventListener("click", (_event: Event) => {
            createPlayer(1, Math.ceil(12 + Math.random() * 10));        //math.ceil weg 
        });

        document.getElementById("addPlayerTeam1Button") ? addEventListener("click", (_event: Event) => {
            createPlayer(2, 12 + Math.random() * 10);
        });
        //diese Funktion geht jeden Spieler im Array durch um zu schauen welcher angeklickt wurde und stoppt das spiel nicht wenn einer angeklickt wird 
        Helper.canvas().addEventListener("click", (_event: Event) => {
            let stop: boolean = false;
            objects.forEach(element => {            //geht den Object Array durch und macht für jedes Element: 
                if (element instanceof Player) {     //falls dieses Elemnt das gefunden wurde eine instanz von Player ist 
                    let tempPlayer: Player = <Player>element; //player vielleicht in tempPlayer umbennenen  Erstellt eine variable vom vom Typ Player das die gleichen daten wie das Player element besitzt
                    if (tempPlayer.isClickInRange(<MouseEvent>_event)) {        //wenn man in den Radius klickt dann wird er nicht selcted ist dann wird stop auf true gesetzt 
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
                return;             //wenn dieses stop true ist beendet es die klickfunktion von oben
            }
                //Neue Funktion die sowohl bei button als auch tor/aus aufgerufen wird
            if (ballIsOut || ballIsGoal) {           //wenn Ball im Aus oder im Tor ist 
                Helper.ball.position = new Vector(width / 2, height / 2); //wird der Ball wieder an den Mittelpunkt gesetzt 
                ball.velocity = Vector.random();
                playerWithBall = new Player();
                ballIsOut = false;
                ballIsGoal = false;
                pauseLoop = false; 

                objects.forEach(element => {            //er geht ganzes Object Array durch und setzt den Ballkontakt jeden Spielers auf False
                    if (element instanceof Player) {
                        let tempPlayer: Player = <Player>element;
                        tempPlayer.hasBallContact = false;
                    }
                });
                return;         //schmeist auch die Klickfunktion raus
            }

            if (pauseLoop && playerWithBall != null) {          //wenn ein spieler den Ball hat und Pauseloop true ist 
                let mouseEvent: MouseEvent = <MouseEvent>_event; 
                let direction: Vector = Vector.direction(playerWithBall.position, Vector.fromMouseEvent(mouseEvent) ).normalize(); //schaut wo die Maus hingeklickt hat und versucht in die richtung es gehen soll 
                
                let variance: number = 1 - playerWithBall.precision;       //erstellt eine ungenauigkeit anhand der gewählten spieler precision
                direction = new Vector(direction.x + (variance * (Math.random() - 0.5)), direction.y + (variance * (Math.random() - 0.5)) ); //nimmt den alten direction Vector und rechnet dadie ungenauigkeit rauf

                console.log("kick ball in direction " + direction); //debug 
                Helper.ball.velocity = direction;           //stellt beschleunigungshelper vom ball ein 
                Helper.ball.speed = config.ballKickSpeed;   //stellt die geschwindigkeit vom ball ein
                pauseLoop = false;                          //spiel läuft weiter

                objects.forEach(element => {            
                    if (element instanceof Player) {
                        let tempPlayer: Player = <Player>element;
                        if (tempPlayer != playerWithBall) {
                            tempPlayer.hasBallContact = false; //spieler der Ball geschossen hat hat ihn jetzt nicht mehr lul
                        }
                    }
                });
            }
        });

        updateScoreDisplay();   
        loop();                 //alles wird wiederholt 
    }

    function updateScoreDisplay(): void {
        let config: Config = Config.getInstance();
        let teamName: string = "";          //teamname raus 
        if (teamWithBall == 1) {
            teamName = "Team A";
        } else if (teamWithBall == 2) {
            teamName = "Team B";
        }
        scoreDisplay.text = "Ballbesitz: " + teamName + "   Tore " + config.team0 + ": " + team0Score + " " + config.team1 + ": " + team1Score;
    }

    function updateStatsDisplay(_player: Player): void {
        if (_player != null) {                          //falls der ausgewählte Spieler existiert
            //let config: Config = Config.getInstance();  //holt sich aus der Config Instanz die Daten 
            let team: string = "";                      
            if (_player.team == 1) {
                team = "Team A";
            } else if (_player.team == 2) {
                team = "Team B";
            }
            statsDisplay.text = "Spieler " + _player.number + " (" + team + ") Praezision: " + _player.precision.toFixed(2) + " Geschwindigkeit: " + _player.speedFactor.toFixed(2);
            precisionInput.value = _player.precision.toFixed(2);
            speedFactorInput.value = _player.speedFactor.toFixed(2);        //ich muss das angegeben dass kopiert wurde 
        } else {
            statsDisplay.text = "";
            precisionInput.value = "";
            speedFactorInput.value = "";
        }
    }

    function createPlayer(_team: number, _number: number): void {
        let config: Config = Config.getInstance();
        let width: number = Helper.canvasWidth();
        let height: number = Helper.canvasHeight();

        let player: Player = new Player();              //neuer Spieler wird erstellt
        player.speed = 100;                             //Geschwindigkeit wird festgelegt
        player.number = _number;                        //wird von gegebener Nummer festgelegt
        player.team = _team;
        player.actionRadius = config.actionRadius;      //wird gegebenen Radius aus der Config geholt
        player.precision = Math.random();               //Genauigkeit wird zufällig generiert
        player.speedFactor = Math.random() + 0.5;       

        let minDistanceField: boolean = false;      //schaut ob der Abstand zum  Spielfeld ran gegeben ist 
        while (!minDistanceField) {              //wiederholt solang bis Mindestabstand gegeben ist 
            minDistanceField = true;        //solang nichts im Umkreis ist ist die Mindestdistanz 
            player.position.x = Math.random() * (width - config.margin * 4) + config.margin * 2; //Position der Spieler wird festgelegt
            player.position.y = Math.random() * (height - config.margin * 4) + config.margin * 2;

            objects.forEach(element => {            //geht objekt Array durch 
                if (element instanceof Player) {       //schaut ob mindestabstand von anderen spielern einhält
                    if (Vector.distance(player.position, element.position) < config.minDistance) { //wenn die position vom spieler kleiner ist als der eingestellte min Abstand
                        minDistanceField = false;   //dann ist Mindestabstand nicht gegeben und darum muss er nochmal anfangen zu schauen
                    }
                }
            });
        }

        player.startPosition = player.position.copy(); //nimmt Vector von der Spielerposition davor und setzt ihn auf die momentane Position 

        objects.push(player); //Spieler wird in Array reingepushed
    }

    function loop(): void {                 //müssen wir noch checken was das überhaupt ist 
        setTimeout(() => {
            crc2.clearRect(0, 0, Helper.canvasWidth(), Helper.canvasHeight());
            if (!pauseLoop) {
                objects.forEach((object: BaseObject) => {
                    object.move(Helper.msBetweenFrames);
                });
            }

            objects.forEach((object: BaseObject) => {
                object.draw(crc2);
            });

            loop();
        },         Helper.msBetweenFrames);
    }
} 