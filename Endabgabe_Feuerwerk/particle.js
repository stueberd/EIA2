var Fireworks;
(function (Fireworks) {
    console.log("Particle");
    class Particle {
        constructor() {
        }
        draw(_color, _particleRadius) {
            console.log("draw Particle");
        }
        move() {
            this.velocity = Fireworks.Vector.getSum(this.velocity, new Fireworks.Vector(0, 0.01)); //Gravitaion
            this.position = Fireworks.Vector.getSum(this.position, this.velocity);
        }
    }
    Fireworks.Particle = Particle;
})(Fireworks || (Fireworks = {}));
//# sourceMappingURL=particle.js.map