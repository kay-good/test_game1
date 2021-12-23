const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')


import { player1, player2 } from './players.js'
import { createElement } from './utils.js'
import { generateLogs } from './visual.js'
import { playerWin, enemyAttack, playerAttack } from './logics.js'

export class Game {

    start = () => {
        function createPlayer({player, hp, img, name}) {
            const $player = createElement('div', `player${player}`)
            const $progressBar = createElement('div', 'progressbar')
            const $life = createElement('div', 'life')
            const $name =  createElement('div', 'name')
            const $character =  createElement('div', 'character')
            const $img =  createElement('img')
        
            $life.style.width = `${hp}%`
            $name.innerText = name
            $img.src = img
        
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
            const {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy} = enemyAttack()
            const {hit, defence, value} = playerAttack()
            if (hit !== defenceEnemy) {
                player2.changeHP(value)
                player2.renderHP()
                generateLogs('hit', player1, player2, value)
            } else {
                generateLogs('defence', player1, player2)
            }
        
            if (hitEnemy !== defence) {
                player1.changeHP(valueEnemy)
                player1.renderHP()
                generateLogs('hit', player2, player1, valueEnemy)
            } else {
                generateLogs('defence', player2, player1)
            }
        
            
            playerWin(player1, player2)
        })
        
        generateLogs('start', player1, player2)
    }

}