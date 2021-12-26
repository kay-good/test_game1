const $arenas = document.querySelector('.arenas')
const $formFight = document.querySelector('.control')
import { Player } from "./player-class.js"

// import { player1, player2 } from './players.js'
import { createElement } from './utils.js'
import { generateLogs } from './visual.js'
import { playerWin, playerAttack } from './logics.js'

let player1
let player2

export class Game {

    

    getPlayers = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/players').then(res => res.json())
        return body
    }

    getEnemy = async () => {
        const body = fetch('https://reactmarathon-api.herokuapp.com/api/mk/player/choose').then(res => res.json())
        return body
    }

    start = async () => {
        // const players = await this.getPlayers()
        const enemyPlayer = await this.getEnemy()
        const p1 = JSON.parse(localStorage.getItem('player1'))
        const p2 = enemyPlayer

        player1 = new Player({
            ...p1,
            player: 1
        })
        player2 = new Player({
            ...p2,
            player: 2
        })
        
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
        
        $formFight.addEventListener('submit', async function(e) {
            e.preventDefault()
            
            const {player1: {hit, defence, value}, player2: {hit: hitEnemy, defence: defenceEnemy, value: valueEnemy}} = await playerAttack()
            
            console.log(hit)
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