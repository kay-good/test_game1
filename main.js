const $arenas = document.querySelector('.arenas')
// const $randomButton = document.querySelector('.button')
const $formFight = document.querySelector('.control')

const HIT = {
    head: 30,
    body: 25,
    foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

const player1 = {
    player: 1,
    name: 'scorpion',
    hp: 100,
    img: 'http://reactmarathon-api.herokuapp.com/assets/scorpion.gif',
    weapon: ['knifw', 'sword', 'fire'],
    attack: function(name) {
        console.log(name + 'Fight...')
    } ,
    changeHP,
    elHP,
    renderHP
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
    changeHP,
    elHP,
    renderHP
}

function changeHP(hp) {
    this.hp -= hp
    if (this.hp < 0) {
        this.hp = 0
    }
}

function elHP() {
    return document.querySelector('.player' + this.player + ' .life')
}

function renderHP(element) {
    this.elHP().style.width = (this.hp) + '%'
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
        
    } else if (player2.hp === 0 && player2.hp < player1.hp) {
        $arenas.appendChild(playerWinTitle(player1.name))
        
    } else if (player1.hp === 0 && player2.hp === 0) {
        $arenas.appendChild(playerWinTitle())
    }
}

function createReloadButton() {
    const $reloadWrap = createElement('div', 'reloadWrap')
    const $button = createElement('button', 'button')

    $button.innerText = 'Restart'
    $reloadWrap.addEventListener('click', function() {
        window.location.reload()
    })

    $reloadWrap.appendChild($button)
    $arenas.appendChild($reloadWrap)
}

// $randomButton.addEventListener('click', function() {
//     // 
//     player1.changeHP(random(20))
//     player1.renderHP()
    
//     player2.changeHP(random(20))
//     player2.renderHP()

//     if (player1.hp === 0 || player2.hp === 0) {
//         $randomButton.disabled = true
//         createReloadButton()
//     }
//     playerWin(player1, player2)
// })

$arenas.appendChild(createPlayer(player1))
$arenas.appendChild(createPlayer(player2))

function enemyAttack() {
    const hit = ATTACK[random(3) - 1]
    const defence = ATTACK[random(3) - 1]

    return {
        value: random(HIT[hit]),
        hit,
        defence
    }
}

$formFight.addEventListener('submit', function(e) {
    e.preventDefault()
    const enemy = enemyAttack()
    const attack = {}

    for (let item of $formFight) {
        // console.log(item)
        if (item.checked && item.name === 'hit') {
            attack.value = random(HIT[item.value])
            attack.hit = item.value
        }
        if (item.checked && item.name === 'defence') {
            attack.defence = item.value
        }
        item.checked = false
    }
    console.log(attack)
    console.log(enemy)

    if (attack.hit === enemy.defence) {
        player2.changeHP(0)
    } else {
        player2.changeHP(attack.value)
    }

    if (enemy.hit === attack.defence) {
        player1.changeHP(0)
    } else {
        player1.changeHP(enemy.value)
    }

    player1.renderHP()
    player2.renderHP()

    if (player1.hp === 0 || player2.hp === 0) {
        $formFight.disabled = true
        createReloadButton()
    }
    playerWin(player1, player2)
})