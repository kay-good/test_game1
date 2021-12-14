const $arenas = document.querySelector('.arenas')
const $randomButton = document.querySelector('.button')

const player1 = {
    player: 1,
    name: 'scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knifw', 'sword', 'fire'],
    attack: function(name) {
        console.log(name + 'Fight...')
    } 
}

const player2 = {
    player: 2,
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

function createPlayer(player) {
    const $player = createElement('div', 'player' + player.player)
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

function random() {
    return Math.ceil(Math.random() * 100)
}

function changeHP(player) {
    const $playerLife = document.querySelector('.player' + player.player + ' .life')
    player.hp -= random() / 5
    $playerLife.style.width = (player.hp <= 0 ? 0 : player.hp) + '%'
}

function playerWinTitle(name) {
    const $winTitle = createElement('div', 'loseTitle')
    $winTitle.innerText = name + ' wins'
    return $winTitle
}

function playerWin(player1, player2) {
    if (player1.hp <= 0) {
        $arenas.appendChild(playerWinTitle(player2.name))
        $randomButton.disabled = true
        // console.log('1111111')
    } 
    if (player2.hp <= 0) {
        $arenas.appendChild(playerWinTitle(player1.name))
        $randomButton.disabled = true
    }
}

$randomButton.addEventListener('click', function() {
    // 
    changeHP(player1)
    changeHP(player2)
    playerWin(player1, player2)
})

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))