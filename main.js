const scorpion = {
    name: 'scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knifw', 'sword', 'fire'],
    attack: function(name) {
        console.log(name + 'Fight...')
    } 
}

const subzero = {
    name: 'subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knifw', 'sword', 'fire'],
    attack: function(name) {
        console.log(name + 'Fight...')
    } 
}

function createElement(tag, classList) {
    const element = document.createElement(tag)
    if (classList) {
        element.classList.add(classList)
    }
    return element
}

function createPlayer(playerNumber, player) {
    const $player = createElement('div', playerNumber)
    const $progressBar = createElement('div', 'progressbar')
    const $life = createElement('div', 'life')
    const $name =  createElement('div', 'name')
    const $character =  createElement('div', 'character')
    const $img =  createElement('img')

    $life.style.width = player.hp + '%'
    $name.innerText = player.name
    $img.src = player.img

    $player.appendChild($progressBar)
    $player.appendChild($character)
    $progressBar.appendChild($life)
    $progressBar.appendChild($name)
    $character.appendChild($img)

    return $player
} 

const $arenas = document.querySelector('.arenas')

const player1 = createPlayer('player1', scorpion)
const player2 = createPlayer('player2', subzero)

$arenas.appendChild(player1)
$arenas.appendChild(player2)