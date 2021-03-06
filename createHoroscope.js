var horoscopes;
var paragrafo; //é o data do processing
let lema, dos, donts, paragraph;
let bef, aft;
let conceptnet;


////////// Passa variáveis de inputs do utilizador para pagina seguinte 
queryString = location.search.substring(1);

var getLink = queryString.split("|");

var chineseSign = getLink[0];
var moon = getLink[1];
var partnerSign = getLink[2];

console.log("inputs:", chineseSign, moon, partnerSign);

//////////////////////////////////////////////////////////////////

function preload() {
    horoscopes = loadStrings('data/horoscopes.txt');
    fairyTales = loadStrings('data/fairy_tales.txt');
    conceptnet = loadTable('data/conceptnet5v45.csv', 'csv', 'header');

}

function setup() {

    lema = select('#lema-sign');
    dos = select('#dos');
    donts = select('#donts');
    paragraph = select('#paragraph-chinese');

    map1(partnerSign);
    map2(moon);
    map3();
}

////////////////////////////////////////////////////MAPEAMENTO 1
///////////////////////////////////////signo >> início de frase >> text markov e horoscope.txt >> lema
function map1(partner_sign) {
    console.log("MAPEAMENTO1");

    let txt_horoscopes = carregaCont(horoscopes);
    var rm_2 = criaMod(txt_horoscopes, 3);

    var phrase_inicio;

    function phr_partnerSign(partner_sign) {

        if (partner_sign === "aries") {
            phrase_inicio = "You will feel"; //LemaF: "You will feel the a as good better."
        }
        else if (partner_sign == "taurus") {
            phrase_inicio = "Feel more and" //LemaF: "Feel more and do no spending dream take."
        }
        else if (partner_sign === "gemini") {
            phrase_inicio = "Today is always" //LemaF: "Today is always a something the someone good."
        }
        else if (partner_sign === "cancer") {
            phrase_inicio = "Do not forget" //LemaF: "Do not forget that."
        }
        else if (partner_sign === "leo") {
            phrase_inicio = "Fell this you" //LemaF: "Feet this you may." (Muito Star Wars vibe)
        }
        else if (partner_sign === "virgo") {
            phrase_inicio = "Think about this" //LemaF: "Think about this weekend and."
        }
        else if (partner_sign === "libra") {
            phrase_inicio = "Sometimes there is" //LemaF: "Sometimes there is no a something nothing still."
        }
        else if (partner_sign === "scorpio") {
            phrase_inicio = "Your luck is" //LemaF: "Your luck is on about well what certainly."
        }
        else if (partner_sign === "saggittarius") {
            phrase_inicio = "Walk together but" //LemaF: "Walk tohether but to the there it you."
        }
        else if (partner_sign === "capricorn") {
            phrase_inicio = "No one is" //LemaF: "No one is perfect out as trying more."
        }
        else if (partner_sign === "aquarius") {
            phrase_inicio = "Run away and" //LemaF: "Run away and start give take sooner you."
        }
        else if (partner_sign === "pisces") {
            phrase_inicio = "Your dreams will" //LemaF: "Your dreams will start get soon come."
        }
        return phrase_inicio;

    }

    phr_partnerSign(partner_sign);

    console.log("frase inicio:", phrase_inicio);
    var lemaF = "";

    let comp = new Array();
    comp = rm_2.completions(splitTokens(phrase_inicio));

    //i<5 define o numero maximo de palavras do lema
    for (let i = 0; i < 6 && i < comp.length; i++) {
        //console.log("o resto do lema é:"," " , comp[i]);
        lemaF = lemaF + " " + comp[i];
    }

    lemaF = phrase_inicio + lemaF + ".";

    console.log("O lemaF é do mapeamento 1:", lemaF);
    lema.html(lemaF);

}

////////////////////////////////////////////////////MAPEAMENTO 2
///////////////////////////////////////lua >> middleWord e horoscopes.txt >> verbos e nomes


function map2(m) {
    let word;
    let arr_sy = [];
    let arr_ant = [];

    if (m == "new-moon") {
        word = 'new';
    }
    else if (m == "waxing-crescent") {
        word = 'start';
    }
    else if (m == "first-quarter") {
        word = 'first';
    }
    else if (m == "waxing-gibbous") {
        word = 'almost';
    }
    else if (m == "full-moon") {
        word = 'full';
    }
    else if (m == "waning-gibbous") {
        word = 'decrescent';
    }
    else if (m == "third-quarter") {
        word = 'half';
    }
    else if (m == "waning-crescent") {
        word = 'finish';
    }

    //entradas cuja primeira palavra é first
    let arr_find = conceptnet.findRows(word, 'first');

    for (i = 0; i < arr_find.length; i++) {
        //Array c todos sinonimos
        if (arr_find[i].arr[1] == "synonym" || arr_find[i].arr[1] == "similarto") {
            arr_sy.push(arr_find[i].arr[2])
        }
        //Array c todos antonimos
        if (arr_find[i].arr[1] == "antonym" || arr_find[i].arr[1] == "notdesires") {
            arr_ant.push(arr_find[i].arr[2])
        }
    }
    console.log(arr_sy);
    console.log(arr_ant);

    let arr_dos = [];
    let arr_dos_aux = [];

    let arr_donts = [];
    let arr_donts_aux = [];

    while (arr_dos_aux.length < 3) {
        const ind = Math.floor(Math.random() * arr_sy.length) + 1;
        if (arr_dos_aux.indexOf(ind) === -1) { arr_dos_aux.push(ind); }
    }

    while (arr_donts_aux.length < 3) {
        const ind = Math.floor(Math.random() * arr_ant.length) + 1;
        if (arr_donts_aux.indexOf(ind) === -1) { arr_donts_aux.push(ind); }
    }



    for (let i = 0; i < arr_dos_aux.length; i++) {
        let index = arr_dos_aux[i];
        arr_dos.push(arr_sy[index - 1]);
    }
    for (let i = 0; i < arr_donts_aux.length; i++) {
        let index = arr_donts_aux[i];
       // if( RiTa.isVerb(arr_ant[index - 1])=="true"){
            arr_donts.push(arr_ant[index - 1]);
       // }

    }


    console.log('do: ' + arr_dos);
    console.log('dont:' + arr_donts);
    let title_do = createElement('h3', "Do");
    let title_dont = createElement('h3', "Don't");
    dos.child(title_do);
    donts.child(title_dont);
    for (i = 0; i < arr_dos.length; i++) {
        let li = createElement('li', arr_dos[i]);
        dos.child(li);
    }
    for (i = 0; i < arr_donts.length; i++) {
        let li = createElement('li', arr_donts[i]);
        donts.child(li);

    }

}


////////////////////////////////////////////////////MAPEAMENTO 3 - incompleto. falta a camada do fairytales
///////////////////////////////////////animal chines >> middleWord e fairytales.txt >> adj >> 
/////////////////////////////////////// >> givenkeyWords e horoscopes.txt >> x frases
function map3() {

    console.log("MAPEAMENTO3");
    function adjChines() {
        console.log("MAPEAMENTO2");

        let txt_fairytales = carregaCont(fairyTales);
        var rm_f = criaMod(txt_fairytales, 3);

        let aft;

        if (chineseSign == "rooster") {
            aft = "chicken"
        }
        else {
            aft = chineseSign;
        }

        let comp = rm_f.completions(["the"], [aft]); //comp tem todo o tipo de palavras middle
        arr_adj = [];
        for (i = 0; i < comp.length; i++) {
            if (RiTa.isAdjective(comp[i])) {
                arr_adj.push(comp[i]);
            }
        }
        console.log(arr_adj);

        let index_adj = int(random(arr_adj.length));

        adj = arr_adj[index_adj];


        console.log('adjetivo ' + arr_adj[index_adj])


        if (adj == null) {
            alert("Ups, something went wrong... Please generate again!")
        }

        return adj;


    }
    adjChines();

    let txt_horoscopes = carregaCont(horoscopes);
    let rm = criaMod(txt_horoscopes, 3);

    opts = {
        ignoreCase: false,
        ignoreStopWords: true
    };

    RiTa.concordance(txt_horoscopes, opts);
    let ret = new Array();
    ret = RiTa.kwic(adj, 3);

    for (let i = 0; i < ret.length; i++) {
        paragrafo = paragrafo + ret[i];
    }

    var frases = split(paragrafo, '.');
    let cump = frases.length;
    console.log("nº frases:", cump);
    let a = int(random(0, cump));

    var randomLema;
    randomParagraph = frases[a];
    console.log("paragrafo:", randomParagraph);
    paragraph.html(randomParagraph);

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