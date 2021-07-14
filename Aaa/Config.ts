namespace EIA_Ball {
    export class Config {
        private static instance: Config;

        public margin: number = 25;
        public lineWidth: number = 5;
        public team0: string = "Team A";
        public team1: string = "Team B";
        public team0Color: string = "red";
        public team1Color: string = "blue";
        public playerCount: number = 11;
        public minDistance: number = 40;
        public actionRadius: number = 110;
        public ballFriction: number = 0.985;
        public ballKickSpeed: number = 280;
        public ballStartSpeed: number = 240;

        public static getInstance(): Config {       //holt dich die neuste version von den Daten oben
            if (!Config.instance) {
                Config.instance = new Config();
            }
            return Config.instance;
        }

        private constructor() { }
    }
}