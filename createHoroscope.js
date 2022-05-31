var horoscopes;
var paragrafo; //é o data do processing
let lema, dos, donts, paragraph;


//////////////////////////////////////////////////////////////////
queryString = location.search.substring(1);

var getLink = queryString.split("|");

var chineseSign = getLink[0];
var moon = getLink[1];
var partnerSign = getLink[2];

console.log("inputs:" ,chineseSign, moon, partnerSign);

//////////////////////////////////////////////////////////////////

function preload() {
    horoscopes = loadStrings('data/horoscopes.txt');
    fairyTales = loadStrings('data/fairy_tales.txt');
}

function setup() {

    lema = select('#lema-sign');
    dos = select('#dos');
    donts = select('#donts');
    paragraph = select('#paragraph-chinese');

    //map1(partnerSign);
    map1();
    //chinese Sign entra no mapeamento 3
    //map2(moon);
    map2();
    //map3(chineseSign);
    map3("fast"); //para testar

}


////////////////////////////////////////////////////MAPEAMENTO 1
///////////////////////////////////////signo >> início de frase >> text marjov e horoscope.txt >> lema
function map1(){
    console.log("MAPEAMENTO1");

    let txt_horoscopes = carregaCont(horoscopes);
    var rm_2 = criaMod(txt_horoscopes, 3);

    let phrase_inicio;

    /*function phr_partnerSign(partner_sign) {
        if (partner_sign == "aries") {
            phrase_inicio = "You will feel";
        }
        else if (partner_sign == "taurus") {
            phrase_inicio = "After every"
        }
        else if (partner_sign == "gemini") {
            phrase_inicio = "Today is"
        }
        else if (partner_sign == "cancer") {
            phrase_inicio = "Don't forget"
        }
        else if (partner_sign == "leo") {
            phrase_inicio = "Fell this"
        }
        else if (partner_sign == "virgo") {
            phrase_inicio = "Long walk"
        }
        else if (partner_sign == "libra") {
            phrase_inicio = "Sometimes"
        }
        else if (partner_sign == "scorpio") {
            phrase_inicio = "Forever young"
        }
        else if (partner_sign == "saggittarius") {
            phrase_inicio = "Walk alone but"
        }
        else if (partner_sign == "capricorn") {
            phrase_inicio = "No one is"
        }
        else if (partner_sign == "aquarius") {
            phrase_inicio = "The path"
        }
        else if (partner_sign == "pisces") {
            phrase_inicio = "Today choose"
        }
        //console.log(phrase_inicio);
        return phrase_inicio;

    }*/

    phrase_inicio="your luck is";
    var lemaF;

    let comp = new Array();
    comp = rm_2.completions(splitTokens(phrase_inicio));
    console.log("frase inicial:" ,phrase_inicio);

    //i<5 define o numero de palavras do lema
    for(let i=0; i<5 && i<comp.length;i++){
        console.log("o resto do lema é:"," " , comp[i]);
        //lemaF=
    }
    //console.log("O lemaF é:",lemaF);
    

}


////////////////////////////////////////////////////MAPEAMENTO 2
///////////////////////////////////////lua >> middleWord e horoscopes.txt >> verbos e nomes

function map2() {
    console.log("MAPEAMENTO2");

    let txt_fairytales = carregaCont(fairyTales);
    var rm_f = criaMod(txt_fairytales, 6);

    let bef = "new";
    let aft = "you";

    //o erro/problema esta a partir daqui
    let comp = new Array();
    comp = rm_f.completions([bef], [aft]);
    //console.dir(comp);


    for (let i = 0; i < comp.length; i++) {
        if (RiTa.isAdjective(comp[i])) {
            console.log("middle word:",comp[i]);
        }
    }
}  


////////////////////////////////////////////////////MAPEAMENTO 3 - incompleto. falta a camada do fairytales
///////////////////////////////////////animal chines >> middleWord e fairytales.txt >> adj >> 
/////////////////////////////////////// >> givenkeyWords e horoscopes.txt >> x frases
function map3(adj){
    console.log("MAPEAMENTO3");

    let txt_horoscopes = carregaCont(horoscopes);
    let rm = criaMod(txt_horoscopes, 3);


    RiTa.concordance(txt_horoscopes);
    let ret = new Array();
    ret = RiTa.kwic(adj, 3);

    for (let i = 0; i < ret.length; i++) {
        paragrafo = paragrafo + ret[i];
    }

    var frases = split(paragrafo, '.');
    let cump = frases.length;
    console.log("nº frases:",cump);
    let a = int(random(0, cump));

    var randomLema;
    randomLema = frases[a];
    console.log("frase random:",randomLema);
    lema.html(randomLema);

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