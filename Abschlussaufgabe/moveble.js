var Fußball;
(function (Fußball) {
    class Moveable {
        constructor(_position) {
            this.expendable = false;
            let a = -Math.random();
            let b = Math.random();
            this.velocity = new Vector(a, b);
            //feste position ohne Math.radnom, damit die nicht mehr am Rand kleben
            let x = 900 * Math.random();
            let y = 600 * Math.random();
            this.position = new Vector(x, y);
            this.radius = 30;
        }
        /*   public change(): void {
              this.expendable = true;
          } */
        move(_timeslice) {
            this.position.add(this.velocity);
            if (this.position.x + 10 > 900 || this.position.x - 10 < 0) {
                this.velocity.x = -this.velocity.x;
            }
            if (this.position.y + 10 > 600 || this.position.y - 10 < 0) {
                this.velocity.y = -this.velocity.y;
            }
        }
        draw() {
            //draw
        }
    }
    Fußball.Moveable = Moveable;
})(Fußball || (Fußball = {}));
//# sourceMappingURL=moveble.js.map