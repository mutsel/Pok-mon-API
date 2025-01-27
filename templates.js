function getPkmCardTemplate() {
    return `<div class="pkm_card">
            <div onclick="toggleOverlayPkmCard(${initPkms.id})" id="pkm_${initPkms.id}" class="pkm_card_content">
                <img src="${initPkms.sprites.other.dream_world.front_default}" class="pkm_card_img position_top">
                <span class="pkm_card_id position_top">#${PkmIdThreeDigits()}</span>
                <span class="pkm_card_name position_top">${initPkms.name.charAt(0).toUpperCase() + initPkms.name.slice(1)}</span>
                <div id="pkm_card_types_${initPkms.id}"class="pkm_card_types position_top"></div>
            </div>
        </div>
    `
}


function getPkmTypesTemplate(indexPkmType) {
    return `<div class="${initPkms.types[indexPkmType].type.name}">${initPkms.types[indexPkmType].type.name}</div>`
}


function getSectionAboutTemplate() {
    return `<section class="section_about">
                <div class="info_category">
                    <div>Base Experience</div>
                    <div>XXX</div>
                </div>
                <div class="info_category">
                    <div>Height</div>
                    <div>XXX</div>
                </div>
                <div class="info_category">
                    <div>Weight</div>
                    <div>XXX</div>
                </div>
                <div class="info_category">
                    <div>Abilities</div>
                    <div>XXX</div>
                </div>
                <div class="info_category">
                    <div>Types</div>
                    <div class="types_icons">
                        <img class="XXX" src="./assets/icons/XXX.svg">
                        <img class="XXX" src="./assets/icons/XXX.svg">
                    </div>
                </div>
            </section>`
}


function getSectionStatsTemplate() {
    return `<section class="section_stats">
                <div class="info_category">
                    <div>HP</div>
                    <div class="stat_value display_flex_centered">
                        45 <div class="progress_bar">
                            <div class="grass"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Attack</div>
                    <div class="stat_value display_flex_centered">
                        45 <div class="progress_bar">
                            <div class="grass"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Defense</div>
                    <div class="stat_value display_flex_centered">
                        45 <div class="progress_bar">
                            <div class="grass"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Sp. Atk</div>
                    <div class="stat_value display_flex_centered">
                        45 <div class="progress_bar">
                            <div class="grass"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Sp. Def</div>
                    <div class="stat_value display_flex_centered">
                        45 <div class="progress_bar">
                            <div class="grass"></div>
                            </div>
                    </div>
                </div>
                <div class="info_category">
                    <div>Speed</div>
                    <div class="stat_value display_flex_centered">
                        45 <div class="progress_bar">
                            <div class="grass"></div>
                            </div>
                    </div>
                </div>
            </section>`
}