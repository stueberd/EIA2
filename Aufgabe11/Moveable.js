var L11_Virus;
(function (L11_Virus) {
    class Moveable {
        constructor(_position) {
            this.radius = 3;
            this.contact = false;
            // console.log("Moveable constructor");
            if (_position)
                this.position = _position.copy();
            else
                // this.position = new Vector(Math.round((Math.random() * 750)), 0);
                this.position = new Vector(0, 0);
            this.velocity = new Vector(0, 0);
        }
        move(_timeslice) {
            // console.log("Moveable move");
            let offset = this.velocity.copy();
            offset.scale(_timeslice);
            this.position.add(offset);
            if (this.position.x < 0)
                this.position.add(offset);
            if (this.position.y < 0)
                this.position.y = L11_Virus.crc2.canvas.height;
            if (this.position.x > L11_Virus.crc2.canvas.width)
                this.position.y = L11_Virus.crc2.canvas.width;
            if (this.position.y > L11_Virus.crc2.canvas.height)
                this.position.y = L11_Virus.crc2.canvas.height;
        }
        draw() {
            // console.log("Moveable move");
        }
    }
    L11_Virus.Moveable = Moveable;
})(L11_Virus || (L11_Virus = {}));
//# sourceMappingURL=Moveable.js.map