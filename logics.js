import { HIT, ATTACK } from './consts.js'
import { random } from './utils.js'
import { playerWinTitle, createReloadButton, generateLogs } from './visual.js'

const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')

export function playerWin(player1, player2) {

    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true
        createReloadButton()
    }

    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWinTitle(player2.name))
        generateLogs('end', player2, player1)
        
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWinTitle(player1.name))
        generateLogs('end', player1, player2)
        
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWinTitle())
        generateLogs('draw')
    }
}


export async function playerAttack() {
    const attack = {}

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.hit = item.value
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value
        }
        item.checked = false
    }
    const responce = await fetch('http://reactmarathon-api.herokuapp.com/api/mk/player/fight', {
        method: 'POST',
        body: JSON.stringify(attack)
    }).then(res => res.json())
    
    console.log(responce)
    return responce
}
