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
  horoscopes = loadStrings("data/horoscopes.txt");
  fairyTales = loadStrings("data/fairy_tales.txt");
  conceptnet = loadTable("data/conceptnet5v45.csv", "csv", "header");
}

function setup() {
  lema = select("#lema-sign");
  dos = select("#dos");
  donts = select("#donts");
  paragraph = select("#paragraph-chinese");

  map1();
  map2(moon);
  map3();
}

////////////////////////////////////////////////////MAPEAMENTO 1
///////////////////////////////////////signo >> início de frase >> text markov e horoscope.txt >> lema
function map1() {
  console.log("MAPEAMENTO1");

  let txt_horoscopes = carregaCont(horoscopes);
  var rm_2 = criaMod(txt_horoscopes, 4);
  var phrase_inicio;

  function phr_partnerSign() {
    phrasesArray = [
      "you will feel",
      "feel more and",
      "today is always",
      "do not forget",
      "fell this you",
      "think about this",
      "sometimes there is",
      "your luck is",
      "walk together but",
      "no one is",
      "run away and",
      "your dreams will",
    ];

    var index = Math.floor(Math.random() * phrasesArray.length);

    return (phrase_inicio = phrasesArray[index]);
  }

  phr_partnerSign();

  console.log("frase inicio:", phrase_inicio);
  // var lemaF = "";

  //et comp = new Array();
  //comp = rm_2.completions(splitTokens(phrase_inicio));
  phraseArray = phrase_inicio.split(" ");

  var rm_g = criaMod(txt_horoscopes, 4);
  generatedPhrase1 = rm_g.generate(1, {
    seed:phrase_inicio,
    temperature: 0.5,
    maxLength: 12,
  });

  lema.html( generatedPhrase1);
}

////////////////////////////////////////////////////MAPEAMENTO 2
///////////////////////////////////////lua >> middleWord e horoscopes.txt >> verbos e nomes

function map2(m) {
  let word;
  let arr_sy = [];
  let arr_ant = [];

  if (m == "new-moon") {
    word = "new";
  } else if (m == "waxing-crescent") {
    word = "start";
  } else if (m == "first-quarter") {
    word = "first";
  } else if (m == "waxing-gibbous") {
    word = "almost";
  } else if (m == "full-moon") {
    word = "full";
  } else if (m == "waning-gibbous") { //nao da
    word = "fall";
  } else if (m == "third-quarter") {
    word = "half";
  } else if (m == "waning-crescent") {
    word = "finish";
  }

  //entradas cuja primeira palavra é first
  let arr_find = conceptnet.findRows(word, "first");

  for (i = 0; i < arr_find.length; i++) {
    //Array c todos sinonimos
    if (arr_find[i].arr[1] == "synonym" || arr_find[i].arr[1] == "similarto") {
      arr_sy.push(arr_find[i].arr[2]);
    }
    //Array c todos antonimos
    if (arr_find[i].arr[1] == "antonym" || arr_find[i].arr[1] == "notdesires") {
      arr_ant.push(arr_find[i].arr[2]);
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
    if (arr_dos_aux.indexOf(ind) === -1) {
      arr_dos_aux.push(ind);
    }
  }

  while (arr_donts_aux.length < 3) {
    const ind = Math.floor(Math.random() * arr_ant.length) + 1;
    if (arr_donts_aux.indexOf(ind) === -1) {
      arr_donts_aux.push(ind);
    }
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

  console.log("do: " + arr_dos);
  console.log("dont:" + arr_donts);
  let title_do = createElement("h3", "Do");
  let title_dont = createElement("h3", "Don't");
  dos.child(title_do);
  donts.child(title_dont);
  for (i = 0; i < arr_dos.length; i++) {
    let li = createElement("li", arr_dos[i]);
    dos.child(li);
  }
  for (i = 0; i < arr_donts.length; i++) {
    let li = createElement("li", arr_donts[i]);
    donts.child(li);
  }
}

////////////////////////////////////////////////////MAPEAMENTO 3 -
///////////////////////////////////////animal chines >> middleWord e fairytales.txt >> adj >>
/////////////////////////////////////// >> givenkeyWords e horoscopes.txt >> x frases
function map3() {
  console.log("MAPEAMENTO3");
  function adjChines() {
    console.log("MAPEAMENTO2");
    let txt_fairytales = carregaCont(fairyTales);
    var rm_f = criaMod(txt_fairytales, 3);

    let aft;

    //Rooster has no interesting results so we have to change it to chicken
    if (chineseSign == "rooster") {
      aft = "chicken";
    } else {
      aft = chineseSign;
    }

    let wordsArray = rm_f.completions(["the"], [aft]); //words that fit between "the" and the animal
    arr_adj = [];
    //select only the adjetives
    for (i = 0; i < wordsArray.length; i++) {
      if (RiTa.isAdjective(wordsArray[i])) {
        arr_adj.push(wordsArray[i]);
      }
    }
  }
  function randomAdj(adjArray) {
    console.log(adjArray);
    let index_adj = int(random(adjArray.length));

    adj = adjArray[index_adj];

    console.log("adjetivo " + adjArray[index_adj]);
    if (adj == null) {
      alert("Ups, something went wrong... Please generate again!");
    }

    return adj;
  }

  adjChines();

  let txt_horoscopes = carregaCont(horoscopes);

  opts = {
    ignoreCase: false,
    ignoreStopWords: true,
  };

  try {
    let rm = criaMod(txt_horoscopes, 3);

    adj = randomAdj(arr_adj);
    seedPhrase = "teste Being " + adj;
    frase = "teste being small";
    seedArray = ["Being"];
    seedArray.push(adj);

    /* generatedPhrase2 = rm.generate(1, {
      seed: "teste being small",
      temperature: 0.5,
      maxLength: 12,
    }); */
    generatedPhrase2 = rm.generate(1,{seed:adj, maxLength:7, temperature:0.3});
    console.log(generatedPhrase2);
  } catch (error) {
    console.log(error);
  } finally {
    paragraph.html( generatedPhrase2);
  }
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

function draw() {}
