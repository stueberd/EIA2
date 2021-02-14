"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
window.addEventListener("load", handleLoad);
let imgData;
let golden = 0.62;
let moveables = [];
for (let i = 1; i < 40; i++) {
    // moveables.push(new Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413))));
    let snowflake = new Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413)));
    moveables.push(snowflake);
}
//# sourceMappingURL=canvas.js.map