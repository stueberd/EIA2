window.addEventListener("load", handleLoad);
    
export interface Vector {
    x: number;
    y: number;
}

export let crc2: CanvasRenderingContext2D;
let imgData: ImageData;
let golden: number = 0.62;

let moveables: Moveable[] = [];


for (let i: number = 1; i < 40; i++) {
    // moveables.push(new Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413))));
    let snowflake: Snowflake = new Snowflake(Math.floor(Math.random() * (870)), Math.floor(Math.random() * (413)));
    moveables.push(snowflake);
}