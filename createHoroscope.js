var widthC=600;
var heightC=300;
let lines, lol, lol2;

queryString = location.search.substring(1);

    var getLink = queryString.split("|");

    var chineseSign = getLink[0];
    var moon = getLink[1];
    var partnerSign = getLink[2];

    console.log(chineseSign,moon,partnerSign);


function preload(){

    lines=loadStrings('data/horoscopes.txt');

}

function setup() {


    lol=random(lines);
    console.log(lol);

    //teste RiTa
    lol2 = RiTa.pos(lol); 
    console.log(lol2);



}

function draw() {

    //background(220);
    //text(lol, 10, 10, 80, 80);

}