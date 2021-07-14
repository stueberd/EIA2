var Feuerwerk1;
(function (Feuerwerk1) {
    console.log("Particle");
    class Particle {
        constructor() {
        }
        draw(_color, _particleRadius) {
        }
        move() {
            this.velocity = Feuerwerk1.Vector.getSum(this.velocity, new Feuerwerk1.Vector(0, 0.01)); //Gravitaion
            this.position = Feuerwerk1.Vector.getSum(this.position, this.velocity);
        }
    }
    Feuerwerk1.Particle = Particle;
})(Feuerwerk1 || (Feuerwerk1 = {}));
//# sourceMappingURL=particle.js.map