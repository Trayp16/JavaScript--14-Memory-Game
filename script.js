const board = document.getElementById('game-board');
const emojis = ['🐘', '🦒', '🐅', '🐒', '🦓', '🦁', '🦉', '🦊'];
let cards = [...emojis, ...emojis]; // duplicate for pairs
let flippedCards = [];
let lockBoard = false;

// Shuffle cards
cards.sort(function() {
    return 0.5 - Math.random();
});

// Create cards on the board
cards.forEach(function(emoji, index) {
    const card = document.createElement('div');
    card.classList.add('card');
    card.dataset.emoji = emoji;
    card.dataset.index = index; // Though not strictly used in this version, good for debugging or extensions
    card.innerText = ""; // Initially hide emoji
    board.appendChild(card);
});

// Card click handler
board.addEventListener('click', function(e) {
    const clicked = e.target;

    // Ignore clicks if it's not a card, or if the board is locked, or if the card is already flipped
    if (!clicked.classList.contains('card') || lockBoard) return;
    if (flippedCards.includes(clicked)) return; // Prevents clicking the same card twice to form a "pair"

    // Show the emoji
    clicked.innerText = clicked.dataset.emoji;
    clicked.classList.add('flipped');
    flippedCards.push(clicked);

    if (flippedCards.length === 2) {
        lockBoard = true; // Prevent further clicks while checking
        const first = flippedCards[0];
        const second = flippedCards[1];

        if (first.dataset.emoji === second.dataset.emoji) {
            // Match
            flippedCards = [];
            lockBoard = false;
        } else {
            // No match
            setTimeout(function() {
                first.innerText = "";
                second.innerText = "";
                first.classList.remove('flipped');
                second.classList.remove('flipped');
                flippedCards = [];
                lockBoard = false;
            }, 1000); // Wait 1 second before flipping back
        }
    }
});