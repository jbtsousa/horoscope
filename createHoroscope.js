var widthC=600;
var heightC=300;
let lines, lol, lol2;

function preload(){

    lines=loadStrings('data/horoscopes.txt');

}

function setup() {

    //criação do canvas, onde aparece depois o horóscopo
    canvas=createCanvas(widthC, heightC);
    canvas.parent('#canvas-container');

    //teste .txt
    lol=random(lines);
    console.log(lol);

    //teste RiTa
    lol2 = RiTa.pos(lol); 
    console.log(lol2);

}

function draw() {

    background(220);
    text(lol, 10, 10, 80, 80);

}