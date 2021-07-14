namespace Fussball {
    interface Vector {
        x: number;
        y: number;
    }

    window.addEventListener("load", handleLoad);
    let crc2: CanvasRenderingContext2D;
    

    function handleLoad(_event: Event): void {
        let canvas: HTMLCanvasElement | null = document.querySelector("canvas");
        if (!canvas)
            return;
        crc2 = <CanvasRenderingContext2D>canvas.getContext("2d");
    
        //drawBackground();
        drawSoccerfield();
        let soccerfield: ImageData = crc2.getImageData(0, 0, 1050, 500);

        window.setInterval(update, 20, soccerfield);
    }

    function drawSoccerfield(): void {
        // Rasen

        let gradient: CanvasGradient = crc2.createLinearGradient(0, 0, 1050, 0);
        gradient.addColorStop(0, "#328c37"); 
        gradient.addColorStop(.1, "#328c37");
        gradient.addColorStop(.2, "#2daf00");
        gradient.addColorStop(.3, "#2daf00");
        gradient.addColorStop(.4, "#328c37");
        //gradient.addColorStop(.5, "#328c37");
        gradient.addColorStop(.6, "#328c37");
        gradient.addColorStop(.7, "#2daf00");
        gradient.addColorStop(.8, "#2daf00");
        gradient.addColorStop(.9, "#328c37");
        gradient.addColorStop(1, "#328c37");
        
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, 1050, 500);
        crc2.beginPath();
        crc2.fillStyle = gradient;
        crc2.fillRect(0, 0, crc2.canvas.width, crc2.canvas.height);
        crc2.closePath();
        // Mittellinie
        crc2.beginPath();
        crc2.moveTo(crc2.canvas.width / 2, 10);
        crc2.lineTo(crc2.canvas.width / 2, 490);
        crc2.strokeStyle = "white";
        crc2.stroke();
        crc2.closePath();
        //Mittelkreis
        crc2.beginPath();
        crc2.arc(crc2.canvas.width / 2, crc2.canvas.height / 2, 100, 0, 2 * Math.PI);
        crc2.stroke();
        crc2.closePath();
        crc2.beginPath();
        crc2.arc(crc2.canvas.width / 2, crc2.canvas.height / 2, 5, 0, 2 * Math.PI);
        crc2.fillStyle = "white";
        crc2.fill();
        crc2.closePath();
        // Tor rechts
        crc2.beginPath();
        crc2.moveTo(crc2.canvas.width - 10, crc2.canvas.height / 2 - 50);
        crc2.lineTo(crc2.canvas.width - 50, crc2.canvas.height / 2 - 50);
        crc2.lineTo(crc2.canvas.width - 50, crc2.canvas.height / 2 + 50);
        crc2.lineTo(crc2.canvas.width - 10, crc2.canvas.height / 2 + 50);
        crc2.stroke();
        crc2.closePath();
        // Strafraum rechts
        crc2.beginPath();
        crc2.moveTo(crc2.canvas.width - 10, crc2.canvas.height / 2 - 150);
        crc2.lineTo(crc2.canvas.width - 150, crc2.canvas.height / 2 - 150);
        crc2.lineTo(crc2.canvas.width - 150, crc2.canvas.height / 2 + 150);
        crc2.lineTo(crc2.canvas.width - 10, crc2.canvas.height / 2 + 150);
        crc2.stroke();
        crc2.closePath();
        //Halbkreis rechts
        crc2.beginPath();
        crc2.arc(920, crc2.canvas.height / 2, 60, 1.9, 1.39 * Math.PI);
        crc2.stroke();
        crc2.closePath();

        // Tor links
        crc2.beginPath();
        crc2.moveTo(10, crc2.canvas.height / 2 - 50);
        crc2.lineTo(10 + 50, crc2.canvas.height / 2 - 50);
        crc2.lineTo(10 + 50, crc2.canvas.height / 2 + 50);
        crc2.lineTo(10, crc2.canvas.height / 2 + 50);
        crc2.stroke();
        crc2.closePath();
        // Strafraum links
        crc2.beginPath();
        crc2.moveTo(10, crc2.canvas.height / 2 - 150);
        crc2.lineTo(10 + 150, crc2.canvas.height / 2 - 150);
        crc2.lineTo(10 + 150, crc2.canvas.height / 2 + 150);
        crc2.lineTo(10, crc2.canvas.height / 2 + 150);
        crc2.stroke();
        crc2.closePath();
        //Halbkreis links
        crc2.beginPath();
        crc2.arc(140, 250, 60, 5.05, 2.39 *  Math.PI); 
        crc2.strokeStyle = "white";
        crc2.stroke();
        crc2.closePath();
        //Aussenlinie 
        crc2.beginPath();
        crc2.moveTo(10, 10);
        crc2.lineTo(1040, 10);
        crc2.lineTo(1040, 490);
        crc2.lineTo(10, 490);
        crc2.lineTo(10, 10);
        crc2.stroke();
        crc2.closePath();
        
    }
    

    function update(_soccerfield: ImageData): void {
        console.log("update");
    }
    
       

     

    }


















