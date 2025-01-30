function getPkmCardTemplate(indexPkms) {
    return `<div class="pkm_card">
            <div onclick="renderCurrentPkmCard(${indexPkms})" id="pkm_${pkms[indexPkms].id}" class="pkm_card_content">
                <img id="pkmImg${pkms[indexPkms].id}" src="${pkms[indexPkms].sprites.other.dream_world.front_default}" class="pkm_card_img position_top">
                <span class="pkm_card_id position_top">#${pkmIdThreeDigits(pkms[indexPkms].id)}</span>
                <span class="pkm_card_name position_top">${pkms[indexPkms].name.charAt(0).toUpperCase() + pkms[indexPkms].name.slice(1)}</span>
                <div id="pkm_card_types_${pkms[indexPkms].id}"class="pkm_card_types position_top"></div>
            </div>
        </div>
    `
}


function getPkmTypesNameTemplate(indexPkms, indexPkmType) {
    return `<div class="${pkms[indexPkms].types[indexPkmType].type.name}">${pkms[indexPkms].types[indexPkmType].type.name}</div>`
}


function getCurrentPkmCardTemplate(indexPkms) {
    return `<div id="currentPkmCardOverview">
                <div id="currentPkmTitle">
                    <span id="currentPkmId" class="display_flex_centered">#000</span>
                    <h2 id="currentPkmName"></h2>
                    <button onclick="toggleOverlayPkmCard()" id="closeCurrentPkm" class="display_flex_centered"><img src="./assets/icons_other/close_btn.svg"></button>
                </div>
                <div id="currentPkmFrame">
                    <img id="lastArrow" class="arrow" onclick="lastPkmCard(${indexPkms})" src="./assets/icons_other/arrow_left.png">
                    <img id="currentPkmImg" src="">
                    <img id="nextArrow" class="arrow" onclick="nextPkmCard(${indexPkms})" src="./assets/icons_other/arrow_right.png">
                </div>
            </div>
            <div id="currentPkmCardContent">
                <div id="" class="current_pkm_navbar">
                    <button onclick="loadCurrentPkmInfoCategory('About', ${indexPkms})">About</button>
                    <button onclick="loadCurrentPkmInfoCategory('Stats', ${indexPkms})">Stats</button>
                    <button onclick="loadCurrentPkmInfoCategory('Evolution', ${indexPkms})">Evolution</button>
                    <button onclick="loadCurrentPkmInfoCategory('Sound', ${indexPkms})">Sound</button>
                </div>
                <div id="currentPkmInfo"></div>
            </div>`
}


function getSectionAboutTemplate(indexPkms) {
    return `<section class="section_about">
                <div class="info_category">
                    <div>Base Experience</div>
                    <div>${pkms[indexPkms].base_experience}</div>
                </div>
                <div class="info_category">
                    <div>Height</div>
                    <div>${pkms[indexPkms].height}</div>
                </div>
                <div class="info_category">
                    <div>Weight</div>
                    <div>${pkms[indexPkms].weight}</div>
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


function getPkmTypesImg(indexPkms, indexPkmType) {
    return `<img class="${pkms[indexPkms].types[indexPkmType].type.name}" src="./assets/icons_pkm_types/${pkms[indexPkms].types[indexPkmType].type.name}.svg">`
}


function getSectionStatsTemplate(indexPkms) {
    return `<section class="section_stats">
                <div class="info_category">
                    <div>HP</div>
                    <div class="stat_value display_flex_centered">
                        ${pkms[indexPkms].stats[0].base_stat} <div class="progress_bar">
                            <div style="width: ${pkms[indexPkms].stats[0].base_stat}px" class="${pkms[indexPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Attack</div>
                    <div class="stat_value display_flex_centered">
                        ${pkms[indexPkms].stats[1].base_stat} <div class="progress_bar">
                            <div style="width: ${pkms[indexPkms].stats[1].base_stat}px" class="${pkms[indexPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Defense</div>
                    <div class="stat_value display_flex_centered">
                        ${pkms[indexPkms].stats[2].base_stat} <div class="progress_bar">
                            <div style="width: ${pkms[indexPkms].stats[2].base_stat}px" class="${pkms[indexPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Sp. Atk</div>
                    <div class="stat_value display_flex_centered">
                        ${pkms[indexPkms].stats[3].base_stat} <div class="progress_bar">
                            <div style="width: ${pkms[indexPkms].stats[3].base_stat}px" class="${pkms[indexPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Sp. Def</div>
                    <div class="stat_value display_flex_centered">
                        ${pkms[indexPkms].stats[4].base_stat} <div class="progress_bar">
                            <div style="width: ${pkms[indexPkms].stats[4].base_stat}px" class="${pkms[indexPkms].types[0].type.name}"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Speed</div>
                    <div class="stat_value display_flex_centered">
                        ${pkms[indexPkms].stats[5].base_stat} <div class="progress_bar">
                            <div style="width: ${pkms[indexPkms].stats[5].base_stat}px" class="${pkms[indexPkms].types[0].type.name}"></div>
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
    return `<img id="evolutionPkm${indexEvoChain}" src="${pkms[evoChainIndexArray[indexEvoChain]].sprites.other.dream_world.front_default}" class="evolution_img">
            <img id="evolutionArrow${indexEvoChain}" src='./assets/icons_other/evo_chain_arrow.svg' class='evolution_arrow'>`
}


function getSectionSoundTemplate(indexPkms) {
    return `<section class="section_sound display_flex_centered">
                <img id="currentPkmImgSound" src="${pkms[indexPkms].sprites.other.home.front_default}" onclick="playPkmSound(${indexPkms})">
                <span>Click the Pokémon to play its sound!</span>
            </section>`
}