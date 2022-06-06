var horoscopes;
var paragrafo; //é o data do processing
let lema, dos, donts, paragraph;
let bef, aft;


////////// Passa variáveis de inputs do utilizador para pagina seguinte 
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
    

    map1(partnerSign);
    map2(moon);
    //map3(chineseSign);
    map3("fast"); //para testar

}


////////////////////////////////////////////////////MAPEAMENTO 1
///////////////////////////////////////signo >> início de frase >> text markov e horoscope.txt >> lema
function map1(partner_sign){
    console.log("MAPEAMENTO1");

    let txt_horoscopes = carregaCont(horoscopes);
    var rm_2 = criaMod(txt_horoscopes, 3);

    var phrase_inicio;
    
    function phr_partnerSign(partner_sign) {

        if (partner_sign === "aries") {
            phrase_inicio = "You will feel"; //LemaF: "You will feel the a as good better."
        }
        else if (partner_sign ==  "taurus") {
            phrase_inicio = "Feel more and" //LemaF: "Feel more and do no spending dream take."
        }
        else if (partner_sign ===  "gemini") {
            phrase_inicio = "Today is always" //LemaF: "Today is always a something the someone good."
        }
        else if (partner_sign ===  "cancer") {
            phrase_inicio = "Do not forget" //LemaF: "Do not forget that."
        }
        else if (partner_sign ===  "leo") {
            phrase_inicio = "Fell this you" //LemaF: "Feet this you may." (Muito Star Wars vibe)
        }
        else if (partner_sign===  "virgo") {
            phrase_inicio = "Think about this" //LemaF: "Think about this weekend and."
        }
        else if (partner_sign ===  "libra") {
            phrase_inicio = "Sometimes there is" //LemaF: "Sometimes there is no a something nothing still."
        }
        else if (partner_sign ===  "scorpio") {
            phrase_inicio = "Your luck is" //LemaF: "Your luck is on about well what certainly."
        }
        else if (partner_sign ===  "saggittarius") {
            phrase_inicio = "Walk together but" //LemaF: "Walk tohether but to the there it you."
        }
        else if (partner_sign ===  "capricorn") {
            phrase_inicio = "No one is" //LemaF: "No one is perfect out as trying more."
        }
        else if (partner_sign ===  "aquarius") {
            phrase_inicio = "Run away and" //LemaF: "Run away and start give take sooner you."
        }
        else if (partner_sign ===  "pisces") {
            phrase_inicio = "Your dreams will" //LemaF: "Your dreams will start get soon come."
        }
        
        return phrase_inicio;

    }

    phr_partnerSign(partner_sign);

    console.log("frase inicio:",phrase_inicio); 
    var lemaF ="";

    let comp = new Array();
    comp = rm_2.completions(splitTokens(phrase_inicio));

    //i<5 define o numero maximo de palavras do lema
    for(let i=0; i<5 && i<comp.length;i++){
        //console.log("o resto do lema é:"," " , comp[i]);
        lemaF= lemaF+ " " +comp[i];
    }

    lemaF= phrase_inicio + lemaF + ".";

    console.log("O lemaF é do mapeamento 1:",lemaF);
    
}


////////////////////////////////////////////////////MAPEAMENTO 2
///////////////////////////////////////lua >> middleWord e horoscopes.txt >> verbos e nomes

function map2(m) {
    console.log("MAPEAMENTO2");

    let txt_horoscopes = carregaCont(horoscopes);
    var rm_f = criaMod(txt_horoscopes, 6);

    console.log(m);

    function befAft_moon(m) {



       // if (m === "first-quarter") {
            bef="getting";
            aft="you;"
        //}

        return bef;
        return aft;

    }

    befAft_moon(m);
    console.log("bef:", bef, "aft:", aft); //corre

    let comp = new Array();
    comp = rm_f.completions([bef], [aft]);
    console.dir(comp); //array vazio. Mas no .pde funciona com esta combinação de palavras (bef, aft)


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

function draw() {

}