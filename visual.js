import { createElement, random, dateText } from './utils.js'
import { LOGS } from './consts.js'

const $arenas = document.querySelector('.arenas')
const $chat = document.querySelector('.chat')


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

export function generateLogs(type, {name: playerName1}, {name: playerName2, hp}, damage) {
    let text = ''
    let el = ''
    
    const date = dateText()
    switch (type) {
        case 'start':
            text = LOGS[type]
            .replace('[time]', date)
            .replace('[player1]', playerName1)
            .replace('[player2]', playerName2)
            el = `<p> ${text} </p>`
            console.log(el)
            break
        case 'end':
            text = LOGS[type][random(LOGS[type].length - 1)]
            .replace('[playerWins]', playerName1)
            .replace('[playerLose]', playerName2)
            el = `<p> ${text} </p>`
            break
        case 'hit':
            text = LOGS[type][random(LOGS[type].length - 1)]
            .replace('[playerKick]', playerName1)
            .replace('[playerDefence]', playerName2)
            el = `<p>${date} - ${text} -${damage} [${hp}/100]</p>`
            break 
        case 'defence':
            text = LOGS[type][random(LOGS[type].length - 1)]
            .replace('[playerKick]', playerName1)
            .replace('[playerDefence]', playerName2)
            el = `<p>${date} - ${text}  [${hp}/100]</p>`
            break  
        case 'draw':
            text = LOGS[type]
            el = `<p>${date} ${text} </p>`
            break     
    }
    
    $chat.insertAdjacentHTML('afterbegin', el)
}