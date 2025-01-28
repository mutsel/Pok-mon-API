const BASE_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
let offset = 0;

let initPkmsUrls = [];
let initPkms = [];


function init() {
    loadinitPkmsUrls();
}


async function loadinitPkmsUrls() {
    let pokeApi = await fetch(BASE_URL);
    let pokeApiData = await pokeApi.json();
    initPkmsUrls = pokeApiData.results;
    loadinitPkmks();
}


async function loadinitPkmks() {
    for (let indexinitPkms = 0; indexinitPkms < 20; indexinitPkms++) {
        let PKM_URL = initPkmsUrls[indexinitPkms].url;
        let pkmDataApi = await fetch(PKM_URL);
        let initPkmsEntrie = await pkmDataApi.json();
        initPkms.push(initPkmsEntrie);
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
            loadCurrentEvoChain(indexinitPkms);
            contentRef.innerHTML += getEvolutionTemplate(indexinitPkms);
            break;
        case 'Sound':
            contentRef.innerHTML += getSectionSoundTemplate(indexinitPkms);
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


function loadCurrentEvoChain(indexinitPkms) {
    let PkmId = indexinitPkms + 1;
    //console.log(initPkms[indexinitPkms]);
    let PKM_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/" + PkmId;
    //console.log(PKM_SPECIES_URL);
    fetchEvoChainUrl(PKM_SPECIES_URL);
}


async function fetchEvoChainUrl(PKM_SPECIES_URL) {
    let pokeApi = await fetch(PKM_SPECIES_URL);
    let pokeApiData = await pokeApi.json();
    //console.log(pokeApiData);
    let EVOLUTION_URL = pokeApiData.evolution_chain.url;
    //console.log(EVOLUTION_URL);
    fetchEvoChainPkmUrl(EVOLUTION_URL);
}


async function fetchEvoChainPkmUrl(EVOLUTION_URL) {
    //console.log(EVOLUTION_URL);
    let pokeApi = await fetch(EVOLUTION_URL);
    //console.log(pokeApi);
    let pokeApiData = await pokeApi.json();
    //console.log(pokeApiData);
    loadEvoChainPkmsIndex(pokeApiData);
}


function loadEvoChainPkmsIndex(pokeApiData) {
    let evoChainStartUrl = pokeApiData.chain.species.url;
    let evoChainStartPkmIndex = evoChainStartUrl.slice(42).slice(0, -1);
    

    let evoChainFirstEvoUrl = pokeApiData.chain.evolves_to[0].species.url;
    let evoChainFirstEvoPkmIndex = evoChainFirstEvoUrl.slice(42).slice(0, -1);
    

    let evoChainSecondEvoUrl = pokeApiData.chain.evolves_to[0].evolves_to[0].species.url;
    let evoChainSeconEvoPkmIndex = evoChainSecondEvoUrl.slice(42).slice(0, -1);
    

    loadEvoChainImgs(evoChainStartPkmIndex, evoChainFirstEvoPkmIndex, evoChainSeconEvoPkmIndex);
}


function loadEvoChainImgs(evoChainStartPkmIndex, evoChainFirstEvoPkmIndex, evoChainSeconEvoPkmIndex) {
    console.log(evoChainStartPkmIndex);
    console.log(evoChainFirstEvoPkmIndex);
    console.log(evoChainSeconEvoPkmIndex);
}


function playPkmSound(indexinitPkms) {
    let audioPkmSound = new Audio (initPkms[indexinitPkms].cries.latest);
    audioPkmSound.volume = 0.1;
    audioPkmSound.play();
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
    if (indexinitPkms + 1 < initPkms.length) {
        indexinitPkms++;
        let contentRef = document.getElementById("currentPkmCard");
        contentRef.innerHTML = "";
        contentRef.innerHTML += getCurrentPkmCardTemplate(indexinitPkms);
        loadContentCurrentPkmCard(indexinitPkms);
    }
}


function loadMorePkm() {
    offset = offset + 20;
    //console.log(offset);
    
    let NEXT_URL = "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=20";
    //console.log(NEXT_URL);
    fetchNextPkms(NEXT_URL);
}


async function fetchNextPkms(NEXT_URL) {
    let pokeApi = await fetch(NEXT_URL);
    let pokeApiData = await pokeApi.json();
    let nextPkmsUrls = pokeApiData.results;
    //console.log(nextPkmsUrls);
    for (let indexinitPkms = 0; indexinitPkms < 20; indexinitPkms++) {
        initPkmsUrls.push(nextPkmsUrls[indexinitPkms]);
    }
    loadNextPkmks();
    //console.log(initPkmsUrls);
}


async function loadNextPkmks() {
    //console.log(initPkmsUrls.length);
    for (let indexinitPkms = offset; indexinitPkms < offset + 20; indexinitPkms++) {
        //console.log(initPkmsUrls.length);
        let PKM_URL = initPkmsUrls[indexinitPkms].url;
        //console.log(PKM_URL);
        let pkmDataApi = await fetch(PKM_URL);
        let initPkmsEntrie = await pkmDataApi.json();
        initPkms.push(initPkmsEntrie);
        document.getElementById("pokedex").innerHTML += getPkmCardTemplate(indexinitPkms);
        loadPkmsTypes(indexinitPkms);
    }
}