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


async function loadinitPkmks() {
    for (let indexinitPkms = 0; indexinitPkms < 20; indexinitPkms++) {
        let PKM_URL = initPkmsUrls.results[indexinitPkms].url;
        let pkmDataApi = await fetch(PKM_URL);
        let initPkmsEntrie = await pkmDataApi.json();
        initPkms.push(initPkmsEntrie);
        //console.log(initPkms);
        document.getElementById("pokedex").innerHTML += getPkmCardTemplate(indexinitPkms);
        loadPkmsTypes(indexinitPkms);
    }
}


function PkmIdThreeDigits(PkmId) {
    let PkmIdString = PkmId.toString();
    let PkmIdFixed = PkmIdString.padStart(3, '0');
    return `${PkmIdFixed}`;
}


async function loadPkmsTypes(indexinitPkms) {
    for (let indexPkmType = 0; indexPkmType < initPkms[indexinitPkms].types.length; indexPkmType++) {
        document.getElementById("pkm_card_types_" + initPkms[indexinitPkms].id).innerHTML += getPkmTypesNameTemplate(indexinitPkms, indexPkmType);
    }

    let firstType = initPkms[indexinitPkms].types[0].type.name;
    document.getElementById("pkm_" + initPkms[indexinitPkms].id).style.backgroundImage = "url('./assets/icons/" + firstType + ".svg')";
}


function renderCurrentPkmCard(indexinitPkms) {
    let contentRef = document.getElementById("currentPkmCard");
    contentRef.innerHTML = "";
    contentRef.innerHTML += getCurrentPkmCardTemplate(indexinitPkms);
    toggleOverlayPkmCard();
    loadContentCurrentPkmCard(indexinitPkms);
}


function toggleOverlayPkmCard() {
    document.getElementById("overlay").classList.toggle("d_none");
    document.getElementById("currentPkmCard").classList.toggle("d_none");
}


function loadContentCurrentPkmCard(indexinitPkms) {
    changeBgCurrentPkmCard(indexinitPkms);
    PkmId = indexinitPkms + 1;
    document.getElementById("currentPkmId").innerHTML = "#" + PkmIdThreeDigits(PkmId);
    document.getElementById("currentPkmName").innerHTML = initPkms[indexinitPkms].name.charAt(0).toUpperCase() + initPkms[indexinitPkms].name.slice(1);
    document.getElementById("currentPkmImg").src = initPkms[indexinitPkms].sprites.other.dream_world.front_default;
    loadCurrentPkmInfoCategory("", indexinitPkms);
}


function changeBgCurrentPkmCard(indexinitPkms) {
    let firstType = initPkms[indexinitPkms].types[0].type.name;
    let cssClassFirstType = document.querySelector("." + firstType);
    let currentBgColor = getComputedStyle(cssClassFirstType).borderColor;
    document.getElementById("currentPkmCard").style.backgroundColor = currentBgColor;
}


function loadCurrentPkmInfoCategory(clickedBtn, indexinitPkms) {
    //console.log(initPkms[indexinitPkms]);
    let contentRef = document.getElementById("currentPkmInfo");
    contentRef.innerHTML = "";
    let currentCategory = clickedBtn;
    switch (currentCategory) {
        default:
        case 'About':
            contentRef.innerHTML += getSectionAboutTemplate(indexinitPkms);
            loadCurrentTypes(indexinitPkms);
            loadCurrentAbilities(indexinitPkms);
            break;
        case 'Stats':
            contentRef.innerHTML += getSectionStatsTemplate(indexinitPkms);
            break;
        case 'Evolution':
            console.log(currentCategory);
            break;
        case 'Pokédex':
            console.log(currentCategory);
            break;
    }
}


function loadCurrentTypes(indexinitPkms) {
    for (let indexPkmType = 0; indexPkmType < initPkms[indexinitPkms].types.length; indexPkmType++) {
        document.getElementById("typesIcons").innerHTML += getPkmTypesImg(indexinitPkms, indexPkmType);
    }
}


function loadCurrentAbilities(indexinitPkms) {
    let contentRef = document.getElementById("currentAbilities");
    for (let indexPkmAbility = 0; indexPkmAbility < initPkms[indexinitPkms].abilities.length; indexPkmAbility++) {
        contentRef.innerHTML += initPkms[indexinitPkms].abilities[indexPkmAbility].ability.name + ", ";
    }
    contentRef.innerHTML = contentRef.innerHTML.slice(0, -2);
}


function lastPkmCard(indexinitPkms) {
    if (indexinitPkms > 0) {
        indexinitPkms--;
        let contentRef = document.getElementById("currentPkmCard");
        contentRef.innerHTML = "";
        contentRef.innerHTML += getCurrentPkmCardTemplate(indexinitPkms);
        loadContentCurrentPkmCard(indexinitPkms);
    }
}


function nextPkmCard(indexinitPkms) {
    if (indexinitPkms +1 < initPkms.length) {
        indexinitPkms++;
        let contentRef = document.getElementById("currentPkmCard");
        contentRef.innerHTML = "";
        contentRef.innerHTML += getCurrentPkmCardTemplate(indexinitPkms);
        loadContentCurrentPkmCard(indexinitPkms);
    }
}