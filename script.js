let size = 4;
let numberOfTiles = size ** 2;
let highlighted = numberOfTiles;
let shuffled = false;

const endgameModal = document.getElementById('endgameModal')
const endgameMsg = document.getElementById('endgameMsg')
const overlay = document.getElementById('overlay')
const restartBtn = document.getElementById('restartBtn')
const buttonContainer = document.getElementById('tiles')

restartBtn.addEventListener('click', restartGame)
overlay.addEventListener('click', closeEndgameModal)

newGame();

function newGame() {
    loadTiles(size);
    setTimeout(() => {
        shuffle();
    }, 500);
}

// Create buttons
function loadTiles(n) {
    for (let b = 1; b <= numberOfTiles; b++) {
        let newTile = document.createElement('button');
        newTile.id = `btn${b}`;
        newTile.setAttribute('index', b);
        newTile.innerHTML = b;
        newTile.classList.add('btn');
        newTile.addEventListener('click', function () {
            swap(parseInt(this.getAttribute('index')));
        });
        buttonContainer.append(newTile);
    }
    let selectedTileId = 'btn' + highlighted;
    let selectedTile = document.getElementById(selectedTileId);
    selectedTile.classList.add("selected");
}

function shuffle() {
    let minShuffles = 100;
    let totalShuffles = minShuffles + Math.floor(Math.random() * (200 - 100) + 100);

    for (let i = minShuffles; i <= totalShuffles; i++) {
        setTimeout(function timer() {
            let x = Math.floor(Math.random() * 4);
            let direction = 0;
            if (x == 0) {
                direction = highlighted + 1;
            } else if (x == 1) {
                direction = highlighted - 1;
            } else if (x == 2) {
                direction = highlighted + size;
            } else if (x == 3) {
                direction = highlighted - size;
            }
            swap(direction);
            if (i >= totalShuffles - 1) {
                shuffled = true;
            }
        }, i * 10);
    }
}

function checkHasWon() {
    for (let b = 1; b <= numberOfTiles; b++) {
        let currentTile = document.getElementById(`btn${b}`);
        let currentTileIndex = currentTile.getAttribute('index');
        let currentTileValue = currentTile.innerHTML;
        if (parseInt(currentTileIndex) != parseInt(currentTileValue)) {
            return false;
        }
    }
    return true;
}

function setSelected(index) {
    let currentTile = document.getElementById(`btn${highlighted}`);
    let currentTileText = currentTile.innerHTML;
    currentTile.classList.remove('selected');
    let newTile = document.getElementById(`btn${index}`);
    currentTile.innerHTML = newTile.innerHTML;
    newTile.innerHTML = currentTileText;
    newTile.classList.add("selected");
    highlighted = index;
}

// Swap tiles 
function swap(clicked) {
    if (clicked < 1 || clicked > numberOfTiles) {
        return;
    }

    // Load new tiles and shuffle
    // Check if we are trying to swap right
    if (clicked == highlighted + 1) {
        if (clicked % size != 1) {
            setSelected(clicked);
        }
        // Check if we are trying to swap left
    } else if (clicked == highlighted - 1) {
        if (clicked % size != 0) {
            setSelected(clicked);
        }
        // Check if we are trying to swap up
    } else if (clicked == highlighted + size) {
        setSelected(clicked);
        // Check if we are trying to swap down
    } else if (clicked == highlighted - size) {
        setSelected(clicked);
    }

    // Check for winning only after the swap
    if (shuffled && checkHasWon()) {
        openEndgameModal();
        setFinalMessage()
    }
}

function openEndgameModal() {
    endgameModal.classList.add('active')
    overlay.classList.add('active')
}
  
function closeEndgameModal() {
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
}

function setFinalMessage() {
    endgameModal.textContent = 'You won!';
}

function restartGame() {
    highlighted = numberOfTiles;
    shuffled = false;
    endgameModal.classList.remove('active')
    overlay.classList.remove('active')
    newGame();
}