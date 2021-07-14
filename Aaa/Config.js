var EIA_Ball;
(function (EIA_Ball) {
    class Config {
        constructor() {
            this.margin = 25;
            this.lineWidth = 5;
            this.team0 = "Team A";
            this.team1 = "Team B";
            this.team0Color = "red";
            this.team1Color = "blue";
            this.playerCount = 11;
            this.minDistance = 40;
            this.actionRadius = 110;
            this.ballFriction = 0.985;
            this.ballKickSpeed = 280;
            this.ballStartSpeed = 240;
        }
        static getInstance() {
            if (!Config.instance) {
                Config.instance = new Config();
            }
            return Config.instance;
        }
    }
    EIA_Ball.Config = Config;
})(EIA_Ball || (EIA_Ball = {}));
//# sourceMappingURL=Config.js.map