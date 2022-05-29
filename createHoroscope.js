var widthC=600;
var heightC=300;
let lines;

function preload(){

    lines=loadStrings('data/horoscopes.txt');

}

function setup() {

    canvas=createCanvas(widthC, heightC);
    canvas.parent('#canvas-container');

    let lol=random(lines);
    text(lol, 10, 10, 80, 80);
    console.log(lol);

    RiTa.pos('my name is'); 

}

function draw() {

    //background(220);

    

}