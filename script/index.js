function addTicTac(event) {
    if (event.target.className !== 'cell') return;
    if (playerWin) return;

    if (currentPlayer) {
        event.target.children[0].children[1].style.display = 'block';
        event.target.classList.add('cross');
        currentPlayer = !currentPlayer;
    } else {
        event.target.children[0].children[0].style.display = 'block';
        event.target.classList.add('ring');

        currentPlayer = !currentPlayer;
    }

    if (checkGame()) {
        endGame();
    }
}

function checkGame() {
    let winСombinationList = [[[0, 0], [1, 0], [2, 0]], [[0, 1], [1, 1], [2, 1]], [[0, 2], [1, 2], [2, 2]], [[0, 0], [0, 1], [0, 2]], [[1, 0], [1, 1], [1, 2]], [[2, 0], [2, 1], [2, 2]], [[0, 0], [1, 1], [2, 2]], [[2, 0], [1, 1], [0, 2]]];

    winСombinationList.find((combination) => {
        let first = playGround.rows[combination[0][0]].cells[combination[0][1]];
        let second = playGround.rows[combination[1][0]].cells[combination[1][1]];
        let third = playGround.rows[combination[2][0]].cells[combination[2][1]];

        if (first.classList.contains('ring')
            && second.classList.contains('ring')
            && third.classList.contains('ring')) {

            first.classList.add('win-ground');
            second.classList.add('win-ground');
            third.classList.add('win-ground');

            playerTac++;
            playerWin = 'TAC';
            return true;
        }

        if (first.classList.contains('cross')
            && second.classList.contains('cross')
            && third.classList.contains('cross')) {

            first.classList.add('win-ground');
            second.classList.add('win-ground');
            third.classList.add('win-ground');

            playerTic++;
            playerWin = 'TIC';
            return true;
        }

    });

    return playerWin;
}

function endGame() {
    let winBlock = document.querySelector('.winner');
    let winner = document.querySelector('.winner-player');
    winBlock.style.display = 'block';
    winner.textContent = `${playerWin} WIN!`;

    updateScore();
}

function updateScore() {
    let tic = document.querySelector('.score-tic');
    let tac = document.querySelector('.score-tac');

    tic.textContent = playerTic;
    tac.textContent = playerTac;
}

function restartGame() {
    playerWin = '';

    document.querySelectorAll('.cell').forEach((item) => {
        item.classList.remove('win-ground')
        item.classList.remove('cross')
        item.classList.remove('ring')
    })

    document.querySelectorAll('.tic').forEach((item) => {
        item.style.display = 'none';
    })

    document.querySelectorAll('.tac').forEach((item) => {
        item.style.display = 'none';
    })

}

let playerWin = '';
let playerTic = 0;
let playerTac = 0;
let currentPlayer = true;
const playGround = document.querySelector('.playground');

playGround.addEventListener('click', addTicTac);

