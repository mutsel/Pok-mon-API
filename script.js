const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

let initPkmsUrls = [];
let initPkms = [];


function init() {
    loadinitPkmsUrls();
}


async function loadinitPkmsUrls() {
    for (let indexinitPkms = 1; indexinitPkms < 5; indexinitPkms++) {   
        let pokeApi = await fetch(BASE_URL);
        initPkmsUrls = await pokeApi.json();
    }
    loadinitPkmks();
}


async function loadinitPkmks(){
    for (let indexinitPkms = 0; indexinitPkms < 20; indexinitPkms++) {
        let PKM_URL = initPkmsUrls.results[indexinitPkms].url;
        let pkmDataApi = await fetch(PKM_URL);
        initPkms = await pkmDataApi.json();
        //console.log(initPkms);
        document.getElementById("pokedex").innerHTML += getPkmCardTemplate();
        loadPkmsTypes(indexinitPkms);
    } 
}


function PkmIdThreeDigits() {
    let IdPkm = initPkms.id.toString();
    let IdPkmFixed = IdPkm.padStart(3, '0');
    return `${IdPkmFixed}`;
}


async function loadPkmsTypes() {
    for (let indexPkmType = 0; indexPkmType < initPkms.types.length; indexPkmType++) {
        document.getElementById("pkm_card_types_"+ initPkms.id).innerHTML += getPkmTypesTemplate(indexPkmType);
    }
    document.getElementById("pkm_" + initPkms.id).style.backgroundImage = "url('./assets/icons/" + initPkms.types[0].type.name + ".svg')";
}


function toggleOverlayPkmCard(pkmId) {
    toggleOverlayPkmCard();
    getCurrentPkmTemplate(pkmId);
}


function toggleOverlayPkmCard() {
    document.getElementById("overlay").classList.toggle("d_none");
    document.getElementById("currentPkmCard").classList.toggle("d_none");
}