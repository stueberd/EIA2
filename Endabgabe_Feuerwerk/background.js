var Fireworks;
(function (Fireworks) {
    console.log("background");
    function drawCanvas() {
        let horizon = Fireworks.crc2.canvas.height / 2;
        drawBackground();
        drawMoon({ x: 90, y: 80 });
        drawSingleStar({ x: 180, y: 200 });
        drawStar();
        drawSkyline({ x: 0, y: horizon });
        drawMountain();
        function drawBackground() {
            // console.log("drawBackground");
            let gradient = Fireworks.crc2.createLinearGradient(0, 0, 0, Fireworks.crc2.canvas.height);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.4, "#0A122A");
            gradient.addColorStop(0.8, "#3B0B17");
            gradient.addColorStop(0.95, "#B43104");
            gradient.addColorStop(1, "#fe9700");
            Fireworks.crc2.fillStyle = gradient;
            Fireworks.crc2.fillRect(0, 0, Fireworks.crc2.canvas.width, Fireworks.crc2.canvas.height);
        }
        function drawMoon(_position) {
            //console.log("moon",_position);
            let r1 = 35;
            let r2 = 120;
            let gradient = Fireworks.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(360,0%,70%,1)");
            gradient.addColorStop(1, "HSLA(360,0%,20%,0)");
            Fireworks.crc2.save();
            Fireworks.crc2.translate(_position.x, _position.y);
            Fireworks.crc2.fillStyle = gradient;
            Fireworks.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            Fireworks.crc2.fill();
            Fireworks.crc2.restore();
        }
        function drawStar() {
            //console.log("Star");
            let starCount = 100;
            for (let i = 0; i < starCount; i++) {
                let x = Math.random() * 1000 + 100;
                let y = Math.random() * 300 + 20;
                drawSingleStar({ x: x, y: y });
            }
        }
        function drawSingleStar(_position) {
            // console.log("SingleStar",_position);
            let r1 = 1;
            let r2 = 3;
            let gradient = Fireworks.crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(360,0%,70%,1)");
            gradient.addColorStop(1, "HSLA(360,0%,20%,0)");
            Fireworks.crc2.save();
            Fireworks.crc2.translate(_position.x, _position.y);
            Fireworks.crc2.fillStyle = gradient;
            Fireworks.crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            Fireworks.crc2.fill();
            Fireworks.crc2.restore();
        }
        function drawSkyline(_position) {
            //  console.log("Skyline");
            Fireworks.crc2.save();
            Fireworks.crc2.translate(_position.x, _position.y);
            Fireworks.crc2.beginPath();
            Fireworks.crc2.moveTo(0, 960);
            Fireworks.crc2.lineTo(0, 125);
            Fireworks.crc2.lineTo(75, 125);
            Fireworks.crc2.lineTo(75, 960);
            Fireworks.crc2.lineTo(75, 90);
            Fireworks.crc2.lineTo(125, 90);
            Fireworks.crc2.lineTo(125, 300);
            Fireworks.crc2.lineTo(125, 75);
            Fireworks.crc2.lineTo(200, 75);
            Fireworks.crc2.lineTo(200, 960);
            Fireworks.crc2.lineTo(200, 120);
            Fireworks.crc2.lineTo(250, 120);
            Fireworks.crc2.lineTo(250, 960);
            Fireworks.crc2.lineTo(250, 80);
            Fireworks.crc2.lineTo(350, 80);
            Fireworks.crc2.lineTo(350, 960);
            Fireworks.crc2.lineTo(350, 140);
            Fireworks.crc2.lineTo(550, 140);
            Fireworks.crc2.lineTo(550, 300);
            Fireworks.crc2.lineTo(550, 70);
            Fireworks.crc2.lineTo(625, 70);
            Fireworks.crc2.lineTo(625, 960);
            Fireworks.crc2.lineTo(625, 90);
            Fireworks.crc2.lineTo(700, 90);
            Fireworks.crc2.lineTo(700, 300);
            Fireworks.crc2.lineTo(700, 70);
            Fireworks.crc2.lineTo(700, 70);
            Fireworks.crc2.lineTo(700, 960);
            Fireworks.crc2.lineTo(700, 120);
            Fireworks.crc2.lineTo(740, 120);
            Fireworks.crc2.lineTo(740, 300);
            Fireworks.crc2.lineTo(800, 150);
            Fireworks.crc2.lineTo(800, 150);
            Fireworks.crc2.lineTo(800, 960);
            Fireworks.crc2.closePath();
            Fireworks.crc2.fillStyle = "blue";
            Fireworks.crc2.fill();
            Fireworks.crc2.restore();
        }
        /*function drawMountain(): void {
            crc2.fillStyle = "darkgrey";
            crc2.strokeStyle = "grey";
            crc2.save();
            crc2.beginPath();
            crc2.moveTo(0, crc2.canvas.height);
            crc2.lineTo(0, crc2.canvas.height * 0.2);
            crc2.lineTo(crc2.canvas.width, crc2.canvas.height * 0.15);
            crc2.lineTo(crc2.canvas.width, crc2.canvas.height);
            crc2.closePath();
            crc2.fill();
            crc2.stroke();
            crc2.restore();
        }*/
    }
    Fireworks.drawCanvas = drawCanvas;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=background.js.map