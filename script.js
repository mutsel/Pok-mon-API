const BASE_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
const TOTAL_PKM_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1304";
let offset = 0;

let initPkmsUrls = [];
let initPkms = [];


async function init() {
    offset = 0;
    document.getElementById("loadMorePkm").classList.remove("d_none");
    clearPokedex();
    openLoadingScreen();
    await fetchinitPkmsUrls();
    await closeLoadingScreen();
}


function openLoadingScreen() {
    let overlayContentRef = document.getElementById("overlayLoadingScreen");
    overlayContentRef.classList.remove("d_none");
    document.getElementById("body").classList.add("attach_bg");
}


async function closeLoadingScreen() {
    let overlayContentRef = document.getElementById("overlayLoadingScreen")
    overlayContentRef.classList.add("d_none");
    document.getElementById("body").classList.remove("attach_bg");
}


async function fetchinitPkmsUrls() {
    let pokeApi = await fetch(BASE_URL);
    let pokeApiData = await pokeApi.json();
    initPkmsUrls = pokeApiData.results;
    await loadinitPkmks();
}


async function loadinitPkmks() {
    for (let indexinitPkms = 0; indexinitPkms < initPkmsUrls.length; indexinitPkms++) {
        let PKM_URL = initPkmsUrls[indexinitPkms].url;
        let pkmDataApi = await fetch(PKM_URL);
        let initPkmsEntrie = await pkmDataApi.json();
        initPkms.push(initPkmsEntrie);
        document.getElementById("pokedex").innerHTML += getPkmCardTemplate(indexinitPkms);
        if (initPkms[indexinitPkms].sprites.other.dream_world.front_default == null) {
            contentRef = document.getElementById("pkmImg" + initPkms[indexinitPkms].id);
            alternativeImg(contentRef, indexinitPkms);
        }
        await loadPkmsTypes(indexinitPkms);
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


function alternativeImg(contentRef, indexinitPkms) {
    contentRef.src = initPkms[indexinitPkms].sprites.other.home.front_default;
}


function renderCurrentPkmCard(indexinitPkms) {
    let contentRef = document.getElementById("currentPkmCard");
    contentRef.innerHTML = "";
    contentRef.innerHTML += getCurrentPkmCardTemplate(indexinitPkms);
    toggleOverlayPkmCard();
    loadContentCurrentPkmCard(indexinitPkms);
}


function toggleOverlayPkmCard() {
    document.getElementById("overlayPkmCard").classList.toggle("d_none");
    document.getElementById("currentPkmCard").classList.toggle("d_none");
    document.getElementById("body").classList.toggle("attach_bg");
}


function loadContentCurrentPkmCard(indexinitPkms) {
    changeBgCurrentPkmCard(indexinitPkms);
    PkmId = indexinitPkms + 1;
    document.getElementById("currentPkmId").innerHTML = "#" + PkmIdThreeDigits(PkmId);
    document.getElementById("currentPkmName").innerHTML = initPkms[indexinitPkms].name.charAt(0).toUpperCase() + initPkms[indexinitPkms].name.slice(1);
    document.getElementById("currentPkmImg").src = initPkms[indexinitPkms].sprites.other.dream_world.front_default;
    if (initPkms[indexinitPkms].sprites.other.dream_world.front_default == null) {
        contentRef = document.getElementById("currentPkmImg");
        alternativeImg(contentRef, indexinitPkms);
    }
    loadCurrentPkmInfoCategory("", indexinitPkms);
}


function changeBgCurrentPkmCard(indexinitPkms) {
    let firstType = initPkms[indexinitPkms].types[0].type.name;
    let cssClassFirstType = document.querySelector("." + firstType);
    let currentBgColor = getComputedStyle(cssClassFirstType).borderColor;
    document.getElementById("currentPkmCard").style.backgroundColor = currentBgColor;
}


async function loadCurrentPkmInfoCategory(clickedBtn, indexinitPkms) {
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
            let evoChainIndexArray = await loadCurrentEvoChain(indexinitPkms);
            contentRef.innerHTML += getEvolutionTemplate();
            await loadCurrentEvoChainPkmImgs(evoChainIndexArray);
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


async function loadCurrentEvoChain(indexinitPkms) {
    let PkmId = indexinitPkms + 1;
    let PKM_SPECIES_URL = "https://pokeapi.co/api/v2/pokemon-species/" + PkmId;
    let pokeApi = await fetch(PKM_SPECIES_URL);
    let pokeApiData = await pokeApi.json();
    let EVOLUTION_URL = pokeApiData.evolution_chain.url;
    return evoChainIndexArray = await fetchEvoChainPkmUrl(EVOLUTION_URL);
}


async function fetchEvoChainPkmUrl(EVOLUTION_URL) {
    let pokeApi = await fetch(EVOLUTION_URL);
    let pokeApiData = await pokeApi.json();
    let evoChainIndexArray = [
        loadEvoChainStart(pokeApiData),
        loadEvoChainFirstEvo(pokeApiData),
        loadEvoChainSecondEvo(pokeApiData)
    ]
    return evoChainIndexArray;
}


function loadEvoChainStart(pokeApiData) {
    let evoChainStartUrl = pokeApiData.chain.species.url;
    return evoChainStartUrl.slice(42).slice(0, -1) - 1;
}


function loadEvoChainFirstEvo(pokeApiData) {
    let testFirstEvo = pokeApiData.chain.evolves_to.length;
    if (testFirstEvo == 1) {
        let evoChainFirstEvoUrl = pokeApiData.chain.evolves_to[0].species.url;
        return evoChainFirstEvoUrl.slice(42).slice(0, -1) - 1;
    } else {
        return -1
    }
}


function loadEvoChainSecondEvo(pokeApiData) {
   let testFirstEvo = pokeApiData.chain.evolves_to.length;
    if (testFirstEvo == 1) {
        let testSecondEvo = pokeApiData.chain.evolves_to[0].evolves_to.length;
        if (testSecondEvo == 1) {
            let evoChainSecondEvoUrl = pokeApiData.chain.evolves_to[0].evolves_to[0].species.url;
            return evoChainSecondEvoUrl.slice(42).slice(0, -1) - 1;
        } return -1
    } return -1
}


async function loadCurrentEvoChainPkmImgs(evoChainIndexArray) {
    let evoChainContentRef = document.getElementById("evoChainImgs");
    for (let indexEvoChain = 0; indexEvoChain < evoChainIndexArray.length; indexEvoChain++) {
        if (evoChainIndexArray[indexEvoChain] !== -1) {
            evoChainContentRef.innerHTML += getEvoChainPkmImgsTemplate(evoChainIndexArray, indexEvoChain);
            if (initPkms[evoChainIndexArray[indexEvoChain]].sprites.other.dream_world.front_default == null) {
                contentRef = document.getElementById("evolutionPkm" + indexEvoChain);
                let indexinitPkms = indexEvoChain;
                alternativeImg(contentRef, indexinitPkms);
            }
        }
    }
    let arrowToRemove = document.getElementById("evoChainImgs").lastChild;
    arrowToRemove = arrowToRemove.remove();
}


function playPkmSound(indexinitPkms) {
    let audioPkmSound = new Audio(initPkms[indexinitPkms].cries.latest);
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


async function loadMorePkm() {
    offset = offset + 20;
    let NEXT_URL = "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=20";
    openLoadingScreen();
    await fetchNextPkms(NEXT_URL);
    await closeLoadingScreen();
}


async function fetchNextPkms(NEXT_URL) {
    let pokeApi = await fetch(NEXT_URL);
    let pokeApiData = await pokeApi.json();
    let nextPkmsUrls = pokeApiData.results;
    for (let indexinitPkms = 0; indexinitPkms < 20; indexinitPkms++) {
        initPkmsUrls.push(nextPkmsUrls[indexinitPkms]);
    }
    await loadNextPkmks();
}


async function loadNextPkmks() {
    for (let indexinitPkms = offset; indexinitPkms < offset + 20; indexinitPkms++) {
        let PKM_URL = initPkmsUrls[indexinitPkms].url;
        let pkmDataApi = await fetch(PKM_URL);
        let initPkmsEntrie = await pkmDataApi.json();
        initPkms.push(initPkmsEntrie);
        document.getElementById("pokedex").innerHTML += getPkmCardTemplate(indexinitPkms);
        await loadPkmsTypes(indexinitPkms);
    }
}


function clearPokedex() {
    let contentRef = document.getElementById("pokedex");
    contentRef.innerHTML = "";
    initPkmsUrls = [];
    initPkms = [];
}


async function searchPkmName() {
    clearPokedex();
    document.getElementById("loadMorePkm").classList.add("d_none");
    let searchInput = document.getElementById('searchInput').value;
    if (searchInput.length >= 3) {
        openLoadingScreen();
        await fetchTotalPkms(searchInput);
        await closeLoadingScreen();
    }
}


async function fetchTotalPkms(searchInput) {
    let pokeApi = await fetch(TOTAL_PKM_URL);
    let pokeApiData = await pokeApi.json();
    let pokeApiResults = pokeApiData.results;
    let totalPkmNames = [];
    findFilteredPkmNames(pokeApiResults, totalPkmNames, searchInput);
}


function findFilteredPkmNames(pokeApiResults, totalPkmNames, searchInput) {
    for (let indexTotalPkms = 0; indexTotalPkms < pokeApiResults.length; indexTotalPkms++) {
        totalPkmNames.push(pokeApiResults[indexTotalPkms].name)
    }
    let searchResults = totalPkmNames.filter(name => name.includes(searchInput));
    for (let indexFilteredPkms = 0; indexFilteredPkms < searchResults.length; indexFilteredPkms++) {
        let indexSearchResultPkm = totalPkmNames.indexOf(searchResults[indexFilteredPkms]);
        initPkmsUrls.push(pokeApiResults[indexSearchResultPkm]);
    }
    loadinitPkmks();
}