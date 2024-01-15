const cards = document.querySelectorAll('.card');
let wasFlipped = false;
let lockCards = false;
let first, second;
let moves = 0;
const score = document.querySelector('.score');
let openCards = 0;
const totalCards = cards.length / 2;

const modalContainer = document.querySelector('.modal-container');
const modal = document.querySelector('.modal');
const title = document.querySelector('.title');
const restartButton = document.querySelector('.modal-restart');
const modalScoresTable = document.querySelector('.modal-scores-table');

const startButton = document.querySelector('.modal-start');
const startModal = document.querySelector('.start');

// game start 

mixCards();
startButton.addEventListener('click', function() {
startModal.classList.add('hide');
});

cards.forEach(card => card.addEventListener('click', flipCard));

// functions

function flipCard() {
   if(lockCards) return;
   if(this === first) return;

   this.classList.add('flip');

   if(!wasFlipped) {
      wasFlipped = true;
      first = this;
      return;
   }
      second = this;
      checkCardsMatch();

  
}
function checkCardsMatch() {
   let match = first.dataset.name === second.dataset.name;
   match ? disableFlipping() : removeFlip();
   moves++;
   score.innerHTML = moves;
   if(match) {
      openCards++;
   }
   if(openCards === totalCards) {
      localStorage.setItem('latestScore', moves);
      endGame();
   }
}
function disableFlipping() {
   first.removeEventListener('click', flipCard);
   second.removeEventListener('click', flipCard);
   resetCards();
}

function removeFlip() {
   lockCards = true;
   setTimeout(() => {
      first.classList.remove('flip');
      second.classList.remove('flip');
      resetCards();
   }, 1000);
}

function resetCards() {
   [wasFlipped, lockCards] = [false, false];
   [first, second] = [null, null];

}

function mixCards() {
   cards.forEach(card => {
      let position = Math.floor(Math.random() * 20);
      card.style.order = position;
   });
};

function endGame() {
   saveScores();
      setTimeout(() => {
         showModal();
      }, 1000);

   }

function resetGame() {
   cards.forEach(card => {
      card.classList.remove('flip');
   });
   mixCards();
   hideModal();
   moves = 0;
   openCards = 0;
   cards.forEach(card => card.addEventListener('click', flipCard));
}

// modal
restartButton.addEventListener('click', resetGame);

function showModal() {
   modalContainer.classList.add('show');
}

function hideModal() {
   modalContainer.classList.remove('show');
}

// saving game results
const highScores = JSON.parse(localStorage.getItem('highScores')) || [];

function saveScores() {
   const latestScore = localStorage.getItem('latestScore');
   highScores.unshift(latestScore);
   localStorage.setItem('highScores', JSON.stringify(highScores));
   
   if(highScores.length === 1) {
      modalScoresTable.innerHTML = "Play more to see results!"
   } else {
      modalScoresTable.innerHTML = highScores.slice(1, 11).map((score, index) => {
         return `<li class="table-score">${index + 1}. ${score} moves</li>`
      }).join('');
   }
}



console.log("Self-check - 60 points - everything is done");
