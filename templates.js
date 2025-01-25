function getPkmCardTemplate() {
    return `<div class="pkm_card">
            <div id="pkm_${initPkms.id}" class="pkm_card_content">
                <img src="${initPkms.sprites.other.dream_world.front_default}" class="pkm_card_img position_top">
                <span class="pkm_card_id position_top">#${initPkms.id}</span>
                <span class="pkm_card_name position_top">${initPkms.name.charAt(0).toUpperCase() + initPkms.name.slice(1)}</span>
                <div id="pkm_card_types_${initPkms.id}"class="pkm_card_types position_top"></div>
            </div>
        </div>
    `
}


function getPkmTypesTemplate(indexPkmType) {
    return `<div class="${initPkms.types[indexPkmType].type.name}">${initPkms.types[indexPkmType].type.name}</div>`
}


