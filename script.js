const BASE_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=20";
const TOTAL_PKM_URL = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=1304";
let offset = 0;
let pkmsUrls = [];
let pkms = [];


async function init() {
    offset = 0;
    document.getElementById("loadMorePkm").classList.remove("d_none");
    document.getElementById('searchInput').value = "";
    clearPokedexAndArrays();
    openLoadingScreen();
    await fetchInitPkmsUrls();
    await closeLoadingScreen();
}


function clearPokedexAndArrays() {
    let contentRef = document.getElementById("pokedex");
    contentRef.innerHTML = "";
    pkmsUrls = [];
    pkms = [];
}


function openLoadingScreen() {
    const overlayContentRef = document.getElementById("overlayLoadingScreen");
    overlayContentRef.classList.remove("d_none");
    document.getElementById("body").classList.add("attach_bg");
}


async function closeLoadingScreen() {
    const overlayContentRef = document.getElementById("overlayLoadingScreen")
    overlayContentRef.classList.add("d_none");
    document.getElementById("body").classList.remove("attach_bg");
}


async function fetchInitPkmsUrls() {
    let pokeApi = await fetch(BASE_URL);
    let pokeApiData = await pokeApi.json();
    pkmsUrls = pokeApiData.results;
    await loadInitPkms();
}


async function loadInitPkms() {
    for (let indexPkms = 0; indexPkms < pkmsUrls.length; indexPkms++) {
        let PKM_URL = pkmsUrls[indexPkms].url;
        let pkmDataApi = await fetch(PKM_URL);
        let pkmsEntrie = await pkmDataApi.json();
        pkms.push(pkmsEntrie);
        document.getElementById("pokedex").innerHTML += getPkmCardTemplate(indexPkms);
        if (pkms[indexPkms].sprites.other.dream_world.front_default == null) {
            const contentRef = document.getElementById("pkmImg" + pkms[indexPkms].id);
            alternativeImg(contentRef, indexPkms);
        }
        await loadPkmsTypes(indexPkms);
    }
}


function pkmIdThreeDigits(PkmId) {
    let PkmIdString = PkmId.toString();
    let PkmIdFixed = PkmIdString.padStart(3, '0');
    return `${PkmIdFixed}`;
}


async function loadPkmsTypes(indexPkms) {
    for (let indexPkmType = 0; indexPkmType < pkms[indexPkms].types.length; indexPkmType++) {
        document.getElementById("pkm_card_types_" + pkms[indexPkms].id).innerHTML += getPkmTypesNameTemplate(indexPkms, indexPkmType);
    }
    let firstType = pkms[indexPkms].types[0].type.name;
    document.getElementById("pkm_" + pkms[indexPkms].id).style.backgroundImage = "url('./assets/icons_pkm_types/" + firstType + ".svg')";
}


function alternativeImg(contentRef, indexPkms) {
    contentRef.src = pkms[indexPkms].sprites.other.home.front_default;
    if (pkms[indexPkms].sprites.other.home.front_default == null) {
        contentRef.src = "./assets/icons_other/img_missing.svg";
    }
}


function renderCurrentPkmCard(indexPkms) {
    const contentRef = document.getElementById("currentPkmCard");
    contentRef.innerHTML = "";
    contentRef.innerHTML += getCurrentPkmCardTemplate(indexPkms);
    toggleOverlayPkmCard();
    checkBtnsLastNextPkmCard(indexPkms);
    loadContentCurrentPkmCard(indexPkms);
}


function toggleOverlayPkmCard() {
    document.getElementById("overlayPkmCard").classList.toggle("d_none");
    document.getElementById("currentPkmCard").classList.toggle("d_none");
    document.getElementById("main").classList.toggle("attach_bg");
}


function checkBtnsLastNextPkmCard(indexPkms) {
    let numberCurrentlyShownPkm = pkmsUrls.length - 1;
    const btnLastContentRef = document.getElementById("lastArrow");
    const btnNextContentRef = document.getElementById("nextArrow");
    btnLastContentRef.classList.remove("visibility_hidden");
    btnNextContentRef.classList.remove("visibility_hidden");
    if (indexPkms == 0) {
        disableBtnLastPkmCard();
    } else if (indexPkms == numberCurrentlyShownPkm) {
        disableBtnNextPkmCard();
    }
}


function disableBtnLastPkmCard() {
    const btnLastContentRef = document.getElementById("lastArrow");
    btnLastContentRef.classList.add("visibility_hidden");
}


function disableBtnNextPkmCard() {
    const btnNextContentRef = document.getElementById("nextArrow");
    btnNextContentRef.classList.add("visibility_hidden");
}


function loadContentCurrentPkmCard(indexPkms) {
    changeBgCurrentPkmCard(indexPkms);
    PkmId = indexPkms + 1;
    document.getElementById("currentPkmId").innerHTML = "#" + pkmIdThreeDigits(PkmId);
    document.getElementById("currentPkmName").innerHTML = pkms[indexPkms].name.charAt(0).toUpperCase() + pkms[indexPkms].name.slice(1);
    document.getElementById("currentPkmImg").src = pkms[indexPkms].sprites.other.dream_world.front_default;
    if (pkms[indexPkms].sprites.other.dream_world.front_default == null) {
        const contentRef = document.getElementById("currentPkmImg");
        alternativeImg(contentRef, indexPkms);
    }
    loadCurrentPkmInfoCategory("", indexPkms);
}


function changeBgCurrentPkmCard(indexPkms) {
    let firstType = pkms[indexPkms].types[0].type.name;
    let cssClassFirstType = document.querySelector("." + firstType);
    let currentBgColor = getComputedStyle(cssClassFirstType).borderColor;
    document.getElementById("currentPkmCard").style.backgroundColor = currentBgColor;
}


async function loadCurrentPkmInfoCategory(clickedBtn, indePkms) {
    const contentRef = document.getElementById("currentPkmInfo");
    contentRef.innerHTML = "";
    let currentCategory = clickedBtn;
    switch (currentCategory) {
        default:
        case 'About':
            contentRef.innerHTML += getSectionAboutTemplate(indePkms);
            loadCurrentTypes(indePkms);
            loadCurrentAbilities(indePkms);
            break;
        case 'Stats':
            contentRef.innerHTML += getSectionStatsTemplate(indePkms);
            break;
        case 'Evolution':
            let evoChainIndexArray = await loadCurrentEvoChain(indePkms);
            contentRef.innerHTML += getEvolutionTemplate();
            await loadCurrentEvoChainPkmImgs(evoChainIndexArray);
            removeLastArrow();
            break;
        case 'Sound':
            contentRef.innerHTML += getSectionSoundTemplate(indePkms);
            break;
    }
}


function loadCurrentTypes(indexPkms) {
    for (let indexPkmType = 0; indexPkmType < pkms[indexPkms].types.length; indexPkmType++) {
        document.getElementById("typesIcons").innerHTML += getPkmTypesImg(indexPkms, indexPkmType);
    }
}


function loadCurrentAbilities(indexPkms) {
    const contentRef = document.getElementById("currentAbilities");
    for (let indexPkmAbility = 0; indexPkmAbility < pkms[indexPkms].abilities.length; indexPkmAbility++) {
        contentRef.innerHTML += pkms[indexPkms].abilities[indexPkmAbility].ability.name + ", ";
    }
    contentRef.innerHTML = contentRef.innerHTML.slice(0, -2);
}


async function loadCurrentEvoChain(indexPkms) {
    let PkmId = indexPkms + 1;
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
    const evoChainContentRef = document.getElementById("evoChainImgs");
    for (let indexEvoChain = 0; indexEvoChain < evoChainIndexArray.length; indexEvoChain++) {
        if (evoChainIndexArray[indexEvoChain] !== -1) {
            evoChainContentRef.innerHTML += getEvoChainPkmImgsTemplate(evoChainIndexArray, indexEvoChain);
            if (pkms[evoChainIndexArray[indexEvoChain]].sprites.other.dream_world.front_default == null) {
                const contentRef = document.getElementById("evolutionPkm" + indexEvoChain);
                let indexPkms = indexEvoChain;
                alternativeImg(contentRef, indexPkms);
            }
        }
    }
}


async function removeLastArrow() {
    let arrowToRemove = document.getElementById("evoChainImgs").lastChild;
    arrowToRemove.remove();
}


function playPkmSound(indexPkms) {
    let audioPkmSound = new Audio(pkms[indexPkms].cries.latest);
    audioPkmSound.volume = 0.1;
    audioPkmSound.play();
}


function lastPkmCard(indexPkms) {
    if (indexPkms > 0) {
        indexPkms--;
        const contentRef = document.getElementById("currentPkmCard");
        contentRef.innerHTML = "";
        contentRef.innerHTML += getCurrentPkmCardTemplate(indexPkms);
        loadContentCurrentPkmCard(indexPkms);
    }
    checkBtnsLastNextPkmCard(indexPkms);
}


function nextPkmCard(indexPkms) {
    if (indexPkms + 1 < pkms.length) {
        indexPkms++;
        const contentRef = document.getElementById("currentPkmCard");
        contentRef.innerHTML = "";
        contentRef.innerHTML += getCurrentPkmCardTemplate(indexPkms);
        loadContentCurrentPkmCard(indexPkms);
    }
    checkBtnsLastNextPkmCard(indexPkms);
}


async function loadMorePkm() {
    increaseOffset();
    let NEXT_URL = "https://pokeapi.co/api/v2/pokemon/?offset=" + offset + "&limit=20";
    openLoadingScreen();
    await fetchNextPkms(NEXT_URL);
    await closeLoadingScreen();
}


function increaseOffset() {
    offset = offset + 20;
}


async function fetchNextPkms(NEXT_URL) {
    let pokeApi = await fetch(NEXT_URL);
    let pokeApiData = await pokeApi.json();
    let nextPkmsUrls = pokeApiData.results;
    for (let indexPkms = 0; indexPkms < 20; indexPkms++) {
        pkmsUrls.push(nextPkmsUrls[indexPkms]);
    }
    await loadNextPkms();
}


async function loadNextPkms() {
    for (let indexPkms = offset; indexPkms < offset + 20; indexPkms++) {
        let PKM_URL = pkmsUrls[indexPkms].url;
        let pkmDataApi = await fetch(PKM_URL);
        let PkmsEntrie = await pkmDataApi.json();
        pkms.push(PkmsEntrie);
        document.getElementById("pokedex").innerHTML += getPkmCardTemplate(indexPkms);
        await loadPkmsTypes(indexPkms);
    }
}


async function searchPkmName() {
    let searchInput = document.getElementById('searchInput').value.toLowerCase();
    if (searchInput.length >= 3) {
        openLoadingScreen();
        document.getElementById('searchInput').disabled = true;
        clearPokedexAndArrays();
        document.getElementById("loadMorePkm").classList.add("d_none");
        await fetchTotalPkms(searchInput);
        await closeLoadingScreen();
        document.getElementById('searchInput').disabled = false;
        document.getElementById('searchInput').focus();
    }
    if (searchInput.length == 0) {
        cancelSearch();
    }
}


async function fetchTotalPkms(searchInput) {
    let pokeApi = await fetch(TOTAL_PKM_URL);
    let pokeApiData = await pokeApi.json();
    let pokeApiResults = pokeApiData.results;
    let totalPkmNames = [];
    await findFilteredPkmNames(pokeApiResults, totalPkmNames, searchInput);
}


async function findFilteredPkmNames(pokeApiResults, totalPkmNames, searchInput) {
    for (let indexTotalPkms = 0; indexTotalPkms < pokeApiResults.length; indexTotalPkms++) {
        totalPkmNames.push(pokeApiResults[indexTotalPkms].name)
    }
    let searchResults = totalPkmNames.filter(name => name.includes(searchInput));
    for (let indexFilteredPkms = 0; indexFilteredPkms < searchResults.length; indexFilteredPkms++) {
        let indexSearchResultPkm = totalPkmNames.indexOf(searchResults[indexFilteredPkms]);
        pkmsUrls.push(pokeApiResults[indexSearchResultPkm]);
    }
    await loadInitPkms();
}


async function cancelSearch() {
    if (offset == 0) {
        init();
    } else {
        openLoadingScreen();
        clearPokedexAndArrays();
        increaseOffset();
        let NEXT_URL = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=" + offset;
        document.getElementById("loadMorePkm").classList.remove("d_none");
        document.getElementById('searchInput').value = "";
        await fetchPreviousPkms(NEXT_URL);
        await closeLoadingScreen();
        offset = offset -20;
    }
}


async function fetchPreviousPkms(NEXT_URL) {
    let pokeApi = await fetch(NEXT_URL);
    let pokeApiData = await pokeApi.json();
    let nextPkmsUrls = pokeApiData.results;
    for (let indexPkms = 0; indexPkms < offset; indexPkms++) {
        pkmsUrls.push(nextPkmsUrls[indexPkms]);
    }
    await loadPreviousPkms();
}


async function loadPreviousPkms() {
    for (let indexPkms = 0; indexPkms < offset; indexPkms++) {
        let PKM_URL = pkmsUrls[indexPkms].url;
        let pkmDataApi = await fetch(PKM_URL);
        let PkmsEntrie = await pkmDataApi.json();
        pkms.push(PkmsEntrie);
        document.getElementById("pokedex").innerHTML += getPkmCardTemplate(indexPkms);
        await loadPkmsTypes(indexPkms);
    }
}