namespace Fireworks {
    console.log("background");

    interface Vector {
        x: number;
        y: number;
    }

    export function drawCanvas(): void {

        let horizon: number = crc2.canvas.height / 2;

        drawBackground();
        drawMoon({ x: 90, y: 80 });
        drawSingleStar({ x: 180, y: 200 });
        drawStar();
        drawSkyline({ x: 0, y: horizon });
        
        

        function drawBackground(): void {
            // console.log("drawBackground");

            let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 0, crc2.canvas.height);
            gradient.addColorStop(0, "black");
            gradient.addColorStop(0.4, "#0A122A");
            gradient.addColorStop(0.8, "#3B0B17");
            gradient.addColorStop(0.95, "#B43104");
            gradient.addColorStop(1,   "#fe9700");
            crc2.fillStyle = gradient;
            crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);

        }

        function drawMoon(_position: Vector): void {
            //console.log("moon",_position);

            let r1: number = 35;
            let r2: number = 120;

            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(360,0%,70%,1)");
            gradient.addColorStop(1, "HSLA(360,0%,20%,0)");

            crc2.save();
            crc2.translate(_position.x, _position.y);
            crc2.fillStyle = gradient;
            crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            crc2.fill();
            crc2.restore();

        }

        function drawStar(): void {
            //console.log("Star");
            

            let starCount: number = 100;

            for (let i: number = 0; i < starCount; i++) {
                let x: number = Math.random() * 1000 + 100;
                let y: number = Math.random() * 300 + 20;
                drawSingleStar({ x: x, y: y });
            }

        }

        function drawSingleStar(_position: Vector): void {
            // console.log("SingleStar",_position);


            let r1: number = 1;
            let r2: number = 3;

            let gradient: CanvasGradient = crc2.createRadialGradient(0, 0, r1, 0, 0, r2);
            gradient.addColorStop(0, "HSLA(360,0%,70%,1)");
            gradient.addColorStop(1, "HSLA(360,0%,20%,0)");

            crc2.save();
            crc2.translate(_position.x, _position.y);
            crc2.fillStyle = gradient;
            crc2.arc(0, 0, r2, 0, 2 * Math.PI);
            crc2.fill();
            crc2.restore();

        }

        function drawSkyline(_position: Vector): void {
            //  console.log("Skyline");

            crc2.save();
            crc2.translate(_position.x, _position.y);

            crc2.beginPath();
            crc2.moveTo(0, 960);
            crc2.lineTo(0, 825);
            crc2.lineTo(75, 825);
            crc2.lineTo(75, 960);

           /* crc2.lineTo(75, 690);
            crc2.lineTo(125, 690);
            crc2.lineTo(125, 960);

            crc2.lineTo(125, 75);
            crc2.lineTo(200, 75);
            crc2.lineTo(200, 960);

            crc2.lineTo(200, 120);
            crc2.lineTo(250, 120);
            crc2.lineTo(250, 960);

            crc2.lineTo(250, 80);
            crc2.lineTo(350, 80);
            crc2.lineTo(350, 960);

            crc2.lineTo(350, 140);
            crc2.lineTo(550, 140);
            crc2.lineTo(550, 300);

            crc2.lineTo(550, 70);
            crc2.lineTo(625, 70);
            crc2.lineTo(625, 960);

            crc2.lineTo(625, 90);
            crc2.lineTo(700, 90);
            crc2.lineTo(700, 300);

            crc2.lineTo(700, 70);
            crc2.lineTo(700, 70);
            crc2.lineTo(700, 960);

            crc2.lineTo(700, 120);
            crc2.lineTo(740, 120);
            crc2.lineTo(740, 300);

            crc2.lineTo(800, 150);
            crc2.lineTo(800, 150);
            crc2.lineTo(800, 960);*/

        

            crc2.closePath();

            crc2.fillStyle = "blue";
            crc2.fill();

            crc2.restore();


        }
       

       

    }
}