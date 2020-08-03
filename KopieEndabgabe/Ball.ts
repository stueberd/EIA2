namespace Zauberbild { 
    export class Values {
        x: number;
        y: number;
        dx: number;
        dy: number;
        size: number;
        r: number;
        color: string;
        type: string;

        constructor() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.dx = 2;
            this.type = "Values";
            //this.dy = 0;
        }

        draw(): void {
           

            let circle: Path2D = new Path2D();
            circle.arc(this.x , this.y, 20, 0, 360);
        
            crc.fillStyle = "aqua";
            crc.fill(circle);
            crc.stroke(circle);

            //console.log("rotation rot");
            


        }
        update(x: number, y: number): void {
            this.move(x, y);
            this.draw();
           // console.log(this.x, this.y);
        }

        move(x: number, y: number): void {
            this.x += this.dx;
            this.y += y;
            this.x += x;
            //this.y += this.dy ;
            if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {

                this.x = 0;
               // this.y = canvas.height * Math.random();
            }
           // console.log(this.x, this.y);
        }

    }
}