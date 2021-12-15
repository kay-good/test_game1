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
    } ,
    changeHP : changeHP,
    elHP: elHP,
    renderHP: renderHP
}

const player2 = {
    player: 2,
    name: 'subzero',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
    weapon: ['knifw', 'sword', 'fire'],
    attack: function(name) {
        console.log(name + 'Fight...')
    } ,
    changeHP : changeHP,
    elHP: elHP,
    renderHP: renderHP
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

function random(num) {
    return Math.ceil(Math.random() * num)
}

function changeHP(hp) {
    this.hp -= hp
    if (this.hp <= 0) {
        this.hp = 0
    }
}

function elHP() {
    console.log(this.hp)
    const $playerLife = document.querySelector('.player' + this.player + ' .life')
    return $playerLife
}

function renderHP(element) {
    //console.log(element)
    element.style.width = (this.hp) + '%'
}

function playerWinTitle(name) {
    const $winTitle = createElement('div', 'loseTitle')
    if (name) {
        $winTitle.innerText = name + ' wins'
    } else {
        $winTitle.innerText = 'draw'
    }
    return $winTitle
}

function playerWin(player1, player2) {
    if (player1.hp === 0 && player1.hp < player2.hp) {
        $arenas.appendChild(playerWinTitle(player2.name))
        $arenas.appendChild($reloadButton)
        
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWinTitle(player1.name))
        $arenas.appendChild($reloadButton)
        
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWinTitle())
        $arenas.appendChild($reloadButton)
    }
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap')
    const $button = createElement('button', 'button')

    $button.innerText = 'Restart'

    $reloadWrap.appendChild($button)

    return $reloadWrap
}

const $reloadButton = createReloadButton()
$reloadButton.addEventListener('click', function() {
    window.location.reload()
})

$randomButton.addEventListener('click', function() {
    // 
    player1.changeHP(random(20))
    player1.renderHP(player1.elHP())
    
    player2.changeHP(random(20))
    player2.renderHP(player2.elHP())

    if (player1.hp === 0 || player2.hp === 0) {
        $randomButton.disabled = true
    }
    playerWin(player1, player2)
})



$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))