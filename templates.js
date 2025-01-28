function getPkmCardTemplate(indexinitPkms) {
    return `<div class="pkm_card">
            <div onclick="renderCurrentPkmCard(${indexinitPkms})" id="pkm_${initPkms[indexinitPkms].id}" class="pkm_card_content">
                <img src="${initPkms[indexinitPkms].sprites.other.dream_world.front_default}" class="pkm_card_img position_top">
                <span class="pkm_card_id position_top">#${PkmIdThreeDigits(initPkms[indexinitPkms].id)}</span>
                <span class="pkm_card_name position_top">${initPkms[indexinitPkms].name.charAt(0).toUpperCase() + initPkms[indexinitPkms].name.slice(1)}</span>
                <div id="pkm_card_types_${initPkms[indexinitPkms].id}"class="pkm_card_types position_top"></div>
            </div>
        </div>
    `
}


function getPkmTypesNameTemplate(indexinitPkms, indexPkmType) {
    return `<div class="${initPkms[indexinitPkms].types[indexPkmType].type.name}">${initPkms[indexinitPkms].types[indexPkmType].type.name}</div>`
}


function getCurrentPkmCardTemplate(indexinitPkms) {
    return `<div id="currentPkmCardOverview">
                <div id="currentPkmTitle">
                    <span id="currentPkmId" class="display_flex_centered">#000</span>
                    <h2 id="currentPkmName"></h2>
                    <button onclick="toggleOverlayPkmCard()" id="closeCurrentPkm" class="display_flex_centered"><img src="./assets/icons/close_btn.svg"></button>
                </div>
                <div id="currentPkmFrame">
                    <img class="arrow" onclick="lastPkmCard(${indexinitPkms})" src="./assets/arrow_left.png">
                    <img id="currentPkmImg" src="">
                    <img class="arrow" onclick="nextPkmCard(${indexinitPkms})" src="./assets/arrow_right.png">
                </div>
            </div>
            <div id="currentPkmCardContent">
                <div id="" class="current_pkm_navbar">
                    <button onclick="loadCurrentPkmInfoCategory('About', ${indexinitPkms})">About</button>
                    <button onclick="loadCurrentPkmInfoCategory('Stats', ${indexinitPkms})">Stats</button>
                    <button onclick="loadCurrentPkmInfoCategory('Evolution', ${indexinitPkms})">Evolution</button>
                    <button onclick="loadCurrentPkmInfoCategory('Sound', ${indexinitPkms})">Sound</button>
                </div>
                <div id="currentPkmInfo"></div>
            </div>`
}


function getSectionAboutTemplate(indexinitPkms) {
    return `<section class="section_about">
                <div class="info_category">
                    <div>Base Experience</div>
                    <div>${initPkms[indexinitPkms].base_experience}</div>
                </div>
                <div class="info_category">
                    <div>Height</div>
                    <div>${initPkms[indexinitPkms].height}</div>
                </div>
                <div class="info_category">
                    <div>Weight</div>
                    <div>${initPkms[indexinitPkms].weight}</div>
                </div>
                <div class="info_category">
                    <div>Abilities</div>
                    <div id="currentAbilities"></div>
                </div>
                <div class="info_category">
                    <div>Types</div>
                    <div id="typesIcons"></div>
                </div>
            </section>`
}


function getPkmTypesImg(indexinitPkms, indexPkmType) {
    return `<img class="${initPkms[indexinitPkms].types[indexPkmType].type.name}" src="./assets/icons/${initPkms[indexinitPkms].types[indexPkmType].type.name}.svg">`
}


function getSectionStatsTemplate(indexinitPkms) {
    return `<section class="section_stats">
                <div class="info_category">
                    <div>HP</div>
                    <div class="stat_value display_flex_centered">
                        ${initPkms[indexinitPkms].stats[0].base_stat} <div class="progress_bar">
                            <div style="width: ${initPkms[indexinitPkms].stats[0].base_stat}px" class="${initPkms[indexinitPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Attack</div>
                    <div class="stat_value display_flex_centered">
                        ${initPkms[indexinitPkms].stats[1].base_stat} <div class="progress_bar">
                            <div style="width: ${initPkms[indexinitPkms].stats[1].base_stat}px" class="${initPkms[indexinitPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Defense</div>
                    <div class="stat_value display_flex_centered">
                        ${initPkms[indexinitPkms].stats[2].base_stat} <div class="progress_bar">
                            <div style="width: ${initPkms[indexinitPkms].stats[2].base_stat}px" class="${initPkms[indexinitPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Sp. Atk</div>
                    <div class="stat_value display_flex_centered">
                        ${initPkms[indexinitPkms].stats[3].base_stat} <div class="progress_bar">
                            <div style="width: ${initPkms[indexinitPkms].stats[3].base_stat}px" class="${initPkms[indexinitPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Sp. Def</div>
                    <div class="stat_value display_flex_centered">
                        ${initPkms[indexinitPkms].stats[4].base_stat} <div class="progress_bar">
                            <div style="width: ${initPkms[indexinitPkms].stats[4].base_stat}px" class="${initPkms[indexinitPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Speed</div>
                    <div class="stat_value display_flex_centered">
                        ${initPkms[indexinitPkms].stats[5].base_stat} <div class="progress_bar">
                            <div style="width: ${initPkms[indexinitPkms].stats[5].base_stat}px" class="${initPkms[indexinitPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
            </section>`
}


function getEvolutionTemplate() {
    return `<section id="evoChainImgs" class="section_evoluion display_flex_centered">
            </section>`
}


function getEvoChainPkmImgsTemplate(evoChainIndexArray, indexEvoChain) {
    return `<img src="${initPkms[evoChainIndexArray[indexEvoChain]].sprites.other.dream_world.front_default}" class="evolution_img">
            <img id="evolutionArrow${indexEvoChain}" src='./assets/evo_chain_arrow.svg' class='evolution_arrow'>`
}


function getSectionSoundTemplate(indexinitPkms) {
    return `<section class="section_sound display_flex_centered">
                <img id="currentPkmImgSound" src="${initPkms[indexinitPkms].sprites.other.home.front_default}" onclick="playPkmSound(${indexinitPkms})">
                <span>Click Pokémon to play its sound!</span>
            </section>`
}