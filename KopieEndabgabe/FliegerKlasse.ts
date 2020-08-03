namespace Zauberbild {

    export class FliegerKlasse extends Values {

        constructor() {
            super();
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.dx = Math.random() * 3;
            this.dy = Math.random() * 2;
            this.size = 10;
            //this.r = Math.random() * 10 + 10;
            this.type = "FliegerKlasse";
        }
        draw(): void {
            let flieger: Path2D = new Path2D();
            flieger.moveTo(this.x, this.y);
            flieger.lineTo(this.x + 40, this.y);
            flieger.lineTo(this.x + 20, this.y + 40);
            flieger.lineTo(this.x + 20, this.y + 20);
            crc.fillStyle = "black";
            crc.fill(flieger);
            crc.stroke(flieger);

        }
        update(x: number, y: number): void {
            this.move(x, y);
            this.draw();
            console.log(this.x, this.y);
            
        }

        move(x: number, y: number): void {

            this.x += this.dx;
            this.y += y;
            this.x += x;
            this.y += this.dy ;
            console.log("flieger funktioniert");
            if (this.x > canvas.width || this.x < 0 || this.y > canvas.height || this.y < 0) {

                this.x = 0;
                this.y = canvas.height * Math.random();
            }
        }

    }
}