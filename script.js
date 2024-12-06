const cells = document.querySelectorAll('[data-cell]');
const turnDisplay = document.getElementById('turn-display');
const resetButton = document.getElementById('reset-button');
let currentPlayer = 'X';
const displayWin = document.getElementById('display-win');
let isGameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (!isGameOver && cell.textContent === '') {
            cell.textContent = currentPlayer;
            checkwin();
            if (!isGameOver) {
                currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
                turnDisplay.innerHTML = `Player ${currentPlayer}'s Turn`;
            }
        }
    });
});

resetButton.addEventListener('click', () => {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('winning-cell');
    });
    displayWin.style.display = 'none';
    displayWin.innerHTML = '';
    turnDisplay.innerHTML = "Player X's Turn";
    currentPlayer = 'X';
    isGameOver = false;
});


const triggerConfetti = () => {
    confetti({
        particleCount: 500,
        spread: 100,
        origin: { y: 0.6 }, 
    });
};

const checkwin = () => {
    const winConditions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    winConditions.forEach(e => {
        if (
            cells[e[0]].innerHTML === cells[e[1]].innerHTML &&
            cells[e[1]].innerHTML === cells[e[2]].innerHTML &&
            cells[e[0]].innerHTML !== ''
        ) {
            displayWin.style.display = 'block';
            displayWin.innerHTML = `Player ${cells[e[0]].innerHTML} wins!`;
            isGameOver = true;

            e.forEach(index => {
                cells[index].classList.add('winning-cell');
            });

            triggerConfetti();
        }
    });
};
