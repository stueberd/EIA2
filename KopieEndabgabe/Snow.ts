namespace Zauberbild {

    export class Snow extends Values {

        constructor() {
            super();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.dx = Math.random() * 20;
            this.dy = Math.random() * 10;
            this.size = Math.random() * 10;
            this.r = Math.random() * 20;
            this.type = "Snow";
        }

        draw(): void {
           

            let flocke: Path2D = new Path2D();
            flocke.arc(this.x , this.y, this.size, 0, 360);
        
            crc.fillStyle = "white";
            crc.fill(flocke);
            crc.stroke(flocke);

           
            


        }
    
        update(x: number, y: number): void {
            this.move(x, y);
            this.draw();
            console.log(this.x, this.y);
        }

        move(x: number, y: number): void {

            this.y += this.dy;
            this.y += y;
            this.x += x;
            this.y += this.dx ;
            console.log("drawtest");
            if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {

                this.x = 0;
                this.y = canvas.height * Math.random();
            }
    }
}
}