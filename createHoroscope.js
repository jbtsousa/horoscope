var horoscopes;
var paragrafo; //é o data do processing

queryString = location.search.substring(1);

    var getLink = queryString.split("|");

    var chineseSign = getLink[0];
    var moon = getLink[1];
    var partnerSign = getLink[2];

    console.log(chineseSign,moon,partnerSign);


function preload(){

    horoscopes=loadStrings('data/horoscopes.txt');
    
}

function setup() {

   ///////////////////GivenKeyword a receber "fast"
    
   let texto = carregaCont(horoscopes);
   var rm = criaMod(texto,3);

   RiTa.concordance(texto);
   let ret = new Array();
   ret = RiTa.kwic("fast",3);
   
   for(let i=0; i<ret.length;i++){
       paragrafo=paragrafo+ret[i];
   }

   var frases = split(paragrafo,'.');
   let cump = frases.length;
   console.log(cump);
   let a = int(random(0,cump));

   var randomFrase;
   randomFrase = frases[a];
   console.log(randomFrase);

}

function carregaCont(f){
    return f.join("\n", loadStrings(f)).toLowerCase();
}

function criaMod(text, n){
    let rm = RiTa.markov(n);
    rm.addText(text);
    return rm;
}

function draw() {
}