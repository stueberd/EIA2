namespace Soccer {
    export class Game {
        private participants: Soccer.Participant[] = [];        //Privat damit nicht woanders genutzt werden kann
        private team1: Team;
        private team2: Team;
        private scoreTeam1: number = 0;
        private scoreTeam2: number = 0;
        private crc2: CanvasRenderingContext2D | null = null;
        private settings: Soccer.Settings;
        private fieldHeight: number;
        private fieldWidth: number;
        private pause: boolean = false;
        private ball: Soccer.Ball | null = null;
        private globalSpeed: number = 0.3;
        private clickMode: boolean = false;
        private hasBall: Soccer.Player | null = null;
        private lastTouch: Soccer.Player | null = null;
        private selectedPlayer: Soccer.Player | null = null;
        private newPlayerFor: Soccer.Team | null = null;

        private static getNormDirVector(vec1: number[], vec2: number[]) {       //bekommt 2 richtungsvektoren 
            let directionX = vec2[0] - vec1[0];                         //brechnet die richtungen hier x unten y
            let directionY = vec2[1] - vec1[1];
            let length = Math.sqrt((directionX * directionX) + (directionY * directionY));      //berechnet wie lange beide vektoren zusammen sind 
            let addDirX = directionX / length;
            let addDirY = directionY / length;
            return [addDirX, addDirY];
        }

        private static getDistance(vec1: number[], vec2: number[]) {                //rechnet abstand aus 2 vekoren aus
            return Math.sqrt(Math.pow(vec2[0] - vec1[0], 2) + Math.pow(vec2[1] - vec1[1], 2));
        }

        private static getRandomDir() {                     //wahrscheinlich für den ball
            let firstMult = Math.random() < 0.6 ? -1 : 1;
            let secondMult = Math.random() < 0.6 ? -1 : 1;
            return [Math.random() * firstMult, Math.random() * secondMult];
        }

        private static getHexColorFromPreset(preset: string) {
            switch (preset) {
                case "red":
                    return "#ff0000";
                case "yellow":
                    return "#fcff33";
                case "pink":
                    return "#ff33ff";
                case "green":
                    return "#0BC61F";
                case "blue":
                    return "#0000ff";
                case "grey":
                    return "#C3CBC4";
                case "brown":
                    return "#E19646";
                default:
                    return "#444444";
            }
        }

        constructor(                                        //konstruiert die methoden setz die werte drunter ein               
            canvasId: string,
            controlId: string,
            canvasWidth: number,
            canvasHeight: number,
            settings: Settings
        ) {
            console.log("Loading game...");     //consolen ausgabe
            this.fieldWidth = canvasWidth;
            this.fieldHeight = canvasHeight;        //this weil es auf dieses ding hier bezogen ist legt höhe und breite vom canvas fest
            this.settings = settings;
            this.team1 = new Team(                  //erstellt neues Team objekt 
                this.settings.teamName1,
                Game.getHexColorFromPreset(this.settings.colorTeam1)    //holt sich vorgebene farben und setzt sie als teamfarbe
            );
            this.team2 = new Team(
                this.settings.teamName2,
                Game.getHexColorFromPreset(this.settings.colorTeam2)
            );
            this.initCanvas(canvasId);          //ruft die nitCanvas auf mit der Cnavas iD
            this.drawField();   
            this.initParticipants();
            this.initBall();
            this.setupControls();           //ruft diese canvas
            console.log(this.participants);
            console.log("Loading game finished!");
            console.log("Start rendering..");
            this.render();                  //ab dann rendert er das spielfeld 
        }

        private setHasBall(player: Player | null) {
            this.hasBall = player;
            if (player) {
                this.lastTouch = player;
            }
        }

        private selectPlayer(player: Player | null) {
            this.selectedPlayer = player;
        }

        private setupControls() {
            const controlDiv = document.getElementById("controls");
            controlDiv.innerHTML = "";
            if (!controlDiv) {
                throw new Error("controls not found");
            }
            let pauseButton = document.createElement("button");
            pauseButton.innerText = this.pause ? "Unpause" : "Pause";
            pauseButton.setAttribute('id', 'pauseButton');
            pauseButton.addEventListener("click", this.togglePause.bind(this));
            controlDiv.appendChild(pauseButton);
            let resetButton = document.createElement("button");
            resetButton.innerText = "Reset Ball";
            resetButton.setAttribute('id', 'resetBallButton');
            resetButton.addEventListener("click", this.resetBall.bind(this));
            controlDiv.appendChild(resetButton);                                
            let replaceButton = document.createElement("button");
            replaceButton.innerText = `Selektierten Spieler rausnehmen`;
            replaceButton.addEventListener('click', () => {
                this.removePlayer(this.selectedPlayer);
            });
            controlDiv.appendChild(replaceButton);
            let addPlayerTeam1 = document.createElement("button");
            addPlayerTeam1.innerText = `Neuen Spieler für ${this.team1.name} einwechseln`;
            addPlayerTeam1.addEventListener("click", () => {
                this.addPlayer(this.team1);
            });
            controlDiv.appendChild(addPlayerTeam1);

            let addPlayerTeam2 = document.createElement("button");
            addPlayerTeam2.innerText = `Neuen Spieler für ${this.team2.name} einwechseln`;
            addPlayerTeam2.addEventListener('click', () => {
                this.addPlayer(this.team2);
            });
            controlDiv.appendChild(addPlayerTeam2);
        }

        private addPlayer(team: Team) {
            let teamCount = this.countTeamPlayers(team);
            if (teamCount >= 11) {
                alert("Das Team hat bereits 11 oder mehr Spieler auf dem Feld, du kannst keinen zusätzlichen Spieler mehr einwechseln.");
                return;
            }
            this.newPlayerFor = team;
        }

        private resetBall() {
            this.ball.setPos(this.fieldWidth / 2, this.fieldHeight / 2);
        }

        private togglePause() {
            this.pause = !this.pause;
            let btn = document.getElementById("pauseButton") as HTMLButtonElement;
            btn.innerText = this.pause ? "Unpause" : "Pause";
        }

        private initBall() {
            this.ball = new Ball(this.fieldWidth / 2, this.fieldHeight / 2, this.fieldWidth, this.fieldHeight); //startpunkt vom ball
        }

        private render() {
            this.crc2.clearRect(0, 0, this.fieldWidth, this.fieldHeight);
            this.drawField();
            if (!this.pause) {
                this.checkBallCollision();
            }
            this.renderGameInfo();
            this.moveBall();
            this.moveParticipants();
            window.requestAnimationFrame(this.render.bind(this));
        }

        private renderGameInfo() {
            const gameInfo = document.getElementById("gameInfo") as HTMLDivElement;
            gameInfo.innerHTML = "";
            this.renderScore(gameInfo);
            this.renderHasBall(gameInfo);
            this.renderSelectedPlayer(gameInfo);
        }

        private renderSelectedPlayer(elem: HTMLDivElement) {
            let fieldset = document.createElement("fieldset");
            let legend = document.createElement("legend");
            legend.innerText = "Ausgewählter Spieler";
            fieldset.appendChild(legend);
            if (this.selectedPlayer) {
                let list = document.createElement("ul");
                let itemNumber = document.createElement("li");
                let itemTeam = document.createElement("li");
                let itemPrecision = document.createElement("li");
                let itemSpeed = document.createElement("li");
                let itemInitPos = document.createElement("li");
                itemNumber.innerText = `Rückennummer: ${this.selectedPlayer.backNumber}`;
                itemTeam.innerText = `Team: ${this.selectedPlayer.team.name}`;
                itemPrecision.innerText = `Präzision: ${this.selectedPlayer.precision}`;
                itemSpeed.innerText = `Geschwindigkeit: ${this.selectedPlayer.speed}`;
                itemInitPos.innerText = `Initialposition: ${this.selectedPlayer.initX.toPrecision(3)} ${this.selectedPlayer.initY.toPrecision(3)}`;
                list.appendChild(itemNumber);
                list.appendChild(itemTeam);
                list.appendChild(itemPrecision);
                list.appendChild(itemSpeed);
                list.appendChild(itemInitPos);
                fieldset.appendChild(list);
            }

            elem.appendChild(fieldset);
        }

        private removePlayer(player: Player) {
            if (!player) {
                return;
            }
            let found = null;
            for (let partIdx in this.participants) {          //geht alle objekte des particpants array durch schaut in der if abrfagr ob es ein spieler ist wenn ja sucht er die rücennummer und das team von dem spieler und daraus holt er die id von dem spieler im array
                let part = this.participants[partIdx];
                if (!(part instanceof Player)) {
                    continue;
                }
                if (part.backNumber === player.backNumber && part.team.name === player.team.name){
                    found = partIdx;
                    //stop loop when player was found
                    break;
                }
            }
            //no player found after loop, do nothing
            if(found === null){
                return;
            }
            this.selectedPlayer = null;
            //remove found index from array
            this.participants.splice(found, 1);     //hier entfert er den spieler vom spiel 
        }

        private countTeamPlayers(team: Team) {       //ist da damit anzahl gezählt wird
            let count = 0;
            for (let part of this.participants) {     //schaut wieder durch den array nach spielern 
                if (part instanceof Player) {
                    if (part.team.name === team.name) {
                        count++;
                    }
                }
            }
            return count;
        }

        private renderScore(elem: HTMLDivElement) {
            let div = document.createElement("div");
            let h1 = document.createElement("h1");              //updatesd wahrscheinlich die h1 
            let team1Count = this.countTeamPlayers(this.team1);
            let team2Count = this.countTeamPlayers(this.team2);
            h1.innerHTML = `(${team1Count} Spieler) ${this.team1.name} <b>${this.scoreTeam1}</b> : <b>${this.scoreTeam2}</b> ${this.team2.name} (${team2Count} Spieler)`;
            div.appendChild(h1);
            elem.appendChild(div);

        }

        private renderHasBall(elem: HTMLDivElement) {
            let fieldset = document.createElement("fieldset");
            let legend = document.createElement("legend")
            legend.innerText = "Ballbesitz";
            fieldset.appendChild(legend);
            if (this.hasBall) {
                let list = document.createElement("ul");
                let itemNumber = document.createElement("li");
                let itemTeam = document.createElement("li");
                let itemPrecision = document.createElement("li");
                let itemSpeed = document.createElement("li");
                let itemInitPos = document.createElement("li");
                itemNumber.innerText = `Rückennummer: ${this.hasBall.backNumber}`;
                itemTeam.innerText = `Team: ${this.hasBall.team.name}`;
                itemPrecision.innerText = `Präzision: ${this.hasBall.precision}`;
                itemSpeed.innerText = `Geschwindigkeit: ${this.hasBall.speed}`;
                itemInitPos.innerText = `Initialposition: ${this.hasBall.initX.toPrecision(3)} ${this.hasBall.initY.toPrecision(3)}`;
                list.appendChild(itemNumber);           //appendChild wird an elternelement angehangen
                list.appendChild(itemTeam);
                list.appendChild(itemPrecision);
                list.appendChild(itemSpeed);
                list.appendChild(itemInitPos);
                fieldset.appendChild(list);
            }

            elem.appendChild(fieldset);
        }

        private moveBall() {
            if (!this.pause) {
                this.ball.move();
            }
            this.drawBall();
        }

        private drawBall() {
            this.crc2.beginPath();
            this.crc2.strokeStyle = "#000000";
            this.crc2.lineWidth = 1;
            this.crc2.arc(this.ball.x, this.ball.y, 10, 0, 360);
            this.crc2.fillStyle = "#ffffff";
            this.crc2.fill();
            this.crc2.stroke();
            this.crc2.closePath();
        }

        private moveParticipants() {
            //MOVE ALL PARTICIPANTS
            //if game paused, just display them
            for (let participant of this.participants) {
                if (!this.pause) {
                    this.moveParticipant(participant);
                }
                this.drawParticipant(participant);
            }
        }

        private movePlayer(player: Player) {
            let playVec = [player.x, player.y];
            let ballVec = [this.ball.x, this.ball.y];
            let initVec = [player.initX, player.initY];
            //60 because 30 is too close
            if (Game.getDistance(playVec, ballVec) > DEFAULT_PLAYER_VISION_RANGE && Game.getDistance(playVec, initVec) > 1) {
                //run to initial position when ball is too far away and player is far from initial position
                let [addDirX, addDirY] = Game.getNormDirVector(playVec, initVec);
                player.addPos(addDirX * player.speed * this.globalSpeed, addDirY * player.speed * this.globalSpeed);
            } else if (Game.getDistance(playVec, ballVec) <= DEFAULT_PLAYER_VISION_RANGE) {
                //run to ball if ball is in range
                let [addDirX, addDirY] = Game.getNormDirVector(playVec, ballVec);
                player.addPos(addDirX * player.speed * this.globalSpeed, addDirY * player.speed * this.globalSpeed);
            }

        }

        private moveReferee(ref: Referee) {
            let randomDir = Game.getRandomDir();
            let newX = ref.x + randomDir[0] * ref.speed;
            let newY = ref.y + randomDir[1] * ref.speed;
            while (newX > this.fieldWidth || newY > this.fieldHeight) {
                randomDir = Game.getRandomDir();
                newX = ref.x + randomDir[0] * ref.speed;
                newY = ref.y + randomDir[1] * ref.speed;
            }
            ref.addPos(randomDir[0] * ref.speed, randomDir[1] * ref.speed);
        }

        private moveSideReferee(sideRef: SideReferee) {
            if (this.ball.x > sideRef.x) {
                sideRef.addPos(sideRef.speed, 0);
            } else {
                sideRef.addPos(-sideRef.speed, 0);
            }
        }

        private moveParticipant(part: Participant) {            //schaut im array welcher typ sich grade bewegt und gibt ihm die dementsprechende move funktion 
            if (part instanceof Player) {
                this.movePlayer(part);
            }
            if (part instanceof Referee) {
                this.moveReferee(part);
            }
            if (part instanceof SideReferee) {
                this.moveSideReferee(part);
            }
        }

        private drawParticipant(part: Participant) {
            if (part instanceof Player) {
                this.drawPlayer(part);
            }
            if (part instanceof Referee || part instanceof SideReferee) {
                this.drawReferee(part);
            }
        }

        private drawPlayer(player: Player) {
            this.crc2.beginPath();
            this.crc2.strokeStyle = "#000000";
            this.crc2.lineWidth = 1;
            this.crc2.arc(player.x, player.y, 10, 0, 360);
            this.crc2.fillStyle = player.team.color;
            this.crc2.fill();
            this.crc2.stroke();
            this.crc2.font = "14pt Courier";
            this.crc2.fillStyle = "black";
            this.crc2.textAlign = "center";
            this.crc2.fillText(player.backNumber.toString(), player.x, player.y + 5);
            this.crc2.closePath();
        }

        private drawReferee(ref: Referee) {
            this.crc2.beginPath();
            this.crc2.strokeStyle = "#000000";
            this.crc2.lineWidth = 1;
            this.crc2.arc(ref.x, ref.y, 10, 0, 360);
            this.crc2.fillStyle = ref.color;
            this.crc2.fill();
            this.crc2.stroke();
            this.crc2.font = "13pt Courier";
            this.crc2.fillStyle = "white";
            this.crc2.textAlign = "center";
            this.crc2.fillText("R", ref.x, ref.y + 5);
            this.crc2.closePath();
        }

        private checkBallCollision() {
            if (this.ball.collisionImmune) {
                return;
            }
            //check if ball collides with left goal
            if (this.ball.x <= MINIMUM_WALL_DISTANCE + 2 && this.ball.y >= this.fieldHeight / 2.3 && this.ball.y <= this.fieldHeight / 2.3 + 90){
                console.log("GOAL LEFT!");
                this.scoreTeam2++;
                this.resetBall();
                return;
            }
            //check if ball collides with right goal
            if (this.ball.x >= this.fieldWidth - MINIMUM_WALL_DISTANCE - 2 && this.ball.y >= this.fieldHeight / 2.3 && this.ball.y <= this.fieldHeight / 2.3 + 90){
                console.log("GOAL RIGHT!");
                this.scoreTeam1++;
                this.resetBall();
                return;
            }


            //check if ball collides with players after
            for (let part of this.participants) {
                if (!(part instanceof Player)) {        //schaut ob participant ein player ist 
                    continue;
                }
                let dist = Game.getDistance([part.x, part.y], [this.ball.x, this.ball.y]);  //wenn die distanz kleiner als 3 ist zwischen spieler und ball hat der spieler den ball und man schießen
                //console.log(part.backNumber, dist);
                if (dist <= 3) {
                    console.log(part.backNumber, "HIT THE BALL!", this.ball.x, this.ball.y);
                    this.startClickMode();
                    this.togglePause();
                    this.setHasBall(part);
                    return;
                }
            }
        }

        private startClickMode() {
            this.clickMode = true;
        }

        private shootBall(evt: MouseEvent) {
            if (!this.clickMode) {
                return;
            }
            let precisionMulti = 1 - (this.hasBall.precision / this.settings.maxPrecision);     //berechnet die pression aus max prezision und der spieler prezesion 
            let offset = MAX_PRECISION_OFFSET - MAX_PRECISION_OFFSET * precisionMulti;
            let dir = Game.getNormDirVector([this.ball.x, this.ball.y], [evt.offsetX + offset, evt.offsetY - offset]);
            this.ball.setDir(dir);
            this.clickMode = false;
            this.pause = false;
            this.setHasBall(null);
        }

        private initCanvas(id: string) {
            let canvas: HTMLCanvasElement = document.getElementById(
                id
            ) as HTMLCanvasElement;
            canvas.addEventListener("click", this.shootBall.bind(this));
            canvas.addEventListener("contextmenu", this.selectPlayerClick.bind(this));
            this.crc2 = canvas.getContext("2d");
            if (!this.crc2) {
                throw new Error("canvas not found");
            }
        }

        private selectPlayerClick (evt: MouseEvent) {
            //prevent opening of contextmenu
            evt.preventDefault();               //verwindet rechtsklick menue öffnen 
            let vec2 = [evt.offsetX, evt.offsetY];
            //if this.newPlayerFor is set, then add a player with a click, not select one
            if (this.newPlayerFor){
                //get random back number
                let newNr = Math.floor(Math.random() * 99)+1;
                this.participants.push(new Player(vec2[0], vec2[1],this.newPlayerFor, this.getRandomSpeed(), this.getRandomPrecision(), newNr, this.fieldWidth, this.fieldHeight))
                this.newPlayerFor = null;
            }
            //otherwise select a player
            else {
                //get player closest to cursor
                for (let part of this.participants) {
                    if (part instanceof Player) {
                        let playerVec = [part.x, part.y];
                        let dist = Game.getDistance(vec2, playerVec);
                        if (dist <= 12) {
                            this.selectPlayer(part);
                            return;
                        }
                    }
                }
                this.selectPlayer(null);
            }

        }

        private drawField() {
            //make field green
            this.crc2.fillStyle = "#00fa00";
            this.crc2.fillRect(0, 0, this.fieldWidth, this.fieldHeight);
            //add middle line
            this.crc2.beginPath();
            this.crc2.moveTo(this.fieldWidth / 2, 0);
            this.crc2.lineTo(this.fieldWidth / 2, this.fieldHeight);
            this.crc2.lineWidth = 5;
            this.crc2.strokeStyle = "#ffffff";
            this.crc2.closePath();
            this.crc2.stroke();
            //adding middle point
            this.crc2.beginPath();
            this.crc2.arc(this.fieldWidth / 2, this.fieldHeight / 2, 3, 0, 360);
            this.crc2.stroke();
            this.crc2.closePath();
            //adding middle circle
            this.crc2.beginPath();
            this.crc2.arc(this.fieldWidth / 2, this.fieldHeight / 2, 120, 0, 360);
            this.crc2.stroke();
            this.crc2.closePath();
            //adding left 16m room
            this.crc2.beginPath();
            this.crc2.rect(0, this.fieldHeight / 3.5, 200, 300);
            this.crc2.stroke();
            this.crc2.closePath();
            //adding right 16m room
            this.crc2.beginPath();
            this.crc2.rect(this.fieldWidth - 200, this.fieldHeight / 3.5, 200, 300);
            this.crc2.stroke();
            this.crc2.closePath();
            //add left goal
            this.crc2.beginPath();
            this.crc2.rect(0, this.fieldHeight / 2.3, 30, 90);
            this.crc2.stroke();
            this.crc2.closePath();
             //add right goal
            this.crc2.beginPath();
            this.crc2.rect(this.fieldWidth - 30, this.fieldHeight / 2.3, 30, 90);
            this.crc2.stroke();
            this.crc2.closePath();
            //adding left penalty point
            this.crc2.beginPath();
            this.crc2.arc(this.fieldWidth / 10, this.fieldHeight / 2, 3, 0, 360);
            this.crc2.stroke();
            this.crc2.closePath();
            //adding right penalty point
            this.crc2.beginPath();
            this.crc2.arc(
                this.fieldWidth - this.fieldWidth / 10,
                this.fieldHeight / 2,
                3,
                0,
                360
            );
            this.crc2.stroke();
            this.crc2.closePath();
            //adding left upper corner arc
            this.crc2.beginPath();
            this.crc2.arc(0, 0, 12, 90, 180);
            this.crc2.stroke();
            this.crc2.closePath();
            //adding left downside corner arc
            this.crc2.beginPath();
            this.crc2.arc(0, this.fieldHeight, 12, 0, 90);
            this.crc2.stroke();
            this.crc2.closePath();
            //adding right upper corner arc
            this.crc2.beginPath();
            this.crc2.arc(this.fieldWidth, 0, 12, 180, 270);
            this.crc2.stroke();
            this.crc2.closePath();
            //adding right downside corner arc
            this.crc2.beginPath();
            this.crc2.arc(this.fieldWidth, this.fieldHeight, 12, 270, 360);
            this.crc2.stroke();
            this.crc2.closePath();
        }

        private getRandomFieldPosition(): number[] {
            let x = Math.floor(Math.random() * this.fieldWidth);
            let y = Math.floor(Math.random() * this.fieldHeight);
            return [x, y];
        }

        private getRandomSpeed() {
            return Math.floor(
                Math.random() * (this.settings.maxSpeed - this.settings.minSpeed) +
                this.settings.minSpeed
            );
        }

        private getRandomPrecision() {
            return Math.floor(
                Math.random() *
                (this.settings.maxPrecision - this.settings.minPrecision) +
                this.settings.minPrecision
            );
        }

        private initParticipants() {
            //create first team
            //spawn first player near kick off
            this.participants.push(
                new Player(
                    this.fieldWidth / 2 + 2,
                    this.fieldHeight / 2 + 1,
                    this.team1,
                    this.getRandomSpeed(),
                    this.getRandomPrecision(),
                    13,
                    this.fieldWidth,
                    this.fieldHeight
                )
            );
            for (let i = 0; i < 10; i++) {
                let pos = this.getRandomFieldPosition();
                this.participants.push(
                    new Player(
                        pos[0],
                        pos[1],
                        this.team1,
                        this.getRandomSpeed(),
                        this.getRandomPrecision(),
                        i + 1,
                        this.fieldWidth,
                        this.fieldHeight
                    )
                );
            }
            //create second team
            for (let i = 0; i < 11; i++) {
                let pos = this.getRandomFieldPosition();
                this.participants.push(
                    new Player(
                        pos[0],
                        pos[1],
                        this.team2,
                        this.getRandomSpeed(),
                        this.getRandomPrecision(),
                        i,
                        this.fieldWidth,
                        this.fieldHeight
                    )
                );
            }
            //create referee
            let refPos = this.getRandomFieldPosition();
            this.participants.push(new Referee(refPos[0], refPos[1], this.fieldWidth, this.fieldHeight));
            //create side referee top
            let sideTopPos = this.getRandomFieldPosition();
            this.participants.push(new SideReferee(sideTopPos[0], 2, this.fieldWidth, this.fieldHeight));
            //create side referee top
            let sideBottomPos = this.getRandomFieldPosition();
            this.participants.push(
                new SideReferee(sideBottomPos[0], this.fieldHeight - 2, this.fieldWidth, this.fieldHeight)
            );
        }
    }

}
