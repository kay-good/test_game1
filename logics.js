import { HIT, ATTACK, LOGS } from './consts.js'
import { createElement, random } from './utils.js'
import { playerWinTitle, createReloadButton, generateLogs } from './visuals.js'

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

export function enemyAttack() {
    const hit = ATTACK[random(3) - 1]
    const defence = ATTACK[random(3) - 1]

    return {
        value: random(HIT[hit]),
        hit,
        defence
    }
}

export function playerAttack() {
    const attack = {}

    for (let item of $formFight) {
        if (item.checked && item.name === 'hit') {
            attack.value = random(HIT[item.value])
            attack.hit = item.value
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value
        }
        item.checked = false
    }
    return attack
}
