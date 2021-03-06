const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')
const $chat = document.querySelector('.chat')

import { HIT, ATTACK, LOGS } from './consts.js'
import { player1, player2 } from './players.js'
import { createElement, random } from './utils.js'
import { playerWinTitle, createReloadButton, generateLogs } from './visuals.js'
import { playerWin, enemyAttack, playerAttack } from './logics.js'




function createPlayer(player) {
    const $player = createElement('div', `player${player.player}`)
    const $progressBar = createElement('div', 'progressbar')
    const $life = createElement('div', 'life')
    const $name =  createElement('div', 'name')
    const $character =  createElement('div', 'character')
    const $img =  createElement('img')

    $life.style.width = `${player.hp}%`
    $name.innerText = player.name
    $img.src = player.img

    $player.appendChild($progressBar)
    $player.appendChild($character)
    $progressBar.appendChild($life)
    $progressBar.appendChild($name)
    $character.appendChild($img)

    return $player
} 

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

$formFight.addEventListener('submit', function(e) {
    e.preventDefault()
    const enemy = enemyAttack()
    const player = playerAttack()
    console.log(enemy)
    console.log(player)
    if (player.hit !== enemy.defence) {
        player2.changeHP(player.value)
        player2.renderHP()
        generateLogs('hit', player1, player2, player.value)
    } else {
        generateLogs('defence', player1, player2)
    }

    if (enemy.hit !== player.defence) {
        player1.changeHP(enemy.value)
        player1.renderHP()
        generateLogs('hit', player2, player1, enemy.value)
    } else {
        generateLogs('defence', player2, player1)
    }

    
    playerWin(player1, player2)
})

generateLogs('start', player1, player2)