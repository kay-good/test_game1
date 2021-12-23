

export function playerWinTitle(name) {
    const $winTitle = createElement('div', 'loseTitle')
    if (name) {
        $winTitle.innerText = `${name} wins`
    } else {
        $winTitle.innerText = 'draw'
    }
    return $winTitle
}

export function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap')
    const $button = createElement('button', 'button')

    $button.innerText = 'Restart'
    $reloadWrap.addEventListener('click', function() {
        window.location.reload()
    })

    $reloadWrap.appendChild($button)
    $arenas.appendChild($reloadWrap)
}

export function generateLogs(type, player1, player2, damage) {
    let text = ''
    let el = ''
    const date = new Date()
    const dateText = `${date.getHours()}:${date.getMinutes()}`
    switch (type) {
        case 'start':
            text = LOGS[type]
            .replace('[time]', dateText)
            .replace('[player1]', player1.name)
            .replace('[player2]', player2.name)
            el = `<p> ${text} </p>`
            console.log(el)
            break
        case 'end':
            text = LOGS[type][random(logs[type].length - 1)]
            .replace('[playerWins]', player1.name)
            .replace('[playerLose]', player2.name)
            el = `<p> ${text} </p>`
            break
        case 'hit':
            text = LOGS[type][random(logs[type].length - 1)]
            .replace('[playerKick]', player1.name)
            .replace('[playerDefence]', player2.name)
            el = `<p>${dateText} - ${text} -${damage} [${player2.hp}/100]</p>`
            break 
        case 'defence':
            text = LOGS[type][random(logs[type].length - 1)]
            .replace('[playerKick]', player1.name)
            .replace('[playerDefence]', player2.name)
            el = `<p>${dateText} - ${text}  [${player2.hp}/100]</p>`
            break  
        case 'draw':
            text = LOGS[type]
            el = `<p> ${text} </p>`
            break     
    }
    
    $chat.insertAdjacentHTML('afterbegin', el)
}