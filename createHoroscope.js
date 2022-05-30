var horoscopes;
var paragrafo; //é o data do processing

queryString = location.search.substring(1);

var getLink = queryString.split("|");

var chineseSign = getLink[0];
var moon = getLink[1];
var partnerSign = getLink[2];

console.log(chineseSign, moon, partnerSign);

function preload() {
    horoscopes = loadStrings('data/horoscopes.txt');
    fairyTales = loadStrings('data/fairy_tales.txt');
}

function setup() {

    let lema = select('#lema-sign');
    let dos = select('#dos');
    let donts = select('#donts');
    let paragraph = select('#paragraph-chinese');

    let txt_horoscopes = carregaCont(horoscopes);
    let txt_fairytales = carregaCont(fairyTales);

    var rm = criaMod(txt_horoscopes, 3);
    var rm_f = criaMod(txt_fairytales, 3);



    ///////////////////Middle word
    //ta a dar um erro n sei pq
    
    var antes= "the";
    var depois= chineseSign;
    comp= rm_f.completions(antes,depois);
    for (i=0; i<comp.length;i++){
        if (RiTa.isAdjective(comp[i])){
            console.log(comp[i]);

        }
    }



    ///////////////////GivenKeyword a receber "fast"


    RiTa.concordance(txt_horoscopes);
    let ret = new Array();
    ret = RiTa.kwic("fast", 3);

    for (let i = 0; i < ret.length; i++) {
        paragrafo = paragrafo + ret[i];
    }

    var frases = split(paragrafo, '.');
    let cump = frases.length;
    console.log(cump);
    let a = int(random(0, cump));

    var randomLema;
    randomLema = frases[a];
    console.log(randomLema);
    lema.html(randomLema,true);



}

function carregaCont(f) {
    return f.join("\n", loadStrings(f)).toLowerCase();
}

function criaMod(text, n) {
    let rm = RiTa.markov(n);
    rm.addText(text);
    return rm;
}

function draw() {

}


