namespace Zauberbild {

    export class Bubblegum extends Values {

        constructor() {
            super();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.dx = Math.random() * 10;
            this.dy = Math.random() * 5;
            this.size = 10;
            this.r = Math.random() * 10;
            this.type = "Bubblegum";
        }

        draw(): void {
           

            let circle: Path2D = new Path2D();
            circle.arc(this.x , this.y, this.r, 0, 360);
        
            crc.fillStyle = "pink";
            crc.fill(circle);
            crc.stroke(circle);

            //console.log("rotation rot");
            


        }
        update(x: number, y: number): void {
            this.move(x, y);
            this.draw();
            //console.log(this.x, this.y);
        }

        move(x: number, y: number): void {
           


            this.r += Math.random() * 2;
            if (this.r >= 40) {
                this.r -= Math.random() * 2;
            }

            this.y += y;
            this.x += x;
            
        }

    }
}