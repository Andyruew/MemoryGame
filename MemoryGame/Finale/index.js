const cards = [
  'bell', 'bell',
  'bookmark', 'bookmark',
  'calendar', 'calendar',
  'adjust', 'adjust',
  'bolt', 'bolt',
  'burn', 'burn'
]

const deck = document.getElementById('cards')
// New array containing all the stuff from the HTML
const symbolsHTML = shuffle(cards.map(card => `<div class="card"><div class="symbol">${card}</div></div>`))

deck.innerHTML = symbolsHTML.join('')

//  shuffling

// Fisher-Yates (aka Knuth) Shuffle
function shuffle (array) {
  var currentIndex = array.length, temporaryValue, randomIndex

  while (currentIndex !== 0) {
    randomIndex = Math.floor(Math.random() * currentIndex)
    currentIndex -= 1
    temporaryValue = array[currentIndex]
    array[currentIndex] = array[randomIndex]
    array[randomIndex] = temporaryValue
  }
  return array
}
//  my code
let openedCards = []

let matchedCards = []

deck.addEventListener('click', function (e) {
  if (e.target.classList.contains('card')) {
    let $card = e.target
    let $symbol = e.target.firstElementChild
    $symbol.classList.add('show')
    $card.classList.add('open')

    function cardOpen () {
      openedCards.push($card)
      if (openedCards.length === 2) {
        if (openedCards[0].firstElementChild.innerHTML === openedCards[1].firstElementChild.innerHTML) {
            // matching cards
          matched()
        } else {
          // unmatching cards
          unmatched()
        }
      }
    }
    cardOpen()
    win()
  }
})

function matched () {
  openedCards[0].classList.add('matched')
  openedCards[1].classList.add('matched')
  matchedCards.push(openedCards[1])
  matchedCards.push(openedCards[0])
  openedCards = []
}

function unmatched () {
  openedCards[0].classList.add('unmatched')
  openedCards[1].classList.add('unmatched')
  setTimeout(function () {
    openedCards[0].classList.remove('open')
    openedCards[1].classList.remove('open')
    openedCards[0].classList.remove('unmatched')
    openedCards[1].classList.remove('unmatched')
    openedCards[0].firstElementChild.classList.remove('show')
    openedCards[1].firstElementChild.classList.remove('show')
    openedCards = []
  }, 600)
}

// Difficulty Levels

const $easy = document.getElementById('easy')
const $medium = document.getElementById('medium')
const $hard = document.getElementById('hard')

let totalCards = 100

function startGame () {
  // EASY MODE //
  $easy.addEventListener('click', function (e) {
    const easy = cards.slice()
    easy.length = 4
    const symbolsHTML = shuffle(easy.map(card => `<div class='card show'><div class='symbol'>${card}</div></div>`))
    deck.innerHTML = symbolsHTML.join('')
    $winner.classList.remove('reveal')
    matchedCards = []
    totalCards = 4
  })
  // MEDIUM MODE //
  $medium.addEventListener('click', function (e) {
    const medium = cards.slice()
    medium.length = 8
    const symbolsHTML = shuffle(medium.map(card => `<div class='card show'><div class='symbol'>${card}</div></div>`))
    deck.innerHTML = symbolsHTML.join('')
    $winner.classList.remove('reveal')
    matchedCards = []
    totalCards = 8
  })
  // HARD MODE //
  $hard.addEventListener('click', function (e) {
    const hard = cards.slice()
    const symbolsHTML = shuffle(hard.map(card => `<div class='card show'><div class='symbol'>${card}</div></div>`))
    deck.innerHTML = symbolsHTML.join('')
    $winner.classList.remove('reveal')
    matchedCards = []
    totalCards = 12
  })
}

startGame()

// Win pop up //
const $winner = document.getElementById('winner')

function win () {
  if (matchedCards.length === totalCards) {
    $winner.classList.add('reveal')
  }
}
