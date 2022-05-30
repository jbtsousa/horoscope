var horoscopes;
var paragrafo; //é o data do processing
let lema, dos, donts, paragraph;


//////////////////////////////////////////////////////////////////
queryString = location.search.substring(1);

var getLink = queryString.split("|");

var chineseSign = getLink[0];
var moon = getLink[1];
var partnerSign = getLink[2];

//console.log(chineseSign, moon, partnerSign);

//////////////////////////////////////////////////////////////////

function preload() {
    horoscopes = loadStrings('data/horoscopes.txt');
    fairyTales = loadStrings('data/fairy_tales.txt');
}

function setup() {

    //declarei la em cima se não ele não identificava "lema" la em baixo
    lema = select('#lema-sign');
    dos = select('#dos');
    donts = select('#donts');
    paragraph = select('#paragraph-chinese');

    //map1();
    map2(chineseSign);
    map3("fast");

}


////////////////////////////////////////////////////MAPEAMENTO 1
///////////////////////////////////////signo >> início de frase >> text marjov e horoscope.txt >> lema
/*function map1(){

    let txt_horoscopes = carregaCont(horoscopes);
    var rm_2 = criaMod(txt_horoscopes, 3);

    var gen = rm_2.generate(3);
    for(let i=0; i<gen.length; i++){
        print.log(i,gen[i]);
    }

    let inicio= "you will feel";
    let comp = new Array();
    comp = rm_2.completions(splitTokens(inicio));
    print.log(inicio);
    //ainda nao acabei de inserir cenas

}*/


////////////////////////////////////////////////////MAPEAMENTO 2
///////////////////////////////////////lua >> middleWord e horoscopes.txt >> verbos e nomes
function map2(aft){

    let txt_horoscopes = carregaCont(horoscopes);
    var rm_f = criaMod(txt_horoscopes, 3);

    let bef="the";

    //o erro/problema esta a partir daqui
    let comp= new Array();
    comp = rm_f.completions(bef,"pig");

    
    for (let i=0; i<comp.length;i++){
        if (RiTa.isAdjective(comp[i])){
            console.log(comp[i]);

        }
    }

}


////////////////////////////////////////////////////MAPEAMENTO 3 - incompleto. falta a camada do fairytales
///////////////////////////////////////animal chines >> middleWord e fairytales.txt >> adj >> 
/////////////////////////////////////// >> givenkeyWords e horoscopes.txt >> x frases
function map3(adj){

    let txt_horoscopes = carregaCont(horoscopes);
    var rm = criaMod(txt_horoscopes, 3);


    RiTa.concordance(txt_horoscopes);
    let ret = new Array();
    ret = RiTa.kwic(adj, 3);

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

////////////////////////////////////////////////////OUTRAS FUNÇÕES

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


